import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminTopicsPage() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") redirect("/home");

  const topics = await prisma.topic.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-bg-dark">
      <div className="bg-white dark:bg-surface-dark px-5 pt-12 pb-5 shadow-sm">
        <h1 className="text-xl font-bold text-text-main dark:text-text-main-dark">
          주제 관리
        </h1>
        <p className="text-sm text-text-sub">{topics.length}개의 주제</p>
      </div>

      <div className="px-5 py-4 flex flex-col gap-3">
        {topics.length === 0 ? (
          <div className="text-center text-text-sub py-10">
            등록된 주제가 없습니다.
          </div>
        ) : (
          topics.map((topic) => (
            <div
              key={topic.id}
              className="bg-white dark:bg-surface-dark rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-border-dark"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-text-main dark:text-text-main-dark">
                    {topic.title}
                  </p>
                  <p className="text-sm text-text-sub">{topic.titleJp}</p>
                </div>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    topic.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {topic.isActive ? "활성" : "비활성"}
                </span>
              </div>
              <p className="text-xs text-text-sub mt-1">
                {topic.category} · 난이도 {"⭐".repeat(topic.difficulty)}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
