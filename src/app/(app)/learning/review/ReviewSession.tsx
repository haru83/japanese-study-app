"use client";

import { useState } from "react";
import { submitReviewWithRating } from "@/actions/review";
import { getFSRSPreviewIntervals } from "@/lib/fsrs";
import type { ReviewItem } from "@/actions/review";
import type { FSRSRating } from "@/lib/fsrs";

interface Props {
  items: ReviewItem[];
  distractorPool: Record<string, string[]>;
}

type AnswerState = "unanswered" | "answered";

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
          다음 FSRS 복습 단어가 준비되면 알려드릴게요
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
          {items.length}개 중 {correctCount}개 학습 완료
        </p>
      </div>
    );
  }

  const current = items[index];
  const distractors = distractorPool[current.id] ?? [];
  const choices = shuffle([current.meaning, ...distractors.slice(0, 3)]);

  const state = {
    stability: Math.max(0.4, current.tier * 2.5 || 0.4),
    difficulty: 5.0,
    reps: 1,
    lapses: 0,
  };
  const previews = getFSRSPreviewIntervals(state);

  async function handleRatingSubmit(rating: FSRSRating) {
    if (rating >= 3) setCorrectCount((c) => c + 1);
    await submitReviewWithRating(current.id, rating);
    handleNext();
  }

  function handleChoiceClick(chosen: string) {
    if (answerState !== "unanswered") return;
    setSelectedMeaning(chosen);
    setAnswerState("answered");
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

  const tierLabels = ["신규 FSRS", "1일 뒤", "3일 뒤", "7일 뒤", "마스터"];
  const tierLabel = tierLabels[current.tier] ?? "FSRS 복습중";

  return (
    <div className="flex flex-col min-h-screen bg-sakura-blush">
      <div className="bg-canvas-almond border-b-4 border-black px-5 pt-12 pb-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-black text-type-black">FSRS 복습 퀴즈</h1>
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
            if (answerState === "answered") {
              if (choice === current.meaning) bg = "bg-green-200";
              else if (choice === selectedMeaning) bg = "bg-red-200";
            }
            return (
              <button
                key={choice}
                onClick={() => handleChoiceClick(choice)}
                className={`${bg} border-2 border-black rounded-xl px-4 py-3 text-sm font-bold text-left shadow-[3px_3px_0px_0px_#000] transition-colors`}
              >
                {choice}
              </button>
            );
          })}
        </div>

        {/* FSRS 4-Rating Action Bar when answered or direct preview */}
        {answerState === "answered" && (
          <div className="mt-auto flex flex-col gap-2">
            <p className="text-xs font-black text-center text-type-black/60">
              학습 기억 체감도를 선택하세요 (FSRS)
            </p>
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() => handleRatingSubmit(1)}
                className="bg-sakura-blush border-2 border-black rounded-xl p-2.5 text-center text-xs font-black shadow-[2px_2px_0px_0px_#000] hover:scale-105 transition-transform"
              >
                🔴 다시
                <span className="block text-[10px] font-bold text-type-black/60">{previews[1]}</span>
              </button>
              <button
                onClick={() => handleRatingSubmit(2)}
                className="bg-shiba-orange/30 border-2 border-black rounded-xl p-2.5 text-center text-xs font-black shadow-[2px_2px_0px_0px_#000] hover:scale-105 transition-transform"
              >
                🟠 어려움
                <span className="block text-[10px] font-bold text-type-black/60">{previews[2]}</span>
              </button>
              <button
                onClick={() => handleRatingSubmit(3)}
                className="bg-matcha-green/30 border-2 border-black rounded-xl p-2.5 text-center text-xs font-black shadow-[2px_2px_0px_0px_#000] hover:scale-105 transition-transform"
              >
                🟢 알맞음
                <span className="block text-[10px] font-bold text-type-black/60">{previews[3]}</span>
              </button>
              <button
                onClick={() => handleRatingSubmit(4)}
                className="bg-grape-punch/20 border-2 border-black rounded-xl p-2.5 text-center text-xs font-black shadow-[2px_2px_0px_0px_#000] hover:scale-105 transition-transform"
              >
                🔵 쉬움
                <span className="block text-[10px] font-bold text-type-black/60">{previews[4]}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}
