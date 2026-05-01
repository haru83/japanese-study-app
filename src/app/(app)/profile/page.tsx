import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUserProfile } from "@/actions/user";
import { xpProgress, xpForNextLevel, LEVEL_THRESHOLDS, MAX_LEVEL } from "@/lib/xp";
import { ProgressBar } from "@/components/ui/ProgressBar";

const LEVEL_TITLES = [
  "초보 학습자",
  "입문자",
  "기초 완료",
  "중급자",
  "상급자",
  "경어 마스터",
];

const FALLBACK_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAGwOcxC8d-qDmbHcfaSkGb0g9yCg4VybW6npBHBXeQyvDzi4h03eicKMKGEx4uG5g7j97IyArLz9HZgUnTD0VlLqFGKX6dL0DNJE3vS9XT_3uwT7uybVa4QnWGk5VKu43-E-jNRE3tFpxMx_bewI4l-m8Z-B0zsNu8TN3Hks6mdB4XZHoNBtXeVUZBCTqhcCR8rUV8_3LhL9cvU4vR8YfG5H43UrKLIRmtZdTwyVNbgqo8udbHaEImoEsXssW4vygE3TeB0f7iCYFT";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const profile = await getUserProfile();
  const progress = profile?.progress;
  const keigoCount = profile?.keigoProgress?.length ?? 0;

  const level = progress?.level ?? 1;
  const xp = progress?.xp ?? 0;
  const stamps = progress?.totalStamps ?? 0;
  const xpPercent = xpProgress(xp, level);
  const nextXp = xpForNextLevel(level);
  const displayName = profile?.name ?? session.user.name ?? "학습자";
  const displayImage = session.user.image ?? FALLBACK_AVATAR;

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
            <Image src={displayImage} alt="Avatar" fill className="object-cover" />
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
            { href: "/sticker-board", icon: "stars", label: "스티커 보드", desc: `${stamps}개 보유` },
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
