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
 * Streak should only increment once per calendar day
 * in the user's timezone (default: KST).
 *
 * Bug fixed: the original implementation compared raw UTC
 * date components, so a study at KST 23:30 and another at
 * KST 00:30 the next day could both fall on the same UTC
 * date — falsely preventing a streak increment. Using
 * toLocaleDateString with the correct timezone ensures
 * calendar-day comparison matches the user's local time.
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
