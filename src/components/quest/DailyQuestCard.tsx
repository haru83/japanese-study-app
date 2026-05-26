"use client";

import { useState, useTransition } from "react";
import { claimQuestReward, type DailyQuest } from "@/actions/quest";

interface DailyQuestCardProps {
  quest: DailyQuest;
  onClaim?: (id: string) => void;
}

const DIFFICULTY_LABELS: Record<string, { label: string; bg: string; text: string }> = {
  EASY: { label: "쉬움", bg: "bg-matcha-green", text: "text-white" },
  MEDIUM: { label: "보통", bg: "bg-shiba-orange", text: "text-white" },
  HARD: { label: "어려움", bg: "bg-grape-punch", text: "text-white" },
};

export function DailyQuestCard({ quest, onClaim }: DailyQuestCardProps) {
  const [isPending, startTransition] = useTransition();
  const [claimed, setClaimed] = useState(quest.claimedAt !== null);

  const difficulty = DIFFICULTY_LABELS[quest.difficulty] ?? DIFFICULTY_LABELS.EASY;
  const pct = quest.requirement > 0 ? Math.min((quest.progress / quest.requirement) * 100, 100) : 0;
  const isClaimable = quest.completed && !claimed;

  const handleClaim = () => {
    if (!isClaimable || isPending) return;
    startTransition(async () => {
      try {
        await claimQuestReward(quest.id);
        setClaimed(true);
        onClaim?.(quest.id);
      } catch {
        // Silent fail — UI stays in claimable state
      }
    });
  };

  return (
    <div className="wobbly-1 bg-paper-white rounded-[15px] p-4 border-2 border-black shadow-[4px_4px_0px_0px_#000] transition-all hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px]">
      {/* 헤더: 아이콘 + 제목 + 난이도 배지 */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{quest.template?.icon ?? "🎯"}</span>
          <div>
            <p className="text-sm font-black text-type-black">{quest.template?.title ?? quest.type}</p>
            <p className="text-xs text-type-black/60 font-bold">{quest.template?.description ?? ""}</p>
          </div>
        </div>
        <span className={`text-[10px] font-black px-2 py-1 rounded-full ${difficulty.bg} ${difficulty.text} border border-black`}>
          {difficulty.label}
        </span>
      </div>

      {/* 진행률 바 */}
      <div className="w-full h-3 bg-sakura-blush rounded-full border border-black/20 overflow-hidden mb-3">
        <div
          className="h-full bg-grape-punch rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* 하단: 진행도 + 보상 + 버튼 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-type-black/70">
            {quest.progress}/{quest.requirement}
          </span>
          <span className="text-[10px] font-bold text-type-black/50">
            🪙 {quest.rewardStamps} · ⚡ {quest.xpReward} XP
          </span>
        </div>

        {claimed ? (
          <span className="text-xs font-black text-matcha-green">✅ 완료!</span>
        ) : isClaimable ? (
          <button
            onClick={handleClaim}
            disabled={isPending}
            className="bg-sakura-pink text-type-black text-xs font-black px-3 py-1.5 rounded-[10px] border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] transition-all disabled:opacity-50"
          >
            {isPending ? "수령 중..." : "🎁 보상 받기"}
          </button>
        ) : (
          <span className="text-xs font-bold text-type-black/40">진행 중...</span>
        )}
      </div>
    </div>
  );
}

export type { DailyQuest };
