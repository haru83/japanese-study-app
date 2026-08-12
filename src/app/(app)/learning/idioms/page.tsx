import Link from "next/link";

export default function IdiomsPage() {
  const SAMPLE_IDIOMS = [
    { idiom: "猫の手も借りたい", reading: "ねこのてもかりたい", meaning: "고양이 손이라도 빌리고 싶다 (몹시 바쁘다)", icon: "🐱" },
    { idiom: "耳にタコができる", reading: "みみにたこができる", meaning: "귀에 딱지가 앉다 (같은 말을 질리도록 듣다)", icon: "👂" },
    { idiom: "目からウロコが落ちる", reading: "めからうろこがおちる", meaning: "눈에서 비늘이 떨어지다 (새로운 사실을 깨닫다)", icon: "👁️" },
    { idiom: "口が軽い", reading: "くちがかるい", meaning: "입이 가볍다 (비밀을 쉽게 말하다)", icon: "👄" },
    { idiom: "腹が立つ", reading: "はらがたつ", meaning: "배가 서다 (화가 나다)", icon: "😡" },
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
            재미있는 숙어 💡
          </h1>
          <p className="text-xs font-bold text-type-black/60">
            일본 현지인이 매일 쓰는 흥미로운 관용구 컬렉션
          </p>
        </div>
      </header>

      {/* Notice Banner */}
      <div className="bg-canvas-almond rounded-[18px] border-2 border-black p-4 shadow-[4px_4px_0px_0px_#000] flex items-center gap-3">
        <span className="text-3xl">💡</span>
        <div>
          <p className="text-sm font-black text-type-black">재미있는 숙어 카드가 준비 중이에요!</p>
          <p className="text-xs font-bold text-type-black/60 mt-0.5">
            어원 설명과 퀴즈 기능이 곧 함께 추가됩니다.
          </p>
        </div>
      </div>

      {/* Sample Idiom List */}
      <section className="space-y-3">
        <h2 className="text-sm font-black text-type-black">미리보기 숙어 목록</h2>
        <div className="flex flex-col gap-3">
          {SAMPLE_IDIOMS.map((item) => (
            <div
              key={item.idiom}
              className="bg-paper-white/80 rounded-[15px] p-4 border-2 border-black/40 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] flex items-center gap-4 opacity-85"
            >
              <span className="text-3xl bg-shiba-orange/20 p-2.5 rounded-xl border border-black/20 shrink-0">
                {item.icon}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-black text-type-black text-base">{item.idiom}</p>
                  <span className="text-[9px] font-black bg-type-black/10 text-type-black/60 px-2 py-0.5 rounded-full border border-black/20">
                    준비 중
                  </span>
                </div>
                <p className="text-xs text-type-black/60 font-bold mt-0.5">{item.reading}</p>
                <p className="text-xs font-bold text-grape-punch mt-1">{item.meaning}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
