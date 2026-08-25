/**
 * KST (Asia/Seoul, UTC+9) Date and Time Utilities
 * Ensures consistent KST display across server-side (Cloud Run / Node UTC) and client-side renders.
 */

export const KST_TIMEZONE = "Asia/Seoul";

/**
 * Format Date to KST date string (e.g., "2026. 08. 25." or "2026. 08. 25. (화)")
 */
export function formatDateKST(
  date: Date | string | number,
  options?: Intl.DateTimeFormatOptions
): string {
  const d = typeof date === "string" || typeof date === "number" ? new Date(date) : date;
  return d.toLocaleDateString("ko-KR", {
    timeZone: KST_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    ...options,
  });
}

/**
 * Format Date to KST time string (e.g., "오후 08:30")
 */
export function formatTimeKST(
  date: Date | string | number,
  options?: Intl.DateTimeFormatOptions
): string {
  const d = typeof date === "string" || typeof date === "number" ? new Date(date) : date;
  return d.toLocaleTimeString("ko-KR", {
    timeZone: KST_TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
    ...options,
  });
}

/**
 * Format Date to full KST datetime string (e.g., "2026. 08. 25. 오후 08:30")
 */
export function formatDateTimeKST(
  date: Date | string | number,
  options?: Intl.DateTimeFormatOptions
): string {
  const d = typeof date === "string" || typeof date === "number" ? new Date(date) : date;
  return d.toLocaleString("ko-KR", {
    timeZone: KST_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    ...options,
  });
}

/**
 * Returns YYYY-MM-DD in KST (e.g., "2026-08-25")
 */
export function toKSTDateString(date: Date | string | number): string {
  const d = typeof date === "string" || typeof date === "number" ? new Date(date) : date;
  return d.toLocaleDateString("en-CA", { timeZone: KST_TIMEZONE });
}
