"use client";

import type { LessonCategory } from "@/types/lesson";
import { CATEGORY_LABELS } from "@/types/lesson";

interface CategoryFilterProps {
  active: LessonCategory;
  onChange: (cat: LessonCategory) => void;
}

const CATEGORIES: LessonCategory[] = ["all", "business", "hospitality", "social"];

const ACTIVE_BG: Record<LessonCategory, string> = {
  all: "bg-type-black text-white",
  business: "bg-grape-punch text-white",
  hospitality: "bg-sakura-pink text-black",
  social: "bg-shiba-orange text-black",
};

export function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-3 py-1.5 rounded-full text-sm font-bold border-2 border-black transition-all ${
            active === cat
              ? `${ACTIVE_BG[cat]} shadow-[3px_3px_0px_0px_#000]`
              : "bg-paper-white text-black shadow-[2px_2px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px]"
          }`}
        >
          {CATEGORY_LABELS[cat]}
        </button>
      ))}
    </div>
  );
}
