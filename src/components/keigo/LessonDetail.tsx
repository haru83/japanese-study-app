"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { DialoguePlayer } from "@/components/keigo/DialoguePlayer";
import { QuizSection } from "@/components/keigo/QuizSection";
import { LessonCompleteBanner } from "@/components/keigo/LessonCompleteBanner";
import { useProgressStore } from "@/store/useProgressStore";
import { completeKeigoLesson } from "@/actions/keigo";
import { CATEGORY_LABELS } from "@/types/lesson";
import { GuestUpsellModal } from "@/components/guest/GuestUpsellModal";
import { RubyText } from "@/components/learningDiary/RubyText";
import { buildRubySegments } from "@/lib/rubyParser";
import type { Lesson } from "@/types/lesson";
import type { XpResult } from "@/lib/xp";

const SECTIONS = ["dialogue", "grammar", "vocab", "quiz"] as const;
type SectionKey = (typeof SECTIONS)[number];

const SECTION_LABELS: Record<SectionKey, string> = {
  dialogue: "대화",
  grammar: "문법",
  vocab: "어휘",
  quiz: "퀴즈",
};

const CATEGORY_BG: Record<string, string> = {
  business: "bg-grape-punch text-white",
  hospitality: "bg-sakura-pink text-black",
  social: "bg-matcha-green text-black",
};

interface Props {
  lesson: Lesson;
}

export function LessonDetail({ lesson }: Props) {
  const router = useRouter();
  const completeLocal = useProgressStore((s) => s.completeLesson);

  const [activeSection, setActiveSection] = useState<SectionKey>("dialogue");
  const [quizDone, setQuizDone] = useState(false);
  const [xpResult, setXpResult] = useState<(XpResult & { quizScore: number; quizTotal: number }) | null>(null);
  const [guestScore, setGuestScore] = useState<{ score: number; total: number } | null>(null);

  const vocabSegments = useMemo(
    () =>
      lesson.vocab.map((v) => {
        const reading = (v as { reading?: string }).reading;
        return reading ? buildRubySegments(v.word, reading) : [{ text: v.word }];
      }),
    [lesson.vocab]
  );

  async function handleQuizComplete(score: number, total: number) {
    setQuizDone(true);
    completeLocal(lesson.id);
    try {
      const result = await completeKeigoLesson(lesson.id, score, total);
      if (result) {
        setXpResult({ ...result, quizScore: score, quizTotal: total });
      } else {
        setGuestScore({ score, total });
      }
    } catch {
      setGuestScore({ score, total });
    }
  }

  return (
    <div className="min-h-screen bg-sakura-blush">
      {/* Header */}
      <div className="bg-canvas-almond border-b-4 border-black px-5 pt-12 pb-0">
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full border-2 border-black bg-paper-white shadow-[2px_2px_0px_0px_#000] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all text-type-black -ml-1"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="flex-1">
            <span
              className={`text-xs font-black px-2 py-0.5 rounded-full border-2 border-black ${
                CATEGORY_BG[lesson.category] ?? "bg-canvas-almond text-black"
              }`}
            >
              {CATEGORY_LABELS[lesson.category]}
            </span>
            <h1 className="text-base font-black text-type-black leading-snug mt-0.5">
              {lesson.title}
            </h1>
          </div>
          <span className="text-3xl">{lesson.thumbnail}</span>
        </div>

        {/* Section tabs */}
        <div className="flex border-t-2 border-black -mx-5 px-5">
          {SECTIONS.map((sec) => (
            <button
              key={sec}
              onClick={() => setActiveSection(sec)}
              className={`flex-1 py-2.5 text-xs font-black transition-colors ${
                activeSection === sec
                  ? "text-grape-punch border-b-2 border-grape-punch"
                  : "text-type-black/50"
              }`}
            >
              {SECTION_LABELS[sec]}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 py-5">
        {activeSection === "dialogue" && <DialoguePlayer dialogue={lesson.dialogue} />}

        {activeSection === "grammar" && (
          <div className="flex flex-col gap-3">
            <h2 className="font-black text-type-black">문법 포인트</h2>
            {lesson.grammarPoints.map((gp, i) => (
              <div
                key={i}
                className="bg-paper-white rounded-[15px] p-4 border-2 border-black shadow-[4px_4px_0px_0px_#000]"
              >
                <p className="font-black text-grape-punch mb-1">{gp.rule}</p>
                <p className="text-sm text-type-black/80">{gp.explanation}</p>
              </div>
            ))}
          </div>
        )}

        {activeSection === "vocab" && (
          <div className="flex flex-col gap-3">
            <h2 className="font-black text-type-black">어휘</h2>
            {lesson.vocab.map((v, i) => (
              <div
                key={i}
                className="bg-paper-white rounded-[15px] px-4 py-3 border-2 border-black shadow-[4px_4px_0px_0px_#000] flex items-center gap-3"
              >
                <span className="font-black text-type-black flex-1 leading-loose">
                  <RubyText segments={vocabSegments[i]} showRuby={true} />
                </span>
                <span className="text-sm text-grape-punch font-black">{v.meaning}</span>
              </div>
            ))}
          </div>
        )}

        {activeSection === "quiz" && !quizDone && (
          <div className="bg-paper-white rounded-[15px] p-5 border-2 border-black shadow-[4px_4px_0px_0px_#000]">
            <h2 className="font-black text-type-black mb-4">확인 퀴즈 🎯</h2>
            <QuizSection quiz={lesson.quiz} onComplete={handleQuizComplete} />
          </div>
        )}

        {activeSection !== "quiz" && (
          <div className="mt-5">
            {activeSection === "vocab" ? (
              <button
                onClick={() => setActiveSection("quiz")}
                className="w-full bg-grape-punch text-white font-black py-4 rounded-[15px] border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all active:scale-95"
              >
                퀴즈 풀기 →
              </button>
            ) : (
              <button
                onClick={() => setActiveSection(SECTIONS[SECTIONS.indexOf(activeSection) + 1])}
                className="w-full bg-canvas-almond text-type-black font-black py-3 rounded-[15px] border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] transition-all text-sm"
              >
                다음: {SECTION_LABELS[SECTIONS[SECTIONS.indexOf(activeSection) + 1]]} →
              </button>
            )}
          </div>
        )}
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
          quizScore={xpResult.quizScore}
          quizTotal={xpResult.quizTotal}
        />
      )}
    </div>
  );
}
