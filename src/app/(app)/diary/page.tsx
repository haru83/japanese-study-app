import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getDiaries } from "@/actions/diary";
import { prisma } from "@/lib/db";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ShibaAvatar } from "@/components/mascot/ShibaAvatar";
import { formatDateKST } from "@/lib/dateUtils";
import { DiaryList } from "@/components/learningDiary/DiaryList";
import type { DiarySummary } from "@/components/learningDiary/DiaryList";

function formatDate(date: Date) {
  return formatDateKST(date);
}

const MOOD_EMOJI: Record<string, string> = {
  happy: "😊",
  excited: "🤩",
  neutral: "😐",
  sad: "😢",
  tired: "😴",
};

const WOBBLES = ["wobbly-1", "wobbly-2", "wobbly-3", "wobbly-4", "wobbly-5"];

// ─── 게스트: 내 일기 탭 ───────────────────────────────────────
function GuestMyDiaryView() {
  return (
    <div className="flex flex-col items-center gap-5 py-8">
      <div className="text-6xl sticker wobbly-1 inline-block">🔒</div>
      <div className="text-center">
        <p className="font-black text-type-black text-base">일기 쓰기는 회원 전용 기능이에요</p>
        <p className="text-sm text-type-black/60 font-bold mt-2">
          가입하면 매일 일본어 일기를 쓰고<br />XP와 스탬프를 모을 수 있어요 ✨
        </p>
      </div>

      <div className="w-full flex flex-col gap-2">
        <Link
          href="/login?mode=signup"
          className="w-full flex items-center justify-center gap-2 bg-sakura-pink text-type-black font-black py-4 rounded-[15px] border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
        >
          무료로 가입하기 →
        </Link>
        <Link
          href="/login"
          className="w-full flex items-center justify-center bg-canvas-almond text-type-black font-black py-3.5 rounded-[15px] border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
        >
          로그인하기
        </Link>
      </div>

      {/* 학습 일기 유도 */}
      <div className="w-full bg-paper-white rounded-[15px] border-2 border-black shadow-[4px_4px_0px_0px_#000] p-4 wobbly-3">
        <p className="font-black text-type-black text-sm mb-1">학습 일기를 둘러보세요! 📖</p>
        <p className="text-xs text-type-black/60 font-bold">
          300개의 다양한 테마별 일본어 학습 일기를 읽어보세요.
        </p>
        <Link
          href="/diary?tab=learn"
          className="inline-block mt-3 text-xs font-black text-grape-punch underline underline-offset-2"
        >
          학습 일기 보러가기 →
        </Link>
      </div>
    </div>
  );
}

