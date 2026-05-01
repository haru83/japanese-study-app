"use client";

import { useState } from "react";
import { useProgressStore } from "@/store/useProgressStore";
import { lessons } from "@/data/lessons";
import { LessonCard } from "@/components/keigo/LessonCard";
import { CategoryFilter } from "@/components/keigo/CategoryFilter";
import { ProgressBar } from "@/components/ui/ProgressBar";
import type { LessonCategory } from "@/types/lesson";

export default function KeigoPage() {
  const completedLessons = useProgressStore((s) => s.completedLessons);
  const [category, setCategory] = useState<LessonCategory>("all");

  const filtered = category === "all"
    ? lessons
    : lessons.filter((l) => l.category === category);

  const completedCount = completedLessons.length;

  return (
    <div className="min-h-screen bg-sakura-blush">
      <div className="bg-canvas-almond px-5 pt-12 pb-5 border-b-4 border-black">
        <h1 className="text-2xl font-black text-type-black">경어 레슨 🎯</h1>
        <p className="text-sm text-type-black/60 font-bold mt-0.5">
          {completedCount} / {lessons.length} 완료
        </p>
        <div className="mt-3">
          <ProgressBar value={(completedCount / lessons.length) * 100} color="grape" />
        </div>
      </div>

      <div className="px-5 py-4">
        <CategoryFilter active={category} onChange={setCategory} />
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
