/**
 * Maintenance Mode Configuration
 *
 * Controls whether public visitors see the standalone Maintenance Page (`true`)
 * or the full Salma Atou portfolio (`false`).
 *
 * Supported controls (in priority order):
 * 1. Server-injected runtime state (`window.__MAINTENANCE_MODE__`) from Vercel `middleware.ts` or Vite server
 * 2. Environment variables: `MAINTENANCE_MODE` or `VITE_MAINTENANCE_MODE` (also `SERVICE_DOWN` / `VITE_SERVICE_DOWN`)
 * 3. Code fallback constant `MAINTENANCE_MODE` below
 */
export const MAINTENANCE_MODE: boolean = true;

// Backwards-compatible alias
export const SERVICE_DOWN: boolean = MAINTENANCE_MODE;

declare global {
  interface Window {
    __MAINTENANCE_MODE__?: boolean;
  }
}

export function parseMaintenanceFlag(raw: unknown): boolean | undefined {
  if (typeof raw === 'boolean') return raw;
  if (typeof raw === 'string') {
    const normalized = raw.trim().toLowerCase();
    if (normalized === 'true' || normalized === '1' || normalized === 'on' || normalized === 'yes') {
      return true;
    }
    if (normalized === 'false' || normalized === '0' || normalized === 'off' || normalized === 'no') {
      return false;
    }
  }
  return undefined;
}

export function resolveServerMaintenanceMode(
  env: Record<string, string | undefined> | undefined,
  fallback: boolean = MAINTENANCE_MODE
): boolean {
  if (env) {
    const candidates = [
      env.MAINTENANCE_MODE,
      env.VITE_MAINTENANCE_MODE,
      env.SERVICE_DOWN,
      env.VITE_SERVICE_DOWN,
    ];
    for (const candidate of candidates) {
      const parsed = parseMaintenanceFlag(candidate);
      if (parsed !== undefined) return parsed;
    }
  }
  return fallback;
}

export function isMaintenanceModeActive(
  flag: boolean = MAINTENANCE_MODE,
  envOverride?: string
): boolean {
  if (envOverride !== undefined) {
    const explicit = parseMaintenanceFlag(envOverride);
    if (explicit !== undefined) return explicit;
    return flag;
  }

  if (typeof window !== 'undefined' && typeof window.__MAINTENANCE_MODE__ === 'boolean') {
    return window.__MAINTENANCE_MODE__;
  }

  const metaEnv =
    typeof import.meta !== 'undefined'
      ? (import.meta.env as Record<string, string | undefined> | undefined)
      : undefined;

  if (metaEnv) {
    const envParsed =
      parseMaintenanceFlag(metaEnv.VITE_MAINTENANCE_MODE) ??
      parseMaintenanceFlag(metaEnv.VITE_SERVICE_DOWN);
    if (envParsed !== undefined) return envParsed;
  }

  return flag;
}

export const isServiceDownActive = isMaintenanceModeActive;
