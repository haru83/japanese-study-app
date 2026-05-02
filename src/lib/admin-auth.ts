/**
 * Checks if a pathname requires admin access.
 * Only paths starting with "/admin" are protected.
 */
export function isAdminPath(pathname: string): boolean {
  return pathname.startsWith("/admin");
}
