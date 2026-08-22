import { z } from "zod";

export const DiaryInputSchema = z.object({
  title: z.string().min(1, "제목은 필수입니다").max(200, "제목은 200자 이내여야 합니다"),
  content: z.string().min(1, "내용은 필수입니다").max(10000, "내용은 10000자 이내여야 합니다"),
  mood: z.string().optional(),
  topicId: z.string().optional(),
  isPublic: z.boolean().optional(),
  isTutorPublic: z.boolean().optional(),
  tutorReview: z.string().optional(),
});

export const CommentInputSchema = z.object({
  content: z.string().min(1, "댓글 내용은 필수입니다").max(500, "댓글은 500자 이내여야 합니다").transform((v) => v.trim()),
});

export const ReportInputSchema = z.object({
  targetType: z.enum(["diary", "comment", "post"]),
  targetId: z.string().min(1, "대상 ID가 필요합니다"),
  reason: z.string().max(500, "신고 사유는 500자 이내여야 합니다").optional(),
});

export const AdminKeigoContentSchema = z.object({
  id: z.string().min(1, "ID는 필수입니다"),
  title: z.string().min(1, "제목은 필수입니다").max(200, "제목은 200자 이내여야 합니다"),
  category: z.string().min(1, "카테고리는 필수입니다"),
  thumbnail: z.string().min(1, "썸네일은 필수입니다"),
  dialogue: z.string().min(1, "대화는 필수입니다").max(50000, "대화 JSON은 50000자 이하여야 합니다"),
  grammarPoints: z.string().min(1, "문법은 필수입니다").max(50000, "문법 JSON은 50000자 이하여야 합니다"),
  vocab: z.string().min(1, "어휘는 필수입니다").max(50000, "어휘 JSON은 50000자 이하여야 합니다"),
  quiz: z.string().min(1, "퀴즈는 필수입니다").max(50000, "퀴즈 JSON은 50000자 이하여야 합니다"),
  sortOrder: z.number().int().min(0, "정렬 순서는 0 이상이어야 합니다"),
  isActive: z.boolean(),
});

export const AdminDiaryContentSchema = z.object({
  id: z.string().min(1, "ID는 필수입니다"),
  title: z.string().min(1, "제목은 필수입니다").max(200, "제목은 200자 이내여야 합니다"),
  titleKo: z.string().min(1, "한국어 제목은 필수입니다").max(200, "한국어 제목은 200자 이내여야 합니다"),
  category: z.string().min(1, "카테고리는 필수입니다"),
  level: z.string().min(1, "레벨은 필수입니다"),
  thumbnail: z.string().min(1, "썸네일은 필수입니다"),
  contentJp: z.string().min(1, "일본어 본문은 필수입니다").max(50000, "본문 JSON은 50000자 이하여야 합니다"),
  contentKo: z.string().min(1, "한국어 본문은 필수입니다").max(50000, "한국어 본문은 50000자 이하여야 합니다"),
  vocabulary: z.string().min(1, "어휘는 필수입니다").max(50000, "어휘 JSON은 50000자 이하여야 합니다"),
  grammarPoints: z.string().min(1, "문법은 필수입니다").max(50000, "문법 JSON은 50000자 이하여야 합니다"),
  quiz: z.string().min(1, "퀴즈는 필수입니다").max(50000, "퀴즈 JSON은 50000자 이하여야 합니다"),
  sortOrder: z.number().int().min(0, "정렬 순서는 0 이상이어야 합니다"),
  isActive: z.boolean(),
});

export const DailyChallengeTypeSchema = z.enum(["DIARY", "LESSON", "REVIEW", "QUIZ"]);

export const QuestDifficultySchema = z.enum(["EASY", "MEDIUM", "HARD"]);

export const QuestClaimSchema = z.object({
  questId: z.string().min(1, "퀘스트 ID가 필요합니다"),
});

export const DailyChallengeInputSchema = z.object({
  type: DailyChallengeTypeSchema,
  requirement: z.number().int().min(1, "요구량은 1 이상이어야 합니다").max(100, "요구량은 100 이하여야 합니다"),
  rewardStamps: z.number().int().min(0).max(10).default(1),
});

export type DiaryInput = z.infer<typeof DiaryInputSchema>;
export type CommentInput = z.infer<typeof CommentInputSchema>;
export type ReportInput = z.infer<typeof ReportInputSchema>;
export type AdminKeigoContent = z.infer<typeof AdminKeigoContentSchema>;
export type AdminDiaryContent = z.infer<typeof AdminDiaryContentSchema>;
export type DailyChallengeType = z.infer<typeof DailyChallengeTypeSchema>;
export type QuestDifficulty = z.infer<typeof QuestDifficultySchema>;
export type DailyChallengeInput = z.infer<typeof DailyChallengeInputSchema>;
export type QuestClaim = z.infer<typeof QuestClaimSchema>;
