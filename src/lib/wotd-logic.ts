// ── Word of the Day: Deterministic Selection ────────────────────────────────────

export const WOTD_TIMEZONE = "Asia/Seoul";

export interface WotdEntry {
  word: string;
  reading: string;
  meaning: string;
  source: string;
  sourceId: string;
  sourceType: "keigo" | "learning-diary";
}

export interface VocabItem {
  word: string;
  reading?: string;
  meaning: string;
  sourceId?: string;
}

/**
 * Deterministic hash for date-based word selection.
 * Same date → same index. Different date → different index.
 */
export function dateToWotdIndex(date: Date, poolSize: number, tz: string = WOTD_TIMEZONE): number {
  if (poolSize <= 0) return 0;
  const dateStr = date.toLocaleDateString("en-CA", { timeZone: tz });
  const digits = dateStr.replace(/-/g, "");
  const seed = parseInt(digits, 10);
  let state = seed;
  const a = 1664525;
  const c = 1013904223;
  const m = 2 ** 32;
  state = ((a * state + c) % m) >>> 0;
  return state % poolSize;
}

/**
 * Select the Word of the Day from a combined vocab pool.
 * Deterministic: same date + same pool → same word.
 */
export function selectWordOfTheDay(
  date: Date,
  keigoVocab: VocabItem[],
  diaryVocab: VocabItem[],
  tz: string = WOTD_TIMEZONE
): WotdEntry | null {
  const combined: Array<VocabItem & { source: "keigo" | "learning-diary"; sourceIndex: number }> = [
    ...keigoVocab.map((v, i) => ({ ...v, source: "keigo" as const, sourceIndex: i })),
    ...diaryVocab.map((v, i) => ({ ...v, source: "learning-diary" as const, sourceIndex: i })),
  ];

  if (combined.length === 0) return null;

  const idx = dateToWotdIndex(date, combined.length, tz);
  const selected = combined[idx];

  return {
    word: selected.word,
    reading: selected.reading ?? "",
    meaning: selected.meaning,
    source: selected.source === "keigo" ? "경어 레슨" : "학습 일기",
    sourceId: selected.sourceId || String(selected.sourceIndex),
    sourceType: selected.source,
  };
}