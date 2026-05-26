interface WordOfTheDayCardProps {
  word: string;
  reading: string;
  meaning: string;
  source: string;
}

export function WordOfTheDayCard({ word, reading, meaning, source }: WordOfTheDayCardProps) {
  return (
    <div className="bg-paper-white rounded-[15px] border-2 border-black shadow-[4px_4px_0px_0px_#000] overflow-hidden">
      <div className="px-5 py-3 bg-canvas-almond border-b-2 border-black flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">📖</span>
          <h2 className="font-black text-type-black text-sm">오늘의 단어</h2>
        </div>
      </div>
      <div className="px-5 py-4">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-xl font-black text-type-black">{word}</span>
          <span className="text-sm text-type-black/60 font-bold">{reading}</span>
        </div>
        <p className="text-sm text-type-black/80 font-bold">{meaning}</p>
        <p className="text-[10px] text-type-black/40 font-bold mt-2">출처: {source}</p>
      </div>
    </div>
  );
}
