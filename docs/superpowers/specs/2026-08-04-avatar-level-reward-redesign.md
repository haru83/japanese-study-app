# Avatar Level-Up Reward & Wardrobe Separation Redesign Spec

**Date:** 2026-08-04  
**Status:** Approved  
**Topic:** Separating Mascot Level-Up Visuals from Wardrobe Outfits & Enhancing Level Rewards  

---

## 1. Executive Summary

Previously, the Shiba Inu mascot avatar (`ShibaAvatar`) automatically equipped built-in clothing/accessories (headband, scarf, kimono, glasses, master crown) as the user leveled up. This created user confusion and overlapped with the Wardrobe item equipping feature.

This redesign completely separates **Wardrobe Outfits** from **Level-Up Progression**:
1. **Pure Wardrobe Outfit Display**: The mascot avatar only displays clothing/accessories explicitly equipped by the user in the Wardrobe.
2. **Level Background Aura System**: Level progression is visually represented by a glow/aura effect rendered *behind* the mascot avatar.
3. **Comprehensive Level-Up Rewards**: Leveling up awards +10 Stamps, unlocks exclusive Wardrobe items for free in the shop, grants a Level Title, and activates a new Background Aura.

---

## 2. Detailed Architecture & Design

### 2.1 Mascot Avatar Component (`ShibaAvatar.tsx`)

* **Base Image Behavior**: When no wardrobe items are equipped, `ShibaAvatar` always renders `BASE_IMAGE` (`shiba-base.png`). Automatic level-based clothing swaps in `getFallbackLevelImage` are removed.
* **Background Aura (`ShibaAura`)**: Rendered behind the mascot container based on `level`:
  * **Lv.1**: None (clean background)
  * **Lv.2 (Sakura Glow)**: Soft pink pulsing glow with subtle sakura sparkles
  * **Lv.3 (Sparkle Aura)**: Vibrant purple/grape pulsing aura
  * **Lv.4 (Starlight Aura)**: Cyan/blue starry aura
  * **Lv.5 (Champion Flame)**: Amber/golden energetic flame aura
  * **Lv.6 (Golden Master Halo)**: Radiant gold halo & crown radiance

### 2.2 Level Titles & Rewards (`xp.ts`)

Define level titles in `src/lib/xp.ts`:
* **Lv.1**: 초보 왕왕이 (Novice Shiba)
* **Lv.2**: 공부하는 왕왕이 (Studious Shiba)
* **Lv.3**: 경어 능력자 (Keigo Expert)
* **Lv.4**: 마스터 왕왕이 (Master Shiba)
* **Lv.5**: 일본어 학자 (Japanese Scholar)
* **Lv.6+**: 전설의 대마왕 (Legendary Master)

### 2.3 Wardrobe Item Integration (`prisma/seed-wardrobe.ts`)

Level-based outfits (Hachimaki Headband, Scarf, Kimono, Glasses, Master Crown) are registered as official `WardrobeItem` entries with `requiredLevel` requirements, allowing users to unlock and equip/unequip them freely in the Wardrobe.

---

## 3. Data Flow & Components Affected

1. `src/components/mascot/ShibaAvatar.tsx` — Add `ShibaAura` rendering and remove automatic fallback level image clothing.
2. `src/lib/xp.ts` — Add `LEVEL_TITLES` dictionary and export `getLevelTitle(level)`.
3. `prisma/seed-wardrobe.ts` — Seed level-unlocked wardrobe items.
4. `src/lib/__tests__/xp.test.ts` & `src/lib/__tests__/wardrobe.test.ts` — Update unit test coverage.

---

## 4. Verification Plan

* Run `npx vitest run` to ensure all 23+ test suites pass cleanly.
* Verify `ShibaAvatar` renders custom level aura and pure user-equipped outfits.
