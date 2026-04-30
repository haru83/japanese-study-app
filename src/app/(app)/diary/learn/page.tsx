"use client";

import { useState, useEffect } from "react";
import { learningDiaries } from "@/data/learningDiaries";
import { getCompletedLearningDiaries } from "@/actions/learningDiary";
import { DiaryLevelFilter } from "@/components/learningDiary/DiaryLevelFilter";
import { LearningDiaryCard } from "@/components/learningDiary/LearningDiaryCard";
import type { DiaryCategory, DiaryLevel } from "@/types/learningDiary";

export default function LearnDiaryListPage() {
  const [selectedLevel, setSelectedLevel] = useState<DiaryLevel | "전체">("전체");
  const [selectedCategory, setSelectedCategory] = useState<DiaryCategory | "전체">("전체");
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  useEffect(() => {
    getCompletedLearningDiaries().then(setCompletedIds);
  }, []);

  const filtered = learningDiaries.filter((d) => {
    const levelOk = selectedLevel === "전체" || d.level === selectedLevel;
    const catOk = selectedCategory === "전체" || d.category === selectedCategory;
    return levelOk && catOk;
  });

  return (
    <main className="flex-1 overflow-y-auto px-4 pt-4 pb-24 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <span className="text-2xl">📖</span>
        <div>
          <h1 className="text-lg font-bold text-text-main dark:text-text-main-dark leading-tight">
            학습 일기
          </h1>
          <p className="text-xs text-text-sub dark:text-text-sub-dark">
            완료 {completedIds.length} / {learningDiaries.length}개
          </p>
        </div>
        <div className="ml-auto">
          <div className="w-16 h-2 bg-gray-100 dark:bg-border-dark rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all"
              style={{ width: `${(completedIds.length / learningDiaries.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filters */}
      <DiaryLevelFilter
        selectedLevel={selectedLevel}
        selectedCategory={selectedCategory}
        onLevelChange={setSelectedLevel}
        onCategoryChange={setSelectedCategory}
      />

      {/* Count */}
      <p className="text-xs text-text-sub dark:text-text-sub-dark">
        {filtered.length}개의 일기
      </p>

      {/* List */}
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
