"use client";

import { DailyQuestCard, type DailyQuest } from "./DailyQuestCard";

interface QuestSummary {
  totalToday: number;
  completedToday: number;
  totalStamps: number;
}

interface DailyQuestPanelProps {
  quests: DailyQuest[];
  summary: QuestSummary | null;
  onClaimQuest?: (id: string) => void;
}

export function DailyQuestPanel({ quests, summary, onClaimQuest }: DailyQuestPanelProps) {
  if (quests.length === 0) return null;

  const completedCount = summary?.completedToday ?? 0;
  const totalCount = summary?.totalToday ?? quests.length;
  const totalStamps = summary?.totalStamps ?? 0;

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-black text-type-black text-sm">오늘의 퀘스트 ⚔️</h2>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black bg-matcha-green text-white px-2 py-1 rounded-full border border-black">
            {completedCount}/{totalCount} 완료
          </span>
          {totalStamps > 0 && (
            <span className="text-[10px] font-black bg-shiba-orange text-white px-2 py-1 rounded-full border border-black">
              🪙 {totalStamps} 스탬프
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {quests.map((quest) => (
          <DailyQuestCard key={quest.id} quest={quest} onClaim={onClaimQuest} />
        ))}
      </div>
    </section>
  );
}
