/** Must match next.config.ts basePath (GitHub Pages project site). */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "/sanasaa-landing";

/** Prefix a root-absolute public asset path with the app basePath. */
export function withBase(path: string): string {
  if (!path) return BASE_PATH || "/";
  if (/^https?:\/\//i.test(path) || path.startsWith("data:")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (!BASE_PATH) return normalized;
  if (normalized === BASE_PATH || normalized.startsWith(`${BASE_PATH}/`)) return normalized;
  return `${BASE_PATH}${normalized}`;
}
