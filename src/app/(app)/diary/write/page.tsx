"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { saveDiary } from "@/actions/diary";
import { Button } from "@/components/ui/Button";

const MOODS = [
  { id: "happy", emoji: "😊", label: "행복" },
  { id: "excited", emoji: "🤩", label: "신남" },
  { id: "neutral", emoji: "😐", label: "보통" },
  { id: "sad", emoji: "😢", label: "슬픔" },
  { id: "tired", emoji: "😴", label: "피곤" },
];

function DiaryWriteForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const topicJp = searchParams.get("topic") ?? "";
  const topicKo = searchParams.get("topicKo") ?? "자유 주제";

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("happy");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [xpGained, setXpGained] = useState(0);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true);

    try {
      const result = await saveDiary({
        title: title || `${topicKo} 일기`,
        content,
        mood,
      });
      setXpGained(result.xpResult.xpGained);
      setDone(true);
    } catch {
      alert("저장에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="min-h-screen bg-sakura-blush flex flex-col items-center justify-center px-6 gap-6">
        <div className="text-8xl animate-bounce wobbly-2 sticker inline-block">⭐</div>
        <h2 className="text-3xl font-black text-type-black">일기 완성!</h2>
        <div className="bg-paper-white border-2 border-black rounded-2xl px-6 py-4 text-center shadow-[4px_4px_0px_0px_#000]">
          <p className="text-grape-punch font-black text-2xl">+{xpGained} XP</p>
          <p className="text-type-black/60 font-bold text-sm mt-1">+1 스탬프 획득!</p>
        </div>
        <Button size="lg" onClick={() => router.push("/home")} className="w-full max-w-xs">
          홈으로
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sakura-blush">
      <div className="bg-canvas-almond px-5 pt-12 pb-5 border-b-4 border-black">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full border-2 border-black bg-paper-white shadow-[2px_2px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] transition-all text-type-black -ml-2 mb-1"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-xl font-black text-type-black">{topicKo}</h1>
        {topicJp && <p className="text-sm text-type-black/60 font-bold mt-0.5">{topicJp}</p>}
      </div>

      <form onSubmit={handleSubmit} className="px-5 py-4 flex flex-col gap-4">
        <div>
          <label className="block text-sm font-black text-type-black mb-1.5">제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={`${topicKo} 일기`}
            className="w-full px-4 py-3 rounded-2xl border-2 border-black bg-paper-white text-type-black focus:outline-none focus:ring-2 focus:ring-sakura-pink font-bold"
          />
        </div>

        <div>
          <label className="block text-sm font-black text-type-black mb-2">오늘의 기분</label>
          <div className="flex gap-2">
            {MOODS.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMood(m.id)}
                className={`flex flex-col items-center gap-1 flex-1 py-2 rounded-2xl border-2 border-black transition-all font-bold ${
                  mood === m.id
                    ? "bg-sakura-pink shadow-[3px_3px_0px_0px_#000]"
                    : "bg-paper-white shadow-[2px_2px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px]"
                }`}
              >
                <span className="text-2xl">{m.emoji}</span>
                <span className="text-[10px]">{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-black text-type-black mb-1.5">
            일기 내용 (일본어로 써보세요 🇯🇵)
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="今日は..."
            rows={8}
            required
            className="w-full px-4 py-3 rounded-2xl border-2 border-black bg-paper-white text-type-black focus:outline-none focus:ring-2 focus:ring-sakura-pink resize-none font-bold"
          />
          <p className="text-xs text-type-black/60 font-bold mt-1 text-right">{content.length}자</p>
        </div>

        <Button type="submit" size="lg" disabled={loading || !content.trim()}>
          {loading ? "저장 중..." : "일기 완성! (+10 XP)"}
        </Button>
      </form>
    </div>
  );
}

export default function DiaryWritePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-sakura-blush flex items-center justify-center"><span className="text-type-black font-bold">로딩 중...</span></div>}>
      <DiaryWriteForm />
    </Suspense>
  );
}
