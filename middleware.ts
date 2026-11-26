import { MAINTENANCE_MODE, resolveServerMaintenanceMode } from './src/config/siteStatus.ts';

const INTERNAL_BYPASS_HEADER = 'x-maintenance-internal';
const RETRY_AFTER_SECONDS = '3600';

const STATIC_ASSET_EXT =
  /\.(?:js|mjs|cjs|css|map|svg|png|jpe?g|gif|webp|avif|ico|woff2?|ttf|otf|eot|mp4|webm|json|webmanifest|txt|xml)$/i;

function isDocumentNavigation(request: Request, pathname: string): boolean {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return false;
  }
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/assets/') ||
    pathname.startsWith('/src/assets/') ||
    pathname === '/favicon.svg' ||
    pathname === '/site.webmanifest' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    STATIC_ASSET_EXT.test(pathname)
  ) {
    return false;
  }
  return true;
}

export function injectMaintenanceHtml(html: string, enabled: boolean): string {
  if (!enabled) {
    return html.replace(
      '</head>',
      '    <script>window.__MAINTENANCE_MODE__ = false;</script>\n  </head>'
    );
  }

  let updated = html
    .replace(
      /<title>[\s\S]*?<\/title>/i,
      '<title>Temporarily disconnected</title>'
    )
    .replace(
      /(<meta\s+name=["'](?:robots|googlebot)["'][\s\S]*?content=["'])[^"']* inc?d?e?x?[^"']*(["'])/gi,
      '$1noindex, nofollow, noarchive$2'
    );

  // Ensure explicit robots & googlebot noindex replacement regardless of attribute formatting
  updated = updated
    .replace(
      /content="index,\s*follow[^"]*"/gi,
      'content="noindex, nofollow, noarchive"'
    )
    .replace(
      '</head>',
      '    <script>window.__MAINTENANCE_MODE__ = true;</script>\n  </head>'
    );

  return updated;
}

/**
 * Vercel Web-Standard Routing Middleware:
 * - Preserves static assets (`/assets/*`, `/favicon.svg`, etc.) and `/api/*` endpoints without redirect loops.
 * - When `MAINTENANCE_MODE=true`, serves the app shell with HTTP 503, `Retry-After: 3600`,
 *   `X-Robots-Tag: noindex, nofollow, noarchive`, and injects `window.__MAINTENANCE_MODE__ = true`.
 * - When `MAINTENANCE_MODE=false`, passes through normally (or injects `false` if overriding a build-time flag).
 */
export default async function middleware(request: Request): Promise<Response> {
  if (request.headers.get(INTERNAL_BYPASS_HEADER) === '1') {
    return new Response(null, {
      headers: { 'x-middleware-next': '1' },
    });
  }

  const url = new URL(request.url);
  if (!isDocumentNavigation(request, url.pathname)) {
    return new Response(null, {
      headers: { 'x-middleware-next': '1' },
    });
  }

  const env = typeof process !== 'undefined' ? process.env : undefined;
  const maintenanceEnabled = resolveServerMaintenanceMode(env, MAINTENANCE_MODE);

  // Fast pass-through when maintenance is completely disabled in both env and default config
  if (!maintenanceEnabled && !MAINTENANCE_MODE) {
    return new Response(null, {
      headers: { 'x-middleware-next': '1' },
    });
  }

  const indexUrl = new URL('/index.html', request.url);
  const upstream = await fetch(indexUrl.toString(), {
    method: 'GET',
    headers: {
      [INTERNAL_BYPASS_HEADER]: '1',
      Accept: 'text/html',
    },
  });

  if (!upstream.ok) {
    return new Response(null, {
      headers: { 'x-middleware-next': '1' },
    });
  }

  if (!maintenanceEnabled) {
    // Runtime override: `MAINTENANCE_MODE=false` set on server while build constant was `true`
    const html = injectMaintenanceHtml(await upstream.text(), false);
    return new Response(request.method === 'HEAD' ? null : html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache, must-revalidate',
      },
    });
  }

  const maintenanceHeaders: Record<string, string> = {
    'Content-Type': 'text/html; charset=utf-8',
    'Retry-After': RETRY_AFTER_SECONDS,
    'X-Robots-Tag': 'noindex, nofollow, noarchive',
    'Cache-Control': 'no-store, no-cache, max-age=0, must-revalidate',
  };

  if (request.method === 'HEAD') {
    return new Response(null, {
      status: 503,
      headers: maintenanceHeaders,
    });
  }

  const rawHtml = await upstream.text();
  const transformedHtml = injectMaintenanceHtml(rawHtml, true);

  return new Response(transformedHtml, {
    status: 503,
    headers: maintenanceHeaders,
  });
}

export const config = {
  matcher: [
    '/((?!api/|assets/|src/assets/|favicon\\.svg|site\\.webmanifest|robots\\.txt|sitemap\\.xml).*)',
  ],
};
