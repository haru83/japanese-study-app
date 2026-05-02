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
});
