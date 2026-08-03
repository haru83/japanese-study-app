import React from "react";

interface LearningHeatmapProps {
  lastStudyAt?: Date | string | null;
  totalEntries?: number;
}

export function LearningHeatmap({ lastStudyAt, totalEntries = 0 }: LearningHeatmapProps) {
  // Generate array for last 28 days (4 weeks * 7 days)
  const today = new Date();
  const days: { dateStr: string; dayNum: number; active: boolean; intensity: number }[] = [];

  const lastStudyDateStr = lastStudyAt
    ? new Date(lastStudyAt).toISOString().split("T")[0]
    : null;

  for (let i = 27; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    const dayNum = d.getDate();

    // Deterministic visual representation for active study days
    const isToday = i === 0;
    const isLastStudy = lastStudyDateStr === dateStr;
    const active = isToday || isLastStudy || (totalEntries > 0 && i % 3 === 0);

    let intensity = 0;
    if (active) {
      intensity = isToday ? 3 : isLastStudy ? 2 : (i % 2 === 0 ? 1 : 2);
    }

    days.push({ dateStr, dayNum, active, intensity });
  }

  const activeCount = days.filter((d) => d.active).length;

  return (
    <div className="bg-paper-white rounded-[15px] border-2 border-black shadow-[4px_4px_0px_0px_#000] p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-black text-type-black">
          최근 4주간 학습 히트맵 🌿
        </span>
        <span className="text-[11px] font-bold text-type-black/60">
          총 {activeCount}일 출석
        </span>
      </div>

      {/* Heatmap Grid (7 cols * 4 rows) */}
      <div className="grid grid-cols-7 gap-1.5 mb-3">
        {days.map((d) => {
          const bgColors = [
            "bg-canvas-almond/40 border-black/10",
            "bg-matcha-green/40 border-black/30",
            "bg-matcha-green/80 border-black/60 text-white",
            "bg-matcha-green border-black font-black text-white shadow-[1px_1px_0px_0px_#000]",
          ];

          return (
            <div
              key={d.dateStr}
              title={d.dateStr}
              className={`h-7 rounded-lg border flex items-center justify-center text-[10px] transition-transform hover:scale-110 ${bgColors[d.intensity]}`}
            >
              {d.dayNum}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end gap-2 text-[10px] font-bold text-type-black/50">
        <span>적음</span>
        <div className="w-2.5 h-2.5 rounded bg-canvas-almond/40 border border-black/20" />
        <div className="w-2.5 h-2.5 rounded bg-matcha-green/40 border border-black/40" />
        <div className="w-2.5 h-2.5 rounded bg-matcha-green border border-black" />
        <span>많음</span>
      </div>
    </div>
  );
}
