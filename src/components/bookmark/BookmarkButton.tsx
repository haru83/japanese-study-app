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
      className={`p-1.5 rounded-full border-2 border-black transition-transform hover:scale-110 active:scale-95 ${
        isBookmarked
          ? "bg-shiba-orange text-type-black shadow-[2px_2px_0px_0px_#000]"
          : "bg-paper-white text-type-black/30 shadow-[1px_1px_0px_0px_#000]"
      }`}
    >
      <span className="material-symbols-outlined text-sm leading-none block" style={{ fontVariationSettings: isBookmarked ? "'FILL' 1" : "'FILL' 0" }}>
        star
      </span>
    </button>
  );
}
