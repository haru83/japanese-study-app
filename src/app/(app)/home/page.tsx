import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUserProfile } from "@/actions/user";
import { getDiaries } from "@/actions/diary";
import { xpProgress, xpForNextLevel, MAX_LEVEL, LEVEL_THRESHOLDS } from "@/lib/xp";
import { ProgressBar } from "@/components/ui/ProgressBar";

const LEVEL_TITLES = [
  "초보 학습자",
  "입문자",
  "기초 완료",
  "중급자",
  "상급자",
  "경어 마스터",
];

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const [profile, diaries] = await Promise.all([
    getUserProfile(),
    getDiaries(),
  ]);

  const progress = profile?.progress;
  const level = progress?.level ?? 1;
  const xp = progress?.xp ?? 0;
  const xpPercent = xpProgress(xp, level);
  const nextXp = xpForNextLevel(level);
  const keigoCount = profile?.keigoProgress?.length ?? 0;

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark">
      {/* Header with mascot */}
      <div className="bg-white dark:bg-surface-dark px-5 pt-12 pb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-text-sub dark:text-text-sub-dark text-sm">안녕하세요!</p>
            <h1 className="text-xl font-bold text-text-main dark:text-text-main-dark">
              {profile?.name ?? session?.user?.name ?? "학습자"} 님 👋
            </h1>
          </div>
          <div className="text-5xl">🐕</div>
        </div>

        {/* Level & XP */}
        <div className="bg-primary/10 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="bg-primary text-text-main text-xs font-bold px-2 py-0.5 rounded-full">
                Lv.{level}
              </span>
              <span className="text-sm font-medium text-text-main dark:text-text-main-dark">
                {LEVEL_TITLES[level - 1]}
              </span>
            </div>
            <span className="text-xs text-text-sub">
              {xp} / {level < MAX_LEVEL ? nextXp : LEVEL_THRESHOLDS[MAX_LEVEL - 1]} XP
            </span>
          </div>
          <ProgressBar value={xpPercent} />
        </div>
      </div>

      <div className="px-5 py-4 flex flex-col gap-4">
        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "일기", value: diaries.length, icon: "📖", href: "/diary" },
            { label: "스탬프", value: progress?.totalStamps ?? 0, icon: "⭐", href: "/sticker-board" },
            { label: "경어 레슨", value: keigoCount, icon: "🎯", href: "/keigo" },
          ].map((stat) => (
            <Link
              key={stat.label}
              href={stat.href}
              className="bg-white dark:bg-surface-dark rounded-2xl p-3 text-center shadow-sm border border-orange-50 dark:border-border-dark hover:shadow-md transition-shadow"
            >
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-xl font-bold text-text-main dark:text-text-main-dark">
                {stat.value}
              </div>
              <div className="text-xs text-text-sub dark:text-text-sub-dark">{stat.label}</div>
            </Link>
          ))}
        </div>

        {/* Main action cards */}
        <div className="grid grid-cols-2 gap-3">
          {/* Diary card */}
          <Link
            href="/diary/topic"
            className="bg-white dark:bg-surface-dark rounded-3xl p-5 shadow-sm border border-orange-50 dark:border-border-dark hover:shadow-md transition-shadow"
          >
            <div className="text-4xl mb-3">📖</div>
            <h3 className="font-bold text-text-main dark:text-text-main-dark">
              일기 쓰기
            </h3>
            <p className="text-xs text-text-sub dark:text-text-sub-dark mt-1">
              +10 XP / +1 스탬프
            </p>
            <div className="mt-3 bg-primary text-text-main text-xs font-bold px-3 py-1.5 rounded-xl inline-block">
              시작하기
            </div>
          </Link>

          {/* Keigo card */}
          <Link
            href="/keigo"
            className="bg-white dark:bg-surface-dark rounded-3xl p-5 shadow-sm border border-orange-50 dark:border-border-dark hover:shadow-md transition-shadow"
          >
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="font-bold text-text-main dark:text-text-main-dark">
              경어 레슨
            </h3>
            <p className="text-xs text-text-sub dark:text-text-sub-dark mt-1">
              +15 XP / +1 스탬프
            </p>
            <div className="mt-3 bg-keigo text-white text-xs font-bold px-3 py-1.5 rounded-xl inline-block">
              학습하기
            </div>
          </Link>
        </div>

        {/* Learning shortcuts */}
        <div className="bg-white dark:bg-surface-dark rounded-2xl overflow-hidden shadow-sm border border-orange-50 dark:border-border-dark">
          <div className="px-5 py-3 border-b border-gray-50 dark:border-border-dark">
            <h2 className="font-bold text-text-main dark:text-text-main-dark text-sm">
              학습 자료 📚
            </h2>
          </div>
          {[
            { href: "/learning/grammar", icon: "menu_book", label: "문법 정리", desc: "경어 문법 모음" },
            { href: "/learning/vocabulary", icon: "translate", label: "어휘 목록", desc: "경어 필수 어휘" },
            { href: "/study", icon: "history", label: "학습 현황", desc: `일기 ${diaries.length}개 작성` },
          ].map((item, i, arr) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 dark:hover:bg-border-dark transition-colors ${
                i < arr.length - 1 ? "border-b border-gray-50 dark:border-border-dark" : ""
              }`}
            >
              <span className="material-symbols-outlined text-primary text-xl">{item.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-text-main dark:text-text-main-dark">
                  {item.label}
                </p>
                <p className="text-xs text-text-sub dark:text-text-sub-dark">{item.desc}</p>
              </div>
              <span className="material-symbols-outlined text-text-sub text-sm">chevron_right</span>
            </Link>
          ))}
        </div>

        {/* Recent diary */}
        {diaries.length > 0 && (
          <div>
            <h2 className="font-bold text-text-main dark:text-text-main-dark mb-3 text-sm">
              최근 일기
            </h2>
            <div
              className="bg-white dark:bg-surface-dark rounded-2xl p-4 shadow-sm border border-orange-50 dark:border-border-dark"
            >
              <p className="font-bold text-text-main dark:text-text-main-dark text-sm">
                {diaries[0].title}
              </p>
              <p className="text-xs text-text-sub dark:text-text-sub-dark mt-1 line-clamp-2">
                {diaries[0].content}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
