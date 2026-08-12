"use client";

import { useState } from "react";
import { toggleBookmark } from "@/actions/bookmark";

interface Props {
  word: string;
  itemType?: "vocab" | "grammar";
  reading?: string;
  meaning?: string;
  source?: string;
  initialBookmarked?: boolean;
}

export function BookmarkButton({
  word,
  itemType = "vocab",
  reading,
  meaning,
  source,
  initialBookmarked = false,
}: Props) {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
  const [loading, setLoading] = useState(false);

  async function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (loading) return;

    setLoading(true);
    const nextState = await toggleBookmark({ word, itemType, reading, meaning, source });
    setIsBookmarked(nextState);
    setLoading(false);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      aria-label={isBookmarked ? "북마크 해제" : "북마크 추가"}
      className="p-1 hover:scale-125 active:scale-90 transition-transform shrink-0"
    >
      <span
        className={`material-symbols-outlined text-lg leading-none block select-none ${
          isBookmarked
            ? "text-amber-400 drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]"
            : "text-type-black/25 hover:text-amber-400/80 transition-colors"
        }`}
        style={{ fontVariationSettings: isBookmarked ? "'FILL' 1" : "'FILL' 0" }}
      >
        star
      </span>
    </button>
  );
}
