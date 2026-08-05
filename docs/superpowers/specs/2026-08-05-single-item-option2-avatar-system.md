# Single-Item Pre-Fitted Mascot Avatar System Spec (Option 2)

**Date:** 2026-08-05  
**Status:** Approved  
**Topic:** Restricting Wardrobe Equipment to 1 Item Total and Using Dedicated Pre-Fitted Artwork per Breed/Item Combination (Option 2)  

---

## 1. Executive Summary

This specification pivots the avatar equipment system to Option 2:
1. **Single Item Equipment Restriction**:
   * Total max equipped items = **1** across all wardrobe items.
   * Equipping any new item automatically unequips any previously equipped item.
2. **Dedicated Pre-Fitted Mascot Artwork System (Option 2)**:
   * Each breed (`shiba`, `poodle`, `beagle`, `pomeranian`) and item combination resolves to a dedicated pre-fitted high-resolution mascot image (`CHARACTER_ITEM_MASCOTS[characterId][itemId]`).
   * When an item is equipped, `ShibaAvatar` directly renders the single fitted mascot artwork instead of rendering separate overlay PNGs pasted on top.
   * This guarantees 100% natural, seamless illustration quality without clipping or misaligned overlay artifacts.

---

## 2. Detailed Architecture & Design

### 2.1 Action Logic (`src/actions/wardrobe.ts`)

When `equipItem(itemId)` is called:
- Unequip ALL currently equipped items for the user (`equippedAt: null`).
- Equip the new `itemId` (`equippedAt: new Date()`).

### 2.2 Pre-Fitted Artwork Mapping (`src/components/mascot/ShibaAvatar.tsx`)

```ts
export const CHARACTER_ITEM_MASCOTS: Record<string, Record<string, string>> = {
  shiba: {
    "hachimaki": "/mascot/shiba-lv2-hachimaki.webp",
    "scarf": "/mascot/shiba-lv3-scarf.webp",
    "hakama": "/mascot/shiba-lv4-kimono.webp",
    "glasses": "/mascot/shiba-lv5-glasses.webp",
    "crown": "/mascot/shiba-lv6-master.webp",
    // aliases
    "item-headband": "/mascot/shiba-lv2-hachimaki.webp",
    "item-scarf": "/mascot/shiba-lv3-scarf.webp",
    "item-kimono": "/mascot/shiba-lv4-kimono.webp",
    "item-glasses": "/mascot/shiba-lv5-glasses.webp",
    "item-crown": "/mascot/shiba-lv6-master.webp",
  },
  poodle: {
    /* Dedicated pre-fitted poodle artwork assets */
  },
  beagle: {
    /* Dedicated pre-fitted beagle artwork assets */
  },
  pomeranian: {
    /* Dedicated pre-fitted pomeranian artwork assets */
  },
};
```

### 2.3 Single-Image Avatar Rendering (`ShibaAvatar.tsx`)

In `ShibaAvatar.tsx`:
```ts
const equippedItemId = equippedItemIds && equippedItemIds.length > 0 ? normalizeItemId(equippedItemIds[0]) : null;
const fittedMascotSrc = equippedItemId ? CHARACTER_ITEM_MASCOTS[characterId]?.[equippedItemId] : null;
const finalSrc = fittedMascotSrc || baseImage;
```
Renders `<Image src={finalSrc} ... />` cleanly!

---

## 3. Data Flow & Verification Plan

1. Update `src/actions/wardrobe.ts` to unequip all items when equipping any new item (max 1 equipped item).
2. Generate dedicated pre-fitted mascot artwork assets for Poodle, Beagle, Pomeranian wearing shop items.
3. Update `CHARACTER_ITEM_MASCOTS` mapping in `ShibaAvatar.tsx` and render single fitted artwork image.
4. Update unit tests in `src/lib/__tests__/wardrobe.test.ts`.
5. Run Vitest suite (`npx vitest run`) and Next.js build (`npm run build`).
