"use client";

import { useTransition } from "react";
import { equipItem, unequipItem } from "@/actions/wardrobe";

export function EquipButton({
  itemId,
  isEquipped,
}: {
  itemId: string;
  isEquipped: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      try {
        if (isEquipped) {
          await unequipItem(itemId);
        } else {
          await equipItem(itemId);
        }
      } catch (err) {
        alert(err instanceof Error ? err.message : "착용 상태 변경에 실패했습니다.");
      }
    });
  };

  return (
    <button
      disabled={isPending}
      onClick={handleToggle}
      className={`text-xs font-black px-4 py-1.5 rounded-[10px] border-2 border-black transition-all ${
        isEquipped
          ? "bg-grape-punch text-white shadow-[2px_2px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
          : "bg-sakura-pink text-type-black shadow-[2px_2px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
      }`}
    >
      {isPending
        ? isEquipped
          ? "해제 중..."
          : "착용 중..."
        : isEquipped
        ? "착용 해제"
        : "착용하기"}
    </button>
  );
}
