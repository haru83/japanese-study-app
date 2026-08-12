import Link from "next/link";

export default function ConfusingGrammarPage() {
  const SAMPLE_GRAMMAR = [
    {
      pair: "〜ように vs 〜ために",
      topic: "목적 표현의 차이",
      summary: "ように는 의지 불가능 동사/가능형, ために는 의지 동사 기본형에 연결",
      icon: "🎯",
    },
    {
      pair: "〜そうだ vs 〜ようだ vs 〜らしい",
      topic: "추측 & 양태 표현 비교",
      summary: "직접 본 느낌(そうだ), 종합적 추측(ようだ), 전해 들은 정보/소문(らしい)",
      icon: "👀",
    },
    {
      pair: "〜てから vs 〜たあとで",
      topic: "순서 표현 차이",
      summary: "てから는 A 직후 바로 B 수행, たあとで는 시간적 전후 관계 중심",
      icon: "⏳",
    },
    {
      pair: "〜あげる vs 〜くれる vs 〜もらう",
      topic: "수수 표현 (주고받기)",
      summary: "내가 남에게(あげる), 남이 나에게(くれる), 내가 남에게 받음(もらう)",
      icon: "🎁",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-sakura-blush px-5 pt-8 pb-24 space-y-6">
      {/* Header */}
      <header className="flex items-center gap-3">
        <Link
          href="/learning"
          className="p-2 rounded-full border-2 border-black bg-paper-white shadow-[2px_2px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] transition-all shrink-0"
          aria-label="어휘 Hub로 돌아가기"
        >
          <span className="material-symbols-outlined text-type-black text-xl leading-none block">
            arrow_back
          </span>
        </Link>
        <div>
          <h1 className="text-xl font-black text-type-black flex items-center gap-2">
            헷갈리는 문법 🤔
          </h1>
          <p className="text-xs font-bold text-type-black/60">
            유사한 용법의 뉘앙스 차이를 명쾌하게 비교 정리
          </p>
        </div>
      </header>

      {/* Notice Banner */}
      <div className="bg-canvas-almond rounded-[18px] border-2 border-black p-4 shadow-[4px_4px_0px_0px_#000] flex items-center gap-3">
        <span className="text-3xl">🤔</span>
        <div>
          <p className="text-sm font-black text-type-black">비교 정리가 정리 중이에요!</p>
          <p className="text-xs font-bold text-type-black/60 mt-0.5">
            예문 비교와 뉘앙스 해설 노트를 준비하고 있습니다.
          </p>
        </div>
      </div>

      {/* Sample Grammar Comparison Cards */}
      <section className="space-y-3">
        <h2 className="text-sm font-black text-type-black">미리보기 비교 주제</h2>
        <div className="flex flex-col gap-3">
          {SAMPLE_GRAMMAR.map((item) => (
            <div
              key={item.pair}
              className="bg-paper-white/80 rounded-[15px] p-4 border-2 border-black/40 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] opacity-85"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-black text-grape-punch bg-grape-punch/10 px-2.5 py-0.5 rounded-full border border-grape-punch/30">
                  {item.topic}
                </span>
                <span className="text-[9px] font-black bg-type-black/10 text-type-black/60 px-2 py-0.5 rounded-full border border-black/20">
                  준비 중
                </span>
              </div>
              <p className="font-black text-type-black text-base flex items-center gap-2 mb-1">
                <span>{item.icon}</span>
                {item.pair}
              </p>
              <p className="text-xs font-bold text-type-black/70 leading-relaxed bg-canvas-almond/40 p-2 rounded-lg border border-black/10">
                {item.summary}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
