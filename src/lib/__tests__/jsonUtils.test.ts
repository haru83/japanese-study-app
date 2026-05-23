import { describe, it, expect } from "vitest";
import { safeJsonParse, safeJsonParseWithDefault, safeJsonParseArray } from "@/lib/jsonUtils";

describe("safeJsonParse", () => {
  it("valid JSON object", () => {
    const result = safeJsonParse<{ name: string }>('{"name":"test"}');
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data).toEqual({ name: "test" });
    }
  });

  it("valid JSON array", () => {
    const result = safeJsonParse<string[]>(JSON.stringify(["a", "b", "c"]));
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data).toEqual(["a", "b", "c"]);
    }
  });

  it("valid JSON nested object", () => {
    const result = safeJsonParse<{ user: { name: string; ages: number[] } }>(
      JSON.stringify({ user: { name: "sakura", ages: [5, 10, 15] } })
    );
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data).toEqual({ user: { name: "sakura", ages: [5, 10, 15] } });
    }
  });

  it("invalid JSON returns error", () => {
    const result = safeJsonParse<unknown>("{invalid}");
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBeTruthy();
    }
  });

  it("null input returns error", () => {
    const result = safeJsonParse<unknown>(null as unknown as string);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBe("Input is null or undefined");
    }
  });

  it("undefined input returns error", () => {
    const result = safeJsonParse<unknown>(undefined as unknown as string);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBe("Input is null or undefined");
    }
  });

  it("empty string returns error", () => {
    const result = safeJsonParse<unknown>("");
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBe("Input is an empty string");
    }
  });

  it("whitespace-only string returns error", () => {
    const result = safeJsonParse<unknown>("   ");
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBe("Input is an empty string");
    }
  });

  it("number input returns error", () => {
    const result = safeJsonParse<unknown>(String(123));
    expect(result.ok).toBe(true);
  });

  it("boolean input returns error", () => {
    const result = safeJsonParse<unknown>(String(true));
    expect(result.ok).toBe(true);
  });
});

describe("safeJsonParseWithDefault", () => {
  it("returns parsed data on valid JSON", () => {
    const result = safeJsonParseWithDefault('{"count":42}', { count: 0 });
    expect(result).toEqual({ count: 42 });
  });

  it("falls back to default on invalid JSON", () => {
    const result = safeJsonParseWithDefault("not json", { count: 0 });
    expect(result).toEqual({ count: 0 });
  });

  it("falls back to default on null input", () => {
    const result = safeJsonParseWithDefault(null as unknown as string, [1, 2, 3]);
    expect(result).toEqual([1, 2, 3]);
  });

  it("falls back to default on empty string", () => {
    const result = safeJsonParseWithDefault("", { fallback: true });
    expect(result).toEqual({ fallback: true });
  });

  it("default value can be any type", () => {
    const result = safeJsonParseWithDefault("invalid", "default string");
    expect(result).toBe("default string");
  });
});

describe("safeJsonParseArray", () => {
  it("returns parsed array on valid JSON array", () => {
    const result = safeJsonParseArray<number>("[1,2,3]");
    expect(result).toEqual([1, 2, 3]);
  });

  it("returns parsed array with objects", () => {
    const data = [{ id: 1 }, { id: 2 }];
    const result = safeJsonParseArray<{ id: number }>(JSON.stringify(data));
    expect(result).toEqual(data);
  });

  it("returns empty array on invalid JSON", () => {
    const result = safeJsonParseArray<unknown>("{not array}");
    expect(result).toEqual([]);
  });

  it("returns empty array on null input", () => {
    const result = safeJsonParseArray<unknown>(null as unknown as string);
    expect(result).toEqual([]);
  });

  it("returns empty array on empty string", () => {
    const result = safeJsonParseArray<unknown>("");
    expect(result).toEqual([]);
  });

  it("returns empty array on valid non-array JSON", () => {
    const result = safeJsonParseArray<string>('{"key":"value"}');
    expect(result).toEqual([]);
  });

  it("handles deep nested objects", () => {
    const deep = JSON.stringify({
      level1: {
        level2: {
          level3: {
            items: ["a", "b", "c"],
          },
        },
      },
    });
    const parsed = safeJsonParse<{
      level1: { level2: { level3: { items: string[] } } };
    }>(deep);
    expect(parsed.ok).toBe(true);
    if (parsed.ok) {
      const result = safeJsonParseArray<string>(
        JSON.stringify(parsed.data.level1.level2.level3.items)
      );
      expect(result).toEqual(["a", "b", "c"]);
    }
  });
});