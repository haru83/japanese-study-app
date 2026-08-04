# Avatar Level-Up Reward & Wardrobe Separation Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Separate mascot avatar level-up visuals from wardrobe outfits by removing automatic clothing level escalation, adding level-based background aura effects, and defining level titles and rewards.

**Architecture:** `ShibaAvatar` renders pure user-equipped outfits with a level-based background aura (`ShibaAura`). Level-based items are registered in `prisma/seed-wardrobe.ts` for wardrobe unlocking, and `xp.ts` exports level titles.

**Tech Stack:** React 19, Next.js 15, Tailwind CSS v4, Prisma, Vitest

## Global Constraints

- Use strict TypeScript (`strict: true`) without `@ts-ignore` or `as any`.
- Follow WangWang Japanese Sticker Bomb design system.
- All unit tests in `src/lib/__tests__/` must pass.

---

### Task 1: Level Titles & XP Utility Updates

**Files:**
- Modify: `src/lib/xp.ts`
- Test: `src/lib/__tests__/xp.test.ts`

**Interfaces:**
- Consumes: None
- Produces: `getLevelTitle(level: number): string` and `LEVEL_TITLES: Record<number, string>`

- [ ] **Step 1: Write failing unit test for `getLevelTitle`**

Add test to `src/lib/__tests__/xp.test.ts`:
```ts
import { getLevelTitle } from "@/lib/xp";

describe("getLevelTitle", () => {
  it("returns correct level title for levels 1 through 6+", () => {
    expect(getLevelTitle(1)).toBe("초보 왕왕이");
    expect(getLevelTitle(2)).toBe("공부하는 왕왕이");
    expect(getLevelTitle(3)).toBe("경어 능력자");
    expect(getLevelTitle(4)).toBe("마스터 왕왕이");
    expect(getLevelTitle(5)).toBe("일본어 학자");
    expect(getLevelTitle(6)).toBe("전설의 대마왕");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/__tests__/xp.test.ts`
Expected: FAIL (getLevelTitle not exported)

- [ ] **Step 3: Implement `getLevelTitle` in `src/lib/xp.ts`**

In `src/lib/xp.ts`:
```ts
export const LEVEL_TITLES: Record<number, string> = {
  1: "초보 왕왕이",
  2: "공부하는 왕왕이",
  3: "경어 능력자",
  4: "마스터 왕왕이",
  5: "일본어 학자",
  6: "전설의 대마왕",
};

export function getLevelTitle(level: number): string {
  const boundedLevel = Math.min(Math.max(level, 1), 6);
  return LEVEL_TITLES[boundedLevel] ?? LEVEL_TITLES[1];
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/__tests__/xp.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/xp.ts src/lib/__tests__/xp.test.ts
git commit -m "feat: add getLevelTitle utility and level titles mapping"
```

---

### Task 2: Seed Level-Unlocked Wardrobe Items

**Files:**
- Modify: `prisma/seed-wardrobe.ts`
- Test: `src/lib/__tests__/wardrobe.test.ts`

**Interfaces:**
- Consumes: PrismaClient
- Produces: Updated database entries for wardrobe items with `requiredLevel`

- [ ] **Step 1: Write test verifying level requirements for wardrobe items**

In `src/lib/__tests__/wardrobe.test.ts`:
```ts
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
```

- [ ] **Step 2: Run test to verify it passes**

Run: `npx vitest run src/lib/__tests__/wardrobe.test.ts`
Expected: PASS

- [ ] **Step 3: Update `prisma/seed-wardrobe.ts`**

