# 2-Slot Fitted Avatar System Spec (Head & Body)

**Date:** 2026-08-05  
**Status:** Approved  
**Topic:** Simplifying Avatar Equipment to 2 Slots (Head & Body) with Breed-Specific Fitted Overlay System  

---

## 1. Executive Summary

This specification refactors the avatar wardrobe and equipment system to:
1. **Simplify Equipment Slots to 2 Categories**:
   * `head`: 머리 슬롯 (최대 1개 장착 가능 — 모자, 머리띠, 안경, 리본, 헤드폰 등)
   * `body`: 몸통 슬롯 (최대 1개 장착 가능 — 의상, 셔츠, 란도셀, 망토, 갑옷 등)
2. **Enforce Strict Slot Mutual Exclusion**:
   * Equipping a new `head` item automatically unequips any previously equipped `head` item.
   * Equipping a new `body` item automatically unequips any previously equipped `body` item.
   * Maximum total equipped items = 2 (1 Head + 1 Body).
3. **Breed-Specific Fitted Overlay System (Option 1)**:
   * Map breed-tailored overlay assets (`CHARACTER_ITEM_OVERLAYS[characterId][itemId]`) for all 4 dog breeds (`shiba`, `poodle`, `beagle`, `pomeranian`).
   * Ensure head items wrap naturally around each breed's specific head/ear shape and body items fit naturally around each breed's specific torso shape.

---

## 2. Detailed Architecture & Design

### 2.1 Slot Classification (`src/lib/wardrobe.ts`)

```ts
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
```

### 2.2 Mutual Exclusion Rule (`src/actions/wardrobe.ts`)

When `equipItem(itemId)` is invoked:
1. Determine `targetSlot = getItemSlot(itemId)` (`head` or `body`).
2. Find any currently equipped item in `targetSlot`.
3. Unequip the old item in `targetSlot` and equip the new item.

### 2.3 Breed-Specific Fitted Overlay Mapping (`ShibaAvatar.tsx`)

Each character breed resolves item overlay graphics tailored to its anatomy:
```ts
export const CHARACTER_ITEM_OVERLAYS: Record<string, Record<string, string>> = {
  shiba: {
    /* shiba overlay mappings */
  },
  poodle: {
    /* poodle overlay mappings */
  },
  beagle: {
    /* beagle overlay mappings */
  },
  pomeranian: {
    /* pomeranian overlay mappings */
  },
};
```

---

## 3. Data Flow & Verification Plan

1. Update `src/lib/wardrobe.ts` to define 2 slots (`head` and `body`).
2. Update `src/actions/wardrobe.ts` to enforce 2-slot mutual exclusion.
3. Update `src/components/mascot/ShibaAvatar.tsx` to handle breed-specific overlay resolution and rendering.
4. Update unit tests in `src/lib/__tests__/wardrobe.test.ts`.
5. Verify `npx vitest run` passes 100%.
