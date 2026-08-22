import Link from "next/link";

export default function VocabHubPage() {
  return (
    <div className="flex flex-col min-h-screen bg-sakura-blush px-5 pt-8 pb-24 space-y-6">
      {/* Header */}
      <header>
        <div className="bg-canvas-almond rounded-[20px] border-2 border-black p-5 shadow-[4px_4px_0px_0px_#000]">
          <h1 className="text-2xl font-black text-type-black flex items-center gap-2">
            <span className="text-2xl">📚</span> 어휘
          </h1>
          <p className="text-xs font-bold text-type-black/60 mt-1">
            수집한 학습 아카이브부터 어휘·문법 추가 학습까지 한곳에서 관리해요
          </p>
        </div>
      </header>

      {/* SRS & Bookmarks Quick Action Cards */}
      <section className="grid grid-cols-2 gap-3">
        <Link
          href="/learning/review"
          className="bg-sakura-pink rounded-[15px] border-2 border-black shadow-[4px_4px_0px_0px_#000] p-4 flex items-center gap-3 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] transition-all"
        >
          <span className="text-3xl bg-paper-white p-2 rounded-xl border border-black shrink-0">⚡</span>
          <div>
            <span className="text-[10px] font-black text-type-black/50 block">SRS</span>
            <p className="text-sm font-black text-type-black">플래시카드 복습</p>
          </div>
        </Link>
        <Link
          href="/learning/bookmarks"
          className="bg-shiba-orange/20 rounded-[15px] border-2 border-black shadow-[4px_4px_0px_0px_#000] p-4 flex items-center gap-3 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] transition-all"
        >
          <span className="text-3xl bg-shiba-orange p-2 rounded-xl border border-black shrink-0">📌</span>
          <div>
            <span className="text-[10px] font-black text-type-black/50 block">FAVORITES</span>
            <p className="text-sm font-black text-type-black">북마크</p>
          </div>
        </Link>
      </section>

      {/* ── Section 1: 아카이브 ── */}
      <section className="space-y-3">
        <h2 className="text-base font-black text-type-black flex items-center gap-2">
          <span>📁</span> 아카이브
        </h2>
        <div className="flex flex-col gap-3">
          {/* 학습한 단어 */}
          <Link
            href="/learning/vocabulary"
            className="bg-paper-white rounded-[18px] border-2 border-black shadow-[4px_4px_0px_0px_#000] p-4 flex items-center justify-between hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl bg-shiba-orange p-2.5 rounded-xl border-2 border-black shrink-0">
                📖
              </div>
              <div>
                <p className="text-base font-black text-type-black">학습한 단어</p>
                <p className="text-xs text-type-black/60 font-bold mt-0.5">
                  완료한 경어 레슨과 일기에서 모은 단어장
                </p>
              </div>
            </div>
            <span className="material-symbols-outlined text-2xl text-type-black shrink-0">
              chevron_right
            </span>
          </Link>

          {/* 학습한 문법 */}
          <Link
            href="/learning/grammar"
            className="bg-paper-white rounded-[18px] border-2 border-black shadow-[4px_4px_0px_0px_#000] p-4 flex items-center justify-between hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl bg-matcha-green p-2.5 rounded-xl border-2 border-black shrink-0">
                📝
              </div>
              <div>
                <p className="text-base font-black text-type-black">학습한 문법</p>
                <p className="text-xs text-type-black/60 font-bold mt-0.5">
                  존경어·겸양어 및 레슨별 핵심 문법 노트
                </p>
              </div>
            </div>
            <span className="material-symbols-outlined text-2xl text-type-black shrink-0">
              chevron_right
            </span>
          </Link>
        </div>
      </section>

      {/* ── Section 2: 추가학습 ── */}
      <section className="space-y-3">
        <h2 className="text-base font-black text-type-black flex items-center gap-2">
          <span>🚀</span> 추가학습
        </h2>
        <div className="flex flex-col gap-3">
          {/* 주제별 단어 */}
          <Link
            href="/learning/topics"
            className="bg-paper-white rounded-[18px] border-2 border-black shadow-[4px_4px_0px_0px_#000] p-4 flex items-center justify-between hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl bg-grape-punch text-white p-2.5 rounded-xl border-2 border-black shrink-0">
                🏷️
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-base font-black text-type-black">주제별 단어</p>
                  <span className="text-[10px] font-black bg-shiba-orange/30 px-2 py-0.5 rounded-full border border-black text-type-black">
                    50개 단어
                  </span>
                </div>
                <p className="text-xs text-type-black/60 font-bold mt-0.5">
                  여행, 음식, 비즈니스 등 테마별 단어 모음
                </p>
              </div>
            </div>
            <span className="material-symbols-outlined text-2xl text-type-black shrink-0">
              chevron_right
            </span>
          </Link>

          {/* 재미있는 숙어 */}
          <Link
            href="/learning/idioms"
            className="bg-paper-white rounded-[18px] border-2 border-black shadow-[4px_4px_0px_0px_#000] p-4 flex items-center justify-between hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl bg-shiba-orange text-type-black p-2.5 rounded-xl border-2 border-black shrink-0">
                💡
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-base font-black text-type-black">재미있는 숙어</p>
                  <span className="text-[10px] font-black bg-shiba-orange/30 px-2 py-0.5 rounded-full border border-black text-type-black">
                    50개 관용구
                  </span>
                </div>
                <p className="text-xs text-type-black/60 font-bold mt-0.5">
                  실생활에서 유용하게 쓰이는 일본어 관용구
                </p>
              </div>
            </div>
            <span className="material-symbols-outlined text-2xl text-type-black shrink-0">
              chevron_right
            </span>
          </Link>

          {/* 헷갈리는 문법 */}
          <Link
            href="/learning/confusing-grammar"
            className="bg-paper-white rounded-[18px] border-2 border-black shadow-[4px_4px_0px_0px_#000] p-4 flex items-center justify-between hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl bg-matcha-green text-type-black p-2.5 rounded-xl border-2 border-black shrink-0">
                🤔
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-base font-black text-type-black">헷갈리는 문법</p>
                  <span className="text-[10px] font-black bg-shiba-orange/30 px-2 py-0.5 rounded-full border border-black text-type-black">
                    50개 비교
                  </span>
                </div>
                <p className="text-xs text-type-black/60 font-bold mt-0.5">
                  비슷해서 틀리기 쉬운 표현 명쾌 비교
                </p>
              </div>
            </div>
            <span className="material-symbols-outlined text-2xl text-type-black shrink-0">
              chevron_right
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
