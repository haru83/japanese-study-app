"use client";

import { useState } from "react";
import Link from "next/link";
import { Modal } from "@/components/ui/Modal";

interface Props {
  brokenPreviousDays: number;
}

export function StreakRepairModal({ brokenPreviousDays }: Props) {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="🔥 연속 학습 복구 퀘스트">
      <div className="flex flex-col items-center text-center p-2">
        <div className="text-5xl mb-3">⚡</div>
        <h3 className="text-lg font-black text-type-black">
          아쉬워요! {brokenPreviousDays}일 연속 출석이 끊어졌어요
        </h3>
        <p className="text-xs font-bold text-type-black/60 mt-1 mb-5">
          하지만 포기하지 마세요! 오늘 단어 5개를 복습하면 이전 연속 학습 기록을 **100% 복구**해 드릴게요!
        </p>

        <div className="w-full flex flex-col gap-2">
          <Link
            href="/learning/review"
            onClick={() => setIsOpen(false)}
            className="w-full py-3 bg-grape-punch text-white font-black text-sm rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:scale-102 transition-transform text-center"
          >
            🚀 단어 복습하고 스트릭 복구하기
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="w-full py-2 bg-canvas-almond text-type-black/60 font-bold text-xs rounded-xl border border-black/20"
          >
            나중에 하기
          </button>
        </div>
      </div>
    </Modal>
  );
}
