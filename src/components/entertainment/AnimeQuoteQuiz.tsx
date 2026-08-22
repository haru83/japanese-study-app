"use client";

import { useState } from "react";
import type { AnimeQuizItem } from "@/data/animeQuotes";

interface Props {
  quiz: AnimeQuizItem;
}

export function AnimeQuoteQuiz({ quiz }: Props) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelect = (index: number) => {
    if (isSubmitted) return;
    setSelectedOption(index);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
  };

  const isCorrect = selectedOption === quiz.correctIndex;

  return (
    <div className="bg-canvas-almond/50 rounded-xl border-2 border-black p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-black text-type-black flex items-center gap-1.5 bg-paper-white px-2.5 py-1 rounded-full border border-black shadow-[1px_1px_0px_0px_#000]">
          <span>🎯</span> 대사 빈칸 퀴즈
        </span>
        {isSubmitted && (
          <button
            type="button"
            onClick={handleReset}
            className="text-[11px] font-bold text-type-black/60 hover:text-type-black underline flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">refresh</span> 다시 풀기
          </button>
        )}
      </div>

      <p className="text-sm font-black text-type-black leading-relaxed">
        {quiz.question}
      </p>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {quiz.options.map((option, idx) => {
          let btnStyle = "bg-paper-white hover:bg-shiba-orange/20 text-type-black";

          if (isSubmitted) {
            if (idx === quiz.correctIndex) {
              btnStyle = "bg-matcha-green text-type-black font-black border-2 border-black";
            } else if (idx === selectedOption) {
              btnStyle = "bg-sakura-pink text-type-black opacity-80 line-through border-2 border-black";
            } else {
              btnStyle = "bg-paper-white/50 text-type-black/40 border-black/30";
            }
          }

          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelect(idx)}
              disabled={isSubmitted}
              className={`p-2.5 rounded-lg border-2 border-black text-xs font-bold text-left transition-all flex items-center justify-between ${btnStyle} ${
                !isSubmitted ? "hover:translate-x-0.5 hover:translate-y-0.5 shadow-[2px_2px_0px_0px_#000]" : ""
              }`}
            >
              <span>{idx + 1}. {option}</span>
              {isSubmitted && idx === quiz.correctIndex && (
                <span className="text-xs font-black">✓ 정답</span>
              )}
              {isSubmitted && idx === selectedOption && idx !== quiz.correctIndex && (
                <span className="text-xs font-black">✕ 오답</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback Explanation */}
      {isSubmitted && (
        <div
          className={`p-3 rounded-lg border-2 border-black text-xs space-y-1 ${
            isCorrect ? "bg-matcha-green/20" : "bg-sakura-pink/30"
          }`}
        >
          <div className="flex items-center gap-1.5 font-black">
            <span>{isCorrect ? "🎉 정답입니다!" : "💡 오답 노트"}</span>
          </div>
          <p className="text-type-black/80 font-bold leading-relaxed">
            {quiz.explanation}
          </p>
        </div>
      )}
    </div>
  );
}
