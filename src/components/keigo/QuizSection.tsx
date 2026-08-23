"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { isQuizPassed, QUIZ_PASS_THRESHOLD } from "@/lib/quiz";

interface QuizItem {
  question: string;
  options: string[];
  answer: string;
  explanation?: string;
}

interface QuizSectionProps {
  quiz: QuizItem[];
  onComplete: (score: number, total: number) => void;
  onReview?: () => void;
}

export function QuizSection({ quiz, onComplete, onReview }: QuizSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [isPassed, setIsPassed] = useState(false);

  const current = quiz[currentIndex];

  function handleSelect(option: string) {
    if (selected) return;
    setSelected(option);

    const isCorrect = option === current.answer;
    const nextScore = isCorrect ? score + 1 : score;
    if (isCorrect) setScore((s) => s + 1);

    setTimeout(() => {
      if (currentIndex + 1 < quiz.length) {
        setCurrentIndex((i) => i + 1);
        setSelected(null);
      } else {
        const passed = isQuizPassed(nextScore, quiz.length);
        setIsPassed(passed);
        setFinished(true);
        if (passed) {
          onComplete(nextScore, quiz.length);
        }
      }
    }, 1200);
  }

  function handleRetry() {
    setCurrentIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setIsPassed(false);
  }

  if (finished) {
    const pct = quiz.length > 0 ? Math.round((score / quiz.length) * 100) : 100;
    const passPct = Math.round(QUIZ_PASS_THRESHOLD * 100);

    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center py-6"
      >
        <div className="text-6xl mb-3">{isPassed ? (pct === 100 ? "🌟" : "⭐") : "📚"}</div>
        <p className="text-xl font-black text-type-black">
          {score} / {quiz.length} 정답 ({pct}%)
        </p>

        {isPassed ? (
          <p className="text-type-black/60 font-bold text-sm mt-1">
            {pct === 100 ? "완벽해요! +5 보너스 XP 🎉" : "잘했어요! 학습을 완료했어요! 🎉"}
          </p>
        ) : (
          <div className="mt-2 mb-6">
            <p className="text-red-600 font-black text-sm">
              통과 기준({passPct}% 이상)에 도달하지 못했어요.
            </p>
            <p className="text-type-black/60 font-bold text-xs mt-1">
              내용을 다시 복습하거나 퀴즈를 다시 풀어보세요!
            </p>
          </div>
        )}

        {!isPassed && (
          <div className="flex flex-col sm:flex-row gap-2.5 justify-center mt-5">
            <button
              onClick={handleRetry}
              className="py-3 px-5 rounded-[15px] border-2 border-black bg-sakura-pink text-type-black font-black shadow-[3px_3px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">refresh</span>
              <span>다시 도전하기</span>
            </button>
            {onReview && (
              <button
                onClick={() => {
                  handleRetry();
                  onReview();
                }}
                className="py-3 px-5 rounded-[15px] border-2 border-black bg-paper-white text-type-black font-black shadow-[3px_3px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-base">menu_book</span>
                <span>내용 복습하러 가기</span>
              </button>
            )}
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <div>
      {/* Progress */}
      <div className="flex justify-between text-xs text-type-black/60 font-bold mb-2">
        <span>문제 {currentIndex + 1} / {quiz.length}</span>
        <span>점수 {score}점</span>
      </div>
      <div className="w-full bg-canvas-almond rounded-full h-2 mb-4 border border-black">
        <div
          className="bg-grape-punch h-2 rounded-full transition-all"
          style={{ width: `${((currentIndex + 1) / quiz.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <p className="font-black text-type-black mb-4">{current.question}</p>

          {/* Options */}
          <div className="flex flex-col gap-2">
            {current.options.map((option) => {
              const isSelected = selected === option;
              const isCorrect = option === current.answer;
              const isWrong = isSelected && !isCorrect;

              return (
                <motion.button
                  key={option}
                  onClick={() => handleSelect(option)}
                  whileTap={{ scale: 0.97 }}
                  disabled={!!selected}
                  className={`w-full py-3 px-4 rounded-[15px] text-left text-sm font-black transition-all border-2 ${
                    selected
                      ? isCorrect
                        ? "bg-matcha-green border-black text-black shadow-[2px_2px_0px_0px_#000]"
                        : isWrong
                        ? "bg-red-300 border-black text-black"
                        : "bg-paper-white border-black text-type-black/50"
                      : "bg-paper-white border-black text-type-black hover:shadow-[2px_2px_0px_0px_#000] shadow-[3px_3px_0px_0px_#000]"
                  }`}
                >
                  <span>{option}</span>
                  {selected && isCorrect && <span className="ml-2">✓</span>}
                  {isWrong && <span className="ml-2">✗</span>}
                </motion.button>
              );
            })}
          </div>

          {/* Feedback */}
          <AnimatePresence>
            {selected && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-center text-sm font-black mt-3 ${
                  selected === current.answer ? "text-matcha-green" : "text-red-500"
                }`}
              >
                {selected === current.answer ? "정답이에요! 🎉" : `정답: ${current.answer}`}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
