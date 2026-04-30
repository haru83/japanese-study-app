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
      <div className="min-h-screen bg-bg-light dark:bg-bg-dark flex flex-col items-center justify-center px-6 gap-6">
        <div className="text-7xl animate-bounce">⭐</div>
        <h2 className="text-2xl font-bold text-text-main dark:text-text-main-dark">
          일기 완성!
        </h2>
        <div className="bg-primary/10 rounded-2xl px-6 py-4 text-center">
          <p className="text-primary font-bold text-xl">+{xpGained} XP</p>
          <p className="text-text-sub text-sm mt-1">+1 스탬프 획득!</p>
        </div>
        <Button size="lg" onClick={() => router.push("/home")} className="w-full max-w-xs">
          홈으로
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark">
      {/* Header */}
      <div className="bg-white dark:bg-surface-dark px-5 pt-12 pb-5 shadow-sm">
        <button
          onClick={() => router.back()}
          className="text-text-sub dark:text-text-sub-dark mb-3"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-xl font-bold text-text-main dark:text-text-main-dark">
          {topicKo}
        </h1>
        {topicJp && (
          <p className="text-sm text-text-sub dark:text-text-sub-dark mt-0.5">
            {topicJp}
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="px-5 py-4 flex flex-col gap-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-text-main dark:text-text-main-dark mb-1.5">
            제목
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={`${topicKo} 일기`}
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-border-dark bg-white dark:bg-surface-dark text-text-main dark:text-text-main-dark focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Mood */}
        <div>
          <label className="block text-sm font-medium text-text-main dark:text-text-main-dark mb-2">
            오늘의 기분
          </label>
          <div className="flex gap-2">
            {MOODS.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMood(m.id)}
                className={`flex flex-col items-center gap-1 flex-1 py-2 rounded-2xl border-2 transition-all ${
                  mood === m.id
                    ? "border-primary bg-primary/10"
                    : "border-gray-100 dark:border-border-dark bg-white dark:bg-surface-dark"
                }`}
              >
                <span className="text-2xl">{m.emoji}</span>
                <span className="text-[10px] text-text-sub">{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-text-main dark:text-text-main-dark mb-1.5">
            일기 내용 (일본어로 써보세요 🇯🇵)
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="今日は..."
            rows={8}
            required
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-border-dark bg-white dark:bg-surface-dark text-text-main dark:text-text-main-dark focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
          <p className="text-xs text-text-sub dark:text-text-sub-dark mt-1 text-right">
            {content.length}자
          </p>
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
    <Suspense fallback={<div className="min-h-screen bg-bg-light flex items-center justify-center"><span className="text-text-sub">로딩 중...</span></div>}>
      <DiaryWriteForm />
    </Suspense>
  );
}
