# 사쿠라 시바 개선 포인트 구현 계획

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** 코드베이스 분석에서 도출된 8개 개선 포인트를 TDD 방식으로 하나씩 구현

**Architecture:** 기존 Next.js 15 App Router 아키텍처 유지. 테스트는 Vitest + Testing Library 도입. 각 개선 포인트는 독립적인 태스크로 분리하여 순차 구현.

**Tech Stack:** Next.js 15, TypeScript 5, Prisma + SQLite, NextAuth v4, Zustand, Vitest, @testing-library/react

---

## 개선 포인트 요약

| # | 개선 항목 | 우선순위 | 영역 |
|---|-----------|----------|------|
| 1 | 스트릭 카운트 버그 수정 | 🔴 Critical | lib/streak.ts + actions/diary.ts |
| 2 | 게스트 학습 일기 진행상황 동기화 | 🟡 Important | actions/learningDiary.ts + API |
| 3 | API Route → 서버 액션 통합 | 🟡 Important | api/keigo/progress → actions/keigo.ts |
| 4 | 어드민 권한 검증 미들웨어 | 🔴 Critical | middleware.ts + admin layout |
| 5 | 이미지 remotePatterns 제한 | 🟢 Minor | next.config.ts |
| 6 | 테스트 인프라 구축 | 🔴 Critical | vitest.config.ts + tests/ |
| 7 | streakDays 계산 로직 분리 | 🟡 Important | lib/streak.ts |
| 8 | XP 보상 로직 중복 제거 | 🟡 Important | lib/xp.ts + actions/* |

---

## Phase 0: 테스트 인프라 구축 (선행 필수)

### Task 0-1: Vitest + Testing Library 설치 및 설정

**Objective:** 프로젝트에 Vitest 테스트 프레임워크를 설정한다

**Files:**
- Create: `vitest.config.ts`
- Modify: `package.json` (devDependencies 추가)

**Step 1: Vitest 및 관련 패키지 설치**

```bash
cd /home/wetter1117/workspace/japanese-study-app
npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom jsdom @types/node
```

**Step 2: vitest.config.ts 작성**

```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

**Step 3: 테스트 셋업 파일 작성**

Create: `tests/setup.ts`

```typescript
import "@testing-library/jest-dom";
```

**Step 4: package.json에 test 스크립트 추가**

package.json scripts에 추가:
```json
"test": "vitest run",
"test:watch": "vitest",
"test:coverage": "vitest run --coverage"
```

**Step 5: 스모크 테스트로 인프라 검증**

Create: `tests/smoke.test.ts`

```typescript
import { describe, it, expect } from "vitest";

describe("테스트 인프라", () => {
  it("vitest가 정상 동작한다", () => {
    expect(1 + 1).toBe(2);
  });
});
```

Run: `npx vitest run tests/smoke.test.ts`
Expected: PASS

**Step 6: 커밋**

```bash
git add -A
git commit -m "chore: set up vitest testing infrastructure"
```

---

## Phase 1: 스트릭 카운트 버그 수정 (Critical 🔴)

### Task 1-1: 스트릭 계산 유틸리티 — 실패하는 테스트 작성

**Objective:** 같은 날 여러 번 일기를 써도 streak가 1만 증가하는지 검증하는 테스트를 먼저 작성한다

**Files:**
- Create: `tests/lib/streak.test.ts`
- Create: `src/lib/streak.ts` (빈 파일)

**Step 1: 실패하는 테스트 작성**

Create: `tests/lib/streak.test.ts`

```typescript
import { describe, it, expect } from "vitest";
import {
  shouldIncrementStreak,
  isSameDay,
  computeStreakUpdate,
} from "@/lib/streak";

describe("streak 계산 로직", () => {
  describe("isSameDay", () => {
    it("같은 날짜면 true를 반환한다", () => {
      const date = new Date("2026-05-02T10:00:00Z");
      const sameDate = new Date("2026-05-02T23:00:00Z");
      expect(isSameDay(date, sameDate)).toBe(true);
    });

    it("다른 날짜면 false를 반환한다", () => {
      const date1 = new Date("2026-05-02T23:59:00Z");
      const date2 = new Date("2026-05-03T00:01:00Z");
      expect(isSameDay(date1, date2)).toBe(false);
    });

    it("null이면 false를 반환한다", () => {
      const date = new Date("2026-05-02T10:00:00Z");
      expect(isSameDay(null, date)).toBe(false);
    });
  });

  describe("shouldIncrementStreak", () => {
    it("lastStudyAt이 null이면 true (첫 학습)", () => {
      expect(shouldIncrementStreak(null, new Date())).toBe(true);
    });

    it("lastStudyAt이 오늘이면 false (이미 오늘 학습함)", () => {
      const today = new Date();
      expect(shouldIncrementStreak(today, today)).toBe(false);
    });

    it("lastStudyAt이 어제면 true (새로운 날)", () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      expect(shouldIncrementStreak(yesterday, new Date())).toBe(true);
    });

    it("lastStudyAt이 3일 전이면 true", () => {
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
      expect(shouldIncrementStreak(threeDaysAgo, new Date())).toBe(true);
    });
  });

  describe("computeStreakUpdate", () => {
    it("오늘 이미 학습한 경우 streak 증가 없음", () => {
      const today = new Date();
      const result = computeStreakUpdate({
        lastStudyAt: today,
        currentStreak: 5,
        now: today,
      });
      expect(result.streakIncrement).toBe(0);
      expect(result.isNewDay).toBe(false);
    });

    it("첫 학습인 경우 streak 1 증가", () => {
      const now = new Date();
      const result = computeStreakUpdate({
        lastStudyAt: null,
        currentStreak: 0,
        now,
      });
      expect(result.streakIncrement).toBe(1);
      expect(result.isNewDay).toBe(true);
    });

    it("어제 학습한 경우 streak 1 증가", () => {
      const now = new Date();
      const yesterday = new Date(now);
      yesterday.setDate(yesterday.getDate() - 1);
      const result = computeStreakUpdate({
        lastStudyAt: yesterday,
        currentStreak: 3,
        now,
      });
      expect(result.streakIncrement).toBe(1);
      expect(result.isNewDay).toBe(true);
    });

    it("3일 전에 마지막 학습한 경우에도 streak 1 증가 (연속 보너스는 별도)", () => {
      const now = new Date();
      const threeDaysAgo = new Date(now);
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
      const result = computeStreakUpdate({
        lastStudyAt: threeDaysAgo,
        currentStreak: 5,
        now,
      });
      expect(result.streakIncrement).toBe(1);
      expect(result.isNewDay).toBe(true);
    });
  });
});
```

**Step 2: 테스트 실행하여 실패 확인**

Run: `npx vitest run tests/lib/streak.test.ts`
Expected: FAIL — `Cannot find module '@/lib/streak'`

**Step 3: 빈 스텁 파일 생성**

Create: `src/lib/streak.ts`

```typescript
// TDD: 테스트 통과를 위한 구현이 여기에 들어갑니다
export function isSameDay(a: Date | null, b: Date): boolean {
  return false;
}

export function shouldIncrementStreak(
  lastStudyAt: Date | null,
  now: Date
): boolean {
  return false;
}

export function computeStreakUpdate(params: {
  lastStudyAt: Date | null;
  currentStreak: number;
  now: Date;
}): { streakIncrement: number; isNewDay: boolean } {
  return { streakIncrement: 0, isNewDay: false };
}
```

Run: `npx vitest run tests/lib/streak.test.ts`
Expected: FAIL — 모든 테스트 케이스가 assertion failure

**Step 4: 커밋**

```bash
git add -A
git commit -m "test(red): add failing streak calculation tests"
```

### Task 1-2: 스트릭 계산 유틸리티 — 구현

**Objective:** 테스트를 통과하는 최소 구현을 작성한다

**Files:**
- Modify: `src/lib/streak.ts`

**Step 1: 최소 구현 작성**

```typescript
/**
 * 두 날짜가 같은 날인지 확인 (UTC 기준)
 */
