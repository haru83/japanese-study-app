"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  aiBasedReview,
  ruleBasedReview,
  type SentenceReview,
  type TutorReviewResult,
} from "@/lib/diaryTutorLogic";

export type { SentenceReview, TutorReviewResult };

// ─── 메인 Server Action ──────────────────────────────────────

export async function reviewDiary(data: {
  title: string;
  content: string;
}): Promise<TutorReviewResult> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return {
      overallScore: 0,
      overallComment: "로그인이 필요합니다.",
      reviews: [],
      improvedText: data.content,
    };
  }

  // 1) AI 리뷰 시도 (API 키가 유효할 경우)
  const aiResult = await aiBasedReview(data.title, data.content);
  if (aiResult) {
    return aiResult;
  }

  // 2) AI 실패/키 부재 시 고도화된 규칙 기반 리뷰 수행
  return ruleBasedReview(data.title, data.content);
}
