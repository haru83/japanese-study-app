import Link from "next/link";
import type { Lesson } from "@/types/lesson";
import { CATEGORY_LABELS } from "@/types/lesson";

interface LessonCardProps {
  lesson: Lesson;
  completed?: boolean;
}

const CATEGORY_COLORS = {
  business: "bg-blue-100 text-blue-700",
  hospitality: "bg-keigo-soft text-pink-600",
  social: "bg-green-100 text-green-700",
};

export function LessonCard({ lesson, completed }: LessonCardProps) {
  return (
    <Link
      href={`/keigo/lessons/${lesson.id}`}
      className="relative bg-white dark:bg-surface-dark rounded-2xl p-4 shadow-sm border border-orange-50 dark:border-border-dark hover:shadow-md transition-shadow active:scale-95 flex gap-3"
    >
      {/* Thumbnail */}
      <div className="w-14 h-14 rounded-xl bg-keigo-soft flex items-center justify-center text-3xl flex-shrink-0">
        {lesson.thumbnail}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${CATEGORY_COLORS[lesson.category]}`}
          >
            {CATEGORY_LABELS[lesson.category]}
          </span>
          {completed && (
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
              완료 ✓
            </span>
          )}
        </div>
        <p className="font-bold text-text-main dark:text-text-main-dark text-sm leading-snug">
          {lesson.title}
        </p>
        <p className="text-xs text-text-sub dark:text-text-sub-dark mt-1">
          대화 {lesson.dialogue.length}줄 · 퀴즈 {lesson.quiz.length}문제
        </p>
      </div>

      {/* Arrow */}
      <div className="self-center text-text-sub">
        <span className="material-symbols-outlined text-sm">chevron_right</span>
      </div>
    </Link>
  );
}
