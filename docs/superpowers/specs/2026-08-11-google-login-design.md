# Google Login Integration Design Specification

## Overview
Integrate Google OAuth login into the Japanese Study App using NextAuth v4, Prisma Adapter, and the WangWang Japanese Sticker Bomb UI design system.

## Key Goals
1. Support Google OAuth 2.0 authentication alongside existing credentials login.
2. Maintain user profile integrity by automatically creating `UserProgress` (level 1, XP 0, Shiba mascot) when new users register via Google.
3. Adhere to the app's retro sticker bomb styling (`border-2 border-black shadow-[4px_4px_0px_0px_#000]`).
4. Configure environment variables for `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.

## Architectural Changes

### 1. NextAuth Options (`src/lib/auth.ts`)
- Import `GoogleProvider` from `next-auth/providers/google`.
- Add `GoogleProvider` to `providers` array:
  ```typescript
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID ?? "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
  })
  ```
- Add `events.createUser` callback to create `UserProgress`:
  ```typescript
  events: {
    async createUser({ user }) {
      await prisma.userProgress.upsert({
        where: { userId: user.id },
        create: { userId: user.id },
        update: {},
      });
    },
  }
  ```
- Update `jwt` callback to ensure `UserProgress` exists for Google sign-in users even if registered through another path.

### 2. Login Page UI (`src/app/(auth)/login/page.tsx`)
- Add visual divider (`또는`) below the primary login button.
- Add Google sign-in button:
  - Icon: Google multi-color G logo SVG.
  - Text: "Google로 시작하기"
  - Styling: `bg-paper-white border-2 border-black shadow-[4px_4px_0px_0px_#000] font-black text-type-black hover:translate-x-[2px] hover:translate-y-[2px]`
  - On click: calls `signIn("google", { callbackUrl: "/home" })`.

### 3. Environment Variables (`.env`)
- Add placeholders for Google OAuth credentials:
  ```env
  GOOGLE_CLIENT_ID="your-google-client-id"
  GOOGLE_CLIENT_SECRET="your-google-client-secret"
  ```

## Verification Plan
1. Unit test `authOptions` configuration with Vitest.
2. Verify UI rendering and action triggers on `/login`.
3. Run `npm run build` and `npx vitest run` to ensure strict TypeScript types and test passing.