export function isSameDay(a: Date | null, b: Date): boolean {
  if (!a) return false;
  return (
    a.getUTCFullYear() === b.getUTCFullYear() &&
    a.getUTCMonth() === b.getUTCMonth() &&
    a.getUTCDate() === b.getUTCDate()
  );
}

/**
 * streak를 증가시켜야 하는지 판단
 * - lastStudyAt이 null이면 첫 학습 → 증가
 * - lastStudyAt이 오늘이 아니면 새로운 날 → 증가
 * - lastStudyAt이 오늘이면 이미 학습함 → 증가 안 함
 */
export function shouldIncrementStreak(
  lastStudyAt: Date | null,
  now: Date
): boolean {
  if (!lastStudyAt) return true;
  return !isSameDay(lastStudyAt, now);
}

/**
 * streak 업데이트 결과를 계산
 */
export function computeStreakUpdate(params: {
  lastStudyAt: Date | null;
  currentStreak: number;
  now: Date;
}): { streakIncrement: number; isNewDay: boolean } {
  const isNewDay = shouldIncrementStreak(params.lastStudyAt, params.now);
  return {
    streakIncrement: isNewDay ? 1 : 0,
    isNewDay,
  };
}
```

**Step 2: 테스트 실행하여 통과 확인**

Run: `npx vitest run tests/lib/streak.test.ts`
Expected: PASS — 모든 테스트 케이스 통과

**Step 3: 전체 테스트 회귀 확인**

Run: `npx vitest run`
Expected: ALL PASS

**Step 4: 커밋**

```bash
git add -A
git commit -m "feat(green): implement streak calculation utility"
```

### Task 1-3: diary.ts 서버 액션에 스트릭 로직 적용

**Objective:** saveDiary에서 무조건 increment하던 streakDays를 computeStreakUpdate로 교체한다

**Files:**
- Modify: `src/actions/diary.ts`

**Step 1: 기존 코드 분석**

현재 `src/actions/diary.ts:54`:
```typescript
streakDays: { increment: 1 },
```
→ 하루에 여러 번 일기 작성 시 streak가 중복 증가하는 버그

**Step 2: actions/diary.ts 수정**

```typescript
// 변경 전 (line 7 이후):
import { XP_REWARDS, computeXpResult } from "@/lib/xp";

