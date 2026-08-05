export type WardrobeSlot = "head" | "body";

export const ITEM_SLOTS: Record<string, WardrobeSlot> = {
  // ─── 머리 슬롯 (head) ───
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
  "glasses": "head",
  "item-glasses": "head",
  "mask-fox": "head",
  "mask-oni": "head",
  "earring-gold": "head",
  "stud-ear": "head",
  "wizard-hat": "head",
  "item-wizard-hat": "head",
  "headphones": "head",
  "item-headphones": "head",
  "pink-ribbon": "head",
  "item-pink-ribbon": "head",

  // ─── 몸통 슬롯 (body) ───
  "scarf": "body",
  "item-scarf": "body",
  "muffler": "body",
  "bow-tie": "body",
  "necklace-pearl": "body",
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
