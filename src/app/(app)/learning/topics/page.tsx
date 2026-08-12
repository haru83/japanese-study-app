import Link from "next/link";

export default function TopicsPage() {
  const SAMPLE_TOPICS = [
    { icon: "✈️", title: "여행 & 공항", count: "25단어", level: "초급" },
    { icon: "🍱", title: "음식 & 식당", count: "30단어", level: "초급" },
    { icon: "💼", title: "비즈니스 미팅", count: "20단어", level: "중급" },
    { icon: "🏥", title: "병원 & 약국", count: "15단어", level: "중급" },
    { icon: "🛍️", title: "쇼핑 & 환불", count: "20단어", level: "초급" },
    { icon: "🏠", title: "주거 & 부동산", count: "18단어", level: "고급" },
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
            주제별 단어 🏷️
          </h1>
          <p className="text-xs font-bold text-type-black/60">
            실생활 테마에 맞는 필 수 어휘 컬렉션
          </p>
        </div>
      </header>

      {/* Notice Banner */}
      <div className="bg-canvas-almond rounded-[18px] border-2 border-black p-4 shadow-[4px_4px_0px_0px_#000] flex items-center gap-3">
        <span className="text-3xl">🚀</span>
        <div>
          <p className="text-sm font-black text-type-black">곧 풍성한 콘텐츠가 추가돼요!</p>
          <p className="text-xs font-bold text-type-black/60 mt-0.5">
            테마별 맞춤 단어장과 학습 기능이 곧 업데이트됩니다.
          </p>
        </div>
      </div>

      {/* Sample Grid */}
      <section className="space-y-3">
        <h2 className="text-sm font-black text-type-black">주제별 테마 샘플 (미리보기)</h2>
        <div className="grid grid-cols-2 gap-3">
          {SAMPLE_TOPICS.map((topic) => (
            <div
              key={topic.title}
              className="bg-paper-white/80 rounded-[15px] p-4 border-2 border-black/40 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] flex flex-col justify-between relative opacity-80"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-3xl">{topic.icon}</span>
                <span className="text-[9px] font-black bg-type-black/10 text-type-black/60 px-2 py-0.5 rounded-full border border-black/20">
                  준비 중
                </span>
              </div>
              <div>
                <p className="font-black text-type-black text-sm">{topic.title}</p>
                <p className="text-[11px] font-bold text-type-black/50 mt-0.5">
                  {topic.count} · {topic.level}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