// 변경 후:
import { XP_REWARDS, computeXpResult } from "@/lib/xp";
import { computeStreakUpdate } from "@/lib/streak";
```

```typescript
// 변경 전 (line 47-56):
await prisma.userProgress.update({
  where: { userId },
  data: {
    xp: result.newXp,
    level: result.newLevel,
    totalStamps: { increment: result.stampsGained },
    lastStudyAt: new Date(),
    streakDays: { increment: 1 },
  },
});

// 변경 후:
const streakUpdate = computeStreakUpdate({
  lastStudyAt: userProgress.lastStudyAt,
  currentStreak: userProgress.streakDays,
  now: new Date(),
});

await prisma.userProgress.update({
  where: { userId },
  data: {
    xp: result.newXp,
    level: result.newLevel,
    totalStamps: { increment: result.stampsGained },
    lastStudyAt: new Date(),
    ...(streakUpdate.streakIncrement > 0
      ? { streakDays: { increment: streakUpdate.streakIncrement } }
      : {}),
  },
});
```

**Step 3: 빌드 확인**

Run: `npx next build`
(또는 최소한 타입 체크: `npx tsc --noEmit`)
Expected: 에러 없음

**Step 4: 전체 테스트 실행**

Run: `npx vitest run`
Expected: ALL PASS

**Step 5: 커밋**

```bash
git add -A
git commit -m "fix: prevent streak double-increment on same-day diary writes"
```

### Task 1-4: keigo/learningDiary 액션에도 스트릭 로직 적용

**Objective:** keigo와 learningDiary 서버 액션에도 동일한 streak 버그 수정을 적용한다

**Files:**
- Modify: `src/actions/keigo.ts`
- Modify: `src/actions/learningDiary.ts`

**Step 1: keigo.ts 수정**

`src/actions/keigo.ts`의 `completeKeigoLesson` 함수에서:
- `userProgress` 조회 후 streak 계산 추가
- `totalStamps`와 함께 streak 업데이트 조건부 적용

```typescript
// import 추가
import { computeStreakUpdate } from "@/lib/streak";

// userProgress upsert 후 (약 line 60-76):
const streakUpdate = computeStreakUpdate({
  lastStudyAt: userProgress.lastStudyAt,
  currentStreak: userProgress.streakDays,
  now: new Date(),
});

await prisma.userProgress.update({
  where: { userId },
  data: {
    xp: result.newXp,
    level: result.newLevel,
    totalStamps: { increment: stampsToAdd },
    lastStudyAt: new Date(),
    ...(streakUpdate.streakIncrement > 0
      ? { streakDays: { increment: streakUpdate.streakIncrement } }
      : {}),
  },
});
```

**Step 2: learningDiary.ts 동일하게 수정**

```typescript
import { computeStreakUpdate } from "@/lib/streak";

// userProgress upsert 후 동일 패턴 적용
const streakUpdate = computeStreakUpdate({
  lastStudyAt: userProgress.lastStudyAt,
  currentStreak: userProgress.streakDays,
  now: new Date(),
});

await prisma.userProgress.update({
  where: { userId },
  data: {
    xp: result.newXp,
    level: result.newLevel,
    totalStamps: { increment: stampsToAdd },
    lastStudyAt: new Date(),
    ...(streakUpdate.streakIncrement > 0
      ? { streakDays: { increment: streakUpdate.streakIncrement } }
      : {}),
  },
});
```

**Step 3: 타입 체크 + 테스트**

Run: `npx tsc --noEmit && npx vitest run`
Expected: PASS

**Step 4: 커밋**

```bash
git add -A
git commit -m "fix: apply streak logic to keigo and learningDiary actions"
```

---

## Phase 2: 어드민 권한 검증 미들웨어 (Critical 🔴)

### Task 2-1: 어드민 권한 체크 유틸리티 테스트 작성

**Objective:** requireAdmin 서버 사이드 함수의 스펙을 정의하는 테스트를 작성한다

**Files:**
- Create: `tests/lib/auth-guard.test.ts`

**Step 1: 실패하는 테스트 작성**

```typescript
import { describe, it, expect, vi, beforeEach } from "vitest";

// next-auth 모킹
vi.mock("next-auth", () => ({
  getServerSession: vi.fn(),
}));

vi.mock("@/lib/auth", () => ({
  authOptions: {},
}));

import { getServerSession } from "next-auth";
import { requireAdmin } from "@/lib/auth-guard";

