/**
 * Default timezone for the app (KST = UTC+9).
 * Used when no explicit timezone is provided.
 */
export const DEFAULT_TIMEZONE = "Asia/Seoul";

/**
 * Returns the calendar date string (YYYY-MM-DD) for a given Date
 * in the specified IANA timezone.
 */
function toDateStr(date: Date, tz: string): string {
  return date.toLocaleDateString("en-CA", { timeZone: tz });
}

/**
 * Determines whether the streak counter should increment
 * based on the user's last study date.
 */
export function shouldIncrementStreak(
  lastStudyAt: Date | null,
  timezone: string = DEFAULT_TIMEZONE
): boolean {
  if (!lastStudyAt) return true;

  const todayStr = toDateStr(new Date(), timezone);
  const lastStr = toDateStr(new Date(lastStudyAt), timezone);

  return todayStr !== lastStr;
}

export interface StreakEvaluationResult {
  streakDays: number;
  freezeUsed: boolean;
  freezesRemaining: number;
  isBroken: boolean;
  brokenPreviousDays?: number;
}

/**
 * Evaluates streak status considering Streak Freeze tokens.
 * If 1 calendar day was missed and freezeCount > 0, 1 freeze is consumed to preserve streak.
 */
export function evaluateStreakWithFreeze(
  lastStudyAt: Date | null,
  currentStreak: number,
  freezeCount: number = 0,
  now: Date = new Date(),
  timezone: string = DEFAULT_TIMEZONE
): StreakEvaluationResult {
  if (!lastStudyAt) {
    return { streakDays: 1, freezeUsed: false, freezesRemaining: freezeCount, isBroken: false };
  }

  const nowStr = toDateStr(now, timezone);
  const lastStr = toDateStr(new Date(lastStudyAt), timezone);

  if (nowStr === lastStr) {
    return { streakDays: currentStreak, freezeUsed: false, freezesRemaining: freezeCount, isBroken: false };
  }

  // Calculate day difference in calendar days
  const lastDate = new Date(lastStr);
  const nowDate = new Date(nowStr);
  const diffDays = Math.round((nowDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays <= 1) {
    // Studied yesterday or today -> streak continues
    return { streakDays: currentStreak + 1, freezeUsed: false, freezesRemaining: freezeCount, isBroken: false };
  }

  if (diffDays === 2 && freezeCount > 0) {
    // Missed 1 day (yesterday), but has a Streak Freeze token!
    return {
      streakDays: currentStreak + 1,
      freezeUsed: true,
      freezesRemaining: freezeCount - 1,
      isBroken: false,
    };
  }

  // Missed more than 1 day or no freeze available -> streak breaks
  return {
    streakDays: 1,
    freezeUsed: false,
    freezesRemaining: freezeCount,
    isBroken: currentStreak >= 3,
    brokenPreviousDays: currentStreak >= 3 ? currentStreak : undefined,
  };
}
