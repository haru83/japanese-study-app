import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUserProfile } from "@/actions/user";
import { xpProgress, xpForNextLevel, LEVEL_THRESHOLDS, MAX_LEVEL } from "@/lib/xp";

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
    <main className="flex flex-col gap-5 w-full overflow-hidden pt-4 pb-6">
      {/* Header */}
      <header className="flex items-center justify-between px-4">
        <div className="w-10" />
        <h1 className="text-lg font-bold text-text-main dark:text-text-main-dark">프로필</h1>
        <div className="flex gap-2">
          {session.user.role === "admin" && (
            <Link
              href="/admin/dashboard"
              className="px-3 py-1.5 rounded-full bg-red-100 hover:bg-red-200 dark:bg-red-900/30 transition-colors text-red-600 dark:text-red-400 text-xs font-bold flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">admin_panel_settings</span>
              관리자
            </Link>
          )}
          <Link
            href="/settings"
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-text-main dark:text-text-main-dark"
          >
            <span className="material-symbols-outlined text-2xl">settings</span>
          </Link>
        </div>
      </header>

      {/* Avatar */}
      <section className="flex flex-col items-center px-6">
        <div className="relative">
          <div className="w-28 h-28 rounded-full border-4 border-white dark:border-background-dark shadow-lg bg-primary/10 overflow-hidden relative z-10">
            <Image src={displayImage} alt="Avatar" fill className="object-cover" />
          </div>
        </div>
        <div className="mt-3 text-center">
          <h2 className="text-xl font-bold text-text-main dark:text-text-main-dark flex items-center justify-center gap-1">
            {displayName}
            <span
              className="material-symbols-outlined text-yellow-500 text-xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified
            </span>
          </h2>
          <p className="text-primary text-sm font-medium mt-1">
            {LEVEL_TITLES[level - 1]} · Lv.{level}
          </p>
        </div>
      </section>

      {/* XP Bar */}
      <section className="px-5">
        <div className="bg-white dark:bg-surface-dark rounded-2xl p-4 shadow-sm border border-orange-50 dark:border-border-dark">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-bold text-text-main dark:text-text-main-dark">
              레벨 {level}
            </span>
            <span className="text-text-sub dark:text-text-sub-dark">
              {xp} / {level < MAX_LEVEL ? nextXp : LEVEL_THRESHOLDS[MAX_LEVEL - 1]} XP
            </span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-border-dark rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-amber-400 rounded-full transition-all duration-1000"
              style={{ width: `${xpPercent}%` }}
            />
          </div>
          {level < MAX_LEVEL && (
            <p className="text-xs text-text-sub dark:text-text-sub-dark mt-1.5 text-right">
              다음 레벨까지 {nextXp - xp} XP
            </p>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="px-5">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "총 XP", value: xp, icon: "⚡", color: "bg-amber-100 text-amber-600" },
            { label: "스탬프", value: stamps, icon: "⭐", color: "bg-yellow-100 text-yellow-600" },
            { label: "경어 레슨", value: keigoCount, icon: "🎯", color: "bg-pink-100 text-pink-600" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white dark:bg-surface-dark p-3 rounded-2xl shadow-sm border border-orange-50 dark:border-border-dark flex flex-col items-center gap-1.5"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-lg ${stat.color}`}>
                {stat.icon}
              </div>
              <p className="text-xs text-text-sub dark:text-text-sub-dark font-medium">{stat.label}</p>
              <p className="text-lg font-bold text-text-main dark:text-text-main-dark">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Menu */}
      <section className="px-5">
        <div className="bg-white dark:bg-surface-dark rounded-2xl overflow-hidden shadow-sm border border-orange-50 dark:border-border-dark">
          {[
            { href: "/wardrobe", icon: "checkroom", label: "옷장", desc: "시바견 코디하기" },
            { href: "/sticker-board", icon: "stars", label: "스티커 보드", desc: `${stamps}개 보유` },
            { href: "/learning/grammar", icon: "menu_book", label: "문법 정리", desc: "경어 문법 모음" },
            { href: "/learning/vocabulary", icon: "translate", label: "어휘 목록", desc: "경어 필수 어휘" },
          ].map((item, i, arr) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-5 py-4 hover:bg-gray-50 dark:hover:bg-border-dark/50 transition-colors ${
                i < arr.length - 1 ? "border-b border-gray-50 dark:border-border-dark" : ""
              }`}
            >
              <span className="material-symbols-outlined text-primary">{item.icon}</span>
              <div className="flex-1">
                <p className="font-medium text-text-main dark:text-text-main-dark text-sm">
                  {item.label}
                </p>
                <p className="text-xs text-text-sub dark:text-text-sub-dark">{item.desc}</p>
              </div>
              <span className="material-symbols-outlined text-text-sub text-sm">
                chevron_right
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
