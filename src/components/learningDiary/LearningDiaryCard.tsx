import Link from "next/link";
import type { DiarySummary } from "@/components/learningDiary/DiaryList";

interface LearningDiaryCardProps {
  diary: DiarySummary;
  completed: boolean;
  locked?: boolean;
  requiredLevel?: number;
}

const LEVEL_BG: Record<string, string> = {
  초급: "bg-matcha-green text-black",
  중급: "bg-shiba-orange text-black",
  고급: "bg-grape-punch text-white",
};

const WOBBLE = ["wobbly-1", "wobbly-2", "wobbly-3", "wobbly-4", "wobbly-5"];

function wobbleFor(id: string) {
  const hash = id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return WOBBLE[hash % WOBBLE.length];
}

export function LearningDiaryCard({
  diary,
  completed,
  locked,
  requiredLevel,
}: LearningDiaryCardProps) {
  const wobble = wobbleFor(diary.id);

  if (locked) {
    return (
      <div
        className={`relative bg-paper-white/50 rounded-[15px] p-4 border-2 border-black/30 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] flex gap-3 ${wobble} cursor-not-allowed`}
      >
        <div className="w-14 h-14 rounded-xl bg-canvas-almond/50 border-2 border-black/20 flex items-center justify-center text-3xl flex-shrink-0 grayscale opacity-40">
          {diary.thumbnail}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1 flex-wrap">
            <span className="text-xs px-2 py-0.5 rounded-full font-bold border-2 border-black/30 bg-type-black/10 text-type-black/40">
              🔒 레벨 {requiredLevel} 오픈
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full font-bold border-2 border-black/20 bg-type-black/5 text-type-black/30">
              {diary.category}
            </span>
          </div>
          <p className="font-bold text-type-black/30 text-sm leading-snug">{diary.title}</p>
          <p className="text-xs text-type-black/25 mt-0.5 truncate">{diary.titleKo}</p>
        </div>
        <div className="self-center text-type-black/20">
          <span className="material-symbols-outlined text-sm">lock</span>
        </div>
      </div>
    );
  }

  return (
    <Link
      href={`/diary/learn/${diary.id}`}
      className={`relative bg-paper-white rounded-[15px] p-4 border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all active:scale-95 flex gap-3 ${wobble}`}
    >
      <div className="w-14 h-14 rounded-xl bg-canvas-almond border-2 border-black flex items-center justify-center text-3xl flex-shrink-0">
        {diary.thumbnail}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-1 flex-wrap">
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-bold border-2 border-black ${
              LEVEL_BG[diary.level] ?? "bg-canvas-almond text-black"
            }`}
          >
            {diary.level}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full font-bold border-2 border-black bg-paper-white text-type-black">
            {diary.category}
          </span>
          {completed && (
            <span className="text-xs bg-matcha-green text-black px-2 py-0.5 rounded-full font-bold border-2 border-black">
              완료 ✓
            </span>
          )}
        </div>
        <p className="font-bold text-type-black text-sm leading-snug">{diary.title}</p>
        <p className="text-xs text-type-black/60 mt-0.5 truncate">{diary.titleKo}</p>
      </div>
      <div className="self-center text-type-black">
        <span className="material-symbols-outlined text-sm">chevron_right</span>
      </div>
    </Link>
  );
}
