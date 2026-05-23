/**
 * Checks if a pathname requires admin access.
 * Only paths starting with "/admin" followed by "/" or end-of-string
 * are protected. This prevents false positives like "/adminSettings".
 *
 * Edge Runtime compatible — no Node.js-only imports.
 */
export function isAdminPath(pathname: string): boolean {
  return pathname === "/admin" || pathname.startsWith("/admin/") || pathname.startsWith("/admin?");
}
