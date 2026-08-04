import { describe, it, expect } from "vitest";

function formatLocalDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

describe("formatLocalDateString", () => {
  it("formats Date to YYYY-MM-DD correctly in local time", () => {
    const testDate = new Date(2026, 7, 5); // 2026-08-05 (Note: month is 0-indexed, so 7 is August)
    expect(formatLocalDateString(testDate)).toBe("2026-08-05");
  });
});

describe("Calendar Month Calculations", () => {
  it("calculates correct days in month and starting day of week for August 2026", () => {
    const year = 2026;
    const month = 7; // August (0-indexed)
    const firstDayOfWeek = new Date(year, month, 1).getDay(); // Saturday = 6
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // 31 days
    expect(firstDayOfWeek).toBe(6);
    expect(daysInMonth).toBe(31);
  });
});

