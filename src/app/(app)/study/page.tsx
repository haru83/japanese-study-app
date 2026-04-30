import Link from "next/link";
import { getDiaries } from "@/actions/diary";
import { getUserProfile } from "@/actions/user";

export default async function StudyPage() {
  const [diaries, profile] = await Promise.all([getDiaries(), getUserProfile()]);

  const progress = profile?.progress;

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark">
      {/* Header */}
      <div className="bg-white dark:bg-surface-dark px-5 pt-12 pb-5 shadow-sm">
        <h1 className="text-xl font-bold text-text-main dark:text-text-main-dark">
          학습 현황
        </h1>
      </div>

      <div className="px-5 py-4 flex flex-col gap-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "일기", value: diaries.length, unit: "개", icon: "📖" },
            { label: "스탬프", value: progress?.totalStamps ?? 0, unit: "개", icon: "⭐" },
            { label: "연속", value: progress?.streakDays ?? 0, unit: "일", icon: "🔥" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white dark:bg-surface-dark rounded-2xl p-3 text-center shadow-sm border border-orange-50 dark:border-border-dark"
            >
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-xl font-bold text-text-main dark:text-text-main-dark">
                {stat.value}
                <span className="text-xs font-normal text-text-sub ml-0.5">{stat.unit}</span>
              </div>
              <div className="text-xs text-text-sub dark:text-text-sub-dark">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Recent diaries */}
        <div>
          <h2 className="text-base font-bold text-text-main dark:text-text-main-dark mb-3">
            최근 일기
          </h2>
          {diaries.length === 0 ? (
            <div className="bg-white dark:bg-surface-dark rounded-2xl p-6 text-center text-text-sub">
              아직 작성한 일기가 없습니다.
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {diaries.slice(0, 5).map((diary) => (
                <div
                  key={diary.id}
                  className="bg-white dark:bg-surface-dark rounded-2xl p-4 shadow-sm border border-orange-50 dark:border-border-dark"
                >
                  <p className="font-bold text-text-main dark:text-text-main-dark text-sm">
                    {diary.title}
                  </p>
                  <p className="text-xs text-text-sub dark:text-text-sub-dark mt-1 line-clamp-1">
                    {diary.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <Link
          href="/diary/topic"
          className="w-full bg-primary hover:bg-primary-hover text-text-main font-bold py-4 rounded-2xl text-center transition-all active:scale-95"
        >
          새 일기 쓰기
        </Link>
      </div>
    </div>
  );
}
