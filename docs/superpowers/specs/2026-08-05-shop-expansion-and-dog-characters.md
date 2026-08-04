# Shop Expansion, Level 10 Increase, and Dog Characters Spec

**Date:** 2026-08-05  
**Status:** Approved  
**Topic:** Adding 6 New Items, Expanding Level Cap to Lv.10, and Introducing Dog Character Selection System  

---

## 1. Executive Summary

This feature expansion enhances gamification and user customization by:
1. **Adding 6 New Wearable Items**: Ninja outfit, Wizard hat, Hawaiian shirt, Headphones, Pink ribbon, and Randoseru bag.
2. **Expanding Max Level to 10**: Increasing `MAX_LEVEL` from 6 to 10 with new titles and distinctive background auras for levels 7 through 10.
3. **Introducing Dog Character Selection**: Adding 3 new unlockable mascot characters (Poodle, Beagle, Pomeranian) alongside the default Shiba Inu, allowing users to choose their active mascot avatar.

---

## 2. Detailed Architecture & Design

### 2.1 Max Level Expansion (`src/lib/xp.ts`)

* **`MAX_LEVEL`**: Set to `10`.
* **`LEVEL_THRESHOLDS`**: `[0, 100, 250, 450, 700, 1000, 1400, 1900, 2500, 3200]`.
* **`LEVEL_TITLES`**:
  * **Lv.1**: 초보 왕왕이
  * **Lv.2**: 공부하는 왕왕이
  * **Lv.3**: 경어 능력자
  * **Lv.4**: 마스터 왕왕이
  * **Lv.5**: 일본어 학자
  * **Lv.6**: 전설의 대마왕
  * **Lv.7**: 일본어 능력자
  * **Lv.8**: 어휘 대가
  * **Lv.9**: 경어 현자
  * **Lv.10**: 신화의 만렙 왕왕이

### 2.2 Background Aura Expansion (`ShibaAvatar.tsx`)

Extend `ShibaAura` rendering up to Level 10:
* **Lv.7 (Mystic Violet)**: `bg-purple-500/60 ring-4 ring-purple-400 shadow-[0_0_24px_rgba(168,85,247,0.8)]`
* **Lv.8 (Diamond Crystal)**: `bg-cyan-400/60 ring-4 ring-cyan-300 shadow-[0_0_26px_rgba(34,211,238,0.9)]`
* **Lv.9 (Galactic Starburst)**: `bg-indigo-500/60 ring-4 ring-indigo-400 shadow-[0_0_28px_rgba(99,102,241,0.9)]`
* **Lv.10 (Godlike Radiant Halo)**: `bg-gradient-to-r from-amber-400 via-rose-500 to-amber-300 ring-4 ring-amber-300 shadow-[0_0_32px_rgba(251,191,36,1)]`

### 2.3 Dog Characters System (`prisma/schema.prisma` & `ShibaAvatar.tsx`)

* **Database Field**: Add `activeCharacter` (`String @default("shiba")`) to `UserProgress` model.
* **Character Definitions**:
  * `shiba`: 기본 시바견 (`/mascot/shiba-base.webp`)
  * `poodle`: 몽실이 푸들 (`/mascot/poodle-base.webp`)
  * `beagle`: 장난꾸러기 비글 (`/mascot/beagle-base.webp`)
  * `pomeranian`: 솜사탕 포메라니안 (`/mascot/pomeranian-base.webp`)
* **Avatar Component (`ShibaAvatar.tsx`)**:
  * Accepts `characterId` prop (default `"shiba"`).
  * Selects base image accordingly.

### 2.4 New Items (`prisma/seed-wardrobe.ts`)

Add 6 new items to seeding script:
* `item-ninja`: 닌자 복장 (🥷)
* `item-wizard-hat`: 마법사 모자 (🧙‍♂️)
* `item-hawaiian-shirt`: 하와이안 셔츠 (🌺)
* `item-headphones`: 스트리머 헤드폰 (🎧)
* `item-pink-ribbon`: 핑크 리본 (🎀)
* `item-randoseru`: 란도셀 책가방 (🎒)

---

## 3. Data Flow & Components Affected

1. `prisma/schema.prisma` — Add `activeCharacter` to `UserProgress`.
2. `src/lib/xp.ts` — Expand level thresholds and titles to Lv.10.
3. `src/components/mascot/ShibaAvatar.tsx` — Add character base images and Lv.7-10 auras.
4. `prisma/seed-wardrobe.ts` — Seed 6 new items.
5. `src/actions/user.ts` & `src/actions/wardrobe.ts` — Add character switching actions.

---

## 4. Verification Plan

* Run `npx vitest run` to ensure all unit tests pass cleanly.
* Run `npx prisma generate` & `npx prisma db push`.
* Verify level calculations, character switching, and aura display.
