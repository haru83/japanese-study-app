import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUserProfile, getUserStudyDates } from "@/actions/user";
import { getWardrobeItems } from "@/actions/wardrobe";
import { xpProgress, xpForNextLevel, MAX_LEVEL, LEVEL_THRESHOLDS } from "@/lib/xp";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ShibaAvatar } from "@/components/mascot/ShibaAvatar";
import NicknameEditor from "./NicknameEditor";
import { LogoutButton } from "./LogoutButton";
import { LearningCalendar } from "@/components/profile/LearningCalendar";

const LEVEL_TITLES = [
  "초보 학습자",
  "입문자",
  "기초 완료",
  "중급자",
  "상급자",
  "경어 마스터",
];

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  const [profile, { items, equippedIds }, studyDates] = await Promise.all([
    getUserProfile(),
    getWardrobeItems(),
    getUserStudyDates(),
  ]);

  const progress = profile?.progress;
  const level = progress?.level ?? 1;
  const activeCharacter = progress?.activeCharacter ?? "shiba";
  const xp = progress?.xp ?? 0;
  const xpPercent = xpProgress(xp, level);
  const nextXp = xpForNextLevel(level);
  const stamps = progress?.totalStamps ?? 0;
  const name = profile?.name ?? session.user.name ?? "학습자";
  const isAdmin = (session.user as { role?: string }).role === "admin";

  const equippedItems = items.filter((i) => equippedIds.includes(i.id));

  return (
    <div className="min-h-screen bg-sakura-blush">
      {/* Header */}
      <div className="bg-canvas-almond px-5 pt-10 pb-6 border-b-4 border-black">
        <h2 className="text-xl font-black text-type-black mb-5">내 프로필 ⚙️</h2>

        {/* 아바타 + 닉네임 */}
        <div className="flex items-center gap-4 mb-5">
          <ShibaAvatar
            characterId={activeCharacter}
            level={level}
            size={72}
            sticker
            wobble="wobbly-3"
            equippedItemIds={equippedIds}
            className="shrink-0"
          />
          <div className="flex-1 min-w-0">
            <NicknameEditor currentName={name} />
            <div className="flex items-center gap-2 mt-1.5">
              <span className="bg-grape-punch text-white text-xs font-black px-3 py-1 rounded-full border-2 border-black">
                Lv.{level}
              </span>
              <span className="text-sm font-black text-type-black">
                {LEVEL_TITLES[level - 1]}
              </span>
            </div>
          </div>
        </div>

        {/* XP bar */}
        <div className="bg-paper-white rounded-[15px] p-3 border-2 border-black shadow-[4px_4px_0px_0px_#000]">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm font-black text-type-black">XP</span>
            <span className="text-xs font-bold text-type-black/60">
              {xp} / {level < MAX_LEVEL ? nextXp : LEVEL_THRESHOLDS[MAX_LEVEL - 1]}
            </span>
          </div>
          <ProgressBar value={xpPercent} />
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-xs font-bold text-type-black/50">⭐ 스탬프 {stamps}개</span>
            <Link href="/shop" className="text-xs font-black text-grape-punch">상점에서 사용 →</Link>
          </div>
        </div>
      </div>

      <div className="px-5 py-5 flex flex-col gap-[24px]">
        {/* ── 아바타 코디 ── */}
        <section>
          <h2 className="font-black text-type-black text-sm mb-3">아바타 코디 👗</h2>
          <div className="bg-paper-white rounded-[15px] border-2 border-black shadow-[4px_4px_0px_0px_#000] overflow-hidden">
            {/* 현재 착용 아이템 */}
            <div className="px-5 py-3 bg-canvas-almond border-b-2 border-black">
              <p className="text-xs font-black text-type-black/60">
                현재 착용 중 ({equippedItems.length}개)
              </p>
            </div>
            {equippedItems.length > 0 ? (
              <div className="px-5 py-3 flex flex-wrap gap-2">
                {equippedItems.map((item) => (
                  <span
                    key={item.id}
                    className="bg-sakura-pink text-type-black text-xs font-black px-3 py-1.5 rounded-full border-2 border-black"
                  >
                    {item.icon} {item.name}
                  </span>
                ))}
              </div>
            ) : (
              <div className="px-5 py-4">
                <p className="text-sm text-type-black/50 font-bold">아직 착용한 아이템이 없어요</p>
              </div>
            )}
            <div className="px-5 py-4 bg-sakura-blush flex gap-3">
              <Link
                href="/wardrobe"
                className="flex-1 flex items-center justify-center gap-2 bg-grape-punch text-white font-black text-sm py-3 rounded-[15px] border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
              >
                🎒 옷장
              </Link>
              <Link
                href="/shop"
                className="flex-1 flex items-center justify-center gap-2 bg-shiba-orange text-type-black font-black text-sm py-3 rounded-[15px] border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
              >
                🛒 상점
              </Link>
            </div>
          </div>
        </section>

        {/* ── 월별 학습 히트맵 ── */}
        <section className="mb-6">
          <h2 className="font-black text-type-black text-sm mb-3">학습 캘린더 📅</h2>
          <LearningCalendar
            studyDates={studyDates}
            streakDays={progress?.streakDays ?? 0}
          />
        </section>

        {/* ── 도전 과제 & 업적 ── */}
        <section className="mb-6">
          <h2 className="font-black text-type-black text-sm mb-3">도전 과제 & 업적 🏆</h2>
          <div className="bg-paper-white rounded-[15px] border-2 border-black shadow-[4px_4px_0px_0px_#000] p-4">
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { icon: "🐶", title: "첫 걸음", unlocked: true },
                { icon: "🗣️", title: "경어 입문", unlocked: (profile?.keigoProgress?.length ?? 0) > 0 },
                { icon: "📝", title: "일기 작가", unlocked: (profile?.diaries?.length ?? 0) > 0 },
                { icon: "🔥", title: "연속 학습자", unlocked: (progress?.streakDays ?? 0) >= 3 },
                { icon: "👗", title: "패셔니스타", unlocked: equippedItems.length > 0 },
                { icon: "⚡", title: "복습 마스터", unlocked: level >= 2 },
              ].map((ach) => (
                <div
                  key={ach.title}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 border-black text-center transition-all ${
                    ach.unlocked
                      ? "bg-sakura-pink/40 shadow-[2px_2px_0px_0px_#000]"
                      : "bg-gray-100 opacity-40 grayscale"
                  }`}
                >
                  <span className="text-2xl mb-1">{ach.icon}</span>
                  <span className="text-[11px] font-black text-type-black truncate max-w-full">
                    {ach.title}
                  </span>
                  <span className="text-[9px] font-bold text-type-black/60 mt-0.5">
                    {ach.unlocked ? "달성!" : "미달성"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 학습 자료 ── */}
        <section>
          <h2 className="font-black text-type-black text-sm mb-3">학습 자료 📚</h2>
          <div className="bg-paper-white rounded-[15px] border-2 border-black shadow-[4px_4px_0px_0px_#000] overflow-hidden">
            {[
              { icon: "📚", label: "문법 가이드", href: "/learning/grammar", desc: "N5~N1 문법 정리" },
              { icon: "🔤", label: "어휘 목록", href: "/learning/vocabulary", desc: "레슨별 단어장" },
            ].map((item, i, arr) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-4 px-5 py-4 ${i < arr.length - 1 ? "border-b-2 border-black" : ""} hover:bg-sakura-blush/50 transition-colors`}
              >
                <span className="text-2xl">{item.icon}</span>
                <div className="flex-1">
                  <p className="text-sm font-black text-type-black">{item.label}</p>
                  <p className="text-xs text-type-black/60 font-bold">{item.desc}</p>
                </div>
                <span className="text-type-black/30">→</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── 설정 및 계정 ── */}
        <section>
          <h2 className="font-black text-type-black text-sm mb-3">설정 및 계정 🔧</h2>
          <div className="bg-paper-white rounded-[15px] border-2 border-black shadow-[4px_4px_0px_0px_#000] overflow-hidden">
            {isAdmin && (
              <Link
                href="/admin"
                className="flex items-center gap-4 px-5 py-4 border-b-2 border-black hover:bg-sakura-blush/50 transition-colors"
              >
                <span className="text-2xl">🛡️</span>
                <div className="flex-1">
                  <p className="text-sm font-black text-type-black">관리자 페이지</p>
                  <p className="text-xs text-type-black/60 font-bold">콘텐츠 및 사용자 관리</p>
                </div>
                <span className="text-type-black/30">→</span>
              </Link>
            )}
            <div className="flex items-center gap-4 px-5 py-4 border-b-2 border-black">
              <span className="text-2xl">🐶</span>
              <div className="flex-1">
                <p className="text-sm font-black text-type-black">앱 정보</p>
                <p className="text-xs text-type-black/60 font-bold">왕왕 일본어 v1.0.0</p>
              </div>
            </div>
            <LogoutButton />
          </div>
        </section>
      </div>
    </div>
  );
}
