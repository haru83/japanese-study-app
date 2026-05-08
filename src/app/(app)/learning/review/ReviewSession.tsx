"use client";

import { useState } from "react";
import { submitReview } from "@/actions/review";
import type { ReviewItem } from "@/actions/review";

interface Props {
  items: ReviewItem[];
  distractorPool: Record<string, string[]>;
}

type AnswerState = "unanswered" | "correct" | "wrong";

export function ReviewSession({ items, distractorPool }: Props) {
  const [index, setIndex] = useState(0);
  const [answerState, setAnswerState] = useState<AnswerState>("unanswered");
  const [selectedMeaning, setSelectedMeaning] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [done, setDone] = useState(false);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-5 text-center">
        <div className="text-6xl mb-4">✨</div>
        <h2 className="text-xl font-black text-type-black">오늘 복습 완료!</h2>
        <p className="text-sm text-type-black/60 font-bold mt-2">
          다음 복습 단어가 준비되면 알려드릴게요
        </p>
      </div>
    );
  }

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-5 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-xl font-black text-type-black">복습 완료!</h2>
        <p className="text-sm text-type-black/60 font-bold mt-2">
          {items.length}개 중 {correctCount}개 정답
        </p>
      </div>
    );
  }

  const current = items[index];
  const distractors = distractorPool[current.id] ?? [];
  const choices = shuffle([current.meaning, ...distractors.slice(0, 3)]);

  async function handleAnswer(chosen: string) {
    if (answerState !== "unanswered") return;
    const correct = chosen === current.meaning;
    setSelectedMeaning(chosen);
    setAnswerState(correct ? "correct" : "wrong");
    if (correct) setCorrectCount((c) => c + 1);
    await submitReview(current.id, correct);
  }

  function handleNext() {
    setAnswerState("unanswered");
    setSelectedMeaning(null);
    if (index + 1 >= items.length) {
      setDone(true);
    } else {
      setIndex((i) => i + 1);
    }
  }

  const tierLabels = ["신규", "1일", "3일", "7일", "14일"];
  const tierLabel = tierLabels[current.tier] ?? "마스터";

  return (
    <div className="flex flex-col min-h-screen bg-sakura-blush">
      <div className="bg-canvas-almond border-b-4 border-black px-5 pt-12 pb-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-black text-type-black">복습 퀴즈</h1>
          <span className="text-xs font-bold text-type-black/60">
            {index + 1} / {items.length}
          </span>
        </div>
        <div className="h-2 bg-black/10 rounded-full mt-3 overflow-hidden">
          <div
            className="h-full bg-grape-punch rounded-full transition-all"
            style={{ width: `${((index + 1) / items.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex-1 px-5 py-6 flex flex-col gap-5">
        <div className="bg-paper-white border-2 border-black rounded-[20px] shadow-[4px_4px_0px_0px_#000] p-6 text-center">
          <p className="text-3xl font-black text-type-black">{current.word}</p>
          {current.reading && (
            <p className="text-sm text-type-black/60 font-bold mt-1">{current.reading}</p>
          )}
          <p className="text-xs text-type-black/40 mt-3">출처: {current.source}</p>
          <span className="inline-block mt-2 text-[10px] font-black bg-canvas-almond border border-black rounded-full px-2 py-0.5">
            {tierLabel}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {choices.map((choice) => {
            let bg = "bg-paper-white";
            if (answerState !== "unanswered") {
              if (choice === current.meaning) bg = "bg-green-200";
              else if (choice === selectedMeaning) bg = "bg-red-200";
            }
            return (
              <button
                key={choice}
                onClick={() => handleAnswer(choice)}
                className={`${bg} border-2 border-black rounded-xl px-4 py-3 text-sm font-bold text-left shadow-[3px_3px_0px_0px_#000] transition-colors`}
              >
                {choice}
              </button>
            );
          })}
        </div>

        {answerState !== "unanswered" && (
          <button
            onClick={handleNext}
            className="mt-auto py-3 bg-grape-punch text-white font-black rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_#000]"
          >
            {index + 1 >= items.length ? "완료" : "다음 →"}
          </button>
        )}
      </div>
    </div>
  );
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}
