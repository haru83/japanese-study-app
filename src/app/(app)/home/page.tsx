import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUserProfile } from "@/actions/user";
import { getDiaries } from "@/actions/diary";
import { xpProgress, xpForNextLevel, MAX_LEVEL, LEVEL_THRESHOLDS } from "@/lib/xp";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { GuestSignupBanner } from "@/components/guest/GuestSignupBanner";
import { ShibaAvatar } from "@/components/mascot/ShibaAvatar";

const LEVEL_TITLES = [
  "초보 학습자",
  "입문자",
  "기초 완료",
  "중급자",
  "상급자",
  "경어 마스터",
];

// ─── 게스트 홈 ───────────────────────────────────────────────
function GuestHomeView() {
  return (
    <div className="min-h-screen bg-sakura-blush">
      {/* Header — 멤버 홈과 동일한 브랜드 헤더 */}
      <div className="bg-canvas-almond px-5 pt-10 pb-6 border-b-4 border-black">
        <div className="flex items-start justify-between mb-5">
          <div className="wobbly-2 bg-paper-white rounded-[30px] border-2 border-black px-5 py-3 shadow-[0px_0px_0px_3px_#ffd80c]">
            <p className="text-[10px] font-black text-type-black/40 tracking-[0.2em] uppercase mb-0.5">
              Japanese Learning
            </p>
            <h1 className="text-[28px] font-black text-type-black leading-none tracking-tight">
              시바 일본어
            </h1>
          </div>
 <ShibaAvatar level={1} size={56} sticker wobble="wobbly-3" className="-mt-3 -ml-6 relative z-10" />
        </div>
        <p className="text-type-black/70 text-sm font-bold">
          로그인 없이 학습을 시작해보세요! 👋
        </p>
      </div>

      <div className="px-5 py-5 flex flex-col gap-[30px]">
        {/* 회원가입 유도 배너 */}
        <GuestSignupBanner />

        {/* 학습 시작 카드 */}
        <div>
          <h2 className="font-black text-type-black text-sm mb-3">지금 바로 학습하기 📚</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/keigo"
              className="bg-grape-punch wobbly-2 rounded-[15px] p-5 border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="font-black text-white text-sm">경어 레슨</h3>
              <p className="text-xs text-white/70 font-bold mt-1">30개 레슨 무료</p>
              <div className="mt-3 bg-paper-white text-type-black text-xs font-black px-3 py-1.5 rounded-xl inline-block border-2 border-black">
                학습하기
              </div>
            </Link>

            <Link
              href="/diary/learn"
              className="bg-sakura-pink wobbly-4 rounded-[15px] p-5 border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              <div className="text-4xl mb-3">📖</div>
              <h3 className="font-black text-type-black text-sm">학습 일기</h3>
              <p className="text-xs text-type-black/60 font-bold mt-1">100개 일기 무료</p>
              <div className="mt-3 bg-paper-white text-type-black text-xs font-black px-3 py-1.5 rounded-xl inline-block border-2 border-black">
                읽어보기
              </div>
            </Link>
          </div>
        </div>

        {/* 회원 전용 기능 안내 */}
        <div className="bg-paper-white rounded-[15px] border-2 border-black shadow-[4px_4px_0px_0px_#000] overflow-hidden">
          <div className="px-5 py-3 bg-canvas-almond border-b-2 border-black">
            <h2 className="font-black text-type-black text-sm">가입하면 생기는 것들 ✨</h2>
          </div>
          {[
            { icon: "📝", label: "일기 쓰기", desc: "매일 일본어 일기 작성 +10 XP" },
            { icon: "⚡", label: "XP & 레벨", desc: "학습할수록 레벨이 올라요" },
            { icon: "⭐", label: "스탬프 수집", desc: "레슨 완료마다 스탬프 획득" },
            { icon: "👗", label: "아바타 꾸미기", desc: "스탬프로 시바를 코디해요" },
          ].map((item, i, arr) => (
            <div
              key={item.label}
              className={`flex items-center gap-4 px-5 py-3.5 ${i < arr.length - 1 ? "border-b-2 border-black" : ""}`}
            >
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="text-sm font-black text-type-black">{item.label}</p>
                <p className="text-xs text-type-black/60 font-bold">{item.desc}</p>
              </div>
            </div>
          ))}
          <div className="px-5 py-4 bg-sakura-blush">
            <Link
              href="/login?mode=signup"
              className="w-full flex items-center justify-center gap-2 bg-sakura-pink text-type-black font-black text-sm py-3 rounded-[15px] border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
            >
              무료로 가입하기 →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 멤버 홈 ─────────────────────────────────────────────────
export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return <GuestHomeView />;
  }

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
  const name = profile?.name ?? session.user.name ?? "학습자";

  return (
    <div className="min-h-screen bg-sakura-blush">
      {/* Header */}
      <div className="bg-canvas-almond px-5 pt-10 pb-6 border-b-4 border-black">
        <div className="flex items-start justify-between mb-5">
          <div className="wobbly-2 bg-paper-white rounded-[30px] border-2 border-black px-5 py-3 shadow-[0px_0px_0px_3px_#ffd80c]">
            <p className="text-[10px] font-black text-type-black/40 tracking-[0.2em] uppercase mb-0.5">
              Japanese Learning
            </p>
            <h1 className="text-[28px] font-black text-type-black leading-none tracking-tight">
 시바 일본어
 </h1>
 </div>
 <ShibaAvatar level={level} size={56} sticker wobble="wobbly-3" className="-mt-3 -ml-6 relative z-10" />
 </div>

 <div className="mb-4">
 <p className="text-type-black/60 text-sm font-bold">안녕하세요!</p>
          <h2 className="text-xl font-black text-type-black">{name} 님 👋</h2>
        </div>

        {/* XP card */}
        <div className="bg-paper-white rounded-[15px] p-4 border-2 border-black shadow-[4px_4px_0px_0px_#000]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="bg-grape-punch text-white text-xs font-black px-3 py-1 rounded-full border-2 border-black">
                Lv.{level}
              </span>
              <span className="text-sm font-black text-type-black">
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

      <div className="px-5 py-5 flex flex-col gap-[30px]">
        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "일기", value: diaries.length, icon: "📖", href: "/diary", bg: "bg-sakura-pink", wobble: "wobbly-1" },
            { label: "스탬프", value: progress?.totalStamps ?? 0, icon: "⭐", href: "/sticker-board", bg: "bg-shiba-orange", wobble: "wobbly-3" },
            { label: "경어", value: keigoCount, icon: "🎯", href: "/keigo", bg: "bg-grape-punch", wobble: "wobbly-5" },
          ].map((stat) => (
            <Link
              key={stat.label}
              href={stat.href}
              className={`${stat.bg} ${stat.wobble} rounded-[15px] p-3 text-center border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all`}
            >
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-xl font-black text-type-black">{stat.value}</div>
              <div className="text-xs font-black text-type-black/70">{stat.label}</div>
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
        <div className="bg-paper-white rounded-[15px] overflow-hidden border-2 border-black shadow-[4px_4px_0px_0px_#000]">
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
                <p className="text-sm font-black text-type-black">{item.label}</p>
                <p className="text-xs text-type-black/60 font-bold">{item.desc}</p>
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
