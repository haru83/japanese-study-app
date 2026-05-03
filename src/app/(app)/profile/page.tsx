import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUserProfile } from "@/actions/user";
import { getWardrobeItems } from "@/actions/wardrobe";
import { xpProgress, xpForNextLevel, LEVEL_THRESHOLDS, MAX_LEVEL } from "@/lib/xp";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ShibaAvatar } from "@/components/mascot/ShibaAvatar";

const LEVEL_TITLES = [
  "초보 학습자",
  "입문자",
  "기초 완료",
  "중급자",
  "상급자",
  "경어 마스터",
];

// ─── 게스트 프로필 ────────────────────────────────────────────
function GuestProfileView() {
  return (
    <main className="flex flex-col gap-5 w-full overflow-hidden pt-4 pb-6 bg-sakura-blush min-h-screen">
      <header className="flex items-center justify-center px-4">
        <h1 className="text-lg font-black text-type-black">프로필</h1>
      </header>

  {/* Guest avatar */}
  <section className="flex flex-col items-center px-6">
    <div className="w-28 h-28 rounded-full border-4 border-black shadow-[6px_6px_0px_0px_#000] bg-canvas-almond flex items-center justify-center overflow-hidden">
      <ShibaAvatar level={1} size={104} circular />
    </div>
        <div className="mt-3 text-center">
          <h2 className="text-xl font-black text-type-black">게스트 학습자</h2>
          <p className="text-type-black/60 text-sm font-bold mt-1">
            아직 계정이 없어요
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="px-5">
        <p className="text-center text-sm font-bold text-type-black/70 mb-4">
          가입하면 이런 기능을 이용할 수 있어요!
        </p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: "📈", label: "레벨 UP", desc: "학습할수록\n레벨이 올라요", bg: "bg-sakura-pink", wobble: "wobbly-1" },
            { icon: "⭐", label: "스탬프", desc: "레슨 완료마다\n획득해요", bg: "bg-shiba-orange", wobble: "wobbly-3" },
            { icon: "👗", label: "아바타", desc: "스탬프로\n시바 코디", bg: "bg-grape-punch", wobble: "wobbly-5" },
          ].map((item) => (
            <div
              key={item.label}
              className={`${item.bg} ${item.wobble} p-3 rounded-[15px] border-2 border-black shadow-[4px_4px_0px_0px_#000] flex flex-col items-center gap-1.5`}
            >
              <div className="text-2xl">{item.icon}</div>
              <p className="text-xs font-black text-type-black">{item.label}</p>
              <p className="text-[10px] font-bold text-type-black/70 text-center whitespace-pre-line leading-tight">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Also: diary feature */}
      <section className="px-5">
        <div className="bg-paper-white rounded-[15px] border-2 border-black shadow-[4px_4px_0px_0px_#000] p-5 flex items-center gap-4 wobbly-2">
          <span className="text-4xl">📝</span>
          <div>
            <p className="font-black text-type-black">일기 쓰기</p>
            <p className="text-xs text-type-black/60 font-bold mt-0.5">
              매일 일본어 일기를 쓰고 XP를 모아요
            </p>
          </div>
        </div>
      </section>

      {/* CTAs */}
      <section className="px-5 flex flex-col gap-3">
        <Link
          href="/login?mode=signup"
          className="w-full flex items-center justify-center gap-2 bg-sakura-pink text-type-black font-black py-4 rounded-[15px] border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
        >
          무료로 가입하기 →
        </Link>
        <Link
          href="/login"
          className="w-full flex items-center justify-center gap-2 bg-canvas-almond text-type-black font-black py-3.5 rounded-[15px] border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
        >
          로그인하기
        </Link>
      </section>
    </main>
  );
}

