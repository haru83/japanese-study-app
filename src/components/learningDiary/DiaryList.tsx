"use client";

import { useState } from "react";
import { DiaryLevelFilter } from "@/components/learningDiary/DiaryLevelFilter";
import { LearningDiaryCard } from "@/components/learningDiary/LearningDiaryCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { requiredLevelForContent } from "@/lib/contentGate";
import type { DiaryCategory, DiaryLevel } from "@/types/learningDiary";

export interface DiarySummary {
  id: string;
  title: string;
  titleKo: string;
  category: string;
  level: string;
  thumbnail: string;
  sortOrder: number;
}

interface Props {
  diaries: DiarySummary[];
  completedIds: string[];
  totalCount: number;
  userLevel: number;
  showStandaloneHeader?: boolean;
}

export function DiaryList({
  diaries,
  completedIds,
  totalCount,
  userLevel,
  showStandaloneHeader = false,
}: Props) {
  const [selectedLevel, setSelectedLevel] = useState<DiaryLevel | "전체">("전체");
  const [selectedCategory, setSelectedCategory] = useState<DiaryCategory | "전체">("전체");
  const [query, setQuery] = useState("");

  const filtered = diaries.filter((d) => {
    const levelOk = selectedLevel === "전체" || d.level === selectedLevel;
    const catOk = selectedCategory === "전체" || d.category === selectedCategory;
    const queryOk =
      query === "" ||
      d.title.toLowerCase().includes(query.toLowerCase()) ||
      d.titleKo.toLowerCase().includes(query.toLowerCase());
    return levelOk && catOk && queryOk;
  });

  return (
    <div className="flex flex-col gap-3">
      {showStandaloneHeader && (
        <header className="bg-canvas-almond px-5 pt-10 pb-4 border-b-4 border-black -mx-5 -mt-5 mb-2">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-black text-type-black tracking-tight flex items-center gap-2">
                <span>학습 일기</span>
                <span className="text-xl">📖</span>
              </h1>
              <p className="text-xs font-bold text-type-black/60 mt-1">
                {completedIds.length} / {totalCount} 완료 · 현재 레벨 {userLevel}
              </p>
            </div>
            <div className="w-12 h-12 rounded-[14px] bg-paper-white border-2 border-black shadow-[2px_2px_0px_0px_#000] flex items-center justify-center text-2xl shrink-0 wobbly-3">
              📖
            </div>
          </div>
          <div>
            <ProgressBar
              value={totalCount > 0 ? (completedIds.length / totalCount) * 100 : 0}
              color="grape"
            />
          </div>
        </header>
      )}

      {/* Search Input */}
      <input
        type="search"
        placeholder="일기 검색 (日本語 · 한국어)..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2.5 border-2 border-black rounded-xl bg-paper-white font-bold text-sm placeholder:text-type-black/40 shadow-[2px_2px_0px_0px_#000]"
      />

      {/* Level & Category Filters */}
      <DiaryLevelFilter
        selectedLevel={selectedLevel}
        selectedCategory={selectedCategory}
        onLevelChange={setSelectedLevel}
        onCategoryChange={setSelectedCategory}
      />

      <p className="text-xs font-bold text-type-black/60 mt-1">
        {filtered.length}개의 학습 일기
      </p>

      {/* Diary Card List */}
      <div className="flex flex-col gap-3 pb-24">
        {filtered.length === 0 && (
          <p className="text-center text-sm font-bold text-type-black/50 py-10">
            검색 결과가 없습니다
          </p>
        )}
        {filtered.map((diary) => {
          const reqLevel = requiredLevelForContent(diary.sortOrder);
          const locked = userLevel < reqLevel;
          return (
            <LearningDiaryCard
              key={diary.id}
              diary={diary}
              completed={completedIds.includes(diary.id)}
              locked={locked}
              requiredLevel={reqLevel}
            />
          );
        })}
      </div>
    </div>
  );
}
