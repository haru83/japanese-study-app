# 사쿠라 시바 - 버그수정 및 개선사항 Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** 코드베이스 분석에서 발견된 4가지 핵심 이슈를 TDD로 수정

**Architecture:** 기존 Next.js 15.5 App Router + Prisma + SQLite 아키텍처 유지, vitest로 단위테스트 추가

**Tech Stack:** Next.js 15.5, Prisma 6, SQLite, TypeScript, vitest 4.1.5, Zustand

---

## Task 1: 스트릭 카운트 중복 증가 버그 수정 ✅ 완료

**Status:** ✅ COMPLETED (2026-05-02)

**Objective:** 하루에 일기를 여러 번 써도 `streakDays`가 1만 증가하도록 수정

**Files Created:**
- `src/lib/streak.ts` — `shouldIncrementStreak(lastStudyAt: Date | null): boolean`
- `src/lib/__tests__/streak.test.ts` — 4개 테스트 (null, today, yesterday, 3 days ago)

**Files Modified:**
- `src/actions/diary.ts` — `shouldIncrementStreak` 조건부 증가 적용

**버그 내용:**
```ts
// 기존: 무조건 +1
streakDays: { increment: 1 },
// 수정: 오늘 이미 학습했으면 증가하지 않음
const incrementStreak = shouldIncrementStreak(userProgress.lastStudyAt);
...(incrementStreak ? { streakDays: { increment: 1 } } : {}),
```

**Test Results:** 4/4 PASS

**Commit:** `fix: streak days only increment once per day`

---

## Task 2: Admin 페이지 서버 사이드 권한 검증 강화 ✅ 완료

**Status:** ✅ COMPLETED (2026-05-02)

**Objective:** `/admin/*` 경로를 middleware + layout에서 이중 보호

**Files Created:**
- `src/lib/admin-auth.ts` — `isAdminPath(pathname: string): boolean`
- `src/lib/__tests__/admin-auth.test.ts` — 6개 테스트
- `src/middleware.ts` — Next.js middleware (JWT 토큰 role 검증)

**Files Modified:**
- `src/app/admin/layout.tsx` — `getServerSession` + role 체크 추가 (기존: 인증 없음)

**3계층 방어 (Defense-in-Depth):**
1. **Layer 1 (Middleware):** 엣지에서 JWT 토큰의 `role === "admin"` 검사 → 비관리자는 `/home` 리다이렉트
2. **Layer 2 (Layout):** 서버 컴포넌트에서 `getServerSession` + role 체크
3. **Layer 3 (Page):** 기존 개별 페이지의 role 체크 유지

**Test Results:** 6/6 PASS

**Commit:** `feat: add server-side admin route protection via middleware and layout auth check`

---

## Task 3: next.config.ts 원격 이미지 패턴 제한 ✅ 완료

**Status:** ✅ COMPLETED (2026-05-02)

**Objective:** `hostname: "**"` 와일드카드를 실제 사용 도메인만 허용하도록 제한

**Files Modified:**
- `next.config.ts` — `hostname: "**"` → `hostname: "lh3.googleusercontent.com"`

**사용 도메인 조사 결과:**
- `lh3.googleusercontent.com` — Google 프로필 이미지 (FALLBACK_AVATAR + NextAuth image)
- 외부 이미지를 사용하는 곳은 profile 페이지의 `<Image>` 컴포넌트 1곳뿐

**Commit:** `security: restrict remote image patterns to lh3.googleusercontent.com only`

---

## Task 4: Wardrobe 구매 서버 액션 구현 🔄 진행 중

**Status:** 🔄 IN PROGRESS

**Objective:** 옷장 페이지의 "구매" 버튼이 현재 UI만 있고 실제 동작하지 않음. 서버 액션을 추가하여 스탬프 차감 + 아이템 저장 처리

**발견된 추가 사항 (2026-05-02):**
- DB `WardrobeItem` 테이블이 비어 있음 (0개 레코드)
- 현재 wardrobe 페이지는 하드코딩된 `WARDROBE_ITEMS` 배열 사용
- DB와 하드코딩 데이터를 동기화하는 **시드 스크립트**가 필요
- Prisma 모델(`WardrobeItem`, `UserWardrobeItem`)은 이미 존재

