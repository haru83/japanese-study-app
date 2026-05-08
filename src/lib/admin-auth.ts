import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * Checks if a pathname requires admin access.
 * Only paths starting with "/admin" followed by "/" or end-of-string
 * are protected. This prevents false positives like "/adminSettings".
 */
export function isAdminPath(pathname: string): boolean {
  return pathname === "/admin" || pathname.startsWith("/admin/") || pathname.startsWith("/admin?");
}

export async function requireAdmin(): Promise<void> {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") throw new Error("권한이 없습니다.");
}
