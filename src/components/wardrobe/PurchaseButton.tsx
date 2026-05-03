"use client";

import { useTransition } from "react";
import { purchaseWardrobeItem } from "@/actions/wardrobe";

export function PurchaseButton({
  itemId,
  available,
  label,
}: {
  itemId: string;
  available: boolean;
  label: string;
}) {
  const [isPending, startTransition] = useTransition();

  const handlePurchase = () => {
    startTransition(async () => {
      try {
        await purchaseWardrobeItem(itemId);
      } catch (err) {
        alert(err instanceof Error ? err.message : "구매에 실패했습니다.");
      }
    });
  };

  return (
    <button
      disabled={!available || isPending}
      onClick={handlePurchase}
      className={`text-xs font-black px-4 py-1.5 rounded-[10px] border-2 border-black transition-all ${
        available
          ? "bg-sakura-pink text-type-black shadow-[2px_2px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
          : "bg-gray-200 text-type-black/40 cursor-not-allowed shadow-[2px_2px_0px_0px_#000]"
      }`}
    >
      {isPending ? "구매 중..." : label}
    </button>
  );
}
