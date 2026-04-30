import { getUserProfile } from "@/actions/user";

function StickerSlot({ filled, index }: { filled: boolean; index: number }) {
  return (
    <div
      className={`aspect-square rounded-2xl flex items-center justify-center text-2xl border-2 ${
        filled
          ? "bg-primary/10 border-primary"
          : "bg-white dark:bg-surface-dark border-dashed border-gray-200 dark:border-border-dark"
      }`}
    >
      {filled ? (index % 5 === 0 ? "🌟" : index % 3 === 0 ? "⭐" : "✨") : ""}
    </div>
  );
}

export default async function StickerBoardPage() {
  const profile = await getUserProfile();
  const stamps = profile?.progress?.totalStamps ?? 0;
  const TOTAL_SLOTS = 30;

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark">
      <div className="bg-white dark:bg-surface-dark px-5 pt-12 pb-5 shadow-sm">
        <h1 className="text-xl font-bold text-text-main dark:text-text-main-dark">
          스티커 보드 🌟
        </h1>
        <p className="text-sm text-text-sub dark:text-text-sub-dark mt-0.5">
          {stamps} / {TOTAL_SLOTS} 개 수집
        </p>
      </div>

      <div className="px-5 py-4">
        {/* Progress */}
        <div className="bg-white dark:bg-surface-dark rounded-2xl p-4 mb-4 shadow-sm border border-orange-50 dark:border-border-dark">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-text-main dark:text-text-main-dark font-medium">
              진행도
            </span>
            <span className="text-primary font-bold">
              {Math.round((stamps / TOTAL_SLOTS) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-border-dark rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all"
              style={{ width: `${Math.min(100, (stamps / TOTAL_SLOTS) * 100)}%` }}
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: TOTAL_SLOTS }, (_, i) => (
            <StickerSlot key={i} index={i} filled={i < stamps} />
          ))}
        </div>

        <p className="text-center text-sm text-text-sub dark:text-text-sub-dark mt-4">
          일기 또는 경어 레슨 완료 시 스탬프를 획득해요 ⭐
        </p>
      </div>
    </div>
  );
}
