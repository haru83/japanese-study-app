# Shop Expansion, Level 10 Increase, and Dog Characters Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand max level to Lv.10, add 6 new shop items, and introduce a dog character selection system (Shiba, Poodle, Beagle, Pomeranian).

**Architecture:** Update `xp.ts` for Lv.10, extend `UserProgress` model with `activeCharacter`, add 6 new wardrobe items in `seed-wardrobe.ts`, and update `ShibaAvatar` to support character bases and Lv.7-10 background auras.

**Tech Stack:** React 19, Next.js 15, Prisma, Vitest, Tailwind CSS v4

## Global Constraints

- Use strict TypeScript (`strict: true`) without `@ts-ignore` or `as any`.
- All unit tests must pass cleanly.

---

### Task 1: Level 10 Expansion in `xp.ts` & Unit Tests

**Files:**
- Modify: `src/lib/xp.ts`
- Modify: `src/lib/__tests__/xp.test.ts`

**Interfaces:**
- Consumes: XP calculation logic
- Produces: `MAX_LEVEL = 10`, updated `LEVEL_THRESHOLDS`, `LEVEL_TITLES` (Lv.1 to 10), `getLevelTitle(level)`

- [ ] **Step 1: Write failing tests for Level 7-10 titles in `xp.test.ts`**

Add tests to `src/lib/__tests__/xp.test.ts`:
```ts
describe("Level 10 expansion", () => {
  it("returns titles for levels 7 through 10", () => {
    expect(getLevelTitle(7)).toBe("일본어 능력자");
    expect(getLevelTitle(8)).toBe("어휘 대가");
    expect(getLevelTitle(9)).toBe("경어 현자");
    expect(getLevelTitle(10)).toBe("신화의 만렙 왕왕이");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/__tests__/xp.test.ts`
Expected: FAIL (titles clamped at 6)

- [ ] **Step 3: Update `src/lib/xp.ts` for Level 10**

In `src/lib/xp.ts`:
```ts
export const MAX_LEVEL = 10;

export const LEVEL_THRESHOLDS: number[] = [
  0,     // Lv 1: 0 ~ 99
  100,   // Lv 2: 100 ~ 249
  250,   // Lv 3: 250 ~ 449
  450,   // Lv 4: 450 ~ 699
  700,   // Lv 5: 700 ~ 999
  1000,  // Lv 6: 1000 ~ 1399
  1400,  // Lv 7: 1400 ~ 1899
  1900,  // Lv 8: 1900 ~ 2499
  2500,  // Lv 9: 2500 ~ 3199
  3200,  // Lv 10: 3200+
];

export const LEVEL_TITLES: Record<number, string> = {
  1: "초보 왕왕이",
  2: "공부하는 왕왕이",
  3: "경어 능력자",
  4: "마스터 왕왕이",
  5: "일본어 학자",
  6: "전설의 대마왕",
  7: "일본어 능력자",
  8: "어휘 대가",
  9: "경어 현자",
  10: "신화의 만렙 왕왕이",
};

export function getLevelTitle(level: number): string {
  const boundedLevel = Math.min(Math.max(level, 1), 10);
  return LEVEL_TITLES[boundedLevel] ?? LEVEL_TITLES[1];
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/__tests__/xp.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/xp.ts src/lib/__tests__/xp.test.ts
git commit -m "feat: expand max level to 10 with new thresholds and titles"
```

---

### Task 2: Update Prisma Schema & Database for `activeCharacter`

**Files:**
- Modify: `prisma/schema.prisma`

**Interfaces:**
- Consumes: Prisma schema
- Produces: `activeCharacter` field (`String @default("shiba")`) in `UserProgress`

- [ ] **Step 1: Add `activeCharacter` to `UserProgress` model in `prisma/schema.prisma`**

In `prisma/schema.prisma`:
```prisma
model UserProgress {
  id              String    @id @default(cuid())
  userId          String    @unique
  user            User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  xp              Int       @default(0)
  level           Int       @default(1)
  totalStamps     Int       @default(0)
  streakDays      Int       @default(0)
  activeCharacter String    @default("shiba") // "shiba" | "poodle" | "beagle" | "pomeranian"
  lastStudyAt     DateTime?
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
}
```

- [ ] **Step 2: Generate and push Prisma schema**

Run: `npx prisma generate && npx prisma db push`
Expected: Database schema updated successfully.

- [ ] **Step 3: Commit**

```bash
git add prisma/schema.prisma
git commit -m "feat: add activeCharacter field to UserProgress model"
```

---

### Task 3: Seed 6 New Shop Items

**Files:**
- Modify: `prisma/seed-wardrobe.ts`

**Interfaces:**
- Consumes: PrismaClient
- Produces: 6 new shop items (Ninja, Wizard Hat, Hawaiian Shirt, Headphones, Pink Ribbon, Randoseru)

- [ ] **Step 1: Add 6 new items to `WARDROBE_SEED` in `prisma/seed-wardrobe.ts`**

