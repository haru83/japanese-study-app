/**
 * Type-safe JSON parsing utilities
 * Replaces 23+ unsafe JSON.parse() calls across the codebase
 */

/**
 * Safely parse JSON with explicit success/error discriminated union
 */
export function safeJsonParse<T>(
  input: string
): { ok: true; data: T } | { ok: false; error: string } {
  if (input == null) {
    return { ok: false, error: "Input is null or undefined" };
  }

  if (typeof input !== "string") {
    return { ok: false, error: "Input is not a string" };
  }

  if (input.trim() === "") {
    return { ok: false, error: "Input is an empty string" };
  }

  try {
    const parsed = JSON.parse(input) as T;
    return { ok: true, data: parsed };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown parse error";
    return { ok: false, error: message };
  }
}

/**
 * Parse JSON with a fallback default value on failure
 */
export function safeJsonParseWithDefault<T>(input: string, defaultValue: T): T {
  const result = safeJsonParse<T>(input);
  if (result.ok) {
    return result.data;
  }
  return defaultValue;
}

/**
 * Parse JSON array, returning empty array on any failure
 */
export function safeJsonParseArray<T>(input: string): T[] {
  const result = safeJsonParse<T[]>(input);
  if (result.ok && Array.isArray(result.data)) {
    return result.data;
  }
  return [];
}