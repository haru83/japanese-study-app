"use client";

import { useTransition } from "react";

interface DeleteConfirmButtonProps {
  action: () => Promise<void>;
  itemLabel?: string;
  className?: string;
}

export function DeleteConfirmButton({
  action,
  itemLabel = "항목",
  className = "px-6 py-3 bg-red-500 text-white font-black rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:bg-red-600 transition-colors disabled:opacity-50",
}: DeleteConfirmButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    if (confirm(`정말 이 ${itemLabel}을(를) 삭제하시겠습니까?`)) {
      startTransition(async () => {
        await action();
      });
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      className={className}
    >
      {isPending ? "삭제 중..." : "삭제"}
    </button>
  );
}
