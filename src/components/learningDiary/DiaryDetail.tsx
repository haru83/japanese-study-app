"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { completeLearningDiary } from "@/actions/learningDiary";
import { RubyText } from "@/components/learningDiary/RubyText";
import { QuizSection } from "@/components/keigo/QuizSection";
import { LessonCompleteBanner } from "@/components/keigo/LessonCompleteBanner";
import { GuestUpsellModal } from "@/components/guest/GuestUpsellModal";
import { BookmarkButton } from "@/components/bookmark/BookmarkButton";
import { TtsButton } from "@/components/ui/TtsButton";
import type { LearningDiary } from "@/types/learningDiary";
import type { XpResult } from "@/lib/xp";

type Section = "원문" | "어휘" | "문법" | "퀴즈";
const SECTIONS: Section[] = ["원문", "어휘", "문법", "퀴즈"];

const LEVEL_COLORS: Record<string, string> = {
  초급: "bg-matcha-green text-black border-2 border-black",
  중급: "bg-shiba-orange text-black border-2 border-black",
  고급: "bg-grape-punch text-white border-2 border-black",
};

interface Props {
  diary: LearningDiary;
  bookmarkMap?: Record<string, boolean>;
}

const REQUIRED_SECTIONS: Section[] = ["원문", "어휘", "문법"];

