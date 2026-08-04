export type WardrobeSlot = "head" | "face" | "ear" | "neck" | "body";

export const ITEM_SLOTS: Record<string, WardrobeSlot> = {
  // ─── 머리 (head) ───
  "hachimaki": "head",
  "item-headband": "head",
  "bandana": "head",
  "hat-cap": "head",
  "hat-santa": "head",
  "crown": "head",
  "item-crown": "head",
  "flower-crown": "head",
  "halo": "head",
  "horns": "head",
  "wizard-hat": "head",
  "item-wizard-hat": "head",
  "headphones": "head",
  "item-headphones": "head",
  "pink-ribbon": "head",
  "item-pink-ribbon": "head",

  // ─── 얼굴 (face) ───
  "glasses": "face",
  "item-glasses": "face",
  "mask-fox": "face",
  "mask-oni": "face",

  // ─── 귀 (ear) ───
  "earring-gold": "ear",
  "stud-ear": "ear",

  // ─── 목 (neck) ───
  "scarf": "neck",
  "item-scarf": "neck",
  "muffler": "neck",
  "bow-tie": "neck",
  "necklace-pearl": "neck",

  // ─── 몸통 (body) ───
  "hakama": "body",
  "item-kimono": "body",
  "armor-samurai": "body",
  "cape": "body",
  "ninja": "body",
  "item-ninja": "body",
  "hawaiian-shirt": "body",
  "item-hawaiian-shirt": "body",
  "randoseru": "body",
  "item-randoseru": "body",
};

export function getItemSlot(itemId: string): WardrobeSlot | "other" {
  return ITEM_SLOTS[itemId] ?? "other";
}

export function canPurchaseItem(params: {
  userStamps: number;
  userLevel: number;
  stampCost: number;
  requiredLevel: number;
}): boolean {
  return params.userStamps >= params.stampCost && params.userLevel >= params.requiredLevel;
}
