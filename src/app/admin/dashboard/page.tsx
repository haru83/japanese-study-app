import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") redirect("/home");

  const [userCount, diaryCount, keigoCount] = await Promise.all([
    prisma.user.count(),
    prisma.diary.count(),
    prisma.keigoLessonProgress.count({ where: { completed: true } }),
  ]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-bg-dark">
      <div className="bg-white dark:bg-surface-dark px-5 pt-12 pb-5 shadow-sm">
        <h1 className="text-xl font-bold text-text-main dark:text-text-main-dark">
          관리자 대시보드
        </h1>
      </div>

      <div className="px-5 py-4">
        <div className="grid grid-cols-1 gap-4">
          {[
            { label: "총 사용자", value: userCount, icon: "👥", color: "bg-blue-50 border-blue-100" },
            { label: "총 일기", value: diaryCount, icon: "📖", color: "bg-amber-50 border-amber-100" },
            { label: "경어 레슨 완료 수", value: keigoCount, icon: "🎯", color: "bg-pink-50 border-pink-100" },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`rounded-2xl p-5 border ${stat.color} flex items-center gap-4`}
            >
              <span className="text-4xl">{stat.icon}</span>
              <div>
                <p className="text-3xl font-bold text-text-main">{stat.value}</p>
                <p className="text-text-sub text-sm">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
