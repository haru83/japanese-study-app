import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUserProfile } from "@/actions/user";
import { getWardrobeItems } from "@/actions/wardrobe";
import { ShibaAvatar } from "@/components/mascot/ShibaAvatar";
import { EquipButton } from "@/components/wardrobe/EquipButton";

export default async function WardrobePage() {
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
  const level = profile?.progress?.level ?? 1;
  const { items, ownedIds, equippedIds } = await getWardrobeItems();

  // 보유한 아이템만 필터링
  const ownedItems = items.filter((item) => ownedIds.includes(item.id));
  const equippedItems = items.filter((item) => equippedIds.includes(item.id));

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
                <span className="material-symbols-outlined text-sakura-pink" style={{ fontVariationSettings: "'FILL' 1" }}>checkroom</span>
                시바 옷장
              </h1>
              <p className="text-xs font-bold text-type-black/60">아이템을 착용하거나 해제해요</p>
            </div>
          </div>
          <Link
            href="/shop"
            className="bg-shiba-orange rounded-[15px] border-2 border-black shadow-[3px_3px_0px_0px_#000] px-4 py-2 flex items-center gap-1.5 hover:shadow-[1px_1px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
          >
            <span className="material-symbols-outlined text-type-black text-base" style={{ fontVariationSettings: "'FILL' 1" }}>storefront</span>
            <span className="font-black text-type-black text-xs">상점</span>
          </Link>
        </div>
      </header>

      {/* Mascot preview with equipped items */}
      <section className="px-5 mb-5">
        <div className="bg-canvas-almond rounded-[15px] border-2 border-black shadow-[4px_4px_0px_0px_#000] p-6 flex flex-col items-center">
          <div className="relative">
            <ShibaAvatar
              level={level}
              size={96}
              sticker
              wobble="wobbly-2"
              equippedItemIds={equippedIds}
            />
          </div>
          <p className="mt-3 text-sm font-black text-type-black">
            Lv.{level} 시바견
          </p>
          {equippedItems.length > 0 ? (
            <div className="mt-2 flex flex-wrap items-center justify-center gap-1.5">
              {equippedItems.map((item) => (
                <span
                  key={item.id}
                  className="bg-grape-punch text-white text-[10px] font-black px-2.5 py-0.5 rounded-full border border-black/20"
                >
                  {item.icon} {item.name}
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-2 text-xs font-bold text-type-black/50">
              아직 착용한 아이템이 없어요
            </p>
          )}
        </div>
      </section>

      {/* Owned items grid */}
      <section className="px-5">
        <h2 className="text-sm font-black text-type-black mb-3 flex items-center gap-1.5">
          <span className="material-symbols-outlined text-shiba-orange text-base" style={{ fontVariationSettings: "'FILL' 1" }}>inventory_2</span>
          내 아이템
          <span className="text-xs font-bold text-type-black/40 ml-1">({ownedItems.length}개)</span>
        </h2>

        {ownedItems.length === 0 ? (
          <div className="bg-paper-white rounded-[15px] border-2 border-black shadow-[4px_4px_0px_0px_#000] p-8 text-center">
            <div className="text-4xl mb-3">👗</div>
            <p className="font-black text-type-black text-sm">아직 보유한 아이템이 없어요</p>
            <p className="text-xs text-type-black/60 font-bold mt-1">상점에서 아이템을 구매해보세요!</p>
            <Link
              href="/shop"
              className="mt-4 inline-block bg-shiba-orange text-type-black font-black text-xs px-4 py-2 rounded-[15px] border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
            >
              상점 가기 →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {ownedItems.map((item) => {
              const isEquipped = equippedIds.includes(item.id);

              return (
                <div
                  key={item.id}
                  className={`bg-paper-white rounded-[15px] border-2 border-black shadow-[4px_4px_0px_0px_#000] p-4 flex flex-col items-center relative overflow-hidden ${
                    isEquipped ? "ring-2 ring-grape-punch ring-offset-2" : ""
                  }`}
                >
                  {/* Equipped indicator */}
                  {isEquipped && (
                    <div className="absolute top-2 right-2 bg-grape-punch text-white text-[10px] font-black px-2 py-0.5 rounded-full border border-black/20">
                      착용 중
                    </div>
                  )}

                  {/* Icon */}
                  <div className="text-4xl mb-2">{item.icon}</div>

                  {/* Name */}
                  <p className="font-black text-type-black text-sm text-center">
                    {item.name}
                  </p>

                  {/* Rare badge */}
                  {item.isRare && (
                    <span className="mt-1 text-[10px] font-black bg-grape-punch text-white px-2 py-0.5 rounded-full border border-black/20">
                      레어
                    </span>
                  )}

                  {/* Equip/Unequip button */}
                  <div className="mt-3">
                    <EquipButton itemId={item.id} isEquipped={isEquipped} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Tip */}
      <section className="px-5 mt-5">
        <div className="bg-paper-white rounded-[15px] border-2 border-black shadow-[3px_3px_0px_0px_#000] p-4 flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <p className="text-xs font-black text-type-black">꿀팁</p>
            <p className="text-[11px] text-type-black/60 font-bold mt-0.5">
              여러 아이템을 동시에 착용할 수 있어요! 레슨을 완료해서 스탬프를 모으고 상점에서 새로운 아이템을 구매하세요.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
