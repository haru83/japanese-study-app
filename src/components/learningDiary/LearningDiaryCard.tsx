import Link from "next/link";
import type { LearningDiary } from "@/types/learningDiary";

const LEVEL_COLORS = {
  초급: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  중급: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  고급: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
};

interface LearningDiaryCardProps {
  diary: LearningDiary;
  completed: boolean;
}

export function LearningDiaryCard({ diary, completed }: LearningDiaryCardProps) {
  return (
    <Link
      href={`/diary/learn/${diary.id}`}
      className="flex items-center gap-3 bg-white dark:bg-surface-dark p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-border-dark hover:border-primary/30 hover:shadow-md transition-all active:scale-[0.98]"
    >
      <div className="text-3xl shrink-0">{diary.thumbnail}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${LEVEL_COLORS[diary.level]}`}>
            {diary.level}
          </span>
          <span className="text-[10px] text-text-sub dark:text-text-sub-dark">{diary.category}</span>
        </div>
        <p className="font-bold text-text-main dark:text-text-main-dark text-sm truncate">
          {diary.title}
        </p>
        <p className="text-xs text-text-sub dark:text-text-sub-dark truncate">{diary.titleKo}</p>
      </div>
      <div className="shrink-0">
        {completed ? (
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-xl">✅</span>
            <span className="text-[10px] font-bold text-primary">완료</span>
          </div>
        ) : (
          <span className="material-symbols-outlined text-text-sub dark:text-text-sub-dark text-sm">
            chevron_right
          </span>
        )}
      </div>
    </Link>
  );
}
