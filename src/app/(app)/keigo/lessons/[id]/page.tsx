"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { lessons } from "@/data/lessons";
import { ComicViewer } from "@/components/keigo/ComicViewer";
import { DialoguePlayer } from "@/components/keigo/DialoguePlayer";
import { QuizSection } from "@/components/keigo/QuizSection";
import { LessonCompleteBanner } from "@/components/keigo/LessonCompleteBanner";
import { useProgressStore } from "@/store/useProgressStore";
import { completeKeigoLesson } from "@/actions/keigo";
import { CATEGORY_LABELS } from "@/types/lesson";
import type { XpResult } from "@/lib/xp";

type PageProps = { params: Promise<{ id: string }> };

export default function LessonDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();

  const lesson = lessons.find((l) => l.id === id);
  const completeLocal = useProgressStore((s) => s.completeLesson);

  if (!lesson) {
    notFound();
  }
  // TypeScript narrowing: lesson is guaranteed non-null after notFound() throws
  const lessonId = lesson!.id;
  const [activeSection, setActiveSection] = useState<"comic" | "dialogue" | "grammar" | "vocab" | "quiz">("comic");
  const [quizDone, setQuizDone] = useState(false);
  const [xpResult, setXpResult] = useState<(XpResult & { quizScore: number; quizTotal: number }) | null>(null);

  const SECTIONS = ["comic", "dialogue", "grammar", "vocab", "quiz"] as const;
  const SECTION_LABELS = {
    comic: "만화",
    dialogue: "대화",
    grammar: "문법",
    vocab: "어휘",
    quiz: "퀴즈",
  };

  async function handleQuizComplete(score: number, total: number) {
    setQuizDone(true);

    // Save to localStorage
    completeLocal(lessonId);

    // Save to DB (server action)
    try {
      const result = await completeKeigoLesson(lessonId, score, total);
      if (result) {
        setXpResult({ ...result, quizScore: score, quizTotal: total });
      } else {
        // Not logged in - just show basic result
        setXpResult({
          xpGained: 15,
          stampsGained: 1,
          newXp: 15,
          newLevel: 1,
          leveledUp: false,
          quizScore: score,
          quizTotal: total,
        });
      }
    } catch {
      setXpResult({
        xpGained: 0,
        stampsGained: 0,
        newXp: 0,
        newLevel: 1,
        leveledUp: false,
        quizScore: score,
        quizTotal: total,
      });
    }
  }

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark">
      {/* Header */}
      <div className="bg-white dark:bg-surface-dark px-5 pt-12 pb-4 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={() => router.back()}
            className="text-text-sub dark:text-text-sub-dark"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="flex-1">
            <span className="text-xs text-keigo-hover font-medium">
              {CATEGORY_LABELS[lesson.category]}
            </span>
            <h1 className="text-base font-bold text-text-main dark:text-text-main-dark leading-snug">
              {lesson.title}
            </h1>
          </div>
          <span className="text-3xl">{lesson.thumbnail}</span>
        </div>

        {/* Section tabs */}
        <div className="flex gap-1 overflow-x-auto">
          {SECTIONS.map((sec) => (
            <button
              key={sec}
              onClick={() => setActiveSection(sec)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                activeSection === sec
                  ? "bg-keigo text-white"
                  : "text-text-sub dark:text-text-sub-dark"
              }`}
            >
              {SECTION_LABELS[sec]}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 py-5">
        {/* Comic */}
        {activeSection === "comic" && (
          <ComicViewer frames={lesson.comicFrames} title={lesson.title} />
        )}

        {/* Dialogue */}
        {activeSection === "dialogue" && (
          <DialoguePlayer dialogue={lesson.dialogue} />
        )}

        {/* Grammar */}
        {activeSection === "grammar" && (
          <div className="flex flex-col gap-3">
            <h2 className="font-bold text-text-main dark:text-text-main-dark">문법 포인트</h2>
            {lesson.grammarPoints.map((gp, i) => (
              <div
                key={i}
                className="bg-white dark:bg-surface-dark rounded-2xl p-4 shadow-sm border border-orange-50 dark:border-border-dark"
              >
                <p className="font-bold text-keigo-hover font-japanese mb-1">{gp.rule}</p>
                <p className="text-sm text-text-sub dark:text-text-sub-dark">{gp.explanation}</p>
              </div>
            ))}
          </div>
        )}

        {/* Vocabulary */}
        {activeSection === "vocab" && (
          <div className="flex flex-col gap-3">
            <h2 className="font-bold text-text-main dark:text-text-main-dark">어휘</h2>
            {lesson.vocab.map((v, i) => (
              <div
                key={i}
                className="bg-white dark:bg-surface-dark rounded-2xl px-4 py-3 shadow-sm border border-orange-50 dark:border-border-dark flex items-center gap-3"
              >
                <span className="font-bold text-text-main dark:text-text-main-dark font-japanese flex-1">
                  {v.word}
                </span>
                <span className="text-sm text-text-sub dark:text-text-sub-dark">
                  {v.meaning}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Quiz */}
        {activeSection === "quiz" && !quizDone && (
          <div className="bg-white dark:bg-surface-dark rounded-2xl p-5 shadow-sm border border-orange-50 dark:border-border-dark">
            <h2 className="font-bold text-text-main dark:text-text-main-dark mb-4">
              확인 퀴즈 🎯
            </h2>
            <QuizSection quiz={lesson.quiz} onComplete={handleQuizComplete} />
          </div>
        )}

        {/* Navigate buttons */}
        {activeSection !== "quiz" && (
          <div className="mt-5">
            {activeSection === "vocab" ? (
              <button
                onClick={() => setActiveSection("quiz")}
                className="w-full bg-keigo hover:bg-keigo-hover text-white font-bold py-4 rounded-2xl transition-all active:scale-95"
              >
                퀴즈 풀기 →
              </button>
            ) : (
              <button
                onClick={() =>
                  setActiveSection(
                    SECTIONS[SECTIONS.indexOf(activeSection) + 1]
                  )
                }
                className="w-full bg-keigo-soft hover:bg-keigo/20 text-keigo-hover font-bold py-3 rounded-2xl transition-all text-sm"
              >
                다음: {SECTION_LABELS[SECTIONS[SECTIONS.indexOf(activeSection) + 1]]} →
              </button>
            )}
          </div>
        )}
      </div>

      {/* Completion banner */}
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
