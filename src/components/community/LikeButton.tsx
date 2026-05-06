// src/components/community/LikeButton.tsx
"use client";

import { useOptimistic, useTransition } from "react";
import { toggleLike } from "@/actions/community";

type Props = {
  diaryId: string;
  initialIsLiked: boolean;
  initialCount: number;
};

export function LikeButton({ diaryId, initialIsLiked, initialCount }: Props) {
  const [isPending, startTransition] = useTransition();
  const [optimistic, addOptimistic] = useOptimistic(
    { isLiked: initialIsLiked, count: initialCount },
    (state) => ({
      isLiked: !state.isLiked,
      count: state.isLiked ? state.count - 1 : state.count + 1,
    })
  );

  function handleClick() {
    startTransition(async () => {
      addOptimistic(undefined);
      await toggleLike(diaryId);
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className={`flex items-center gap-2 px-6 py-3 rounded-2xl border-2 border-black font-black text-sm transition-all shadow-[3px_3px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] active:scale-[0.98] ${
        optimistic.isLiked
          ? "bg-sakura-pink text-type-black"
          : "bg-paper-white text-type-black/70"
      }`}
    >
      <span>🌸</span>
      <span>{optimistic.isLiked ? "공감했어요" : "공감하기"}</span>
      <span className="text-xs opacity-60">{optimistic.count}</span>
    </button>
  );
}
