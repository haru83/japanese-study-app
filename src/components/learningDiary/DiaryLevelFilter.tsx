"use client";

import type { DiaryCategory, DiaryLevel } from "@/types/learningDiary";

const LEVELS: { label: string; value: DiaryLevel | "전체" }[] = [
  { label: "전체", value: "전체" },
  { label: "초급", value: "초급" },
  { label: "중급", value: "중급" },
  { label: "고급", value: "고급" },
];

const LEVEL_ACTIVE_BG: Record<string, string> = {
  전체: "bg-type-black text-white",
  초급: "bg-matcha-green text-black",
  중급: "bg-shiba-orange text-black",
  고급: "bg-grape-punch text-white",
};

const CATEGORIES: { label: string; value: DiaryCategory | "전체" }[] = [
  { label: "전체", value: "전체" },
  { label: "일상", value: "일상" },
  { label: "음식", value: "음식" },
  { label: "여행", value: "여행" },
  { label: "계절", value: "계절" },
  { label: "감정", value: "감정" },
  { label: "학교", value: "학교" },
  { label: "직장", value: "직장" },
  { label: "취미", value: "취미" },
  { label: "쇼핑", value: "쇼핑" },
  { label: "건강", value: "건강" },
];

interface DiaryLevelFilterProps {
  selectedLevel: DiaryLevel | "전체";
  selectedCategory: DiaryCategory | "전체";
  onLevelChange: (level: DiaryLevel | "전체") => void;
  onCategoryChange: (category: DiaryCategory | "전체") => void;
}

export function DiaryLevelFilter({
  selectedLevel,
  selectedCategory,
  onLevelChange,
  onCategoryChange,
}: DiaryLevelFilterProps) {
  return (
    <div className="flex flex-col gap-2.5">
      {/* Level buttons */}
      <div className="flex gap-2 flex-wrap">
        {LEVELS.map((l) => (
          <button
            key={l.value}
            onClick={() => onLevelChange(l.value)}
            className={`px-3.5 py-1.5 rounded-full text-sm font-bold border-2 border-black transition-all ${
              selectedLevel === l.value
                ? `${LEVEL_ACTIVE_BG[l.value] ?? "bg-type-black text-white"} shadow-[3px_3px_0px_0px_#000]`
                : "bg-paper-white text-type-black shadow-[2px_2px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px]"
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>

      {/* Category chips — horizontal scroll */}
      <div className="flex gap-2 overflow-x-auto pb-1.5 pt-0.5 scrollbar-hide">
        {CATEGORIES.map((c) => (
          <button
            key={c.value}
            onClick={() => onCategoryChange(c.value)}
            className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 border-2 border-black ${
              selectedCategory === c.value
                ? "bg-type-black text-white shadow-[3px_3px_0px_0px_#000]"
                : "bg-paper-white text-type-black shadow-[2px_2px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px]"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>
    </div>
  );
}