describe("requireAdmin", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("세션이 없으면 null을 반환한다", async () => {
    vi.mocked(getServerSession).mockResolvedValue(null);
    const result = await requireAdmin();
    expect(result).toBeNull();
  });

  it("role이 admin이 아니면 null을 반환한다", async () => {
    vi.mocked(getServerSession).mockResolvedValue({
      user: { id: "1", role: "user" },
    });
    const result = await requireAdmin();
    expect(result).toBeNull();
  });

  it("role이 admin이면 세션을 반환한다", async () => {
    const adminSession = {
      user: { id: "admin-1", role: "admin", name: "관리자" },
    };
    vi.mocked(getServerSession).mockResolvedValue(adminSession);
    const result = await requireAdmin();
    expect(result).toEqual(adminSession);
  });
});
```

**Step 2: 테스트 실행하여 실패 확인**

Run: `npx vitest run tests/lib/auth-guard.test.ts`
Expected: FAIL — `Cannot find module '@/lib/auth-guard'`

**Step 3: 커밋**

```bash
git add -A
git commit -m "test(red): add failing auth-guard requireAdmin tests"
```

### Task 2-2: requireAdmin 유틸리티 구현

**Objective:** 테스트를 통과하는 requireAdmin 함수를 구현한다

**Files:**
- Create: `src/lib/auth-guard.ts`

**Step 1: 최소 구현 작성**

```typescript
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * 현재 세션의 사용자가 admin인지 확인하고,
 * admin이면 세션을, 아니면 null을 반환한다.
 */
export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return null;
  if (session.user.role !== "admin") return null;
  return session;
}
```

**Step 2: next-auth 타입 확장 확인**

`src/types/next-auth.d.ts`에 `role` 필드가 이미 정의되어 있는지 확인.

**Step 3: 테스트 실행**

Run: `npx vitest run tests/lib/auth-guard.test.ts`
Expected: PASS

**Step 4: 커밋**

```bash
git add -A
git commit -m "feat(green): implement requireAdmin auth guard"
```

### Task 2-3: 어드민 페이지에 requireAdmin 적용

**Objective:** 모든 admin 페이지에서 requireAdmin을 호출하여 권한 없는 접근을 차단한다

**Files:**
- Modify: `src/app/admin/dashboard/page.tsx`
- Modify: `src/app/admin/users/page.tsx`
- Modify: `src/app/admin/topics/page.tsx`
- Modify: `src/app/admin/levels/page.tsx`
- Modify: `src/app/admin/rewards/page.tsx`
- Modify: `src/app/admin/settings/page.tsx`

**Step 1: admin/dashboard/page.tsx 수정**

```typescript
// 변경 전:
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") redirect("/home");

// 변경 후:
import { requireAdmin } from "@/lib/auth-guard";
import { redirect } from "next/navigation";

