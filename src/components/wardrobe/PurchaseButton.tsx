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
      className={`mt-2 text-xs px-3 py-1.5 rounded-xl font-medium transition-all ${
        available
          ? "bg-primary text-text-main hover:bg-primary-hover"
          : "bg-gray-100 text-text-sub cursor-not-allowed"
      }`}
    >
      {isPending ? "구매 중..." : label}
    </button>
  );
}