**현재 wardrobe 페이지 구조:**
```tsx
// src/app/(app)/wardrobe/page.tsx — 서버 컴포넌트
const WARDROBE_ITEMS = [
  { id: "default", name: "기본", icon: "🐕", stampCost: 0, requiredLevel: 1, equipped: true },
  { id: "hat-cap", name: "야구 모자", icon: "🧢", stampCost: 5, requiredLevel: 1 },
  { id: "hat-santa", name: "산타 모자", icon: "🎅", stampCost: 8, requiredLevel: 2 },
  { id: "scarf", name: "목도리", icon: "🧣", stampCost: 6, requiredLevel: 2 },
  { id: "glasses", name: "선글라스", icon: "😎", stampCost: 10, requiredLevel: 3 },
  { id: "crown", name: "왕관", icon: "👑", stampCost: 20, requiredLevel: 5 },
];
// 버튼에 onClick 없음 → 구매 동작 안 함
```

**구현 계획 (수정됨):**

### Step 1: Write failing test

```ts
// src/lib/__tests__/wardrobe.test.ts
import { describe, it, expect } from "vitest";
import { canPurchaseItem } from "@/lib/wardrobe";

describe("canPurchaseItem", () => {
  it("스탬프와 레벨이 충분하면 구매 가능하다", () => {
    expect(canPurchaseItem({ userStamps: 10, userLevel: 3, stampCost: 5, requiredLevel: 2 })).toBe(true);
  });

  it("스탬프가 부족하면 구매 불가능하다", () => {
    expect(canPurchaseItem({ userStamps: 3, userLevel: 3, stampCost: 5, requiredLevel: 2 })).toBe(false);
  });

  it("레벨이 부족하면 구매 불가능하다", () => {
    expect(canPurchaseItem({ userStamps: 10, userLevel: 1, stampCost: 5, requiredLevel: 2 })).toBe(false);
  });

  it("stampCost가 0이면 항상 구매 가능하다", () => {
    expect(canPurchaseItem({ userStamps: 0, userLevel: 1, stampCost: 0, requiredLevel: 1 })).toBe(true);
  });
});
```

### Step 2: Run test → FAIL (module not found)

### Step 3: Create implementation

```ts
// src/lib/wardrobe.ts
export function canPurchaseItem(params: {
  userStamps: number;
  userLevel: number;
  stampCost: number;
  requiredLevel: number;
}): boolean {
  return params.userStamps >= params.stampCost && params.userLevel >= params.requiredLevel;
}
```

### Step 4: Run test → PASS

### Step 5: Create DB seed script

```ts
// prisma/seed-wardrobe.ts
// 하드코딩된 WARDROBE_ITEMS를 DB에 upsert
```

### Step 6: Create server action

```ts
// src/actions/wardrobe.ts
"use server";
// purchaseWardrobeItem(wardrobeItemId: string)
// 1. 세션 검증
// 2. 이미 보유한 아이템인지 체크
// 3. 스탬프/레벨 조건 확인
// 4. 트랜잭션: 스탬프 차감 + UserWardrobeItem 생성
// 5. revalidatePath
```

### Step 7: Wardrobe 페이지를 DB 기반으로 리팩토링

- 서버 컴포넌트에서 DB의 WardrobeItem 조회
- 구매 버튼 → 클라이언트 컴포넌트(`PurchaseButton`)로 분리
- `useTransition` + 서버 액션 호출
- 보유 아이템 표시 (UserWardrobeItem 조인)

### Step 8: Commit
```bash
git add src/lib/wardrobe.ts src/lib/__tests__/wardrobe.test.ts src/actions/wardrobe.ts \
        prisma/seed-wardrobe.ts src/app/(app)/wardrobe/page.tsx \
        src/components/wardrobe/PurchaseButton.tsx
git commit -m "feat: add wardrobe purchase system with DB-backed items and stamp deduction"
```

---

## 진행 상태 요약

| Task | 상태 | 테스트 | 커밋 |
|------|------|--------|------|
| 1. 스트릭 중복 증가 수정 | ✅ 완료 | 4/4 PASS | `fix: streak days only increment once per day` |
| 2. Admin 권한 검증 강화 | ✅ 완료 | 6/6 PASS | `feat: add server-side admin route protection via middleware and layout auth check` |
| 3. 원격 이미지 패턴 제한 | ✅ 완료 | N/A (config 변경) | `security: restrict remote image patterns to lh3.googleusercontent.com only` |
| 4. Wardrobe 구매 액션 | 🔄 진행 중 | — | — |

**전체 테스트 현황:** 10/10 PASS (streak 4 + admin-auth 6)
