"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

interface LessonCompleteBannerProps {
  xpGained: number;
  stampsGained: number;
  leveledUp: boolean;
  newLevel: number;
  quizScore: number;
  quizTotal: number;
}

export function LessonCompleteBanner({
  xpGained,
  stampsGained,
  leveledUp,
  newLevel,
  quizScore,
  quizTotal,
}: LessonCompleteBannerProps) {
  const router = useRouter();
  const isPerfect = quizScore === quizTotal && quizTotal > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed inset-0 bg-black/50 flex items-end justify-center z-50"
      onClick={(e) => e.stopPropagation()}
    >
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="w-full max-w-md bg-white dark:bg-surface-dark rounded-t-3xl p-6 pb-10"
      >
        {/* Celebration */}
        <div className="text-center mb-5">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="text-7xl mb-3"
          >
            {isPerfect ? "🌟" : "⭐"}
          </motion.div>
          <h2 className="text-xl font-bold text-text-main dark:text-text-main-dark">
            레슨 완료!
          </h2>
          <p className="text-text-sub dark:text-text-sub-dark text-sm mt-1">
            퀴즈 {quizScore}/{quizTotal} 정답
          </p>
        </div>

        {/* Rewards */}
        <div className="flex gap-3 mb-5">
          <div className="flex-1 bg-primary/10 rounded-2xl p-3 text-center">
            <p className="text-primary font-bold text-lg">+{xpGained} XP</p>
            <p className="text-xs text-text-sub">경험치</p>
          </div>
          {stampsGained > 0 && (
            <div className="flex-1 bg-amber-50 rounded-2xl p-3 text-center">
              <p className="text-amber-600 font-bold text-lg">+{stampsGained} ⭐</p>
              <p className="text-xs text-text-sub">스탬프</p>
            </div>
          )}
          {isPerfect && (
            <div className="flex-1 bg-keigo-soft rounded-2xl p-3 text-center">
              <p className="text-keigo-hover font-bold text-lg">만점!</p>
              <p className="text-xs text-text-sub">+5 보너스</p>
            </div>
          )}
        </div>

        {leveledUp && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-primary rounded-2xl p-3 text-center mb-4"
          >
            <p className="font-bold text-text-main">🎉 레벨 업! Lv.{newLevel}</p>
          </motion.div>
        )}

        <div className="flex gap-3">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => router.push("/keigo")}
            className="flex-1"
          >
            목록으로
          </Button>
          <Button
            size="lg"
            onClick={() => router.push("/home")}
            className="flex-1"
          >
            홈으로
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
