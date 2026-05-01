"use client";

import type { LessonCategory } from "@/types/lesson";
import { CATEGORY_LABELS } from "@/types/lesson";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  active: LessonCategory;
  onChange: (cat: LessonCategory) => void;
}

const CATEGORIES: LessonCategory[] = ["all", "business", "hospitality", "social"];

export function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={cn(
            "flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all",
            active === cat
              ? "bg-keigo text-white shadow-sm"
              : "bg-white dark:bg-surface-dark text-text-sub dark:text-text-sub-dark border border-orange-50 dark:border-border-dark"
          )}
        >
          {CATEGORY_LABELS[cat]}
        </button>
      ))}
    </div>
  );
}