export default async function AdminDashboardPage() {
  const session = await requireAdmin();
  if (!session) redirect("/home");
```

**Step 2: 나머지 5개 admin 페이지도 동일하게 수정**

각 파일에서:
1. `getServerSession` + `authOptions` import 제거
2. `requireAdmin` import 추가
3. 권한 체크를 `requireAdmin()` 호출로 교체

**Step 3: 타입 체크**

Run: `npx tsc --noEmit`
Expected: 에러 없음

**Step 4: 커밋**

```bash
git add -A
git commit -m "fix: apply requireAdmin guard to all admin pages"
```

### Task 2-4: Next.js 미들웨어로 /admin 경로 보호

**Objective:** 서버 컴포넌트보다 먼저 실행되는 미들웨어에서 /admin 경로를 차단한다

**Files:**
- Create: `src/middleware.ts`

**Step 1: 미들웨어 작성**

```typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // /admin 경로 보호
  if (pathname.startsWith("/admin")) {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token || token.role !== "admin") {
      const homeUrl = new URL("/home", req.url);
      return NextResponse.redirect(homeUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
```

**Step 2: next-auth jwt 콜백에 role 추가 확인**

`src/lib/auth.ts`의 jwt 콜백에 이미 `token.role`이 설정되어 있으므로 추가 수정 불필요.

**Step 3: 빌드 확인**

Run: `npx tsc --noEmit`
Expected: 에러 없음

**Step 4: 커밋**

```bash
git add -A
git commit -m "feat: add Next.js middleware to protect /admin routes"
```

---

## Phase 3: 게스트 학습 일기 진행상황 동기화 (Important 🟡)

### Task 3-1: 학습 일기 동기화 API 스펙 테스트 작성

**Objective:** 로그인 시 게스트의 학습 일기 진행상황을 DB로 동기화하는 API의 스펙을 정의한다

**Files:**
- Create: `tests/app/api/learning-diary/progress/route.test.ts`

**Step 1: 실패하는 테스트 작성**

```typescript
import { describe, it, expect, vi, beforeEach } from "vitest";

// 모킹 설정
vi.mock("next-auth", () => ({
  getServerSession: vi.fn(),
}));

vi.mock("@/lib/auth", () => ({
  authOptions: {},
}));

vi.mock("@/lib/db", () => ({
  prisma: {
    learningDiaryProgress: {
      findMany: vi.fn(),
      upsert: vi.fn(),
    },
    userProgress: {
      upsert: vi.fn(),
      update: vi.fn(),
    },
  },
}));

import { POST } from "@/app/api/learning-diary/progress/route";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db";

describe("POST /api/learning-diary/progress", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("비인증 요청은 401을 반환한다", async () => {
    vi.mocked(getServerSession).mockResolvedValue(null);
    const req = new Request("http://localhost/api/learning-diary/progress", {
      method: "POST",
      body: JSON.stringify({ completedDiaries: ["ld-1"] }),
    });
    const res = await POST(req as any);
    expect(res.status).toBe(401);
  });

  it("빈 배열이면 0을 동기화한다", async () => {
    vi.mocked(getServerSession).mockResolvedValue({
      user: { id: "user-1", role: "user" },
    });
    const req = new Request("http://localhost/api/learning-diary/progress", {
      method: "POST",
      body: JSON.stringify({ completedDiaries: [] }),
    });
    const res = await POST(req as any);
    const data = await res.json();
    expect(data.synced).toBe(0);
  });

  it("새로운 학습 일기만 동기화하고 기존 것은 건너뛴다", async () => {
    vi.mocked(getServerSession).mockResolvedValue({
      user: { id: "user-1", role: "user" },
    });
    vi.mocked(prisma.learningDiaryProgress.findMany).mockResolvedValue([
      { diaryId: "ld-1" },
    ]);
    vi.mocked(prisma.learningDiaryProgress.upsert).mockResolvedValue({} as any);
    vi.mocked(prisma.userProgress.upsert).mockResolvedValue({
      xp: 10,
      streakDays: 1,
      lastStudyAt: new Date(),
    } as any);
    vi.mocked(prisma.userProgress.update).mockResolvedValue({} as any);

    const req = new Request("http://localhost/api/learning-diary/progress", {
      method: "POST",
      body: JSON.stringify({ completedDiaries: ["ld-1", "ld-2", "ld-3"] }),
    });
    const res = await POST(req as any);
    const data = await res.json();
    // ld-1은 이미 존재하므로 ld-2, ld-3만 동기화 = 2
    expect(data.synced).toBe(2);
  });
});
```

**Step 2: 테스트 실행하여 실패 확인**

Run: `npx vitest run tests/app/api/learning-diary/progress/route.test.ts`
Expected: FAIL — 모듈 없음

**Step 3: 커밋**

```bash
git add -A
git commit -m "test(red): add failing learning diary progress sync tests"
```

### Task 3-2: 학습 일기 진행상황 동기화 API 구현

**Objective:** keigo/progress 패턴을 참고하여 학습 일기 동기화 API를 구현한다

**Files:**
- Create: `src/app/api/learning-diary/progress/route.ts`

**Step 1: 구현**

keigo/progress/route.ts와 동일한 패턴으로 작성하되, learningDiary에 맞게 커스터마이징:

```typescript
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { computeXpResult, XP_REWARDS } from "@/lib/xp";
import { computeStreakUpdate } from "@/lib/streak";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { completedDiaries } = (await req.json()) as {
      completedDiaries: string[];
    };
    if (!Array.isArray(completedDiaries) || completedDiaries.length === 0) {
      return NextResponse.json({ synced: 0 });
    }

    const userId = session.user.id;

    const existing = await prisma.learningDiaryProgress.findMany({
      where: { userId },
      select: { diaryId: true },
    });
    const existingIds = new Set(existing.map((e) => e.diaryId));
    const newDiaries = completedDiaries.filter((id) => !existingIds.has(id));

    if (newDiaries.length === 0) {
      return NextResponse.json({ synced: 0 });
    }

    await Promise.all(
      newDiaries.map((diaryId) =>
        prisma.learningDiaryProgress.upsert({
          where: { userId_diaryId: { userId, diaryId } },
          update: { completedAt: new Date() },
          create: {
            userId,
            diaryId,
            completedAt: new Date(),
            xpAwarded: XP_REWARDS.LEARNING_DIARY_COMPLETE,
          },
        })
      )
    );

    const userProgress = await prisma.userProgress.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });

    const xpToAdd = newDiaries.length * XP_REWARDS.LEARNING_DIARY_COMPLETE;
    const stampsToAdd = newDiaries.length * XP_REWARDS.STAMP_PER_LESSON;
    const result = computeXpResult(userProgress.xp, xpToAdd, stampsToAdd);

    const streakUpdate = computeStreakUpdate({
      lastStudyAt: userProgress.lastStudyAt,
      currentStreak: userProgress.streakDays,
      now: new Date(),
    });

    await prisma.userProgress.update({
      where: { userId },
      data: {
        xp: result.newXp,
        level: result.newLevel,
        totalStamps: { increment: stampsToAdd },
        ...(streakUpdate.streakIncrement > 0
          ? { streakDays: { increment: streakUpdate.streakIncrement } }
          : {}),
      },
    });

    return NextResponse.json({ synced: newDiaries.length });
  } catch (error) {
    console.error("Learning diary sync error:", error);
    return NextResponse.json({ error: "Sync failed" }, { status: 500 });
  }
}
```

**Step 2: 테스트 실행**

Run: `npx vitest run tests/app/api/learning-diary/progress/route.test.ts`
Expected: PASS

**Step 3: 커밋**

```bash
git add -A
git commit -m "feat(green): add learning diary progress sync API"
```

### Task 3-3: 클라이언트에서 로그인 시 학습 일기 동기화 호출

**Objective:** 로그인 성공 후 keigo 진행상황뿐 아니라 학습 일기 진행상황도 동기화한다

**Files:**
- Modify: `src/components/providers/session-provider.tsx` 또는 로그인 성공 후 처리 로직이 있는 컴포넌트

**Step 1:** 로그인 후 동기화 호출 지점 파악 (keigo sync가 어디서 호출되는지 확인 후 동일 위치에 추가)

**Step 2:** 학습 일기 sync fetch 추가

```typescript
// keigo sync 이후에 추가
await fetch("/api/learning-diary/progress", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    completedDiaries: localStorage.getItem("learning-diary-progress")
      ? JSON.parse(localStorage.getItem("learning-diary-progress")!)
      : [],
  }),
});
```

**Step 3:** Zustand store에 학습 일기 진행상황 localStorage persist 추가 (필요시)

**Step 4: 커밋**

```bash
git add -A
git commit -m "feat: sync learning diary progress on login"
```

---

## Phase 4: API Route → 서버 액션 통합 (Important 🟡)

### Task 4-1: keigo/progress API route를 서버 액션으로 통합

**Objective:** POST /api/keigo/progress와 completeKeigoLesson의 중복 로직을 서버 액션으로 통합한다

**Files:**
- Modify: `src/actions/keigo.ts`
- Modify: `src/app/api/keigo/progress/route.ts`

**Step 1: actions/keigo.ts에 syncKeigoProgress 서버 액션 추가**

```typescript
export async function syncKeigoProgress(completedLessonIds: string[]) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { synced: 0 };

  const userId = session.user.id;

  const existing = await prisma.keigoLessonProgress.findMany({
    where: { userId, completed: true },
    select: { lessonId: true },
  });
  const existingIds = new Set(existing.map((e) => e.lessonId));
  const newLessons = completedLessonIds.filter((id) => !existingIds.has(id));

  if (newLessons.length === 0) return { synced: 0 };

  await Promise.all(
    newLessons.map((lessonId) =>
      prisma.keigoLessonProgress.upsert({
        where: { userId_lessonId: { userId, lessonId } },
        update: { completed: true, completedAt: new Date() },
        create: {
          userId,
          lessonId,
          completed: true,
          completedAt: new Date(),
          xpAwarded: XP_REWARDS.KEIGO_LESSON_COMPLETE,
        },
      })
    )
  );

  const userProgress = await prisma.userProgress.upsert({
    where: { userId },
    create: { userId },
    update: {},
  });

  const xpToAdd = newLessons.length * XP_REWARDS.KEIGO_LESSON_COMPLETE;
  const stampsToAdd = newLessons.length * XP_REWARDS.STAMP_PER_LESSON;
  const result = computeXpResult(userProgress.xp, xpToAdd, stampsToAdd);

  const streakUpdate = computeStreakUpdate({
    lastStudyAt: userProgress.lastStudyAt,
    currentStreak: userProgress.streakDays,
    now: new Date(),
  });

  await prisma.userProgress.update({
    where: { userId },
    data: {
      xp: result.newXp,
      level: result.newLevel,
      totalStamps: { increment: stampsToAdd },
      lastStudyAt: new Date(),
      ...(streakUpdate.streakIncrement > 0
        ? { streakDays: { increment: streakUpdate.streakIncrement } }
        : {}),
    },
  });

  revalidatePath("/profile");
  revalidatePath("/home");
  revalidatePath("/keigo");

  return { synced: newLessons.length };
}
```

**Step 2: API route를 서버 액션 래퍼로 변경**

`src/app/api/keigo/progress/route.ts`의 POST 핸들러를 서버 액션 호출로 간소화:

```typescript
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { syncKeigoProgress } from "@/actions/keigo";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { completedLessons } = (await req.json()) as {
      completedLessons: string[];
    };
    const result = await syncKeigoProgress(completedLessons);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Keigo sync error:", error);
    return NextResponse.json({ error: "Sync failed" }, { status: 500 });
  }
}

