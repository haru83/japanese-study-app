export const QUIZ_PASS_THRESHOLD = 0.6;

/**
 * Checks whether a quiz score meets the minimum passing criteria (60% or higher).
 * If total questions is 0, defaults to true.
 */
export function isQuizPassed(score: number, total: number): boolean {
  if (total <= 0) return true;
  return score / total >= QUIZ_PASS_THRESHOLD;
}
