import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminUsersPage() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") redirect("/home");

  const users = await prisma.user.findMany({
    include: { progress: true, _count: { select: { diaries: true, keigoProgress: true } } },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-bg-dark">
      <div className="bg-white dark:bg-surface-dark px-5 pt-12 pb-5 shadow-sm">
        <h1 className="text-xl font-bold text-text-main dark:text-text-main-dark">
          사용자 관리
        </h1>
        <p className="text-sm text-text-sub">{users.length}명</p>
      </div>

      <div className="px-5 py-4 flex flex-col gap-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white dark:bg-surface-dark rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-border-dark"
          >
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="font-bold text-text-main dark:text-text-main-dark">
                  {user.name ?? "이름 없음"}
                </p>
                <p className="text-xs text-text-sub">{user.email}</p>
              </div>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  user.role === "admin"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {user.role}
              </span>
            </div>
            <div className="flex gap-3 text-xs text-text-sub">
              <span>Lv.{user.progress?.level ?? 1}</span>
              <span>XP {user.progress?.xp ?? 0}</span>
              <span>일기 {user._count.diaries}개</span>
              <span>경어 {user._count.keigoProgress}개</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
