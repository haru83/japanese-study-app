"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { RecommendedAction } from "@/lib/recommendAction";

interface Props {
  action: RecommendedAction;
}

export function GuidedPathHero({ action }: Props) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 350, damping: 20 }}
      className="bg-paper-white rounded-[20px] border-2 border-black shadow-[4px_4px_0px_0px_#000] p-5 relative overflow-hidden"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{action.icon}</span>
          <span className="text-xs font-black text-type-black/60 uppercase tracking-wider">
            오늘의 맞춤 추천 학습
          </span>
        </div>
        <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border border-black ${action.accentColor}`}>
          {action.badgeText}
        </span>
      </div>

      <h3 className="text-base font-black text-type-black mb-1">{action.title}</h3>
      <p className="text-xs font-bold text-type-black/60 mb-4">{action.subtitle}</p>

      <Link
        href={action.href}
        className="w-full py-3 bg-sakura-pink text-type-black font-black text-sm rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_#000] flex items-center justify-center gap-2 hover:bg-grape-punch hover:text-white transition-colors"
      >
        <span>지금 시작하기</span>
        <span>→</span>
      </Link>
    </motion.div>
  );
}
