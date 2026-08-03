import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUserProfile } from "@/actions/user";
import { getWardrobeItems } from "@/actions/wardrobe";
import { getDiaries } from "@/actions/diary";
import { getLearningProgress, getWordOfTheDay } from "@/actions/stats";
import { getDailyQuests } from "@/actions/quest";
import { getChallengeSummary } from "@/actions/dailyChallenge";
import { xpProgress, xpForNextLevel, MAX_LEVEL, LEVEL_THRESHOLDS } from "@/lib/xp";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { GuestSignupBanner } from "@/components/guest/GuestSignupBanner";
import { ShibaAvatar } from "@/components/mascot/ShibaAvatar";
import { DailyQuestPanel } from "@/components/quest/DailyQuestPanel";
import { WordOfTheDayCard } from "@/components/wotd/WordOfTheDayCard";

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
      {/* Header */}
      <div className="bg-canvas-almond px-5 pt-10 pb-6 border-b-4 border-black">
        <div className="flex items-start justify-between mb-5">
          <div className="wobbly-2 bg-paper-white rounded-[30px] border-2 border-black px-5 py-3 shadow-[0px_0px_0px_3px_#ffd80c]">
            <p className="text-[10px] font-black text-type-black/40 tracking-[0.2em] uppercase mb-0.5">
              Japanese Learning
            </p>
            <h1 className="text-[28px] font-black text-type-black leading-none tracking-tight">
              왕왕 일본어
            </h1>
          </div>
          <ShibaAvatar level={1} size={56} sticker wobble="wobbly-3" className="-mt-3 -ml-6 relative z-10" />
        </div>
        <p className="text-type-black/70 text-sm font-bold">
          로그인 없이 학습을 시작해보세요! 👋
        </p>
      </div>

      <div className="px-5 py-5 flex flex-col gap-[30px]">
        <GuestSignupBanner />

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

        <div className="bg-paper-white rounded-[15px] border-2 border-black shadow-[4px_4px_0px_0px_#000] overflow-hidden">
          <div className="px-5 py-3 bg-canvas-almond border-b-2 border-black">
            <h2 className="font-black text-type-black text-sm">가입하면 생기는 것들 ✨</h2>
          </div>
          {[
            { icon: "📝", label: "일기 쓰기", desc: "매일 일본어 일기 작성 +10 XP" },
            { icon: "⚡", label: "XP & 레벨", desc: "학습할수록 레벨이 올라요" },
            { icon: "⭐", label: "스탬프 수집", desc: "레슨 완료마다 스탬프 획득" },
            { icon: "👗", label: "아바타 꾸미기", desc: "스탬프로 왕왕이를 코디해요" },
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

// ─── 진행률 바 컴포넌트 ────────────────────────────────────────
function ProgressSection({
  title,
  icon,
  completed,
  total,
  nextTitle,
  href,
  accent,
}: {
  title: string;
  icon: string;
  completed: number;
  total: number;
  nextTitle: string | null;
  href: string;
  accent: string;
}) {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
  const isDone = completed >= total && total > 0;

  return (
    <Link
      href={href}
      className={`bg-paper-white rounded-[15px] p-4 border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all block`}
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">{icon}</span>
          <span className="font-black text-type-black text-sm">{title}</span>
        </div>
        <span className={`text-xs font-black ${accent}`}>
          {completed}/{total}
        </span>
      </div>

      {/* 진행률 바 */}
      <div className="w-full h-3 bg-sakura-blush rounded-full border border-black/20 overflow-hidden mb-2">
        <div
          className="h-full bg-grape-punch rounded-full transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* 다음 학습 안내 */}
      {isDone ? (
        <p className="text-xs font-bold text-type-black/50">🎉 모두 완료!</p>
      ) : nextTitle ? (
        <p className="text-xs font-bold text-type-black/70">
          다음 → <span className="font-black text-type-black">{nextTitle}</span>
        </p>
      ) : (
        <p className="text-xs font-bold text-type-black/50">시작해보세요!</p>
      )}
    </Link>
  );
}

// ─── 멤버 홈 ─────────────────────────────────────────────────
export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return <GuestHomeView />;
  }

  const [profile, diaries, { equippedIds }, learning, quests, challengeSummary, wordOfTheDay] = await Promise.all([
    getUserProfile(),
    getDiaries(),
    getWardrobeItems(),
    getLearningProgress(),
    getDailyQuests(),
    getChallengeSummary(),
    getWordOfTheDay(),
  ]);

  const progress = profile?.progress;
  const level = progress?.level ?? 1;
  const xp = progress?.xp ?? 0;
  const xpPercent = xpProgress(xp, level);
  const nextXp = xpForNextLevel(level);
  const stamps = progress?.totalStamps ?? 0;
  const streakDays = learning?.streakDays ?? 0;
  const name = profile?.name ?? session.user.name ?? "학습자";

  return (
    <div className="min-h-screen bg-sakura-blush">
      {/* Header — 인사 + XP + 스트릭 */}
      <div className="bg-canvas-almond px-5 pt-10 pb-6 border-b-4 border-black">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="text-type-black/60 text-sm font-bold">안녕하세요!</p>
            <h2 className="text-xl font-black text-type-black">{name} 님 👋</h2>
          </div>
          <ShibaAvatar level={level} size={56} sticker wobble="wobbly-3" className="-mt-3 -ml-6 relative z-10" equippedItemIds={equippedIds} />
        </div>

        {/* XP bar */}
        <div className="bg-paper-white rounded-[15px] p-3 border-2 border-black shadow-[4px_4px_0px_0px_#000]">
          <div className="flex items-center justify-between mb-1.5">
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

        {/* 스트릭 배지 */}
        {streakDays > 0 && (
          <div className="mt-3 flex items-center gap-2 bg-shiba-orange/30 rounded-full px-3 py-1.5 w-fit border border-black/20">
            <span className="text-sm">🔥</span>
            <span className="text-xs font-black text-type-black">{streakDays}일 연속 학습 중!</span>
          </div>
        )}
      </div>

      <div className="px-5 py-5 flex flex-col gap-[24px]">
        {/* ── 오늘의 퀘스트 ── */}
        {quests.length > 0 && (
          <section>
            <DailyQuestPanel quests={quests} summary={challengeSummary} />
          </section>
        )}

        {/* ── 오늘의 단어 ── */}
        {wordOfTheDay && (
          <section>
            <WordOfTheDayCard
              word={wordOfTheDay.word}
              reading={wordOfTheDay.reading}
              meaning={wordOfTheDay.meaning}
              source={wordOfTheDay.source}
              sourceId={wordOfTheDay.sourceId}
              sourceType={wordOfTheDay.sourceType}
            />
          </section>
        )}

        {/* ── 학습 진행 상황 ── */}
        <section>
          <h2 className="font-black text-type-black text-sm mb-3">학습 진행 상황 📊</h2>
          <div className="flex flex-col gap-3">
            <ProgressSection
              title="경어 레슨"
              icon="🎯"
              completed={learning?.keigoCompleted ?? 0}
              total={learning?.keigoTotal ?? 0}
              nextTitle={learning?.keigoNextTitle ?? null}
              href={learning?.keigoNextId ? `/keigo/${learning.keigoNextId}` : "/keigo"}
              accent="text-grape-punch"
            />
            <ProgressSection
              title="학습 일기"
              icon="📖"
              completed={learning?.learningDiaryCompleted ?? 0}
              total={learning?.learningDiaryTotal ?? 0}
              nextTitle={learning?.learningDiaryNextTitle ?? null}
              href={learning?.learningDiaryNextId ? `/diary/learn/${learning.learningDiaryNextId}` : "/diary/learn"}
              accent="text-sakura-pink"
            />
          </div>
        </section>

        {/* ── 오늘 할 일 ── */}
        <section>
          <h2 className="font-black text-type-black text-sm mb-3">오늘 할 일 ✏️</h2>
          <div className="flex flex-col gap-3">
            <Link
              href="/learning/review"
              className="bg-matcha-green wobbly-1 rounded-[15px] p-4 border-2 border-black shadow-[4px_4px_0px_0px_#000] flex items-center justify-between hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="text-3xl bg-paper-white p-2 rounded-xl border-2 border-black shrink-0">
                  ⚡
                </div>
                <div>
                  <h3 className="font-black text-type-black text-sm">SRS 플래시카드 복습</h3>
                  <p className="text-xs text-type-black/70 font-bold mt-0.5">
                    수집된 어휘를 망각 곡선에 맞춰 복습해요
                  </p>
                </div>
              </div>
              <span className="bg-paper-white text-type-black text-xs font-black px-3 py-1.5 rounded-xl border-2 border-black shrink-0">
                복습하기
              </span>
            </Link>

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
          </div>
        </section>

        {/* ── 빠른 현황 (4칸) ── */}
        <section>
          <h2 className="font-black text-type-black text-sm mb-3">나의 현황 📈</h2>
          <div className="grid grid-cols-2 gap-3">
            <StatBox
              icon="✍️"
              label="작성 일기"
              value={diaries.length}
              bg="bg-sakura-pink"
              wobble="wobbly-1"
              href="/diary"
            />
            <StatBox
              icon="⭐"
              label="스탬프"
              value={stamps}
              bg="bg-shiba-orange"
              wobble="wobbly-3"
              href="/shop"
            />
            <StatBox
              icon="🔤"
              label="복습 단어"
              value={learning?.vocabTotal ?? 0}
              bg="bg-canvas-almond"
              wobble="wobbly-2"
              href="/learning/review"
              sub={learning && learning.vocabDueToday > 0 ? `오늘 ${learning.vocabDueToday}개` : undefined}
            />
            <StatBox
              icon="🏆"
              label="마스터 단어"
              value={learning?.vocabMastered ?? 0}
              bg="bg-paper-white"
              wobble="wobbly-5"
              href="/learning/vocabulary"
            />
          </div>
        </section>

        {/* ── 최근 일기 ── */}
        {diaries.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-black text-type-black text-sm">최근 일기 📝</h2>
              <Link href="/diary" className="text-xs font-black text-grape-punch">전체 보기 →</Link>
            </div>
            <div className="bg-paper-white wobbly-1 rounded-[15px] p-4 border-2 border-black shadow-[4px_4px_0px_0px_#000]">
              <p className="font-black text-type-black text-sm">{diaries[0].title}</p>
              <p className="text-xs text-type-black/60 mt-1 line-clamp-2">{diaries[0].content}</p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

// ─── StatBox 헬퍼 ────────────────────────────────────────────
function StatBox({
  icon,
  label,
  value,
  bg,
  wobble,
  href,
  sub,
}: {
  icon: string;
  label: string;
  value: number;
  bg: string;
  wobble: string;
  href: string;
  sub?: string;
}) {
  return (
    <Link
      href={href}
      className={`${bg} ${wobble} rounded-[15px] p-3 border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all block`}
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xl">{icon}</span>
        <span className="text-xs font-black text-type-black/70">{label}</span>
      </div>
      <div className="text-xl font-black text-type-black">{value}</div>
      {sub && <p className="text-[10px] font-bold text-type-black/50 mt-0.5">{sub}</p>}
    </Link>
  );
}
