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
    <div className="min-h-screen bg-sakura-blush">
      {/* Header */}
      <div className="bg-canvas-almond px-5 pt-12 pb-6 border-b-4 border-black">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-type-black/60 text-sm font-bold">안녕하세요!</p>
            <h1 className="text-2xl font-black text-type-black">
              {profile?.name ?? session?.user?.name ?? "학습자"} 님 👋
            </h1>
          </div>
          <div className="text-6xl wobbly-2 sticker">🐕</div>
        </div>

        {/* Level & XP */}
        <div className="bg-paper-white rounded-2xl p-4 border-2 border-black shadow-[4px_4px_0px_0px_#000]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="bg-grape-punch text-white text-xs font-black px-3 py-1 rounded-full border-2 border-black">
                Lv.{level}
              </span>
              <span className="text-sm font-bold text-type-black">
                {LEVEL_TITLES[level - 1]}
              </span>
            </div>
            <span className="text-xs font-bold text-type-black/60">
              {xp} / {level < MAX_LEVEL ? nextXp : LEVEL_THRESHOLDS[MAX_LEVEL - 1]} XP
            </span>
          </div>
          <ProgressBar value={xpPercent} />
        </div>
      </div>

      <div className="px-5 py-4 flex flex-col gap-[30px]">
        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "일기", value: diaries.length, icon: "📖", href: "/diary", bg: "bg-sakura-pink", wobble: "wobbly-1" },
            { label: "스탬프", value: progress?.totalStamps ?? 0, icon: "⭐", href: "/sticker-board", bg: "bg-shiba-orange", wobble: "wobbly-3" },
            { label: "경어 레슨", value: keigoCount, icon: "🎯", href: "/keigo", bg: "bg-grape-punch", wobble: "wobbly-5" },
          ].map((stat) => (
            <Link
              key={stat.label}
              href={stat.href}
              className={`${stat.bg} ${stat.wobble} rounded-[15px] p-3 text-center border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all`}
            >
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-xl font-black text-type-black">{stat.value}</div>
              <div className="text-xs font-bold text-type-black/70">{stat.label}</div>
            </Link>
          ))}
        </div>

        {/* Main action cards */}
        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/diary/topic"
            className="bg-sakura-pink wobbly-2 rounded-[15px] p-5 border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            <div className="text-4xl mb-3">📖</div>
            <h3 className="font-black text-type-black">일기 쓰기</h3>
            <p className="text-xs text-type-black/60 font-bold mt-1">+10 XP / +1 스탬프</p>
            <div className="mt-3 bg-paper-white text-type-black text-xs font-black px-3 py-1.5 rounded-xl inline-block border-2 border-black">
              시작하기
            </div>
          </Link>

          <Link
            href="/keigo"
            className="bg-grape-punch wobbly-4 rounded-[15px] p-5 border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="font-black text-white">경어 레슨</h3>
            <p className="text-xs text-white/70 font-bold mt-1">+15 XP / +1 스탬프</p>
            <div className="mt-3 bg-paper-white text-type-black text-xs font-black px-3 py-1.5 rounded-xl inline-block border-2 border-black">
              학습하기
            </div>
          </Link>
        </div>

        {/* Learning shortcuts */}
        <div className="bg-paper-white rounded-2xl overflow-hidden border-2 border-black shadow-[4px_4px_0px_0px_#000]">
          <div className="px-5 py-3 border-b-2 border-black bg-canvas-almond">
            <h2 className="font-black text-type-black text-sm">학습 자료 📚</h2>
          </div>
          {[
            { href: "/learning/grammar", icon: "menu_book", label: "문법 정리", desc: "경어 문법 모음" },
            { href: "/learning/vocabulary", icon: "translate", label: "어휘 목록", desc: "경어 필수 어휘" },
            { href: "/study", icon: "history", label: "학습 현황", desc: `일기 ${diaries.length}개 작성` },
          ].map((item, i, arr) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-5 py-3.5 hover:bg-sakura-blush transition-colors ${
                i < arr.length - 1 ? "border-b-2 border-black" : ""
              }`}
            >
              <span className="material-symbols-outlined text-sakura-pink text-xl">{item.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-bold text-type-black">{item.label}</p>
                <p className="text-xs text-type-black/60">{item.desc}</p>
              </div>
              <span className="material-symbols-outlined text-type-black/40 text-sm">chevron_right</span>
            </Link>
          ))}
        </div>

        {/* Recent diary */}
        {diaries.length > 0 && (
          <div>
            <h2 className="font-black text-type-black mb-3 text-sm">최근 일기</h2>
            <div className="bg-paper-white wobbly-1 rounded-[15px] p-4 border-2 border-black shadow-[4px_4px_0px_0px_#000]">
              <p className="font-black text-type-black text-sm">{diaries[0].title}</p>
              <p className="text-xs text-type-black/60 mt-1 line-clamp-2">{diaries[0].content}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
