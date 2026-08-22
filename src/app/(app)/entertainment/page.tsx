import Link from "next/link";

export default function EntertainmentHubPage() {
  return (
    <div className="flex flex-col min-h-screen bg-sakura-blush px-5 pt-8 pb-24 space-y-6">
      {/* Header */}
      <header>
        <div className="bg-canvas-almond rounded-[20px] border-2 border-black p-5 shadow-[4px_4px_0px_0px_#000]">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-black text-type-black flex items-center gap-2">
              <span className="text-2xl">🍿</span> 엔터 일본어
            </h1>
            <span className="text-[10px] font-black bg-sakura-pink px-2.5 py-1 rounded-full border border-black shadow-[1px_1px_0px_0px_#000]">
              CULTURE HUB
            </span>
          </div>
          <p className="text-xs font-bold text-type-black/60 mt-1.5">
            애니메이션, 음악 등 좋아하는 대중문화 콘텐츠로 즐겁게 일본어를 마스터해요!
          </p>
        </div>
      </header>

      {/* Main Entertainment Menu Cards */}
      <section className="space-y-4">
        <h2 className="text-base font-black text-type-black flex items-center gap-2">
          <span>🎬</span> 엔터테인먼트 학습 코스
        </h2>

        <div className="flex flex-col gap-4">
          {/* 1. 애니 명대사 */}
          <Link
            href="/entertainment/anime-quotes"
            className="bg-paper-white rounded-[20px] border-2 border-black shadow-[4px_4px_0px_0px_#000] p-5 flex items-center justify-between hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] transition-all group"
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl bg-amber-400 p-3 rounded-2xl border-2 border-black shadow-[2px_2px_0px_0px_#000] shrink-0 group-hover:rotate-6 transition-transform">
                🎬
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-black text-type-black">애니 명대사 일본어</h3>
                  <span className="text-[10px] font-black bg-matcha-green px-2 py-0.5 rounded-full border border-black text-type-black">
                    HOT
                  </span>
                </div>
                <p className="text-xs text-type-black/70 font-bold">
                  원피스, 나루토, 프리렌, 주술회전 등 8개 인기 애니메이션의 명장면과 대사로 배우는 생생한 회화
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[11px] font-black text-shiba-orange flex items-center gap-1">
                    <span>✨</span> 총 32개 명대사 컬렉션
                  </span>
                  <span className="text-[11px] font-bold text-type-black/40">•</span>
                  <span className="text-[11px] font-bold text-type-black/60">발음 TTS & 빈칸 퀴즈</span>
                </div>
              </div>
            </div>
            <span className="material-symbols-outlined text-2xl text-type-black shrink-0 group-hover:translate-x-1 transition-transform">
              chevron_right
            </span>
          </Link>

          {/* 2. J-POP 일본어 (Coming Soon) */}
          <Link
            href="/entertainment/jpop"
            className="bg-paper-white/80 rounded-[20px] border-2 border-black/70 shadow-[4px_4px_0px_0px_#000] p-5 flex items-center justify-between hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] transition-all group"
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl bg-purple-400/80 p-3 rounded-2xl border-2 border-black shadow-[2px_2px_0px_0px_#000] shrink-0 group-hover:rotate-6 transition-transform">
                🎵
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-black text-type-black">J-POP 노래로 배우기</h3>
                  <span className="text-[10px] font-black bg-shiba-orange/30 px-2 py-0.5 rounded-full border border-black text-type-black">
                    준비 중
                  </span>
                </div>
                <p className="text-xs text-type-black/60 font-bold">
                  유명 J-POP 아티스트(요아소비, 요네즈 켄시, 유우리 등)의 히트곡 가사 속 은유와 문법을 탐구해요
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[11px] font-bold text-type-black/50">
                    곧 찾아올 예정이에요! 기대해 주세요 🎧
                  </span>
                </div>
              </div>
            </div>
            <span className="material-symbols-outlined text-2xl text-type-black/60 shrink-0">
              chevron_right
            </span>
          </Link>
        </div>
      </section>

      {/* Fun Tip Banner */}
      <section className="bg-canvas-almond/80 rounded-[18px] border-2 border-black p-4 space-y-1.5 shadow-[3px_3px_0px_0px_#000]">
        <div className="flex items-center gap-2">
          <span className="text-lg">💡</span>
          <span className="text-xs font-black text-type-black">엔터 학습 꿀팁</span>
        </div>
        <p className="text-xs font-bold text-type-black/70 leading-relaxed">
          대사 속 마음에 드는 단어는 별표(⭐)를 눌러 북마크에 저장하고, 어휘 탭의 <strong>플래시카드 복습(SRS)</strong>으로 기억을 장기화해 보세요!
        </p>
      </section>
    </div>
  );
}
