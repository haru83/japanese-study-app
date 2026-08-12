import { prisma } from "@/lib/db";
import { selectWordOfTheDay, type VocabItem } from "@/lib/wotd-logic";

export const CONTENT_PER_LEVEL = 30;

/**
 * sortOrder(1-based)로부터 해당 콘텐츠를 열기 위해 필요한 레벨을 반환.
 * sortOrder 1~30 → Lv1, 31~60 → Lv2, ..., 271~300 → Lv10
 */
export function requiredLevelForContent(sortOrder: number): number {
  return Math.ceil(sortOrder / CONTENT_PER_LEVEL);
}

/**
 * 해당 콘텐츠가 userLevel에서 접근 가능한지 반환.
 */
export function isContentUnlocked(sortOrder: number, userLevel: number): boolean {
  return userLevel >= requiredLevelForContent(sortOrder);
}

/**
 * 해당 콘텐츠가 오늘의 단어로 지정된 콘텐츠인지 확인.
 */
export async function isWotdContent(id: string): Promise<boolean> {
  const [keigoLessons, learningDiaries] = await Promise.all([
    prisma.keigoLesson.findMany({ where: { isActive: true }, select: { id: true, vocab: true } }),
    prisma.learningDiaryEntry.findMany({ where: { isActive: true }, select: { id: true, vocabulary: true } }),
  ]);

  const keigoVocab: VocabItem[] = keigoLessons.flatMap((l) => {
    try {
      const parsed = JSON.parse(l.vocab) as Array<{ word: string; reading?: string; meaning: string }>;
      return parsed.map((v) => ({ ...v, sourceId: l.id }));
    } catch {
      return [];
    }
  });

  const diaryVocab: VocabItem[] = learningDiaries.flatMap((d) => {
    try {
      const parsed = JSON.parse(d.vocabulary) as Array<{ word: string; reading?: string; meaning: string }>;
      return parsed.map((v) => ({ ...v, sourceId: d.id }));
    } catch {
      return [];
    }
  });

  const wotd = selectWordOfTheDay(new Date(), keigoVocab, diaryVocab);
  return wotd?.sourceId === id;
}
