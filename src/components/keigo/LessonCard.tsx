import Link from "next/link";
import type { Lesson } from "@/types/lesson";
import { CATEGORY_LABELS } from "@/types/lesson";

interface LessonCardProps {
  lesson: Lesson;
  completed?: boolean;
}

const CATEGORY_BG: Record<string, string> = {
  business: "bg-grape-punch text-white",
  hospitality: "bg-sakura-pink text-black",
  social: "bg-matcha-green text-black",
};

const WOBBLE = ["wobbly-1", "wobbly-2", "wobbly-3", "wobbly-4", "wobbly-5"];

function wobbleFor(id: string) {
  const hash = id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return WOBBLE[hash % WOBBLE.length];
}

export function LessonCard({ lesson, completed }: LessonCardProps) {
  const wobble = wobbleFor(lesson.id);
  return (
    <Link
      href={`/keigo/lessons/${lesson.id}`}
      className={`relative bg-paper-white rounded-[15px] p-4 border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all active:scale-95 flex gap-3 ${wobble}`}
    >
      {/* Thumbnail sticker */}
      <div className="w-14 h-14 rounded-xl bg-canvas-almond border-2 border-black flex items-center justify-center text-3xl flex-shrink-0">
        {lesson.thumbnail}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-bold border-2 border-black ${CATEGORY_BG[lesson.category] ?? "bg-canvas-almond text-black"}`}
          >
            {CATEGORY_LABELS[lesson.category]}
          </span>
          {completed && (
            <span className="text-xs bg-matcha-green text-black px-2 py-0.5 rounded-full font-bold border-2 border-black">
              완료 ✓
            </span>
          )}
        </div>
        <p className="font-bold text-type-black text-sm leading-snug">
          {lesson.title}
        </p>
        <p className="text-xs text-type-black/60 mt-1">
          대화 {lesson.dialogue.length}줄 · 퀴즈 {lesson.quiz.length}문제
        </p>
      </div>

      <div className="self-center text-type-black">
        <span className="material-symbols-outlined text-sm">chevron_right</span>
      </div>
    </Link>
  );
}
