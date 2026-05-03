import { getUserProfile } from "@/actions/user";
import { getWardrobeItems } from "@/actions/wardrobe";
import { PurchaseButton } from "@/components/wardrobe/PurchaseButton";
import { ShibaAvatar } from "@/components/mascot/ShibaAvatar";

export default async function WardrobePage() {
  const profile = await getUserProfile();
  const stamps = profile?.progress?.totalStamps ?? 0;
  const level = profile?.progress?.level ?? 1;

  const { items, ownedIds } = await getWardrobeItems();

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
    <ShibaAvatar level={level} size={96} />
  </div>

      <div className="px-5 py-4">
        <h2 className="text-base font-bold text-text-main dark:text-text-main-dark mb-3">
          아이템
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {items.map((item) => {
            const isOwned = ownedIds.includes(item.id);
            const canAfford = stamps >= item.stampCost;
            const levelOk = level >= item.requiredLevel;
            const available = canAfford && levelOk;

            let label: string;
            if (isOwned) label = "보유 중";
            else if (!levelOk) label = `Lv.${item.requiredLevel} 필요`;
            else if (!canAfford) label = "스탬프 부족";
            else label = "구매";

            return (
              <div
                key={item.id}
                className={`bg-white dark:bg-surface-dark rounded-2xl p-4 shadow-sm border text-center ${
                  isOwned
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
                    {isOwned ? (
                      <p className="mt-2 text-xs px-3 py-1.5 rounded-xl font-medium bg-primary/10 text-primary">
                        보유 중
                      </p>
                    ) : (
                      <PurchaseButton
                        itemId={item.id}
                        available={available}
                        label={label}
                      />
                    )}
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