export function DiaryDetail({ diary, bookmarkMap }: Props) {
  const router = useRouter();
  const [section, setSection] = useState<Section>("원문");
  const [visitedSections, setVisitedSections] = useState<Set<Section>>(() => new Set(["원문"]));
  const [showRuby, setShowRuby] = useState(false);
  const [showKorean, setShowKorean] = useState(false);
  const [xpResult, setXpResult] = useState<XpResult | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizTotal, setQuizTotal] = useState(0);
  const [guestScore, setGuestScore] = useState<{ score: number; total: number } | null>(null);
  const [, startTransition] = useTransition();

  const isQuizUnlocked = REQUIRED_SECTIONS.every((s) => visitedSections.has(s));

  const handleSelectSection = (s: Section) => {
    setVisitedSections((prev) => new Set([...prev, s]));
    setSection(s);
  };

  function handleQuizComplete(score: number, total: number) {
    setQuizScore(score);
    setQuizTotal(total);
    startTransition(async () => {
      const result = await completeLearningDiary(diary.id, score, total);
      if (result) {
        setXpResult(result);
      } else {
        setGuestScore({ score, total });
      }
    });
  }

  return (
    <main className="flex flex-col h-full overflow-hidden bg-sakura-blush">
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

        <div className="flex border-t-2 border-black -mx-4 px-4">
          {SECTIONS.map((s) => {
            const isVisited = visitedSections.has(s);
            const isQuiz = s === "퀴즈";
            const isLocked = isQuiz && !isQuizUnlocked;

            return (
              <button
                key={s}
                onClick={() => handleSelectSection(s)}
                className={`flex-1 py-2.5 text-xs font-black transition-colors flex items-center justify-center gap-1 ${
                  section === s
                    ? "text-grape-punch border-b-2 border-grape-punch"
                    : isLocked
                    ? "text-type-black/35"
                    : "text-type-black/60"
                }`}
              >
                <span>{s}</span>
                {isVisited && !isQuiz && (
                  <span className="text-[10px] text-matcha-green font-black">✓</span>
                )}
                {isLocked && <span className="text-[11px]">🔒</span>}
              </button>
            );
          })}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-4 pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={section}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
          >
            {section === "원문" && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowRuby((v) => !v)}
                    className={`flex-1 py-2 px-2 rounded-xl text-xs font-black border-2 border-black transition-all flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 ${
                      showRuby
                        ? "bg-grape-punch text-white"
                        : "bg-paper-white text-type-black/70 hover:bg-canvas-almond/60"
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm leading-none block select-none">
                      translate
                    </span>
                    <span>요미가나 {showRuby ? "표시" : "숨김"}</span>
                  </button>
                  <button
                    onClick={() => setShowKorean((v) => !v)}
                    className={`flex-1 py-2 px-2 rounded-xl text-xs font-black border-2 border-black transition-all flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 ${
                      showKorean
                        ? "bg-sakura-pink text-black"
                        : "bg-paper-white text-type-black/70 hover:bg-canvas-almond/60"
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm leading-none block select-none">
                      subtitles
                    </span>
                    <span>한국어 해석 {showKorean ? "표시" : "숨김"}</span>
                  </button>
                  <TtsButton
                    text={diary.contentJp.map((s) => s.text).join("")}
                    size="lg"
                    showLabel={true}
                    label="일기 듣기"
                  />
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

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => handleSelectSection("어휘")}
                    className="w-full py-3 px-4 rounded-[15px] border-2 border-black bg-paper-white hover:bg-canvas-almond text-type-black font-black shadow-[3px_3px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2"
                  >
                    <span>어휘 학습하기</span>
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </button>
                </div>
              </div>
            )}

            {section === "어휘" && (
              <div className="flex flex-col gap-3">
                {diary.vocabulary.map((v, i) => (
                  <div
                    key={i}
                    className="bg-paper-white rounded-[15px] p-4 border-2 border-black shadow-[4px_4px_0px_0px_#000] flex items-center gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-type-black">{v.word}</p>
                      <p className="text-xs text-type-black/60 font-bold">{v.reading}</p>
                    </div>
                    <span className="text-sm text-grape-punch font-black shrink-0">{v.meaning}</span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <TtsButton text={v.word} size="sm" />
                      <BookmarkButton
                        word={v.word}
                        itemType="vocab"
                        reading={v.reading}
                        meaning={v.meaning}
                        source={diary.title}
                        initialBookmarked={bookmarkMap?.[v.word] ?? false}
                      />
                    </div>
                  </div>
                ))}

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => handleSelectSection("문법")}
                    className="w-full py-3 px-4 rounded-[15px] border-2 border-black bg-paper-white hover:bg-canvas-almond text-type-black font-black shadow-[3px_3px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2"
                  >
                    <span>문법 포인트 확인하기</span>
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </button>
                </div>
              </div>
            )}

            {section === "문법" && (
              <div className="flex flex-col gap-3">
                {diary.grammarPoints.map((g, i) => (
                  <div
                    key={i}
                    className="bg-paper-white rounded-[15px] p-4 border-2 border-black shadow-[4px_4px_0px_0px_#000] flex items-start justify-between gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-grape-punch mb-1">{g.rule}</p>
                      <p className="text-sm text-type-black leading-relaxed">{g.explanation}</p>
                    </div>
                    <BookmarkButton
                      word={g.rule}
                      itemType="grammar"
                      meaning={g.explanation}
                      source={diary.title}
                      initialBookmarked={bookmarkMap?.[g.rule] ?? false}
                    />
                  </div>
                ))}

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => handleSelectSection("퀴즈")}
                    className="w-full py-3 px-4 rounded-[15px] border-2 border-black bg-sakura-pink text-type-black font-black shadow-[3px_3px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2"
                  >
                    <span>{isQuizUnlocked ? "확인 퀴즈 풀기 🎯" : "퀴즈 도전하기 🎯"}</span>
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </button>
                </div>
              </div>
            )}

            {section === "퀴즈" && (
              <div className="bg-paper-white rounded-[15px] p-5 border-2 border-black shadow-[4px_4px_0px_0px_#000]">
                {!isQuizUnlocked ? (
                  <div className="text-center py-3">
                    <div className="text-4xl mb-2">🔒</div>
                    <h2 className="text-base font-black text-type-black">퀴즈가 아직 잠겨있어요!</h2>
                    <p className="text-xs text-type-black/70 font-bold mt-1 mb-5">
                      원문, 어휘, 문법을 모두 확인한 후 퀴즈에 도전할 수 있어요.
                    </p>

                    <div className="flex flex-col gap-2 max-w-xs mx-auto text-left">
                      {REQUIRED_SECTIONS.map((sec) => {
                        const visited = visitedSections.has(sec);
                        return (
                          <button
                            key={sec}
                            onClick={() => handleSelectSection(sec)}
                            className={`flex items-center justify-between p-3 rounded-xl border-2 border-black font-bold text-xs transition-all ${
                              visited
                                ? "bg-matcha-green/20 text-type-black"
                                : "bg-paper-white shadow-[2px_2px_0px_0px_#000] hover:bg-canvas-almond"
                            }`}
                          >
                            <span>{sec} 확인</span>
                            <span className="font-black">
                              {visited ? "✓ 확인 완료" : "학습하러 가기 →"}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="font-black text-type-black mb-4">확인 퀴즈 🎯</h2>
                    <QuizSection
                      quiz={diary.quiz}
                      onComplete={handleQuizComplete}
                      onReview={() => handleSelectSection("원문")}
                    />
                  </>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {guestScore && (
        <GuestUpsellModal
          quizScore={guestScore.score}
          quizTotal={guestScore.total}
          onClose={() => setGuestScore(null)}
        />
      )}

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
