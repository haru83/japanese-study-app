import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LEVEL_THRESHOLDS } from "@/lib/xp";

const LEVEL_TITLES = [
  "초보 학습자",
  "입문자",
  "기초 완료",
  "중급자",
  "상급자",
  "경어 마스터",
];

export default async function AdminLevelsPage() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") redirect("/home");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-bg-dark">
      <div className="bg-white dark:bg-surface-dark px-5 pt-12 pb-5 shadow-sm">
        <h1 className="text-xl font-bold text-text-main dark:text-text-main-dark">
          레벨 설정
        </h1>
      </div>

      <div className="px-5 py-4 flex flex-col gap-3">
        {LEVEL_THRESHOLDS.map((threshold, i) => (
          <div
            key={i}
            className="bg-white dark:bg-surface-dark rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-border-dark flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold text-text-main">
              {i + 1}
            </div>
            <div className="flex-1">
              <p className="font-bold text-text-main dark:text-text-main-dark">
                Lv.{i + 1} {LEVEL_TITLES[i]}
              </p>
              <p className="text-sm text-text-sub">{threshold} XP 이상</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
