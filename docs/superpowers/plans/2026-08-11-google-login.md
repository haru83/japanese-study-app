# Google Login Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate Google OAuth login into the app using NextAuth GoogleProvider, automatic user profile initialization, and retro sticker bomb UI components.

**Architecture:** Extend NextAuth configuration in `src/lib/auth.ts` with `GoogleProvider` and `events.createUser` to initialize `UserProgress` for Google login users. Add a "Google로 시작하기" button styled with WangWang Japanese Sticker Bomb aesthetics to `src/app/(auth)/login/page.tsx`.

**Tech Stack:** Next.js 15, React 19, NextAuth v4, Prisma, Vitest, Tailwind CSS v4.

## Global Constraints
- Strict TypeScript: `strict: true` — no `any`, no `@ts-ignore`.
- WangWang Sticker Bomb styling: `border-2 border-black shadow-[4px_4px_0px_0px_#000]`.
- Korean UI text and test descriptions.

---

### Task 1: Add GoogleProvider and UserProgress Event Handler in NextAuth Configuration

**Files:**
- Modify: `src/lib/auth.ts`
- Create: `src/lib/__tests__/auth.test.ts`

**Interfaces:**
- Consumes: NextAuth `NextAuthOptions`, `GoogleProvider`, `prisma`.
- Produces: Updated `authOptions` with `GoogleProvider` support and `events.createUser` handler.

- [ ] **Step 1: Write unit test verifying GoogleProvider configuration and UserProgress creation logic**

```typescript
import { describe, it, expect, vi } from "vitest";
import { authOptions } from "@/lib/auth";

describe("NextAuth authOptions Google Config", () => {
  it("GoogleProvider가 authOptions.providers에 포함되어 있어야 함", () => {
    const googleProvider = authOptions.providers.find(
      (p) => p.id === "google"
    );
    expect(googleProvider).toBeDefined();
  });

  it("events.createUser 콜백이 정의되어 있어야 함", () => {
    expect(authOptions.events?.createUser).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/__tests__/auth.test.ts`
Expected: FAIL (GoogleProvider not defined in providers)

- [ ] **Step 3: Update `src/lib/auth.ts` to include GoogleProvider and events**

In `src/lib/auth.ts`:
1. Import `GoogleProvider` from `next-auth/providers/google`.
2. Add `GoogleProvider` to `providers`:
```typescript
GoogleProvider({
  clientId: process.env.GOOGLE_CLIENT_ID ?? "",
  clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
}),
```
3. Add `events` object to `authOptions`:
```typescript
events: {
  async createUser({ user }) {
    await prisma.userProgress.upsert({
      where: { userId: user.id },
      create: { userId: user.id },
      update: {},
    });
  },
},
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/__tests__/auth.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/auth.ts src/lib/__tests__/auth.test.ts
git commit -m "feat(auth): add GoogleProvider and createUser event handler to authOptions"
```

---

### Task 2: Add Google Login Button to Login UI and Update Environment Variables

**Files:**
- Modify: `src/app/(auth)/login/page.tsx`
- Modify: `.env`

**Interfaces:**
- Consumes: NextAuth `signIn("google", { callbackUrl: "/home" })`.
- Produces: Google sign-in UI button with sticker bomb styling on `/login`.

- [ ] **Step 1: Add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET placeholders to `.env`**

In `.env`:
```env
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
```

- [ ] **Step 2: Add Google Login UI button and divider in `src/app/(auth)/login/page.tsx`**

Under the submit button in `src/app/(auth)/login/page.tsx`, add:
```tsx
{/* Divider */}
<div className="relative my-4 flex items-center justify-center">
  <div className="absolute inset-0 flex items-center">
    <div className="w-full border-t-2 border-black/20" />
  </div>
  <span className="relative bg-paper-white px-3 text-xs font-bold text-type-black/50">
    또는
  </span>
</div>

{/* Google Login Button */}
<button
  type="button"
  onClick={() => signIn("google", { callbackUrl: "/home" })}
  className="w-full bg-paper-white hover:bg-canvas-almond active:scale-[0.98] transition-all h-[54px] rounded-2xl font-black text-type-black text-base border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] flex items-center justify-center gap-3"
>
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
  <span>Google로 시작하기</span>
</button>
```

- [ ] **Step 3: Run Vitest tests to ensure no syntax/runtime breakage**

Run: `npx vitest run`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/app/\(auth\)/login/page.tsx .env
git commit -m "feat(ui): add Google OAuth login button to login page"
```

---

### Task 3: Full Verification

**Files:** None (validation task)

- [ ] **Step 1: Run all tests**
Run: `npx vitest run`
Expected: All tests PASS.

- [ ] **Step 2: Run Next.js build verification**
Run: `npm run build`
Expected: Build succeeds with 0 type or lint errors.
