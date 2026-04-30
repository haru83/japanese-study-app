import { getUserProfile } from "@/actions/user";

const WARDROBE_ITEMS = [
  { id: "default", name: "기본", icon: "🐕", stampCost: 0, requiredLevel: 1, equipped: true },
  { id: "hat-cap", name: "야구 모자", icon: "🧢", stampCost: 5, requiredLevel: 1 },
  { id: "hat-santa", name: "산타 모자", icon: "🎅", stampCost: 8, requiredLevel: 2 },
  { id: "scarf", name: "목도리", icon: "🧣", stampCost: 6, requiredLevel: 2 },
  { id: "glasses", name: "선글라스", icon: "😎", stampCost: 10, requiredLevel: 3 },
  { id: "crown", name: "왕관", icon: "👑", stampCost: 20, requiredLevel: 5 },
];

export default async function WardrobePage() {
  const profile = await getUserProfile();
  const stamps = profile?.progress?.totalStamps ?? 0;
  const level = profile?.progress?.level ?? 1;

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark">
      <div className="bg-white dark:bg-surface-dark px-5 pt-12 pb-5 shadow-sm">
        <h1 className="text-xl font-bold text-text-main dark:text-text-main-dark">
          옷장 👗
        </h1>
        <p className="text-sm text-text-sub dark:text-text-sub-dark mt-0.5">
          보유 스탬프: ⭐ {stamps}개
        </p>
      </div>

      {/* Mascot preview */}
      <div className="bg-primary/10 mx-5 mt-4 rounded-3xl p-8 flex items-center justify-center">
        <span className="text-8xl">🐕</span>
      </div>

      <div className="px-5 py-4">
        <h2 className="text-base font-bold text-text-main dark:text-text-main-dark mb-3">
          아이템
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {WARDROBE_ITEMS.map((item) => {
            const canAfford = stamps >= item.stampCost;
            const levelOk = level >= item.requiredLevel;
            const available = canAfford && levelOk;

            return (
              <div
                key={item.id}
                className={`bg-white dark:bg-surface-dark rounded-2xl p-4 shadow-sm border text-center ${
                  item.equipped
                    ? "border-primary"
                    : "border-orange-50 dark:border-border-dark"
                }`}
              >
                <div className="text-4xl mb-2">{item.icon}</div>
                <p className="font-bold text-sm text-text-main dark:text-text-main-dark">
                  {item.name}
                </p>
                {item.stampCost === 0 ? (
                  <p className="text-xs text-primary mt-1">기본 착용</p>
                ) : (
                  <div className="mt-2">
                    <p className="text-xs text-text-sub dark:text-text-sub-dark">
                      ⭐ {item.stampCost} / Lv.{item.requiredLevel}
                    </p>
                    <button
                      disabled={!available}
                      className={`mt-2 text-xs px-3 py-1.5 rounded-xl font-medium transition-all ${
                        available
                          ? "bg-primary text-text-main hover:bg-primary-hover"
                          : "bg-gray-100 text-text-sub cursor-not-allowed"
                      }`}
                    >
                      {!levelOk ? `Lv.${item.requiredLevel} 필요` : !canAfford ? "스탬프 부족" : "구매"}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
