"use client";

import { useState } from "react";
import { DiaryLevelFilter } from "@/components/learningDiary/DiaryLevelFilter";
import { LearningDiaryCard } from "@/components/learningDiary/LearningDiaryCard";
import type { LearningDiary, DiaryCategory, DiaryLevel } from "@/types/learningDiary";

interface Props {
  diaries: LearningDiary[];
  completedIds: string[];
  totalCount: number;
}

export function DiaryList({ diaries, completedIds, totalCount }: Props) {
  const [selectedLevel, setSelectedLevel] = useState<DiaryLevel | "전체">("전체");
  const [selectedCategory, setSelectedCategory] = useState<DiaryCategory | "전체">("전체");

  const filtered = diaries.filter((d) => {
    const levelOk = selectedLevel === "전체" || d.level === selectedLevel;
    const catOk = selectedCategory === "전체" || d.category === selectedCategory;
    return levelOk && catOk;
  });

  return (
    <main className="flex-1 overflow-y-auto px-5 pt-4 pb-24 space-y-4">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-2xl">📖</span>
        <div>
          <h1 className="text-lg font-bold text-text-main leading-tight">학습 일기</h1>
          <p className="text-xs text-text-sub">
            완료 {completedIds.length} / {totalCount}개
          </p>
        </div>
        <div className="ml-auto">
          <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all"
              style={{ width: `${(completedIds.length / totalCount) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <DiaryLevelFilter
        selectedLevel={selectedLevel}
        selectedCategory={selectedCategory}
        onLevelChange={setSelectedLevel}
        onCategoryChange={setSelectedCategory}
      />

      <p className="text-xs text-text-sub">{filtered.length}개의 일기</p>

      <div className="flex flex-col gap-2">
        {filtered.map((diary) => (
          <LearningDiaryCard
            key={diary.id}
            diary={diary}
            completed={completedIds.includes(diary.id)}
          />
        ))}
      </div>
    </main>
  );
}
