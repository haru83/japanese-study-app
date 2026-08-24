// src/components/community/ReactionPicker.tsx
"use client";

import { useOptimistic, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ReactionGroup } from "@/lib/community";

type Props = {
  targetId: string;
  reactions: ReactionGroup[];
  onToggle: (targetId: string, emoji: string) => Promise<void>;
  currentUserId?: string;
  className?: string;
};

export function ReactionPicker({
  targetId,
  reactions,
  onToggle,
  currentUserId,
  className = "",
}: Props) {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [optimisticReactions, setOptimisticReaction] = useOptimistic(
    reactions,
    (state, toggledEmoji: string) => {
      return state.map((r) => {
        if (r.emoji === toggledEmoji) {
          const nextHasReacted = !r.hasReacted;
          return {
            ...r,
            hasReacted: nextHasReacted,
            count: nextHasReacted ? r.count + 1 : Math.max(0, r.count - 1),
          };
        }
        return r;
      });
    }
  );

  const handleClick = (emoji: string) => {
    if (!currentUserId) {
      router.push("/login");
      return;
    }

    startTransition(async () => {
      setOptimisticReaction(emoji);
      try {
        await onToggle(targetId, emoji);
      } catch (err) {
        console.error("Reaction toggle failed:", err);
      }
    });
  };

  return (
    <div className={`flex flex-wrap items-center gap-1.5 ${className}`}>
      {optimisticReactions.map((item) => {
        const isSelected = item.hasReacted;
        const count = item.count;

        return (
          <button
            key={item.emoji}
            type="button"
            onClick={() => handleClick(item.emoji)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl border-2 transition-all text-xs font-black select-none ${
              isSelected
                ? "bg-sakura-pink text-type-black border-black shadow-[2px_2px_0px_0px_#000] scale-[1.03]"
                : count > 0
                ? "bg-paper-white text-type-black/80 border-black/60 hover:border-black shadow-[1px_1px_0px_0px_#000]"
                : "bg-canvas-almond/20 text-type-black/50 border-black/20 hover:border-black/50 hover:bg-canvas-almond/40"
            }`}
            title={`${item.emoji} 반응 ${isSelected ? "취소" : "추가"}`}
          >
            <span className="text-sm">{item.emoji}</span>
            {count > 0 ? (
              <span className={`text-[11px] font-bold ${isSelected ? "text-type-black" : "text-type-black/70"}`}>
                {count}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