// ─── 멤버: 내 일기 탭 ─────────────────────────────────────────
async function MyDiaries() {
  const diaries = await getDiaries();
  return (
    <div className="flex flex-col gap-3 pb-24">
      <Link
        href="/diary/topic"
        className="w-full flex items-center justify-center gap-2 bg-sakura-pink font-black text-type-black h-[52px] rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all active:scale-[0.98]"
      >
        <span className="material-symbols-outlined">add</span>
        새 일기 쓰기
      </Link>

      {diaries.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <span className="text-6xl wobbly-3 sticker inline-block">✏️</span>
          <p className="text-type-black/60 text-center text-sm font-bold">
            아직 작성한 일기가 없어요.
            <br />
            오늘의 일기를 써볼까요?
          </p>
        </div>
      ) : (
        diaries.map((diary, i) => {
          const w = WOBBLES[i % WOBBLES.length];
          return (
            <Link
              key={diary.id}
              href={`/diary/${diary.id}`}
              className={`relative flex items-center gap-4 bg-paper-white p-4 rounded-[15px] border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all ${w}`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base font-black text-type-black truncate">{diary.title}</h3>
                  {diary.mood && (
                    <span className="text-lg shrink-0">{MOOD_EMOJI[diary.mood] ?? "😊"}</span>
                  )}
                </div>
                <p className="text-sm text-type-black/60 line-clamp-1 mb-1">{diary.content}</p>
                <div className="flex items-center gap-1 text-xs font-bold text-sakura-pink">
                  <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                  <span>{formatDate(diary.createdAt)} 작성</span>
                </div>
              </div>
              <div className="shrink-0 flex flex-col items-center gap-1">
                <span className="material-symbols-outlined text-type-black/40 text-xl">chevron_right</span>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
}

export default async function DiaryPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const [{ tab }, session] = await Promise.all([
    searchParams,
    getServerSession(authOptions),
  ]);
  const isLearn = tab === "learn";
  const userId = session?.user?.id;

  let learnData: {
    diaries: DiarySummary[];
    completedIds: string[];
    totalCount: number;
    userLevel: number;
  } | null = null;

  if (isLearn) {
    const [rows, progress, totalCount, userProgress] = await Promise.all([
      prisma.learningDiaryEntry.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: "asc" },
        select: {
          id: true,
          title: true,
          titleKo: true,
          category: true,
          level: true,
          thumbnail: true,
          sortOrder: true,
        },
      }),
      userId
        ? prisma.learningDiaryProgress.findMany({
            where: { userId },
            select: { diaryId: true },
          })
        : Promise.resolve([]),
      prisma.learningDiaryEntry.count({ where: { isActive: true } }),
      userId
        ? prisma.userProgress.findUnique({
            where: { userId },
            select: { level: true },
          })
        : Promise.resolve(null),
    ]);

    learnData = {
      diaries: rows,
      completedIds: progress.map((p) => p.diaryId),
      totalCount,
      userLevel: userProgress?.level ?? 1,
    };
  }

  return (
    <div className="min-h-screen bg-sakura-blush">
      {/* Unified Full-Width Header */}
      <header className="bg-canvas-almond px-5 pt-10 pb-4 border-b-4 border-black">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-black text-type-black tracking-tight flex items-center gap-2">
              <span>{isLearn ? "학습 일기" : "일기"}</span>
              <span className="text-xl">{isLearn ? "📖" : "📔"}</span>
            </h1>
            <p className="text-xs font-bold text-type-black/60 mt-1">
              {isLearn && learnData
                ? `${learnData.completedIds.length} / ${learnData.totalCount} 완료 · 현재 레벨 ${learnData.userLevel}`
                : "매일 쓰는 나만의 일본어 일기 & 300개의 레벨별 학습 일기"}
            </p>
          </div>
          <ShibaAvatar level={learnData?.userLevel ?? 1} size={52} sticker wobble="wobbly-2" className="shrink-0" />
        </div>

        {/* Integrated Tabs */}
        <div className="flex gap-1 bg-paper-white p-1 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_#000] mb-3">
          <Link
            href="/diary"
            className={`flex-1 text-center text-xs font-black py-2 rounded-full transition-all ${
              !isLearn
                ? "bg-sakura-pink text-type-black border-2 border-black shadow-[2px_2px_0px_0px_#000]"
                : "text-type-black/60 hover:text-type-black"
            }`}
          >
            내 일기
          </Link>
          <Link
            href="/diary?tab=learn"
            className={`flex-1 text-center text-xs font-black py-2 rounded-full transition-all ${
              isLearn
                ? "bg-sakura-pink text-type-black border-2 border-black shadow-[2px_2px_0px_0px_#000]"
                : "text-type-black/60 hover:text-type-black"
            }`}
          >
            학습 일기
          </Link>
        </div>

        {/* Progress bar in header when on learning diary tab */}
        {isLearn && learnData && (
          <div>
            <ProgressBar
              value={learnData.totalCount > 0 ? (learnData.completedIds.length / learnData.totalCount) * 100 : 0}
              color="grape"
            />
          </div>
        )}
      </header>

      <main className="px-5 py-4">
        {isLearn && learnData ? (
          <DiaryList
            diaries={learnData.diaries}
            completedIds={learnData.completedIds}
            totalCount={learnData.totalCount}
            userLevel={learnData.userLevel}
          />
        ) : session?.user?.id ? (
          <MyDiaries />
        ) : (
          <GuestMyDiaryView />
        )}
      </main>
    </div>
  );
}
