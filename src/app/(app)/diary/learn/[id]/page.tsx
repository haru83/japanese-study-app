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
import { GuestUpsellModal } from "@/components/guest/GuestUpsellModal";
import type { XpResult } from "@/lib/xp";

type Section = "원문" | "해석" | "어휘" | "문법" | "퀴즈";
const SECTIONS: Section[] = ["원문", "해석", "어휘", "문법", "퀴즈"];

const LEVEL_COLORS: Record<string, string> = {
  초급: "bg-matcha-green text-black border-2 border-black",
  중급: "bg-shiba-orange text-black border-2 border-black",
  고급: "bg-grape-punch text-white border-2 border-black",
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
  const [showKorean, setShowKorean] = useState(false);
  const [xpResult, setXpResult] = useState<XpResult | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizTotal, setQuizTotal] = useState(0);
  const [guestScore, setGuestScore] = useState<{ score: number; total: number } | null>(null);
  const [, startTransition] = useTransition();

  function handleQuizComplete(score: number, total: number) {
    setQuizScore(score);
    setQuizTotal(total);
    startTransition(async () => {
      const result = await completeLearningDiary(diary!.id, score, total);
      if (result) {
        setXpResult(result);
      } else {
        setGuestScore({ score, total });
      }
    });
  }

  return (
    <main className="flex flex-col h-full overflow-hidden bg-sakura-blush">
      {/* Header */}
      <header className="bg-canvas-almond border-b-4 border-black px-4 pt-12 pb-0 shrink-0">
        <div className="flex items-center gap-3 pb-3">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full border-2 border-black bg-paper-white shadow-[2px_2px_0px_0px_#000] transition-all hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] text-type-black"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span
                className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                  LEVEL_COLORS[diary.level] ?? "bg-canvas-almond text-black border-2 border-black"
                }`}
              >
                {diary.level}
              </span>
              <span className="text-[10px] text-type-black/60 font-bold">{diary.category}</span>
            </div>
            <h1 className="font-black text-type-black truncate">{diary.title}</h1>
            <p className="text-xs text-type-black/60 font-bold truncate">{diary.titleKo}</p>
          </div>
          <span className="text-2xl shrink-0">{diary.thumbnail}</span>
        </div>

        {/* Section tabs */}
        <div className="flex border-t-2 border-black -mx-4 px-4">
          {SECTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setSection(s)}
              className={`flex-1 py-2.5 text-xs font-black transition-colors ${
                section === s
                  ? "text-grape-punch border-b-2 border-grape-punch"
                  : "text-type-black/50"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </header>

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
              <div className="space-y-3">
                {/* Toggle buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowRuby((v) => !v)}
                    className={`flex-1 py-2 rounded-xl text-xs font-black border-2 border-black transition-all ${
                      showRuby
                        ? "bg-grape-punch text-white shadow-[2px_2px_0px_0px_#000]"
                        : "bg-paper-white text-type-black/60"
                    }`}
                  >
                    요미가나 {showRuby ? "표시" : "숨김"}
                  </button>
                  <button
                    onClick={() => setShowKorean((v) => !v)}
                    className={`flex-1 py-2 rounded-xl text-xs font-black border-2 border-black transition-all ${
                      showKorean
                        ? "bg-sakura-pink text-black shadow-[2px_2px_0px_0px_#000]"
                        : "bg-paper-white text-type-black/60"
                    }`}
                  >
                    한국어 해석 {showKorean ? "표시" : "숨김"}
                  </button>
                </div>

                <div className="bg-paper-white rounded-[15px] p-5 border-2 border-black shadow-[4px_4px_0px_0px_#000]">
                  <p className="text-base leading-loose text-type-black">
                    <RubyText segments={diary.contentJp} showRuby={showRuby} />
                  </p>
                </div>

                {showKorean && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-canvas-almond rounded-[15px] p-5 border-2 border-black shadow-[4px_4px_0px_0px_#000]"
                  >
                    <p className="text-sm leading-relaxed text-type-black font-bold">
                      {diary.contentKo}
                    </p>
                  </motion.div>
                )}
              </div>
            )}

            {/* 해석 */}
            {section === "해석" && (
              <div className="bg-paper-white rounded-[15px] p-5 border-2 border-black shadow-[4px_4px_0px_0px_#000]">
                <p className="text-sm leading-relaxed text-type-black">{diary.contentKo}</p>
              </div>
            )}

            {/* 어휘 */}
            {section === "어휘" && (
              <div className="flex flex-col gap-3">
                {diary.vocabulary.map((v, i) => (
                  <div
                    key={i}
                    className="bg-paper-white rounded-[15px] p-4 border-2 border-black shadow-[4px_4px_0px_0px_#000] flex items-center gap-4"
                  >
                    <div className="flex-1">
                      <p className="font-black text-type-black">{v.word}</p>
                      <p className="text-xs text-type-black/60 font-bold">{v.reading}</p>
                    </div>
                    <span className="text-sm text-grape-punch font-black">{v.meaning}</span>
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
                    className="bg-paper-white rounded-[15px] p-4 border-2 border-black shadow-[4px_4px_0px_0px_#000]"
                  >
                    <p className="font-black text-grape-punch mb-1">{g.rule}</p>
                    <p className="text-sm text-type-black leading-relaxed">{g.explanation}</p>
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

      {/* Guest upsell modal */}
      {guestScore && (
        <GuestUpsellModal
          quizScore={guestScore.score}
          quizTotal={guestScore.total}
          onClose={() => setGuestScore(null)}
        />
      )}

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