// GET은 그대로 유지 (클라이언트에서 진행상황 조회용)
export async function GET() {
  // 기존 GET 로직 유지...
}
```

**Step 3: 타입 체크 + 테스트**

Run: `npx tsc --noEmit && npx vitest run`
Expected: PASS

**Step 4: 커밋**

```bash
git add -A
git commit -m "refactor: deduplicate keigo progress logic into server action"
```

---

## Phase 5: 이미지 remotePatterns 제한 (Minor 🟢)

### Task 5-1: next.config.ts 이미지 도메인 제한

**Objective:** 와일드카드 `hostname: "**"`을 필요한 도메인만으로 제한한다

**Files:**
- Modify: `next.config.ts`

**Step 1: 현재 설정 확인**

현재 `next.config.ts:5-9`:
```typescript
images: {
  remotePatterns: [
    { protocol: "https", hostname: "**" },
  ],
},
```

**Step 2: 제한적 설정으로 변경**

현재 프로젝트에서 외부 이미지를 사용하는 곳이 없으므로, 빈 배열로 설정:

```typescript
images: {
  remotePatterns: [],
},
```

> 필요한 이미지 CDN이 확인되면 나중에 추가

**Step 3: 빌드 확인**

Run: `npx tsc --noEmit`
Expected: 에러 없음

**Step 4: 커밋**

```bash
git add -A
git commit -m "fix: restrict image remotePatterns from wildcard to empty"
```

---

## Phase 6: XP 보상 로직 중복 제거 (Important 🟡)

### Task 6-1: 보상 갱신 유틸리티 테스트 작성

**Objective:** XP + 스탬프 + 스트릭 업데이트 로직을 하나의 유틸리티로 추출하는 테스트를 작성한다

**Files:**
- Create: `tests/lib/reward.test.ts`

**Step 1: 실패하는 테스트 작성**

```typescript
import { describe, it, expect } from "vitest";
import { computeRewardUpdate } from "@/lib/reward";

