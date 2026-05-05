import { describe, it, expect } from "vitest";
import { canPurchaseItem } from "@/lib/wardrobe";

describe("canPurchaseItem", () => {
  it("스탬프와 레벨이 충분하면 구매 가능하다", () => {
    expect(canPurchaseItem({ userStamps: 10, userLevel: 3, stampCost: 5, requiredLevel: 2 })).toBe(true);
  });

  it("스탬프가 부족하면 구매 불가능하다", () => {
    expect(canPurchaseItem({ userStamps: 3, userLevel: 3, stampCost: 5, requiredLevel: 2 })).toBe(false);
  });

  it("레벨이 부족하면 구매 불가능하다", () => {
    expect(canPurchaseItem({ userStamps: 10, userLevel: 1, stampCost: 5, requiredLevel: 2 })).toBe(false);
  });

  it("stampCost가 0이면 항상 구매 가능하다", () => {
    expect(canPurchaseItem({ userStamps: 0, userLevel: 1, stampCost: 0, requiredLevel: 1 })).toBe(true);
  });

  // ── 추가 엣지 케이스 ───────────────────────────────

  it("스탬프가 정확히 비용과 같으면 구매 가능하다", () => {
    expect(canPurchaseItem({ userStamps: 5, userLevel: 3, stampCost: 5, requiredLevel: 2 })).toBe(true);
  });

  it("레벨이 정확히 필요 레벨과 같으면 구매 가능하다", () => {
    expect(canPurchaseItem({ userStamps: 10, userLevel: 2, stampCost: 5, requiredLevel: 2 })).toBe(true);
  });

  it("스탬프와 레벨 모두 부족하면 구매 불가능하다", () => {
    expect(canPurchaseItem({ userStamps: 2, userLevel: 1, stampCost: 5, requiredLevel: 3 })).toBe(false);
  });

  it("스탬프는 충분하지만 레벨이 부족하면 구매 불가능하다", () => {
    expect(canPurchaseItem({ userStamps: 100, userLevel: 1, stampCost: 5, requiredLevel: 3 })).toBe(false);
  });

  it("레벨은 충분하지만 스탬프가 부족하면 구매 불가능하다", () => {
    expect(canPurchaseItem({ userStamps: 1, userLevel: 6, stampCost: 5, requiredLevel: 2 })).toBe(false);
  });

  it("필요 레벨이 1이면 최소 레벨에서도 구매 가능하다", () => {
    expect(canPurchaseItem({ userStamps: 10, userLevel: 1, stampCost: 5, requiredLevel: 1 })).toBe(true);
  });

  it("스탬프 비용 0, 필요 레벨 1이면 최소 조건에서도 구매 가능하다 (무료 아이템)", () => {
    expect(canPurchaseItem({ userStamps: 0, userLevel: 1, stampCost: 0, requiredLevel: 1 })).toBe(true);
  });

  it("큰 수치에서도 정상 동작한다", () => {
    expect(canPurchaseItem({ userStamps: 9999, userLevel: 6, stampCost: 5000, requiredLevel: 5 })).toBe(true);
  });
});
