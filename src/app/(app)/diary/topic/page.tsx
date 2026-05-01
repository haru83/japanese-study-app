import Link from "next/link";
import { getTopics } from "@/actions/user";

const PRESET_TOPICS = [
  { id: "free", titleJp: "自由テーマ", title: "자유 주제", category: "자유", difficulty: 1 },
  { id: "today", titleJp: "今日の出来事", title: "오늘 있었던 일", category: "일상", difficulty: 1 },
  { id: "food", titleJp: "美味しい食べ物", title: "맛있었던 음식", category: "일상", difficulty: 1 },
  { id: "weather", titleJp: "今日の天気", title: "오늘의 날씨", category: "일상", difficulty: 2 },
  { id: "dream", titleJp: "夢について", title: "꿈에 대해", category: "감정", difficulty: 2 },
  { id: "weekend", titleJp: "週末の計画", title: "주말 계획", category: "일정", difficulty: 2 },
];

const DIFFICULTY_STARS = (d: number) => "⭐".repeat(d);

export default async function TopicSelectionPage() {
  const dbTopics = await getTopics();

  const allTopics = [
    ...PRESET_TOPICS,
    ...dbTopics.map((t) => ({
      id: t.id,
      titleJp: t.titleJp,
      title: t.title,
      category: t.category,
      difficulty: t.difficulty,
    })),
  ];

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark">
      {/* Header */}
      <div className="bg-white dark:bg-surface-dark px-5 pt-12 pb-5 shadow-sm flex items-center gap-3">
        <Link
          href="/diary"
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-text-main dark:text-text-main-dark -ml-2"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <div>
          <h1 className="text-xl font-bold text-text-main dark:text-text-main-dark">
            오늘의 주제 선택
          </h1>
          <p className="text-sm text-text-sub dark:text-text-sub-dark">
            어떤 주제로 일기를 쓸까요?
          </p>
        </div>
      </div>

      <div className="px-5 py-4 grid grid-cols-1 gap-3">
        {allTopics.map((topic) => (
          <Link
            key={topic.id}
            href={`/diary/write?topic=${encodeURIComponent(topic.titleJp)}&topicKo=${encodeURIComponent(topic.title)}`}
            className="bg-white dark:bg-surface-dark rounded-2xl p-4 shadow-sm border border-orange-50 dark:border-border-dark flex items-center gap-4 hover:shadow-md transition-shadow active:scale-95"
          >
            <div className="flex-1">
              <p className="font-bold text-text-main dark:text-text-main-dark">
                {topic.title}
              </p>
              <p className="text-sm text-text-sub dark:text-text-sub-dark mt-0.5">
                {topic.titleJp}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-xs bg-amber-50 dark:bg-border-dark text-amber-700 dark:text-primary px-2 py-0.5 rounded-full font-medium">
                {topic.category}
              </span>
              <span className="text-xs">{DIFFICULTY_STARS(topic.difficulty)}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