describe("computeRewardUpdate", () => {
  it("기본 XP와 스탬프를 계산한다", () => {
    const result = computeRewardUpdate({
      currentXp: 50,
      xpToAdd: 15,
      currentStamps: 3,
      stampsToAdd: 1,
      lastStudyAt: null,
      currentStreak: 0,
    });
    expect(result.newXp).toBe(65);
    expect(result.newLevel).toBe(2); // 65 >= 50
    expect(result.stampsGained).toBe(1);
    expect(result.streakIncrement).toBe(1);
    expect(result.leveledUp).toBe(true);
  });

  it("오늘 이미 학습한 경우 streak 증가 없음", () => {
    const today = new Date();
    const result = computeRewardUpdate({
      currentXp: 100,
      xpToAdd: 10,
      currentStamps: 5,
      stampsToAdd: 1,
      lastStudyAt: today,
      currentStreak: 3,
    });
    expect(result.streakIncrement).toBe(0);
  });

  it("XP가 레벨 기준에 미치지 못하면 레벨업 없음", () => {
    const result = computeRewardUpdate({
      currentXp: 5,
      xpToAdd: 10,
      currentStamps: 0,
      stampsToAdd: 1,
      lastStudyAt: null,
      currentStreak: 0,
    });
    expect(result.newXp).toBe(15);
    expect(result.newLevel).toBe(1);
    expect(result.leveledUp).toBe(false);
  });
});
```

**Step 2: 테스트 실행하여 실패 확인**

Run: `npx vitest run tests/lib/reward.test.ts`
Expected: FAIL

**Step 3: 커밋**

```bash
git add -A
git commit -m "test(red): add failing computeRewardUpdate tests"
```

### Task 6-2: computeRewardUpdate 유틸리티 구현

**Objective:** 기존 computeXpResult + computeStreakUpdate를 통합한 유틸리티를 구현한다

**Files:**
- Create: `src/lib/reward.ts`

**Step 1: 구현**

```typescript
import { computeXpResult } from "./xp";
import { computeStreakUpdate } from "./streak";

export interface RewardUpdateParams {
  currentXp: number;
  xpToAdd: number;
  currentStamps: number;
  stampsToAdd: number;
  lastStudyAt: Date | null;
  currentStreak: number;
  now?: Date;
}

export interface RewardUpdateResult {
  newXp: number;
  newLevel: number;
  stampsGained: number;
  streakIncrement: number;
  leveledUp: boolean;
}

