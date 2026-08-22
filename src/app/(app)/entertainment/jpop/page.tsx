import Link from "next/link";

export const metadata = {
  title: "J-POP 일본어 | 하루83",
  description: "인기 J-POP 히트곡 가사로 배우는 감성 일본어 학습",
};

export default function JpopPage() {
  return (
    <div className="flex flex-col min-h-screen bg-sakura-blush px-5 pt-8 pb-24 space-y-6">
      {/* Header */}
      <header className="flex items-center gap-3">
        <Link
          href="/entertainment"
          className="p-2 rounded-full border-2 border-black bg-paper-white shadow-[2px_2px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] transition-all shrink-0"
          aria-label="엔터 허브로 돌아가기"
        >
          <span className="material-symbols-outlined text-type-black text-xl leading-none block">
            arrow_back
          </span>
        </Link>
        <div>
          <h1 className="text-xl font-black text-type-black flex items-center gap-2">
            J-POP 일본어 🎵
          </h1>
          <p className="text-xs font-bold text-type-black/60">
            가사 속 감성과 은유를 통해 배우는 일본어
          </p>
        </div>
      </header>

      {/* Coming Soon Card */}
      <div className="bg-paper-white rounded-[24px] border-2 border-black p-8 text-center shadow-[4px_4px_0px_0px_#000] space-y-4 my-auto">
        <div className="text-6xl animate-bounce">🎧</div>
        <div className="space-y-2">
          <span className="text-xs font-black bg-sakura-pink px-3 py-1 rounded-full border border-black shadow-[1px_1px_0px_0px_#000]">
            COMING SOON
          </span>
          <h2 className="text-xl font-black text-type-black pt-2">
            콘텐츠를 열심히 준비하고 있어요!
          </h2>
          <p className="text-xs text-type-black/70 font-bold leading-relaxed max-w-xs mx-auto">
            YOASOBI, Official髭男dism, 요네즈 켄시, 아이묭 등 인기 J-POP 명곡의 가사 해석과 문법 노트를 곧 선보일 예정입니다.
          </p>
        </div>

        <Link
          href="/entertainment/anime-quotes"
          className="inline-flex items-center gap-2 bg-shiba-orange text-type-black px-5 py-2.5 rounded-xl border-2 border-black font-black text-xs shadow-[3px_3px_0px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
        >
          <span>🎬 먼저 애니 명대사 학습하러 가기</span>
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </Link>
      </div>
    </div>
  );
}