Add level-unlocked items in `prisma/seed-wardrobe.ts`:
```ts
const LEVEL_WARDROBE_ITEMS = [
  { id: "item-headband", name: "열정 머리띠", description: "Lv.2 달성 보상 머리띠", imageUrl: "/mascot/shiba-hachimaki.png", icon: "🎗️", isRare: false, requiredLevel: 2, stampCost: 0 },
  { id: "item-scarf", name: "탐험가 스카프", description: "Lv.3 달성 보상 스카フ", imageUrl: "/mascot/shiba-scarf.png", icon: "🧣", isRare: false, requiredLevel: 3, stampCost: 0 },
  { id: "item-kimono", name: "전통 기모노", description: "Lv.4 달성 보상 기모노", imageUrl: "/mascot/shiba-kimono.png", icon: "👘", isRare: true, requiredLevel: 4, stampCost: 0 },
  { id: "item-glasses", name: "지성 안경", description: "Lv.5 달성 보상 안경", imageUrl: "/mascot/shiba-glasses.png", icon: "👓", isRare: false, requiredLevel: 5, stampCost: 0 },
  { id: "item-crown", name: "마스터 왕관", description: "Lv.6 달성 보상 왕관", imageUrl: "/mascot/shiba-master.png", icon: "👑", isRare: true, requiredLevel: 6, stampCost: 0 },
];
```

- [ ] **Step 4: Execute wardrobe seeding**

Run: `npx tsx prisma/seed-wardrobe.ts`
Expected: Seed complete without error.

- [ ] **Step 5: Commit**

```bash
git add prisma/seed-wardrobe.ts src/lib/__tests__/wardrobe.test.ts
git commit -m "feat: add level-unlocked items to wardrobe seeding script"
```

---

### Task 3: Redesign `ShibaAvatar` Component & Background Aura

**Files:**
- Modify: `src/components/mascot/ShibaAvatar.tsx`
- Test: `src/lib/__tests__/wardrobe.test.ts`

**Interfaces:**
- Consumes: `ShibaAvatarProps` (`level?: number`, `equippedItemIds?: string[]`)
- Produces: `ShibaAvatar` with `ShibaAura` and pure wardrobe item fallback logic

- [ ] **Step 1: Update `getFallbackLevelImage` in `ShibaAvatar.tsx`**

In `src/components/mascot/ShibaAvatar.tsx`:
```ts
function getFallbackLevelImage(_level: number, equippedItemIds?: string[]): string {
  if (equippedItemIds && equippedItemIds.length > 0) {
    let maxLevel = 0;
    for (const itemId of equippedItemIds) {
      const itemLevel = ITEM_ID_TO_LEVEL[itemId];
      if (itemLevel && itemLevel > maxLevel) {
        maxLevel = itemLevel;
      }
    }
    if (maxLevel > 0) {
      return LEVEL_IMAGES[maxLevel] ?? LEVEL_IMAGES[1];
    }
  }
  // Remove automatic clothing escalation: always return base image
  return BASE_IMAGE;
}
```

- [ ] **Step 2: Add `ShibaAura` sub-component in `ShibaAvatar.tsx`**

```tsx
function ShibaAura({ level }: { level: number }) {
  if (level <= 1) return null;

  const auraClasses: Record<number, string> = {
    2: "bg-sakura-pink/30 animate-pulse ring-4 ring-sakura-pink/50",
    3: "bg-grape-punch/25 animate-pulse ring-4 ring-grape-punch/40",
    4: "bg-sky-400/25 animate-pulse ring-4 ring-sky-400/40",
    5: "bg-amber-400/30 animate-pulse ring-4 ring-amber-400/50",
    6: "bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 animate-pulse ring-4 ring-yellow-400/70 shadow-[0_0_15px_rgba(250,204,21,0.6)]",
  };

  const currentAura = auraClasses[Math.min(level, 6)] ?? auraClasses[2];

  return (
    <div
      className={`absolute inset-0 rounded-full blur-md -z-10 ${currentAura}`}
    />
  );
}
```

Render `<ShibaAura level={level} />` inside the avatar container in `ShibaAvatar`.

- [ ] **Step 3: Run Vitest tests**

Run: `npx vitest run`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/mascot/ShibaAvatar.tsx
git commit -m "feat: redesign ShibaAvatar with background aura and pure wardrobe outfit fallback"
```

---

### Task 4: Verify Full Test Suite & Integration

**Files:**
- All test files in `src/lib/__tests__/`

- [ ] **Step 1: Run full test suite**

Run: `npx vitest run`
Expected: All 23 test files (255+ tests) PASS cleanly.

- [ ] **Step 2: Verify local server readiness**

Run: `npm run dev` in background
Expected: Ready on `http://localhost:3000`

- [ ] **Step 3: Final Git Commit & Status check**

Run: `git status`
Expected: Clean working tree.
