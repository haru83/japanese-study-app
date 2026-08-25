import { describe, it, expect } from "vitest";
import { formatDateKST, formatTimeKST, formatDateTimeKST, toKSTDateString } from "../dateUtils";

describe("dateUtils (KST Timezone)", () => {
  it("formats UTC date to correct KST date across midnight boundary", () => {
    // 2026-08-25T17:30:00Z -> 2026-08-26 02:30:00 KST (+9 hours)
    const utcDate = new Date("2026-08-25T17:30:00Z");

    const kstDate = formatDateKST(utcDate);
    expect(kstDate).toContain("2026");
    expect(kstDate).toContain("08");
    expect(kstDate).toContain("26");

    const kstDateStr = toKSTDateString(utcDate);
    expect(kstDateStr).toBe("2026-08-26");
  });

  it("formats KST time correctly", () => {
    // 2026-08-25T11:30:00Z -> 2026-08-25 20:30:00 KST
    const utcDate = new Date("2026-08-25T11:30:00Z");
    const kstTime = formatTimeKST(utcDate);
    expect(kstTime).toMatch(/(오후|PM)\s*0?8:30|20:30/);
  });

  it("formats full KST date-time string", () => {
    const utcDate = new Date("2026-08-25T01:15:00Z"); // 10:15 AM KST
    const kstDateTime = formatDateTimeKST(utcDate);
    expect(kstDateTime).toContain("2026");
    expect(kstDateTime).toContain("08");
    expect(kstDateTime).toContain("25");
  });

  it("accepts date strings and numbers as inputs", () => {
    const dateStr = "2026-08-25T11:30:00Z";
    expect(toKSTDateString(dateStr)).toBe("2026-08-25");
    expect(toKSTDateString(new Date(dateStr).getTime())).toBe("2026-08-25");
  });
});
