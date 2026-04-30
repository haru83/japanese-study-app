import { AdminBottomNav } from "@/components/layout/admin-bottom-nav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-bg-dark">
      <main className="flex-1 pb-[100px]">{children}</main>
      <AdminBottomNav />
    </div>
  );
}
