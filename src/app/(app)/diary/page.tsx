import Link from "next/link";
import Image from "next/image";
import { getDiaries } from "@/actions/diary";
import { getCompletedLearningDiaries } from "@/actions/learningDiary";
import { learningDiaries } from "@/data/learningDiaries";
import { ProgressBar } from "@/components/ui/ProgressBar";

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

const MOOD_EMOJI: Record<string, string> = {
  happy: "😊",
  excited: "🤩",
  neutral: "😐",
  sad: "😢",
  tired: "😴",
};

const WOBBLES = ["wobbly-1", "wobbly-2", "wobbly-3", "wobbly-4", "wobbly-5"];

async function MyDiaries() {
  const diaries = await getDiaries();
  return (
    <div className="flex flex-col gap-3">
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
            <div
              key={diary.id}
              className={`relative flex items-center gap-4 bg-paper-white p-4 rounded-[15px] border-2 border-black shadow-[4px_4px_0px_0px_#000] ${w}`}
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
                  <span>{formatDate(diary.createdAt)} 학습 완료</span>
                </div>
              </div>
              <div className="shrink-0 flex flex-col items-center gap-1">
                <div className="relative flex items-center justify-center size-10 bg-matcha-green border-2 border-black rounded-full text-white rotate-12">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                    verified
                  </span>
                </div>
                <span className="text-[10px] font-black text-type-black">완료!</span>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

async function LearnDiariesPreview() {
  const completedIds = await getCompletedLearningDiaries();
  const recent = learningDiaries.slice(0, 5);
  return (
    <div className="flex flex-col gap-3">
      {/* Progress summary */}
      <div className="bg-paper-white rounded-2xl p-4 border-2 border-black shadow-[4px_4px_0px_0px_#000]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-black text-type-black">전체 진행률</span>
          <span className="text-sm font-black text-grape-punch">
            {completedIds.length} / {learningDiaries.length}
          </span>
        </div>
        <ProgressBar value={(completedIds.length / learningDiaries.length) * 100} color="grape" />
      </div>

      <Link
        href="/diary/learn"
        className="w-full flex items-center justify-center gap-2 bg-grape-punch font-black text-white h-[52px] rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all active:scale-[0.98]"
      >
        <span className="text-lg">📖</span>
        전체 목록 보기
      </Link>

      {recent.map((diary, i) => {
        const w = WOBBLES[i % WOBBLES.length];
        return (
          <Link
            key={diary.id}
            href={`/diary/learn/${diary.id}`}
            className={`flex items-center gap-3 bg-paper-white p-4 rounded-[15px] border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all ${w}`}
          >
            <span className="text-2xl">{diary.thumbnail}</span>
            <div className="flex-1 min-w-0">
              <p className="font-black text-sm text-type-black truncate">{diary.title}</p>
              <p className="text-xs text-type-black/60 font-bold">{diary.titleKo}</p>
            </div>
            {completedIds.includes(diary.id) ? (
              <span className="text-lg">✅</span>
            ) : (
              <span className="material-symbols-outlined text-type-black/40 text-sm">chevron_right</span>
            )}
          </Link>
        );
      })}
    </div>
  );
}

export default async function DiaryPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  const isLearn = tab === "learn";

  return (
    <main className="flex-1 overflow-y-auto px-5 pt-4 pb-24 space-y-4 bg-sakura-blush min-h-screen">
      {/* Mascot header */}
      <header className="flex flex-col items-center justify-center text-center gap-3 mb-2">
        <div className="text-7xl wobbly-2 sticker inline-block">🐕</div>
        <div>
          <h1 className="text-2xl font-black text-type-black tracking-tight leading-tight">일기</h1>
          <p className="text-sm text-type-black/60 font-bold mt-1">오늘도 참 잘했어요! 🐕</p>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex gap-1 bg-canvas-almond p-1 rounded-full border-2 border-black">
        <Link
          href="/diary"
          className={`flex-1 text-center text-sm font-black py-2 rounded-full transition-all ${
            !isLearn
              ? "bg-paper-white text-type-black border-2 border-black shadow-[2px_2px_0px_0px_#000]"
              : "text-type-black/60"
          }`}
        >
          내 일기
        </Link>
        <Link
          href="/diary?tab=learn"
          className={`flex-1 text-center text-sm font-black py-2 rounded-full transition-all ${
            isLearn
              ? "bg-paper-white text-type-black border-2 border-black shadow-[2px_2px_0px_0px_#000]"
              : "text-type-black/60"
          }`}
        >
          학습 일기
        </Link>
      </div>

      {isLearn ? <LearnDiariesPreview /> : <MyDiaries />}
    </main>
  );
}
