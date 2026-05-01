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

const WOBBLES = ["wobbly-1", "wobbly-2", "wobbly-3", "wobbly-4", "wobbly-5"];
const BG_CYCLE = [
  "bg-paper-white",
  "bg-sakura-pink",
  "bg-canvas-almond",
  "bg-paper-white",
  "bg-sakura-pink",
  "bg-canvas-almond",
];

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
    <div className="min-h-screen bg-sakura-blush">
      <div className="bg-canvas-almond px-5 pt-12 pb-5 border-b-4 border-black flex items-center gap-3">
        <Link
          href="/diary"
          className="p-2 rounded-full border-2 border-black bg-paper-white shadow-[2px_2px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] transition-all text-type-black -ml-2"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <div>
          <h1 className="text-xl font-black text-type-black">오늘의 주제 선택</h1>
          <p className="text-sm text-type-black/60 font-bold">어떤 주제로 일기를 쓸까요?</p>
        </div>
      </div>

      <div className="px-5 py-4 grid grid-cols-1 gap-3">
        {allTopics.map((topic, i) => {
          const w = WOBBLES[i % WOBBLES.length];
          const bg = BG_CYCLE[i % BG_CYCLE.length];
          return (
            <Link
              key={topic.id}
              href={`/diary/write?topic=${encodeURIComponent(topic.titleJp)}&topicKo=${encodeURIComponent(topic.title)}`}
              className={`${bg} ${w} rounded-[15px] p-4 border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] flex items-center gap-4 transition-all active:scale-95`}
            >
              <div className="flex-1">
                <p className="font-black text-type-black">{topic.title}</p>
                <p className="text-sm text-type-black/60 font-bold mt-0.5">{topic.titleJp}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-xs bg-grape-punch text-white px-2 py-0.5 rounded-full font-black border-2 border-black">
                  {topic.category}
                </span>
                <span className="text-xs">{DIFFICULTY_STARS(topic.difficulty)}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
