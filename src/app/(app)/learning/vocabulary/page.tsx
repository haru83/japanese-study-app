const VOCABULARY = [
  { word: "申し訳ありません", reading: "もうしわけありません", meaning: "대단히 죄송합니다", category: "경어" },
  { word: "よろしくお願いします", reading: "よろしくおねがいします", meaning: "잘 부탁드립니다", category: "경어" },
  { word: "ご連絡", reading: "ごれんらく", meaning: "연락 (경어)", category: "비즈니스" },
  { word: "おっしゃる", reading: "おっしゃる", meaning: "말씀하시다 (존경어)", category: "경어" },
  { word: "いただく", reading: "いただく", meaning: "받다/먹다 (겸양어)", category: "경어" },
  { word: "拝見する", reading: "はいけんする", meaning: "봐드리다 (겸양어)", category: "경어" },
  { word: "恐れ入ります", reading: "おそれいります", meaning: "황송합니다", category: "경어" },
  { word: "お世話になっております", reading: "おせわになっております", meaning: "신세를 지고 있습니다", category: "비즈니스" },
  { word: "承知いたしました", reading: "しょうちいたしました", meaning: "알겠습니다 (정중)", category: "경어" },
  { word: "かしこまりました", reading: "かしこまりました", meaning: "알겠습니다 (격식)", category: "경어" },
  { word: "ご来店", reading: "ごらいてん", meaning: "방문해 주심 (경어)", category: "서비스" },
  { word: "お待ちしております", reading: "おまちしております", meaning: "기다리고 있겠습니다", category: "서비스" },
];

const CATEGORY_COLORS: Record<string, string> = {
  경어: "bg-primary/10 text-amber-700",
  비즈니스: "bg-blue-100 text-blue-700",
  서비스: "bg-keigo-soft text-pink-600",
};

export default function VocabularyPage() {
  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark">
      <div className="bg-white dark:bg-surface-dark px-5 pt-12 pb-5 shadow-sm">
        <h1 className="text-xl font-bold text-text-main dark:text-text-main-dark">
          어휘 목록 📝
        </h1>
        <p className="text-sm text-text-sub dark:text-text-sub-dark mt-0.5">
          경어 필수 어휘 모음
        </p>
      </div>

      <div className="px-5 py-4 flex flex-col gap-3">
        {VOCABULARY.map((v) => (
          <div
            key={v.word}
            className="bg-white dark:bg-surface-dark rounded-2xl p-4 shadow-sm border border-orange-50 dark:border-border-dark"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-lg text-text-main dark:text-text-main-dark font-japanese">
                {v.word}
              </span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${CATEGORY_COLORS[v.category] ?? "bg-gray-100 text-gray-700"}`}
              >
                {v.category}
              </span>
            </div>
            <p className="text-sm text-text-sub dark:text-text-sub-dark">{v.reading}</p>
            <p className="text-sm text-text-main dark:text-text-main-dark mt-1 font-medium">
              {v.meaning}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
