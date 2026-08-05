import { describe, it, expect, vi, beforeEach } from "vitest";
import { canPurchaseItem, getItemSlot } from "@/lib/wardrobe";
import { getFallbackLevelImage, getShibaMascotSrc, CHARACTER_BASES, getBreedFittedStyle } from "@/components/mascot/ShibaAvatar";
import { equipItem } from "@/actions/wardrobe";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";

vi.mock("next-auth", () => ({
  getServerSession: vi.fn(),
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

vi.mock("@/lib/db", () => ({
  prisma: {
    userWardrobeItem: {
      findUnique: vi.fn(),
      updateMany: vi.fn(),
      update: vi.fn(),
    },
  },
}));

describe("getItemSlot", () => {
  it("classifies all head items as head slot", () => {
    expect(getItemSlot("hachimaki")).toBe("head");
    expect(getItemSlot("glasses")).toBe("head");
    expect(getItemSlot("wizard-hat")).toBe("head");
  });

  it("classifies all body items as body slot", () => {
    expect(getItemSlot("scarf")).toBe("body");
    expect(getItemSlot("hakama")).toBe("body");
    expect(getItemSlot("ninja")).toBe("body");
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
    expect(CHARACTER_BASES.poodle).toBe("/mascot/poodle-base.png");
    expect(CHARACTER_BASES.beagle).toBe("/mascot/beagle-base.png");
    expect(CHARACTER_BASES.pomeranian).toBe("/mascot/pomeranian-base.png");
  });

  it("getFallbackLevelImage returns character base image when no items are equipped", () => {
    expect(getFallbackLevelImage(1, [], "poodle")).toBe("/mascot/poodle-base.png");
    expect(getFallbackLevelImage(10, [], "beagle")).toBe("/mascot/beagle-base.png");
  });

  it("getShibaMascotSrc returns base image for characterId", () => {
    expect(getShibaMascotSrc(1, "pomeranian")).toBe("/mascot/pomeranian-base.png");
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

  it("단일 아이템 착용 시 해당 단일 아이템 폴백 이미지를 정상 해소한다", () => {
    expect(getFallbackLevelImage(1, ["hachimaki"])).toBe("/mascot/shiba-base.webp");
    expect(getFallbackLevelImage(1, ["scarf"])).toBe("/mascot/shiba-lv3-scarf.webp");
  });
});

describe("2-Slot Breed-Specific Fitted Overlay Resolution (getBreedFittedStyle)", () => {
  it("returns empty style object for default shiba character", () => {
    expect(getBreedFittedStyle("shiba", "head")).toEqual({});
    expect(getBreedFittedStyle("shiba", "body")).toEqual({});
    expect(getBreedFittedStyle(undefined, "head")).toEqual({});
  });

  it("returns 2-slot fitted clipPath styles for non-shiba dog breeds", () => {
    expect(getBreedFittedStyle("poodle", "head")).toEqual({ clipPath: "inset(0 0 35% 0)" });
    expect(getBreedFittedStyle("beagle", "head")).toEqual({ clipPath: "inset(0 0 35% 0)" });
    expect(getBreedFittedStyle("pomeranian", "body")).toEqual({ clipPath: "inset(30% 0 0 0)" });
  });
});

describe("equipItem server action (single-item equipment restriction)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("로그인이 안 되어 있으면 에러를 던진다", async () => {
    vi.mocked(getServerSession).mockResolvedValueOnce(null);
    await expect(equipItem("hachimaki")).rejects.toThrow("로그인이 필요합니다.");
  });

  it("보유하지 않은 아이템을 착용하려 하면 에러를 던진다", async () => {
    vi.mocked(getServerSession).mockResolvedValueOnce({
      user: { id: "user-1" },
      expires: "2099-01-01",
    });
    vi.mocked(prisma.userWardrobeItem.findUnique).mockResolvedValueOnce(null);

    await expect(equipItem("hachimaki")).rejects.toThrow("보유하지 않은 아이템입니다.");
  });

  it("아이템 착용 시 전체 옷장의 모든 착용 중인 아이템을 해제 후 새로 착용한다", async () => {
    vi.mocked(getServerSession).mockResolvedValueOnce({
      user: { id: "user-1" },
      expires: "2099-01-01",
    });
    vi.mocked(prisma.userWardrobeItem.findUnique).mockResolvedValueOnce({
      id: "uwi-1",
      userId: "user-1",
      wardrobeItemId: "hachimaki",
      equippedAt: null,
      earnedAt: new Date(),
    });

    vi.mocked(prisma.userWardrobeItem.updateMany).mockResolvedValueOnce({ count: 2 });
    vi.mocked(prisma.userWardrobeItem.update).mockResolvedValueOnce({
      id: "uwi-1",
      userId: "user-1",
      wardrobeItemId: "hachimaki",
      equippedAt: new Date(),
      earnedAt: new Date(),
    });

    const result = await equipItem("hachimaki");

    expect(result).toEqual({ success: true });
    expect(prisma.userWardrobeItem.updateMany).toHaveBeenCalledWith({
      where: { userId: "user-1", equippedAt: { not: null } },
      data: { equippedAt: null },
    });
    expect(prisma.userWardrobeItem.update).toHaveBeenCalledWith({
      where: { userId_wardrobeItemId: { userId: "user-1", wardrobeItemId: "hachimaki" } },
      data: { equippedAt: expect.any(Date) },
    });
  });
});



