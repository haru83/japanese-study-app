"use client";

import { useState, useTransition } from "react";
import { notFound, useRouter } from "next/navigation";
import { use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { learningDiaries } from "@/data/learningDiaries";
import { completeLearningDiary } from "@/actions/learningDiary";
import { RubyText } from "@/components/learningDiary/RubyText";
import { QuizSection } from "@/components/keigo/QuizSection";
import { LessonCompleteBanner } from "@/components/keigo/LessonCompleteBanner";
import type { XpResult } from "@/lib/xp";

type Section = "원문" | "해석" | "어휘" | "문법" | "퀴즈";
const SECTIONS: Section[] = ["원문", "해석", "어휘", "문법", "퀴즈"];

const LEVEL_COLORS = {
  초급: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  중급: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  고급: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
};

export default function LearnDiaryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const diary = learningDiaries.find((d) => d.id === id);
  if (!diary) notFound();

  const router = useRouter();
  const [section, setSection] = useState<Section>("원문");
  const [showRuby, setShowRuby] = useState(true);
  const [xpResult, setXpResult] = useState<XpResult | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizTotal, setQuizTotal] = useState(0);
  const [, startTransition] = useTransition();

  function handleQuizComplete(score: number, total: number) {
    setQuizScore(score);
    setQuizTotal(total);
    startTransition(async () => {
      const result = await completeLearningDiary(diary!.id, score, total);
      if (result) setXpResult(result);
    });
  }

  return (
    <main className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <header className="flex items-center gap-3 px-4 pt-4 pb-2 shrink-0">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-text-main dark:text-text-main-dark"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${LEVEL_COLORS[diary.level]}`}>
              {diary.level}
            </span>
            <span className="text-[10px] text-text-sub dark:text-text-sub-dark">{diary.category}</span>
          </div>
          <h1 className="font-bold text-text-main dark:text-text-main-dark truncate">
            {diary.title}
          </h1>
          <p className="text-xs text-text-sub dark:text-text-sub-dark truncate">{diary.titleKo}</p>
        </div>
        <span className="text-2xl shrink-0">{diary.thumbnail}</span>
      </header>

      {/* Section tabs */}
      <div className="flex border-b border-gray-100 dark:border-border-dark shrink-0 px-2">
        {SECTIONS.map((s) => (
          <button
            key={s}
            onClick={() => setSection(s)}
            className={`flex-1 py-2 text-xs font-medium transition-colors ${
              section === s
                ? "text-primary border-b-2 border-primary"
                : "text-text-sub dark:text-text-sub-dark"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={section}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
          >
            {/* 원문 */}
            {section === "원문" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-text-sub dark:text-text-sub-dark">일본어 본문</p>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <span className="text-xs text-text-sub dark:text-text-sub-dark">후리가나</span>
                    <div
                      onClick={() => setShowRuby((v) => !v)}
                      className={`relative w-10 h-5 rounded-full transition-colors ${
                        showRuby ? "bg-primary" : "bg-gray-200 dark:bg-border-dark"
                      }`}
                    >
                      <div
                        className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                          showRuby ? "translate-x-5" : "translate-x-0.5"
                        }`}
                      />
                    </div>
                  </label>
                </div>
                <div className="bg-white dark:bg-surface-dark rounded-2xl p-5 shadow-sm border border-orange-50 dark:border-border-dark">
                  <p className="text-base leading-loose font-japanese text-text-main dark:text-text-main-dark">
                    <RubyText segments={diary.contentJp} showRuby={showRuby} />
                  </p>
                </div>
              </div>
            )}

            {/* 해석 */}
            {section === "해석" && (
              <div className="bg-white dark:bg-surface-dark rounded-2xl p-5 shadow-sm border border-orange-50 dark:border-border-dark">
                <p className="text-sm leading-relaxed text-text-main dark:text-text-main-dark">
                  {diary.contentKo}
                </p>
              </div>
            )}

            {/* 어휘 */}
            {section === "어휘" && (
              <div className="flex flex-col gap-3">
                {diary.vocabulary.map((v, i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-surface-dark rounded-2xl p-4 shadow-sm border border-orange-50 dark:border-border-dark flex items-center gap-4"
                  >
                    <div className="flex-1">
                      <p className="font-bold text-text-main dark:text-text-main-dark font-japanese">
                        {v.word}
                      </p>
                      <p className="text-xs text-text-sub dark:text-text-sub-dark font-japanese">
                        {v.reading}
                      </p>
                    </div>
                    <span className="text-sm text-primary font-medium">{v.meaning}</span>
                  </div>
                ))}
              </div>
            )}

            {/* 문법 */}
            {section === "문법" && (
              <div className="flex flex-col gap-3">
                {diary.grammarPoints.map((g, i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-surface-dark rounded-2xl p-4 shadow-sm border border-orange-50 dark:border-border-dark"
                  >
                    <p className="font-bold text-primary mb-1 font-japanese">{g.rule}</p>
                    <p className="text-sm text-text-main dark:text-text-main-dark leading-relaxed">
                      {g.explanation}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* 퀴즈 */}
            {section === "퀴즈" && (
              <QuizSection quiz={diary.quiz} onComplete={handleQuizComplete} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Complete banner */}
      {xpResult && (
        <LessonCompleteBanner
          xpGained={xpResult.xpGained}
          stampsGained={xpResult.stampsGained}
          leveledUp={xpResult.leveledUp}
          newLevel={xpResult.newLevel}
          quizScore={quizScore}
          quizTotal={quizTotal}
          backHref="/diary/learn"
          backLabel="목록으로"
        />
      )}
    </main>
  );
}
