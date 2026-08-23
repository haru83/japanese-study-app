"use client";

import { useState } from "react";
import { LessonCard } from "@/components/keigo/LessonCard";
import { CategoryFilter } from "@/components/keigo/CategoryFilter";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { requiredLevelForContent } from "@/lib/contentGate";
import type { LessonCategory } from "@/types/lesson";

export interface LessonSummary {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  dialogueCount: number;
  quizCount: number;
  sortOrder: number;
}

interface Props {
  lessons: LessonSummary[];
  completedIds: string[];
  totalCount: number;
  userLevel: number;
}

export function KeigoLessonList({ lessons, completedIds, totalCount, userLevel }: Props) {
  const [category, setCategory] = useState<LessonCategory>("all");
  const [query, setQuery] = useState("");

  const filtered = lessons.filter((l) => {
    const categoryOk = category === "all" || l.category === category;
    const queryOk = query === "" || l.title.toLowerCase().includes(query.toLowerCase());
    return categoryOk && queryOk;
  });

  return (
    <div className="min-h-screen bg-sakura-blush">
      <header className="bg-canvas-almond px-5 pt-10 pb-4 border-b-4 border-black">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-black text-type-black tracking-tight flex items-center gap-2">
              <span>경어 레슨</span>
              <span className="text-xl">🎯</span>
            </h1>
            <p className="text-xs font-bold text-type-black/60 mt-1">
              {completedIds.length} / {totalCount} 완료 · 현재 레벨 {userLevel}
            </p>
          </div>
          <div className="w-12 h-12 rounded-[14px] bg-paper-white border-2 border-black shadow-[2px_2px_0px_0px_#000] flex items-center justify-center text-2xl shrink-0 wobbly-3">
            💼
          </div>
        </div>
        <div>
          <ProgressBar value={totalCount > 0 ? (completedIds.length / totalCount) * 100 : 0} color="grape" />
        </div>
      </header>

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
          {filtered.map((lesson) => {
            const reqLevel = requiredLevelForContent(lesson.sortOrder);
            const locked = userLevel < reqLevel;
            return (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                completed={completedIds.includes(lesson.id)}
                locked={locked}
                requiredLevel={reqLevel}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
