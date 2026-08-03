import Link from "next/link";

export default function LearningIndexPage() {
  return (
    <div className="flex flex-col min-h-screen bg-sakura-blush px-5 pt-8 pb-12">
      {/* Header */}
      <header className="mb-6">
        <div className="bg-canvas-almond rounded-[20px] border-2 border-black p-5 shadow-[4px_4px_0px_0px_#000]">
          <h1 className="text-xl font-black text-type-black flex items-center gap-2">
            <span className="text-2xl">📚</span> 학습 노트 & 복습 Hub
          </h1>
          <p className="text-xs font-bold text-type-black/60 mt-1">
            수집된 일본어 어휘, 문법 포인트를 한곳에서 복습하고 학습해요
          </p>
        </div>
      </header>

      {/* Navigation Cards */}
      <div className="flex flex-col gap-4">
        {/* SRS Flashcard Review */}
        <Link
          href="/learning/review"
          className="bg-sakura-pink rounded-[20px] border-2 border-black shadow-[4px_4px_0px_0px_#000] p-5 flex items-center justify-between hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="text-4xl bg-paper-white p-3 rounded-2xl border-2 border-black shrink-0">
              ⚡
            </div>
            <div>
              <span className="text-[10px] font-black text-type-black/50 uppercase tracking-widest block">
                SRS Memory System
              </span>
              <h2 className="text-lg font-black text-type-black">
                SRS 플래시카드 복습
              </h2>
              <p className="text-xs text-type-black/70 font-bold mt-0.5">
                망각 곡선 주기에 맞춰 수집된 단어를 맞춤 복습해요
              </p>
            </div>
          </div>
          <span className="material-symbols-outlined text-2xl text-type-black shrink-0">
            chevron_right
          </span>
        </Link>

        {/* Vocabulary List */}
        <Link
          href="/learning/vocabulary"
          className="bg-paper-white rounded-[20px] border-2 border-black shadow-[4px_4px_0px_0px_#000] p-5 flex items-center justify-between hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="text-4xl bg-shiba-orange p-3 rounded-2xl border-2 border-black shrink-0">
              📖
            </div>
            <div>
              <span className="text-[10px] font-black text-type-black/50 uppercase tracking-widest block">
                Vocabulary List
              </span>
              <h2 className="text-lg font-black text-type-black">
                수집된 단어장
              </h2>
              <p className="text-xs text-type-black/70 font-bold mt-0.5">
                완료한 경어 레슨과 일기에서 모은 단어 모음
              </p>
            </div>
          </div>
          <span className="material-symbols-outlined text-2xl text-type-black shrink-0">
            chevron_right
          </span>
        </Link>

        {/* Grammar Notebook */}
        <Link
          href="/learning/grammar"
          className="bg-paper-white rounded-[20px] border-2 border-black shadow-[4px_4px_0px_0px_#000] p-5 flex items-center justify-between hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="text-4xl bg-matcha-green p-3 rounded-2xl border-2 border-black shrink-0">
              📝
            </div>
            <div>
              <span className="text-[10px] font-black text-type-black/50 uppercase tracking-widest block">
                Grammar Points
              </span>
              <h2 className="text-lg font-black text-type-black">
                경어 & 문법 노트
              </h2>
              <p className="text-xs text-type-black/70 font-bold mt-0.5">
                존경어, 겸양어 핵심 규칙 정리와 관련 표현
              </p>
            </div>
          </div>
          <span className="material-symbols-outlined text-2xl text-type-black shrink-0">
            chevron_right
          </span>
        </Link>
      </div>
    </div>
  );
}
