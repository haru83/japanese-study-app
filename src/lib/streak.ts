/**
 * Determines whether the streak counter should increment
 * based on the user's last study date.
 * Streak should only increment once per day.
 */
export function shouldIncrementStreak(lastStudyAt: Date | null): boolean {
  if (!lastStudyAt) return true;

  const today = new Date();
  const last = new Date(lastStudyAt);

  return (
    today.getFullYear() !== last.getFullYear() ||
    today.getMonth() !== last.getMonth() ||
    today.getDate() !== last.getDate()
  );
}
