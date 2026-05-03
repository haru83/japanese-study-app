import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUserProfile } from "@/actions/user";
import { getWardrobeItems } from "@/actions/wardrobe";
import { PurchaseButton } from "@/components/wardrobe/PurchaseButton";
import { ShibaAvatar } from "@/components/mascot/ShibaAvatar";
import Link from "next/link";

export default async function ShopPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return (
      <main className="min-h-screen bg-sakura-blush flex items-center justify-center p-5">
        <div className="bg-paper-white rounded-[15px] border-2 border-black shadow-[4px_4px_0px_0px_#000] p-8 text-center">
          <p className="font-black text-type-black mb-4">로그인이 필요해요</p>
          <Link
            href="/login"
            className="bg-sakura-pink text-type-black font-black px-6 py-3 rounded-[15px] border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] transition-all inline-block"
          >
            로그인하기
          </Link>
        </div>
      </main>
    );
  }

  const profile = await getUserProfile();
  const stamps = profile?.progress?.totalStamps ?? 0;
  const level = profile?.progress?.level ?? 1;
  const { items, ownedIds } = await getWardrobeItems();

  const notOwnedItems = items.filter((item) => !ownedIds.includes(item.id));

  return (
    <main className="min-h-screen bg-sakura-blush pt-4 pb-6">
      {/* Header */}
      <header className="px-5 mb-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/profile"
              className="p-2 rounded-full border-2 border-black bg-paper-white shadow-[2px_2px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] transition-all"
            >
              <span className="material-symbols-outlined text-type-black text-xl">arrow_back</span>
            </Link>
            <div>
              <h1 className="text-lg font-black text-type-black flex items-center gap-2">
                <span className="material-symbols-outlined text-shiba-orange" style={{ fontVariationSettings: "'FILL' 1" }}>storefront</span>
                시바 상점
              </h1>
              <p className="text-xs font-bold text-type-black/60">스탬프로 아이템을 구매해요!</p>
            </div>
          </div>
          <div className="bg-shiba-orange rounded-[15px] border-2 border-black shadow-[3px_3px_0px_0px_#000] px-4 py-2 flex items-center gap-1.5">
            <span className="text-lg">⭐</span>
            <span className="font-black text-type-black text-sm">{stamps}</span>
          </div>
        </div>
      </header>

      {/* Mascot preview */}
      <section className="px-5 mb-5">
        <div className="bg-canvas-almond rounded-[15px] border-2 border-black shadow-[4px_4px_0px_0px_#000] p-6 flex flex-col items-center">
          <ShibaAvatar level={level} size={80} sticker wobble="wobbly-2" />
          <p className="mt-3 text-sm font-black text-type-black">
            Lv.{level} 시바견
          </p>
          <p className="text-xs font-bold text-type-black/60">
            구매한 아이템은 옷장에서 착용할 수 있어요
          </p>
        </div>
      </section>

      {/* Shop items */}
      <section className="px-5">
        <h2 className="text-sm font-black text-type-black mb-3 flex items-center gap-1.5">
          <span className="material-symbols-outlined text-sakura-pink text-base">shopping_bag</span>
          구매 가능 아이템
          <span className="text-xs font-bold text-type-black/40 ml-1">({notOwnedItems.length}개)</span>
        </h2>

        {notOwnedItems.length === 0 ? (
          <div className="bg-paper-white rounded-[15px] border-2 border-black shadow-[4px_4px_0px_0px_#000] p-8 text-center">
            <div className="text-4xl mb-3">🎉</div>
            <p className="font-black text-type-black text-sm">모든 아이템을 다 구매했어요!</p>
            <p className="text-xs text-type-black/60 font-bold mt-1">옷장에서 착용해보세요</p>
            <Link
              href="/wardrobe"
              className="mt-4 inline-block bg-sakura-pink text-type-black font-black text-xs px-4 py-2 rounded-[15px] border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
            >
              옷장 가기 →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {notOwnedItems.map((item) => {
              const canAfford = stamps >= item.stampCost;
              const levelOk = level >= item.requiredLevel;
              const available = canAfford && levelOk;

              let label: string;
              let statusColor: string;
              if (!levelOk) {
                label = `Lv.${item.requiredLevel} 필요`;
                statusColor = "bg-gray-200 text-type-black/50";
              } else if (!canAfford) {
                label = "스탬프 부족";
                statusColor = "bg-gray-200 text-type-black/50";
              } else {
                label = "구매";
                statusColor = "bg-sakura-pink text-type-black";
              }

              return (
                <div
                  key={item.id}
                  className={`bg-paper-white rounded-[15px] border-2 border-black shadow-[4px_4px_0px_0px_#000] p-4 flex flex-col items-center ${
                    !levelOk ? "opacity-60" : ""
                  }`}
                >
                  {/* Icon */}
                  <div className="text-4xl mb-2">{item.icon}</div>

                  {/* Name */}
                  <p className="font-black text-type-black text-sm text-center">
                    {item.name}
                  </p>

                  {/* Rare badge */}
                  {item.isRare && (
                    <span className="mt-1 text-[10px] font-black bg-grape-punch text-white px-2 py-0.5 rounded-full border border-black">
                      레어
                    </span>
                  )}

                  {/* Cost & level */}
                  {item.stampCost === 0 ? (
                    <p className="text-xs font-bold text-shiba-orange mt-2">무료</p>
                  ) : (
                    <div className="mt-2 flex flex-col items-center gap-1.5">
                      <p className="text-xs font-bold text-type-black/60 flex items-center gap-1">
                        ⭐ {item.stampCost}
                        <span className="text-type-black/30">·</span>
                        Lv.{item.requiredLevel}
                      </p>
                      <PurchaseButton
                        itemId={item.id}
                        available={available}
                        label={label}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Already owned items */}
      {ownedIds.length > 0 && (
        <section className="px-5 mt-6">
          <h2 className="text-sm font-black text-type-black mb-3 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-shiba-orange text-base" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            보유 중인 아이템
            <span className="text-xs font-bold text-type-black/40 ml-1">({ownedIds.length}개)</span>
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {items
              .filter((item) => ownedIds.includes(item.id))
              .map((item) => (
                <div
                  key={item.id}
                  className="bg-paper-white rounded-[15px] border-2 border-black shadow-[4px_4px_0px_0px_#000] p-4 flex flex-col items-center"
                >
                  <div className="text-4xl mb-2">{item.icon}</div>
                  <p className="font-black text-type-black text-sm text-center">
                    {item.name}
                  </p>
                  <span className="mt-2 text-[10px] font-black bg-shiba-orange/20 text-shiba-orange px-3 py-1 rounded-full border border-shiba-orange/30">
                    보유 중
                  </span>
                </div>
              ))}
          </div>
          <Link
            href="/wardrobe"
            className="mt-4 w-full flex items-center justify-center gap-2 bg-canvas-almond text-type-black font-black text-sm py-3 rounded-[15px] border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
          >
            <span className="material-symbols-outlined text-base">checkroom</span>
            옷장에서 착용하기
          </Link>
        </section>
      )}
    </main>
  );
}
