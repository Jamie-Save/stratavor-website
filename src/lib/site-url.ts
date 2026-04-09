const DEFAULT_SITE_ORIGIN = "https://stratavor.com";

/**
 * Canonical site origin for metadata, sitemaps, and JSON-LD.
 * Set NEXT_PUBLIC_SITE_URL on preview/staging (e.g. https://project.vercel.app) so OG/canonicals match the host.
 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return DEFAULT_SITE_ORIGIN;
  try {
    const u = new URL(raw);
    return u.origin;
  } catch {
    return DEFAULT_SITE_ORIGIN;
  }
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl().replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}
