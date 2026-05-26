import Link from "next/link";

interface WordOfTheDayCardProps {
  word: string;
  reading: string;
  meaning: string;
  source: string;
  sourceId?: string;
  sourceType?: string;
}

const SOURCE_LABELS: Record<string, string> = {
  keigo: "경어 레슨",
  learningDiary: "학습 일기",
};

export function WordOfTheDayCard({ word, reading, meaning, source, sourceId, sourceType }: WordOfTheDayCardProps) {
  const href = sourceType === "keigo" && sourceId
    ? `/keigo/${sourceId}`
    : (sourceType === "learningDiary" || sourceType === "diary") && sourceId
      ? `/diary/learn/${sourceId}`
      : "#";

  const sourceLabel = SOURCE_LABELS[source] ?? source;

  return (
    <Link
      href={href}
      className="block wobbly-2 bg-canvas-almond rounded-[15px] p-5 border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-black bg-sakura-pink text-type-black px-2 py-1 rounded-full border border-black">
          📅 오늘의 단어
        </span>
        <span className="text-[10px] font-bold text-type-black/50">{sourceLabel}</span>
      </div>

      {/* 단어 */}
      <div className="text-center mb-3">
        <p className="text-xs text-type-black/60 font-bold mb-1">{reading}</p>
        <p className="text-2xl font-black text-type-black">{word}</p>
      </div>

      {/* 의미 */}
      <p className="text-sm font-bold text-type-black/80 text-center bg-paper-white rounded-[10px] p-2 border border-black/10">
        {meaning}
      </p>

      {/* 푸터 */}
      <p className="text-[10px] text-type-black/40 font-bold text-center mt-2">
        자세히 보러가기 →
      </p>
    </Link>
  );
}
