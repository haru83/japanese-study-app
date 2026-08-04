import { describe, it, expect } from "vitest";
import { canPurchaseItem, getItemSlot } from "@/lib/wardrobe";
import { getFallbackLevelImage, getShibaMascotSrc, CHARACTER_BASES } from "@/components/mascot/ShibaAvatar";

describe("getItemSlot", () => {
  it("머리 아이템들은 head 슬롯으로 분류된다", () => {
    expect(getItemSlot("hachimaki")).toBe("head");
    expect(getItemSlot("item-headband")).toBe("head");
    expect(getItemSlot("bandana")).toBe("head");
    expect(getItemSlot("crown")).toBe("head");
  });

  it("얼굴 아이템들은 face 슬롯으로 분류된다", () => {
    expect(getItemSlot("glasses")).toBe("face");
    expect(getItemSlot("item-glasses")).toBe("face");
    expect(getItemSlot("mask-fox")).toBe("face");
  });

  it("목 아이템들은 neck 슬롯으로 분류된다", () => {
    expect(getItemSlot("scarf")).toBe("neck");
    expect(getItemSlot("item-scarf")).toBe("neck");
    expect(getItemSlot("muffler")).toBe("neck");
  });

  it("몸통 아이템들은 body 슬롯으로 분류된다", () => {
    expect(getItemSlot("hakama")).toBe("body");
    expect(getItemSlot("item-kimono")).toBe("body");
    expect(getItemSlot("armor-samurai")).toBe("body");
  });
});

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

describe("Wardrobe items level requirements", () => {
  it("defines valid level requirements for level-unlocked items", () => {
    const levelItems = [
      { name: "머리띠", requiredLevel: 2 },
      { name: "스카프", requiredLevel: 3 },
      { name: "기모노", requiredLevel: 4 },
      { name: "안경", requiredLevel: 5 },
      { name: "마스터 왕관", requiredLevel: 6 },
    ];
    levelItems.forEach((item) => {
      expect(item.requiredLevel).toBeGreaterThanOrEqual(1);
    });
  });
});

describe("CHARACTER_BASES & getFallbackLevelImage & getShibaMascotSrc", () => {
  it("CHARACTER_BASES contains mappings for all supported dog characters", () => {
    expect(CHARACTER_BASES.shiba).toBe("/mascot/shiba-base.webp");
    expect(CHARACTER_BASES.poodle).toBe("/mascot/shiba-base.webp");
    expect(CHARACTER_BASES.beagle).toBe("/mascot/shiba-base.webp");
    expect(CHARACTER_BASES.pomeranian).toBe("/mascot/shiba-base.webp");
  });

  it("getFallbackLevelImage returns character base image when no items are equipped", () => {
    expect(getFallbackLevelImage(1, [], "poodle")).toBe("/mascot/shiba-base.webp");
    expect(getFallbackLevelImage(10, [], "beagle")).toBe("/mascot/shiba-base.webp");
  });

  it("getShibaMascotSrc returns base image for characterId", () => {
    expect(getShibaMascotSrc(1, "pomeranian")).toBe("/mascot/shiba-base.webp");
    expect(getShibaMascotSrc(1)).toBe("/mascot/shiba-base.webp");
  });

  it("착용 아이템이 없으면 레벨과 관계없이 항상 base 이미지를 반환한다", () => {
    expect(getFallbackLevelImage(1, [])).toBe("/mascot/shiba-base.webp");
    expect(getFallbackLevelImage(6, [])).toBe("/mascot/shiba-base.webp");
    expect(getFallbackLevelImage(6)).toBe("/mascot/shiba-base.webp");
  });

  it("폴백 레벨이 있는 아이템 착용 시 해당 레벨 이미지를 반환한다", () => {
    expect(getFallbackLevelImage(1, ["scarf"])).toBe("/mascot/shiba-lv3-scarf.webp");
    expect(getFallbackLevelImage(1, ["crown"])).toBe("/mascot/shiba-lv6-master.webp");
  });
});


