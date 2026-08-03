import { describe, it, expect } from "vitest";
import { calculateFSRS, getFSRSPreviewIntervals, FSRSItemState } from "../fsrs";

describe("FSRS Algorithm Engine", () => {
  it("initializes new item correctly on rating 3 (Good)", () => {
    const res = calculateFSRS(null, 3);
    expect(res.reps).toBe(1);
    expect(res.lapses).toBe(0);
    expect(res.stability).toBe(2.5);
    expect(res.difficulty).toBe(4.5);
    expect(res.intervalDays).toBe(3);
    expect(res.nextReviewAt).toBeInstanceOf(Date);
  });

  it("handles new item rating 1 (Again) with lapse count 1", () => {
    const res = calculateFSRS(null, 1);
    expect(res.reps).toBe(1);
    expect(res.lapses).toBe(1);
    expect(res.stability).toBe(0.4);
    expect(res.intervalDays).toBe(1);
  });

  it("increases stability on consecutive Good ratings", () => {
    const state1 = calculateFSRS(null, 3); // initial S=2.5
    const state2 = calculateFSRS(state1, 3); // next
    expect(state2.stability).toBeGreaterThan(state1.stability);
    expect(state2.reps).toBe(2);
    expect(state2.lapses).toBe(0);
  });

  it("reduces stability and increments lapses when Again (rating 1) is selected", () => {
    const state1: FSRSItemState = {
      stability: 10,
      difficulty: 4,
      reps: 4,
      lapses: 0,
      lastReviewAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    };

    const res = calculateFSRS(state1, 1);
    expect(res.stability).toBeLessThan(state1.stability);
    expect(res.lapses).toBe(1);
    expect(res.reps).toBe(5);
  });

  it("clamps difficulty between 1.0 and 10.0", () => {
    let state: FSRSItemState | null = null;
    // Repeat Easy rating multiple times
    for (let i = 0; i < 10; i++) {
      state = calculateFSRS(state, 4);
    }
    expect(state.difficulty).toBeGreaterThanOrEqual(1.0);
    expect(state.difficulty).toBeLessThanOrEqual(10.0);
  });

  it("generates correct preview interval labels for 4 ratings", () => {
    const previews = getFSRSPreviewIntervals(null);
    expect(previews[1]).toMatch(/\d+일/);
    expect(previews[2]).toMatch(/\d+일/);
    expect(previews[3]).toMatch(/\d+일/);
    expect(previews[4]).toMatch(/\d+일/);
  });
});
