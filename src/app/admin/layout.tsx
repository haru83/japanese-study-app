import { AdminBottomNav } from "@/components/layout/admin-bottom-nav";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== "admin") redirect("/home");

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-bg-dark">
      <main className="flex-1 pb-[100px]">{children}</main>
      <AdminBottomNav />
    </div>
  );
}
