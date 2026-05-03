"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface GuestUpsellModalProps {
  onClose: () => void;
  quizScore: number;
  quizTotal: number;
}

export function GuestUpsellModal({ onClose, quizScore, quizTotal }: GuestUpsellModalProps) {
  const isPerfect = quizScore === quizTotal && quizTotal > 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 flex items-end justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 120 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
        className="w-full max-w-md bg-paper-white rounded-t-[30px] border-t-4 border-x-4 border-black p-6 pb-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Celebration */}
        <div className="text-center mb-5">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="text-6xl mb-3"
          >
            {isPerfect ? "🌟" : "🎉"}
          </motion.div>
          <h2 className="text-xl font-black text-type-black">퀴즈 완료!</h2>
          <p className="text-type-black/60 font-bold text-sm mt-1">
            {quizScore}/{quizTotal} 정답 {isPerfect ? "— 완벽해요!" : ""}
          </p>
        </div>

        {/* Benefit cards */}
        <div className="flex gap-2 mb-4">
          <div className="flex-1 bg-sakura-pink rounded-[15px] border-2 border-black shadow-[3px_3px_0px_0px_#000] p-3 text-center">
            <p className="text-lg font-black text-type-black">XP</p>
            <p className="text-[10px] text-type-black/70 font-bold">누적 저장</p>
          </div>
          <div className="flex-1 bg-shiba-orange rounded-[15px] border-2 border-black shadow-[3px_3px_0px_0px_#000] p-3 text-center">
            <p className="text-lg font-black text-type-black">⭐</p>
            <p className="text-[10px] text-type-black/70 font-bold">스탬프 수집</p>
          </div>
          <div className="flex-1 bg-grape-punch rounded-[15px] border-2 border-black shadow-[3px_3px_0px_0px_#000] p-3 text-center">
            <p className="text-lg font-black text-white">레벨</p>
            <p className="text-[10px] text-white/80 font-bold">레벨업</p>
          </div>
        </div>

        {/* Message */}
        <p className="text-center text-sm font-bold text-type-black/70 mb-5">
          지금 가입하면 오늘 학습한 내용이 저장돼요! ✨
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3.5 rounded-[15px] border-2 border-black bg-canvas-almond text-type-black font-black text-sm shadow-[3px_3px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
          >
            계속 학습하기
          </button>
          <Link
            href="/login?mode=signup"
            className="flex-1 py-3.5 rounded-[15px] border-2 border-black bg-sakura-pink text-type-black font-black text-sm shadow-[3px_3px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] transition-all text-center"
          >
            지금 가입하기
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
