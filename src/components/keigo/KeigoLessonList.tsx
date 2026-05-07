"use client";

import { useState } from "react";
import { LessonCard } from "@/components/keigo/LessonCard";
import { CategoryFilter } from "@/components/keigo/CategoryFilter";
import { ProgressBar } from "@/components/ui/ProgressBar";
import type { Lesson, LessonCategory } from "@/types/lesson";

interface Props {
  lessons: Lesson[];
  completedIds: string[];
  totalCount: number;
}

export function KeigoLessonList({ lessons, completedIds, totalCount }: Props) {
  const [category, setCategory] = useState<LessonCategory>("all");

  const filtered =
    category === "all" ? lessons : lessons.filter((l) => l.category === category);

  return (
    <div className="min-h-screen bg-sakura-blush">
      <div className="bg-canvas-almond px-5 pt-12 pb-5 border-b-4 border-black">
        <h1 className="text-2xl font-black text-type-black">경어 레슨 🎯</h1>
        <p className="text-sm text-type-black/60 font-bold mt-0.5">
          {completedIds.length} / {totalCount} 완료
        </p>
        <div className="mt-3">
          <ProgressBar value={(completedIds.length / totalCount) * 100} color="grape" />
        </div>
      </div>

      <div className="px-5 py-4">
        <CategoryFilter active={category} onChange={setCategory} />
        <div className="mt-4 flex flex-col gap-3 pb-24">
          {filtered.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              completed={completedIds.includes(lesson.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