export function computeRewardUpdate(params: RewardUpdateParams): RewardUpdateResult {
  const { currentXp, xpToAdd, currentStamps, stampsToAdd, lastStudyAt, currentStreak } = params;
  const now = params.now ?? new Date();

  const xpResult = computeXpResult(currentXp, xpToAdd, stampsToAdd);
  const streakResult = computeStreakUpdate({
    lastStudyAt,
    currentStreak,
    now,
  });

  return {
    newXp: xpResult.newXp,
    newLevel: xpResult.newLevel,
    stampsGained: xpResult.stampsGained,
    streakIncrement: streakResult.streakIncrement,
    leveledUp: xpResult.leveledUp,
  };
}
```

**Step 2: 테스트 실행**

Run: `npx vitest run tests/lib/reward.test.ts`
Expected: PASS

**Step 3: 커밋**

```bash
git add -A
git commit -m "feat(green): implement computeRewardUpdate utility"
```

### Task 6-3: actions에서 computeRewardUpdate 사용하도록 리팩토링

**Objective:** diary.ts, keigo.ts, learningDiary.ts에서 중복된 보상 계산 로직을 computeRewardUpdate로 교체한다

**Files:**
- Modify: `src/actions/diary.ts`
- Modify: `src/actions/keigo.ts`
- Modify: `src/actions/learningDiary.ts`

**Step 1:** 각 action에서 `computeXpResult` + `computeStreakUpdate` 조합을 `computeRewardUpdate`로 교체

**Step 2:** Prisma update 호출에서 `computeRewardUpdate` 결과를 사용하도록 변경

**Step 3: 타입 체크 + 전체 테스트**

Run: `npx tsc --noEmit && npx vitest run`
Expected: PASS

**Step 4: 커밋**

```bash
git add -A
git commit -m "refactor: replace duplicated reward logic with computeRewardUpdate"
```

---

## Phase 7: 기존 XP 유틸리티 테스트 보강

### Task 7-1: lib/xp.ts 단위 테스트 작성

**Objective:** 기존 XP 계산 함수들에 대한 포괄적인 테스트를 작성한다

**Files:**
- Create: `tests/lib/xp.test.ts`

**Step 1: 테스트 작성**

```typescript
import { describe, it, expect } from "vitest";
import {
  calculateLevel,
  xpForNextLevel,
  xpProgress,
  computeXpResult,
  LEVEL_THRESHOLDS,
  MAX_LEVEL,
  XP_REWARDS,
} from "@/lib/xp";

describe("XP 시스템", () => {
  describe("calculateLevel", () => {
    it("XP 0이면 레벨 1", () => {
      expect(calculateLevel(0)).toBe(1);
    });
    it("XP 49이면 레벨 1", () => {
      expect(calculateLevel(49)).toBe(1);
    });
    it("XP 50이면 레벨 2", () => {
      expect(calculateLevel(50)).toBe(2);
    });
    it("XP 120이면 레벨 3", () => {
      expect(calculateLevel(120)).toBe(3);
    });
    it("XP 450 이상이면 최대 레벨", () => {
      expect(calculateLevel(450)).toBe(MAX_LEVEL);
      expect(calculateLevel(999)).toBe(MAX_LEVEL);
    });
  });

  describe("xpProgress", () => {
    it("레벨 1에서 XP 0이면 0%", () => {
      expect(xpProgress(0, 1)).toBe(0);
    });
    it("레벨 1에서 XP 25이면 50%", () => {
      expect(xpProgress(25, 1)).toBe(50);
    });
    it("레벨 1에서 XP 50이면 100%", () => {
      expect(xpProgress(50, 1)).toBe(100);
    });
    it("최대 레벨에서는 100%", () => {
      expect(xpProgress(500, MAX_LEVEL)).toBe(100);
    });
  });

  describe("computeXpResult", () => {
    it("XP와 스탬프를 정확히 계산한다", () => {
      const result = computeXpResult(0, 10, 1);
      expect(result.xpGained).toBe(10);
      expect(result.stampsGained).toBe(1);
      expect(result.newXp).toBe(10);
      expect(result.newLevel).toBe(1);
      expect(result.leveledUp).toBe(false);
    });

    it("레벨업을 감지한다", () => {
      const result = computeXpResult(45, 10, 1);
      expect(result.newXp).toBe(55);
      expect(result.newLevel).toBe(2);
      expect(result.leveledUp).toBe(true);
    });
  });

  describe("XP_REWARDS", () => {
    it("모든 보상값이 양수다", () => {
      Object.values(XP_REWARDS).forEach((v) => {
        expect(v).toBeGreaterThan(0);
      });
    });
  });

  describe("LEVEL_THRESHOLDS", () => {
    it("오름차순으로 정렬되어 있다", () => {
      for (let i = 1; i < LEVEL_THRESHOLDS.length; i++) {
        expect(LEVEL_THRESHOLDS[i]).toBeGreaterThan(LEVEL_THRESHOLDS[i - 1]);
      }
    });
  });
});
```

**Step 2: 테스트 실행**

Run: `npx vitest run tests/lib/xp.test.ts`
Expected: PASS (기존 코드가 정상이므로)

**Step 3: 커밋**

```bash
git add -A
git commit -m "test: add comprehensive XP system unit tests"
```

---

## Phase 8: 최종 검증

### Task 8-1: 전체 테스트 스위트 실행 + 빌드 확인

**Objective:** 모든 변경 사항이 정상 동작하는지 최종 검증한다

**Step 1: 전체 테스트 실행**

Run: `npx vitest run`
Expected: ALL PASS

**Step 2: 타입 체크**

Run: `npx tsc --noEmit`
Expected: 에러 없음

**Step 3: 프로덕션 빌드**

Run: `npx next build`
Expected: 빌드 성공

**Step 4: 최종 커밋**

```bash
git add -A
git commit -m "chore: verify all improvements pass build and tests"
```
