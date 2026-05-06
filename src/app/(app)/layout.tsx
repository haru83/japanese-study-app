import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUnreadCount } from "@/actions/community";
import { BottomNav } from "@/components/layout/bottom-nav";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const unreadCount = session?.user?.id ? await getUnreadCount() : 0;

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 pb-[85px]">{children}</main>
      <BottomNav unreadCount={unreadCount} />
    </div>
  );
}
