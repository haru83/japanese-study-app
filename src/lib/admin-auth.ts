/**
 * Checks if a pathname requires admin access.
 * Only paths starting with "/admin" followed by "/" or end-of-string
 * are protected. This prevents false positives like "/adminSettings".
 */
export function isAdminPath(pathname: string): boolean {
  return pathname === "/admin" || pathname.startsWith("/admin/") || pathname.startsWith("/admin?");
}
