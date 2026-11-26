import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import type {IncomingMessage, ServerResponse} from 'http';
import path from 'path';
import {fileURLToPath} from 'url';
import {defineConfig, loadEnv} from 'vite';
import {injectMaintenanceHtml} from './middleware.ts';
import {MAINTENANCE_MODE, resolveServerMaintenanceMode} from './src/config/siteStatus.ts';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

const STATIC_EXT_RE =
  /\.(?:js|mjs|cjs|css|map|svg|png|jpe?g|gif|webp|avif|ico|woff2?|ttf|otf|eot|mp4|webm|json|webmanifest|txt|xml)$/i;

function isHtmlPageRequest(req: IncomingMessage): boolean {
  const method = req.method || 'GET';
  if (method !== 'GET' && method !== 'HEAD') return false;
  const rawUrl = (req.url || '/').split('?')[0];
  if (
    rawUrl.startsWith('/@') ||
    rawUrl.startsWith('/__') ||
    rawUrl.startsWith('/src/') ||
    rawUrl.startsWith('/node_modules/') ||
    rawUrl.startsWith('/assets/') ||
    rawUrl.startsWith('/api/') ||
    STATIC_EXT_RE.test(rawUrl)
  ) {
    return false;
  }
  const accept = req.headers.accept || '';
  return rawUrl === '/' || accept.includes('text/html') || accept.includes('*/*');
}

export default defineConfig(({mode}) => {
  const loadedEnv = loadEnv(mode, rootDir, '');
  const getMaintenanceEnabled = () =>
    resolveServerMaintenanceMode({...loadedEnv, ...process.env}, MAINTENANCE_MODE);

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'maintenance-mode-http-handler',
        transformIndexHtml: {
          order: 'post',
          handler(html, ctx) {
            // Only inject server runtime flag during dev server or when explicitly set via env at build time
            const explicitBuildEnv =
              process.env.MAINTENANCE_MODE ??
              loadedEnv.MAINTENANCE_MODE ??
              process.env.VITE_MAINTENANCE_MODE ??
              loadedEnv.VITE_MAINTENANCE_MODE;
            if (ctx.server || explicitBuildEnv !== undefined) {
              return injectMaintenanceHtml(html, getMaintenanceEnabled());
            }
            return html;
          },
        },
        configureServer(server) {
          server.middlewares.use((req: IncomingMessage, res: ServerResponse, next: () => void) => {
            if (isHtmlPageRequest(req) && getMaintenanceEnabled()) {
              const origWriteHead = res.writeHead.bind(res);
              res.setHeader('Retry-After', '3600');
              res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive');
              res.setHeader('Cache-Control', 'no-store, no-cache, max-age=0, must-revalidate');
              res.writeHead = ((
                statusCode: number,
                ...rest: [string?, Record<string, string | number | string[]>?]
              ) => {
                const code = statusCode === 200 ? 503 : statusCode;
                return origWriteHead(code, ...(rest as []));
              }) as typeof res.writeHead;
            }
            next();
          });
        },
        configurePreviewServer(server) {
          server.middlewares.use((req: IncomingMessage, res: ServerResponse, next: () => void) => {
            if (!isHtmlPageRequest(req)) {
              next();
              return;
            }
            const distIndex = path.resolve(rootDir, 'dist/index.html');
            if (!fs.existsSync(distIndex)) {
              next();
              return;
            }
            const enabled = getMaintenanceEnabled();
            const rawHtml = fs.readFileSync(distIndex, 'utf8');
            const body = injectMaintenanceHtml(rawHtml, enabled);
            const headers: Record<string, string> = {
              'Content-Type': 'text/html; charset=utf-8',
            };
            if (enabled) {
              headers['Retry-After'] = '3600';
              headers['X-Robots-Tag'] = 'noindex, nofollow, noarchive';
              headers['Cache-Control'] = 'no-store, no-cache, max-age=0, must-revalidate';
            } else {
              headers['Cache-Control'] = 'no-cache, must-revalidate';
            }
            res.writeHead(enabled ? 503 : 200, headers);
            res.end(req.method === 'HEAD' ? undefined : body);
          });
        },
      },
      // Copies src/assets into dist/ so root-relative URLs like
      // "/src/assets/images/..." (e.g. generate_image output) still resolve
      // in production builds. Do not remove.
      {
        name: 'copy-unbundled-src-assets',
        apply: 'build',
        closeBundle(error?: Error): void {
          if (error) {
            return;
          }
          const distDir = path.resolve(rootDir, 'dist');
          const srcAssets = path.resolve(rootDir, 'src/assets');
          const distAssets = path.resolve(distDir, 'src/assets');
          if (fs.existsSync(distDir) && fs.existsSync(srcAssets)) {
            fs.cpSync(srcAssets, distAssets, {recursive: true, force: true});
          }
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(rootDir, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
