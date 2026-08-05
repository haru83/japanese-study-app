# 2-Slot Fitted Avatar System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor avatar equipment system to 2 slots (`head` and `body`), enforce strict 2-slot mutual exclusion, and integrate breed-specific fitted overlays.

**Architecture:** Simplify `WardrobeSlot` in `wardrobe.ts` to `"head" | "body"`, update `equipItem` action in `wardrobe.ts` to unequip items in the same slot (max 1 Head + 1 Body item), and update `ShibaAvatar.tsx` for breed-specific fitted overlay rendering.

**Tech Stack:** React 19, Next.js 15, Prisma, Vitest, Tailwind CSS v4

## Global Constraints

- Use strict TypeScript (`strict: true`) without `@ts-ignore` or `as any`.
- All unit tests must pass cleanly.

---

### Task 1: Simplify Wardrobe Slots to 2 Categories (`head` & `body`) & Unit Tests

**Files:**
- Modify: `src/lib/wardrobe.ts`
- Modify: `src/lib/__tests__/wardrobe.test.ts`

**Interfaces:**
- Consumes: Wardrobe slot definitions
- Produces: `WardrobeSlot = "head" | "body"`, updated `ITEM_SLOTS` mapping, `getItemSlot(itemId)`

- [ ] **Step 1: Write failing unit test for 2-slot classification in `wardrobe.test.ts`**

Add tests to `src/lib/__tests__/wardrobe.test.ts`:
```ts
describe("2-Slot Classification (head & body)", () => {
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/__tests__/wardrobe.test.ts`
Expected: FAIL (scarf previously classified as neck)

- [ ] **Step 3: Update `src/lib/wardrobe.ts` for 2 slots**

In `src/lib/wardrobe.ts`:
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

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/__tests__/wardrobe.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/wardrobe.ts src/lib/__tests__/wardrobe.test.ts
git commit -m "feat: simplify wardrobe slots to 2 categories (head & body)"
```

---

### Task 2: 2-Slot Mutual Exclusion Action in `src/actions/wardrobe.ts`

**Files:**
- Modify: `src/actions/wardrobe.ts`

**Interfaces:**
- Consumes: `itemId: string`
- Produces: `equipItem(itemId: string)` action enforcing 1 Head + 1 Body maximum

- [ ] **Step 1: Update `equipItem` in `src/actions/wardrobe.ts`**

In `src/actions/wardrobe.ts`:
Ensure when an item is equipped, any previously equipped item in the same slot (`getItemSlot(itemId)`) is unequipped.

- [ ] **Step 2: Run Vitest unit tests**

Run: `npx vitest run`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/actions/wardrobe.ts
git commit -m "feat: enforce 2-slot mutual exclusion in equipItem action"
```

---

### Task 3: Breed-Specific Fitted Overlay System in `ShibaAvatar.tsx`

**Files:**
- Modify: `src/components/mascot/ShibaAvatar.tsx`

**Interfaces:**
- Consumes: `characterId?: string`, `equippedItemIds?: string[]`
- Produces: Avatar component rendering 2-slot breed-specific overlays (`head` and `body`)

- [ ] **Step 1: Update `ShibaAvatar.tsx` overlay rendering**

In `src/components/mascot/ShibaAvatar.tsx`:
Render head and body overlays mapped for the active character breed.

- [ ] **Step 2: Run Vitest unit tests**

Run: `npx vitest run`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/components/mascot/ShibaAvatar.tsx
git commit -m "feat: integrate breed-specific fitted overlay rendering for 2-slot avatar system"
```

---

### Task 4: Full Suite Verification & Build Test

**Files:**
- All files in codebase

- [ ] **Step 1: Run full Vitest suite**

Run: `npx vitest run`
Expected: 24 test files (273+ tests) PASS cleanly.

- [ ] **Step 2: Run Next.js production build**

Run: `npm run build`
Expected: Build completes with 0 errors.

- [ ] **Step 3: Check git status**

Run: `git status`
Expected: Clean working tree.
