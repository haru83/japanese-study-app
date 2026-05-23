import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
export { isAdminPath } from "@/lib/admin-paths";

export async function requireAdmin(): Promise<void> {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") throw new Error("권한이 없습니다.");
}
