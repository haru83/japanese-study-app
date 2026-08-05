# Single-Item Pre-Fitted Mascot Avatar System Implementation Plan (Option 2)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor avatar equipment to 1 item total max, and output dedicated pre-fitted high-resolution mascot artwork for every dog breed and item combination (Option 2).

**Architecture:** Update `equipItem` action in `wardrobe.ts` to unequip all previous items when equipping any new item, build `CHARACTER_ITEM_MASCOTS` mapping in `ShibaAvatar.tsx`, generate/link pre-fitted mascot artwork assets, and render single complete fitted mascot images cleanly.

**Tech Stack:** React 19, Next.js 15, Prisma, Vitest, Sharp, Node.js

## Global Constraints

- Use strict TypeScript (`strict: true`) without `@ts-ignore` or `as any`.
- All unit tests must pass cleanly.

---

### Task 1: Enforce Single-Item Equipment Restriction in `src/actions/wardrobe.ts` & Unit Tests

**Files:**
- Modify: `src/actions/wardrobe.ts`
- Modify: `src/lib/__tests__/wardrobe.test.ts`

**Interfaces:**
- Consumes: `itemId: string`
- Produces: `equipItem(itemId: string)` action enforcing max 1 total equipped item across wardrobe

- [ ] **Step 1: Update `equipItem` in `src/actions/wardrobe.ts`**

Unequip all previously equipped items for the user before equipping the new `itemId`:
```ts
await prisma.userWardrobe.updateMany({
  where: { userId: user.id, equippedAt: { not: null } },
  data: { equippedAt: null },
});
await prisma.userWardrobe.update({
  where: { id: wardrobeItem.id },
  data: { equippedAt: new Date() },
});
```

- [ ] **Step 2: Update unit tests in `src/lib/__tests__/wardrobe.test.ts`**

Verify single-item equipment rule and fallback resolution.

- [ ] **Step 3: Run Vitest unit tests**

Run: `npx vitest run`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/actions/wardrobe.ts src/lib/__tests__/wardrobe.test.ts
git commit -m "feat: enforce single-item equipment restriction across wardrobe"
```

---

### Task 2: Generate & Register Pre-Fitted Mascot Artwork Assets (Option 2)

**Files:**
- Create: `public/mascot/poodle-hachimaki.png`, `public/mascot/poodle-scarf.png`, `public/mascot/poodle-ninja.png`, `public/mascot/poodle-wizard-hat.png`, `public/mascot/poodle-hawaiian-shirt.png`, `public/mascot/poodle-headphones.png`, `public/mascot/poodle-pink-ribbon.png`, `public/mascot/poodle-randoseru.png`, etc.
- Create: `public/mascot/beagle-hachimaki.png`, `public/mascot/beagle-scarf.png`, `public/mascot/beagle-ninja.png`, `public/mascot/beagle-wizard-hat.png`, `public/mascot/beagle-hawaiian-shirt.png`, `public/mascot/beagle-headphones.png`, `public/mascot/beagle-pink-ribbon.png`, `public/mascot/beagle-randoseru.png`, etc.
- Create: `public/mascot/pomeranian-hachimaki.png`, `public/mascot/pomeranian-scarf.png`, `public/mascot/pomeranian-ninja.png`, `public/mascot/pomeranian-wizard-hat.png`, `public/mascot/pomeranian-hawaiian-shirt.png`, `public/mascot/pomeranian-headphones.png`, `public/mascot/pomeranian-pink-ribbon.png`, `public/mascot/pomeranian-randoseru.png`, etc.

- [ ] **Step 1: Generate pre-fitted mascot artwork assets using AI generator & sharp green chroma key**
- [ ] **Step 2: Save transparent PNG assets to `public/mascot/`**
- [ ] **Step 3: Commit**

```bash
git add public/mascot/
git commit -m "assets: add pre-fitted mascot artwork assets for poodle, beagle, and pomeranian"
```

---

### Task 3: Integrated Option 2 Pre-Fitted Artwork System in `ShibaAvatar.tsx`

**Files:**
- Modify: `src/components/mascot/ShibaAvatar.tsx`
- Modify: `src/lib/__tests__/wardrobe.test.ts`

**Interfaces:**
- Consumes: `characterId?: string`, `equippedItemIds?: string[]`
- Produces: Avatar component rendering single pre-fitted mascot artwork (`CHARACTER_ITEM_MASCOTS`)

- [ ] **Step 1: Update `CHARACTER_ITEM_MASCOTS` mapping in `ShibaAvatar.tsx`**

Register pre-fitted mascot artwork images for all breeds and items.

- [ ] **Step 2: Render single pre-fitted artwork in `ShibaAvatar.tsx`**

```ts
const equippedItemId = equippedItemIds && equippedItemIds.length > 0 ? normalizeItemId(equippedItemIds[0]) : null;
const fittedMascotSrc = equippedItemId ? (CHARACTER_ITEM_MASCOTS[characterId]?.[equippedItemId] || CHARACTER_ITEM_MASCOTS.shiba[equippedItemId]) : null;
const src = fittedMascotSrc || baseImage;
```

- [ ] **Step 3: Run Vitest unit tests**

Run: `npx vitest run`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/mascot/ShibaAvatar.tsx src/lib/__tests__/wardrobe.test.ts
git commit -m "feat: implement Option 2 single pre-fitted artwork rendering in ShibaAvatar"
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
