"use client";

import { useState } from "react";
import { LessonCard } from "@/components/keigo/LessonCard";
import { CategoryFilter } from "@/components/keigo/CategoryFilter";
import { ProgressBar } from "@/components/ui/ProgressBar";
import type { LessonCategory } from "@/types/lesson";

export interface LessonSummary {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  dialogueCount: number;
  quizCount: number;
}

interface Props {
  lessons: LessonSummary[];
  completedIds: string[];
  totalCount: number;
}

export function KeigoLessonList({ lessons, completedIds, totalCount }: Props) {
  const [category, setCategory] = useState<LessonCategory>("all");
  const [query, setQuery] = useState("");

  const filtered = lessons.filter((l) => {
    const categoryOk = category === "all" || l.category === category;
    const queryOk = query === "" || l.title.toLowerCase().includes(query.toLowerCase());
    return categoryOk && queryOk;
  });

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
        <input
          type="search"
          placeholder="레슨 검색..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2.5 border-2 border-black rounded-xl bg-paper-white font-bold text-sm placeholder:text-type-black/40 mb-3"
        />
        <CategoryFilter active={category} onChange={setCategory} />
        <div className="mt-4 flex flex-col gap-3 pb-24">
          {filtered.length === 0 && (
            <p className="text-center text-sm font-bold text-type-black/50 py-10">
              검색 결과가 없습니다
            </p>
          )}
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