In `prisma/seed-wardrobe.ts`:
```ts
  // ─── 추가 신규 아이템 (6개) ───
  { id: "item-ninja", name: "닌자 복장", icon: "🥷", stampCost: 20, requiredLevel: 4, imageUrl: "/mascot/overlay-ninja.webp", isRare: true },
  { id: "item-wizard-hat", name: "마법사 모자", icon: "🧙‍♂️", stampCost: 18, requiredLevel: 4, imageUrl: "/mascot/overlay-wizard-hat.webp", isRare: true },
  { id: "item-hawaiian-shirt", name: "하와이안 셔츠", icon: "🌺", stampCost: 12, requiredLevel: 2, imageUrl: "/mascot/overlay-hawaiian-shirt.webp", isRare: false },
  { id: "item-headphones", name: "스트리머 헤드폰", icon: "🎧", stampCost: 15, requiredLevel: 3, imageUrl: "/mascot/overlay-headphones.webp", isRare: false },
  { id: "item-pink-ribbon", name: "핑크 리본", icon: "🎀", stampCost: 8, requiredLevel: 1, imageUrl: "/mascot/overlay-pink-ribbon.webp", isRare: false },
  { id: "item-randoseru", name: "란도셀 책가방", icon: "🎒", stampCost: 25, requiredLevel: 5, imageUrl: "/mascot/overlay-randoseru.webp", isRare: true },
```

- [ ] **Step 2: Execute wardrobe seed**

Run: `npx tsx prisma/seed-wardrobe.ts`
Expected: Seed complete (31 items).

- [ ] **Step 3: Commit**

```bash
git add prisma/seed-wardrobe.ts
git commit -m "feat: seed 6 new shop items"
```

---

### Task 4: Extend `ShibaAvatar.tsx` for Character Bases & Lv.7-10 Auras

**Files:**
- Modify: `src/components/mascot/ShibaAvatar.tsx`

**Interfaces:**
- Consumes: `characterId?: string`, `level?: number`
- Produces: Avatar component rendering active dog character base and Lv.1-10 background auras

- [ ] **Step 1: Add character base images mapping in `ShibaAvatar.tsx`**

In `src/components/mascot/ShibaAvatar.tsx`:
```ts
const CHARACTER_BASES: Record<string, string> = {
  shiba: "/mascot/shiba-base.webp",
  poodle: "/mascot/shiba-base.webp", // Fallback to base or character image
  beagle: "/mascot/shiba-base.webp",
  pomeranian: "/mascot/shiba-base.webp",
};
```

- [ ] **Step 2: Extend `ShibaAura` rendering for levels 7 through 10**

```tsx
function ShibaAura({ level }: { level: number }) {
  if (level <= 1) return null;

  const auraClasses: Record<number, string> = {
    2: "bg-sakura-pink/60 animate-pulse ring-4 ring-sakura-pink/70 shadow-[0_0_12px_rgba(255,183,197,0.8)]",
    3: "bg-grape-punch/50 animate-pulse ring-4 ring-grape-punch/60 shadow-[0_0_14px_rgba(147,51,234,0.6)]",
    4: "bg-sky-400/50 animate-pulse ring-4 ring-sky-400/60 shadow-[0_0_16px_rgba(56,189,248,0.7)]",
    5: "bg-amber-400/60 animate-pulse ring-4 ring-amber-400/70 shadow-[0_0_18px_rgba(251,191,36,0.8)]",
    6: "bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 animate-pulse ring-4 ring-yellow-400/80 shadow-[0_0_22px_rgba(250,204,21,0.9)]",
    7: "bg-purple-500/60 animate-pulse ring-4 ring-purple-400/80 shadow-[0_0_24px_rgba(168,85,247,0.8)]",
    8: "bg-cyan-400/60 animate-pulse ring-4 ring-cyan-300/80 shadow-[0_0_26px_rgba(34,211,238,0.9)]",
    9: "bg-indigo-500/60 animate-pulse ring-4 ring-indigo-400/80 shadow-[0_0_28px_rgba(99,102,241,0.9)]",
    10: "bg-gradient-to-r from-amber-400 via-rose-500 to-amber-300 animate-pulse ring-4 ring-amber-300/90 shadow-[0_0_32px_rgba(251,191,36,1)]",
  };

  const currentAura = auraClasses[Math.min(level, 10)] ?? auraClasses[2];

  return (
    <div
      className={`absolute -inset-3 rounded-full blur-md pointer-events-none z-0 ${currentAura}`}
    />
  );
}
```

- [ ] **Step 3: Run Vitest tests**

Run: `npx vitest run`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/mascot/ShibaAvatar.tsx
git commit -m "feat: add character bases and extend background auras to Lv.10 in ShibaAvatar"
```

---

### Task 5: Character Selection Action & Integration

**Files:**
- Modify: `src/actions/user.ts`

**Interfaces:**
- Consumes: `characterId: string`
- Produces: `updateActiveCharacter(characterId: string)` server action

- [ ] **Step 1: Implement `updateActiveCharacter` in `src/actions/user.ts`**

```ts
export async function updateActiveCharacter(characterId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("로그인이 필요합니다.");

  const validCharacters = ["shiba", "poodle", "beagle", "pomeranian"];
  if (!validCharacters.includes(characterId)) {
    throw new Error("유효하지 않은 캐릭터입니다.");
  }

  await prisma.userProgress.upsert({
    where: { userId: session.user.id },
    update: { activeCharacter: characterId },
    create: { userId: session.user.id, activeCharacter: characterId },
  });

  revalidatePath("/profile");
  revalidatePath("/wardrobe");
  revalidatePath("/");

  return { success: true };
}
```

- [ ] **Step 2: Run Vitest test suite**

Run: `npx vitest run`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/actions/user.ts
git commit -m "feat: add updateActiveCharacter server action for mascot character selection"
```

---

### Task 6: Full Suite Verification & Build Test

**Files:**
- All files in codebase

- [ ] **Step 1: Run full Vitest suite**

Run: `npx vitest run`
Expected: 24+ test files (265+ tests) PASS cleanly.

- [ ] **Step 2: Run Next.js production build**

Run: `npm run build`
Expected: Build completes with 0 errors.

- [ ] **Step 3: Check git status**

Run: `git status`
Expected: Clean working tree.
