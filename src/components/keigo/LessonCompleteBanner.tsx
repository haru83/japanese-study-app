"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ShibaAvatar } from "@/components/mascot/ShibaAvatar";
import { useRouter } from "next/navigation";

interface LessonCompleteBannerProps {
  xpGained: number;
  stampsGained: number;
  leveledUp: boolean;
  newLevel: number;
  quizScore: number;
  quizTotal: number;
  backHref?: string;
  backLabel?: string;
}

export function LessonCompleteBanner({
  xpGained,
  stampsGained,
  leveledUp,
  newLevel,
  quizScore,
  quizTotal,
  backHref = "/keigo",
  backLabel = "목록으로",
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
        className="w-full max-w-md bg-paper-white rounded-t-[30px] border-t-4 border-x-4 border-black p-6 pb-10"
      >
        {/* Celebration — 레벨업 시 아바타 변신, 일반 시 이모지 */}
        <div className="text-center mb-5">
          {leveledUp ? (
            // 레벨업: 시바견 아바타 변신 연출
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="flex justify-center mb-3"
            >
              <ShibaAvatar
                level={newLevel}
                size={80}
                sticker
                triggerLevelUp
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="text-7xl mb-3"
            >
              {isPerfect ? "🌟" : "⭐"}
            </motion.div>
          )}
          <h2 className="text-xl font-black text-type-black">
            {leveledUp ? "레벨 업! 🎉" : "레슨 완료!"}
          </h2>
          <p className="text-type-black/60 font-bold text-sm mt-1">
            퀴즈 {quizScore}/{quizTotal} 정답
          </p>
        </div>

        {/* Rewards */}
        <div className="flex gap-3 mb-5">
          <div className="flex-1 bg-sakura-pink rounded-[15px] border-2 border-black shadow-[3px_3px_0px_0px_#000] p-3 text-center">
            <p className="text-type-black font-black text-lg">+{xpGained} XP</p>
            <p className="text-xs text-type-black/70 font-bold">경험치</p>
          </div>
          {stampsGained > 0 && (
            <div className="flex-1 bg-shiba-orange rounded-[15px] border-2 border-black shadow-[3px_3px_0px_0px_#000] p-3 text-center">
              <p className="text-type-black font-black text-lg">+{stampsGained} ⭐</p>
              <p className="text-xs text-type-black/70 font-bold">스탬프</p>
            </div>
          )}
          {isPerfect && (
            <div className="flex-1 bg-matcha-green rounded-[15px] border-2 border-black shadow-[3px_3px_0px_0px_#000] p-3 text-center">
              <p className="text-type-black font-black text-lg">만점!</p>
              <p className="text-xs text-type-black/70 font-bold">+5 보너스</p>
            </div>
          )}
        </div>

        {leveledUp && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-grape-punch rounded-[15px] border-2 border-black shadow-[3px_3px_0px_0px_#000] p-3 text-center mb-4"
          >
            <p className="font-black text-white text-lg">
              🎉 Lv.{newLevel} 달성!
            </p>
            <p className="text-white/80 text-xs font-bold mt-1">
              시바견이 새로운 아이템을 장착했어요!
            </p>
          </motion.div>
        )}

        <div className="flex gap-3">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => router.push(backHref)}
            className="flex-1"
          >
            {backLabel}
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
