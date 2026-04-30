"use client";

import { useState } from "react";
import { useProgressStore } from "@/store/useProgressStore";
import { lessons } from "@/data/lessons";
import { LessonCard } from "@/components/keigo/LessonCard";
import { CategoryFilter } from "@/components/keigo/CategoryFilter";
import type { LessonCategory } from "@/types/lesson";

export default function KeigoPage() {
  const completedLessons = useProgressStore((s) => s.completedLessons);
  const [category, setCategory] = useState<LessonCategory>("all");

  const filtered = category === "all"
    ? lessons
    : lessons.filter((l) => l.category === category);

  const completedCount = completedLessons.length;

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark">
      {/* Header */}
      <div className="bg-white dark:bg-surface-dark px-5 pt-12 pb-5 shadow-sm">
        <h1 className="text-xl font-bold text-text-main dark:text-text-main-dark">
          경어 레슨 🎯
        </h1>
        <p className="text-sm text-text-sub dark:text-text-sub-dark mt-0.5">
          {completedCount} / {lessons.length} 완료
        </p>

        {/* Overall progress bar */}
        <div className="mt-3 w-full bg-gray-100 dark:bg-border-dark rounded-full h-1.5">
          <div
            className="bg-keigo h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${(completedCount / lessons.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="px-5 py-4">
        {/* Category filter */}
        <CategoryFilter active={category} onChange={setCategory} />

        {/* Lesson list */}
        <div className="mt-4 flex flex-col gap-3">
          {filtered.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              completed={completedLessons.includes(lesson.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
