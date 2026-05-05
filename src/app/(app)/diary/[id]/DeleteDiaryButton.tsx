"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteDiary } from "@/actions/diary";

export function DeleteDiaryButton({ diaryId }: { diaryId: string }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirming) {
      setConfirming(true);
      return;
    }

    setDeleting(true);
    try {
      await deleteDiary(diaryId);
      router.push("/diary");
      router.refresh();
    } catch {
      alert("삭제에 실패했습니다.");
      setConfirming(false);
      setDeleting(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={deleting}
      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border-2 font-bold text-sm transition-all active:scale-95 ${
        confirming
          ? "bg-red-400 text-white border-black shadow-[2px_2px_0px_0px_#000]"
          : "bg-paper-white text-type-black/60 border-black/20 shadow-[2px_2px_0px_0px_#000] hover:text-red-500 hover:border-red-400"
      }`}
    >
      <span className="material-symbols-outlined text-[16px]">
        {confirming ? "warning" : "delete"}
      </span>
      <span>
        {deleting
          ? "삭제 중..."
          : confirming
          ? "정말 삭제?"
          : "삭제"}
      </span>
    </button>
  );
}
