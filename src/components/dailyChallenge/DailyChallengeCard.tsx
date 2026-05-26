"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export interface ChallengeDisplay {
  id: string;
  type: string;
  requirement: number;
  rewardStamps: number;
  completed: boolean;
  progress: number;
  title: string;
  description: string;
  icon: string;
}

interface DailyChallengeCardProps {
  challenges: ChallengeDisplay[];
  summary?: {
    totalToday: number;
    completedToday: number;
    totalStamps: number;
  } | null;
}

export function DailyChallengeCard({ challenges, summary }: DailyChallengeCardProps) {
  const [showAll, setShowAll] = useState(false);
  const completedCount = summary?.completedToday ?? challenges.filter((c) => c.completed).length;
  const totalCount = summary?.totalToday ?? challenges.length;

  const getChallengeLink = (type: string) => {
    switch (type) {
      case "DIARY":
        return "/diary/topic";
      case "LESSON":
        return "/keigo";
      case "REVIEW":
        return "/learning/review";
      case "QUIZ":
        return "/keigo";
      default:
        return "/home";
    }
  };

  return (
    <div className="bg-paper-white rounded-[15px] border-2 border-black shadow-[4px_4px_0px_0px_#000] overflow-hidden">
      {/* 헤더 */}
      <div className="px-5 py-3 bg-canvas-almond border-b-2 border-black flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">🎯</span>
          <h2 className="font-black text-type-black text-sm">오늘의 챌린지</h2>
        </div>
        <span className="text-xs font-black text-type-black/60">
          {completedCount}/{totalCount} 완료
        </span>
      </div>

      {/* 챌린지 목록 */}
      <div className="px-5 py-3 flex flex-col gap-2">
        {challenges.slice(0, showAll ? undefined : 3).map((challenge) => (
          <ChallengeItem key={challenge.id} challenge={challenge} link={getChallengeLink(challenge.type)} />
        ))}
      </div>

      {/* 요약 */}
      {summary && summary.totalStamps > 0 && (
        <div className="px-5 py-2 bg-sakura-blush border-t-2 border-black">
          <p className="text-xs font-bold text-type-black/70">
            오늘 획득한 스탬프: <span className="font-black text-type-black">{summary.totalStamps}개</span>
          </p>
        </div>
      )}
    </div>
  );
}

function ChallengeItem({ challenge, link }: { challenge: ChallengeDisplay; link: string }) {
  const progressPct = Math.min((challenge.progress / challenge.requirement) * 100, 100);

  return (
    <Link
      href={link}
      className={`flex items-center gap-3 p-3 rounded-[10px] border-2 transition-all ${
        challenge.completed
          ? "bg-matcha-green/10 border-matcha-green/30"
          : "bg-sakura-blush/30 border-black/10 hover:border-black/30"
      }`}
    >
      {/* 아이콘 */}
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0 border-2 ${
          challenge.completed ? "bg-matcha-green border-black" : "bg-paper-white border-black"
        }`}
      >
        {challenge.completed ? "✅" : challenge.icon}
      </div>

      {/* 내용 */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <p className={`text-sm font-black ${challenge.completed ? "text-matcha-green" : "text-type-black"}`}>
            {challenge.title}
          </p>
          {challenge.completed && (
            <span className="text-[10px] font-black bg-matcha-green text-white px-2 py-0.5 rounded-full">
              완료
            </span>
          )}
        </div>
        <p className="text-xs text-type-black/60 font-bold">{challenge.description}</p>

        {/* 진행도 바 */}
        {!challenge.completed && (
          <div className="mt-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold text-type-black/50">
                {challenge.progress}/{challenge.requirement}
              </span>
              <span className="text-[10px] font-bold text-shiba-orange">+{challenge.rewardStamps} 스탬프</span>
            </div>
            <div className="w-full h-2 bg-sakura-blush rounded-full border border-black/20 overflow-hidden">
              <motion.div
                className="h-full bg-shiba-orange rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
