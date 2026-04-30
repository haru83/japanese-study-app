import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminRewardsPage() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") redirect("/home");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-bg-dark">
      <div className="bg-white dark:bg-surface-dark px-5 pt-12 pb-5 shadow-sm">
        <h1 className="text-xl font-bold text-text-main dark:text-text-main-dark">
          보상 관리
        </h1>
      </div>

      <div className="px-5 py-4">
        <div className="bg-white dark:bg-surface-dark rounded-2xl p-6 text-center text-text-sub shadow-sm">
          보상 아이템 관리 기능은 준비 중입니다.
        </div>
      </div>
    </div>
  );
}