// ─── 멤버 프로필 ──────────────────────────────────────────────
export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return <GuestProfileView />;
  }

 const profile = await getUserProfile();
 const { equippedIds } = await getWardrobeItems();
 const progress = profile?.progress;
 const keigoCount = profile?.keigoProgress?.length ?? 0;

  const level = progress?.level ?? 1;
  const xp = progress?.xp ?? 0;
  const stamps = progress?.totalStamps ?? 0;
  const xpPercent = xpProgress(xp, level);
  const nextXp = xpForNextLevel(level);
 const displayName = profile?.name ?? session.user.name ?? "학습자";

 return (
    <main className="flex flex-col gap-5 w-full overflow-hidden pt-4 pb-6 bg-sakura-blush min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between px-4">
        <div className="w-10" />
        <h1 className="text-lg font-black text-type-black">프로필</h1>
        <div className="flex gap-2">
          {session.user.role === "admin" && (
            <Link
              href="/admin/dashboard"
              className="px-3 py-1.5 rounded-full bg-red-400 hover:bg-red-500 transition-colors text-white text-xs font-black flex items-center gap-1 border-2 border-black shadow-[2px_2px_0px_0px_#000]"
            >
              <span className="material-symbols-outlined text-sm">admin_panel_settings</span>
              관리자
            </Link>
          )}
          <Link
            href="/settings"
            className="p-2 rounded-full border-2 border-black bg-paper-white shadow-[2px_2px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] transition-all text-type-black"
          >
            <span className="material-symbols-outlined text-2xl">settings</span>
          </Link>
        </div>
      </header>

  {/* Avatar sticker */}
  <section className="flex flex-col items-center px-6">
    <div className="relative">
      <div className="w-28 h-28 rounded-full border-4 border-black shadow-[6px_6px_0px_0px_#000] bg-canvas-almond overflow-hidden relative z-10">
        <ShibaAvatar level={level} size={112} circular equippedItemIds={equippedIds} />
      </div>
    </div>
        <div className="mt-3 text-center">
          <h2 className="text-xl font-black text-type-black flex items-center justify-center gap-1">
            {displayName}
            <span
              className="material-symbols-outlined text-shiba-orange text-xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified
            </span>
          </h2>
          <p className="text-grape-punch text-sm font-black mt-1">
            {LEVEL_TITLES[level - 1]} · Lv.{level}
          </p>
        </div>
      </section>

      {/* XP Bar */}
      <section className="px-5">
        <div className="bg-paper-white rounded-2xl p-4 border-2 border-black shadow-[4px_4px_0px_0px_#000]">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-black text-type-black">레벨 {level}</span>
            <span className="text-type-black/60 font-bold">
              {xp} / {level < MAX_LEVEL ? nextXp : LEVEL_THRESHOLDS[MAX_LEVEL - 1]} XP
            </span>
          </div>
          <ProgressBar value={xpPercent} />
          {level < MAX_LEVEL && (
            <p className="text-xs text-type-black/60 font-bold mt-1.5 text-right">
              다음 레벨까지 {nextXp - xp} XP
            </p>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="px-5">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "총 XP", value: xp, icon: "⚡", bg: "bg-shiba-orange", wobble: "wobbly-1" },
            { label: "스탬프", value: stamps, icon: "⭐", bg: "bg-sakura-pink", wobble: "wobbly-3" },
            { label: "경어 레슨", value: keigoCount, icon: "🎯", bg: "bg-grape-punch", wobble: "wobbly-5" },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`${stat.bg} ${stat.wobble} p-3 rounded-[15px] border-2 border-black shadow-[4px_4px_0px_0px_#000] flex flex-col items-center gap-1.5`}
            >
              <div className="text-2xl">{stat.icon}</div>
              <p className="text-xs text-type-black font-black">{stat.label}</p>
              <p className="text-lg font-black text-type-black">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Menu */}
      <section className="px-5">
        <div className="bg-paper-white rounded-2xl overflow-hidden border-2 border-black shadow-[4px_4px_0px_0px_#000]">
          {[
            { href: "/wardrobe", icon: "checkroom", label: "옷장", desc: "시바견 코디하기" },
            { href: "/shop", icon: "storefront", label: "상점", desc: `⭐ ${stamps} 스탬프로 구매` },
            { href: "/learning/grammar", icon: "menu_book", label: "문법 정리", desc: "경어 문법 모음" },
            { href: "/learning/vocabulary", icon: "translate", label: "어휘 목록", desc: "경어 필수 어휘" },
          ].map((item, i, arr) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-5 py-4 hover:bg-sakura-blush transition-colors ${
                i < arr.length - 1 ? "border-b-2 border-black" : ""
              }`}
            >
              <span className="material-symbols-outlined text-sakura-pink">{item.icon}</span>
              <div className="flex-1">
                <p className="font-black text-type-black text-sm">{item.label}</p>
                <p className="text-xs text-type-black/60 font-bold">{item.desc}</p>
              </div>
              <span className="material-symbols-outlined text-type-black/40 text-sm">chevron_right</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
