# APP ROUTER KNOWLEDGE BASE

**Scope:** Next.js 15 App Router — pages, layouts, API routes, middleware

## OVERVIEW
App Router with route groups `(app)` and `(auth)`, admin panel, and API handlers. All routes are server-first with mutations delegated to Server Actions.

## STRUCTURE
```
src/app/
├── layout.tsx              # Root layout (mobile-first max-w-md, SessionProvider)
├── page.tsx                # Splash/landing page (guest entry)
├── (app)/                  # Main app routes (BottomNav via layout)
│   ├── layout.tsx          # BottomNav wrapper
│   ├── home/               # Dashboard hub
│   ├── diary/              # Personal diary + learning diary
│   ├── keigo/              # Honorific lessons
│   ├── community/          # Public feed + reactions
│   ├── profile/            # XP, stats, wardrobe
│   ├── shop/               # Stamp shop
│   ├── wardrobe/           # Item equip/unequip
│   └── learning/           # Grammar/vocab + SRS review
├── (auth)/                 # Auth pages (no BottomNav)
│   ├── login/              # Login + signup
│   └── onboarding/         # Name setup post-registration
├── admin/                  # Admin panel (middleware + layout guard)
│   ├── layout.tsx          # AdminBottomNav + requireAdmin()
│   ├── keigo/              # Lesson CRUD
│   ├── diary/              # Learning diary CRUD
│   └── reports/            # Report management
└── api/
    ├── auth/[...nextauth]/  # NextAuth handler
    ├── register/           # Rate-limited registration
    └── sync-keigo/         # Lesson sync endpoint
```

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| Add a public page | `(app)/<route>/page.tsx` | Inherits BottomNav |
| Add an auth page | `(auth)/<route>/page.tsx` | No layout — minimal wrapper |
| Add admin page | `admin/<route>/page.tsx` | Inherits admin layout + guard |
| Add API route | `api/<route>/route.ts` | REST handlers, prefer Server Actions |
| Modify nav | `(app)/layout.tsx` | BottomNav shared across app |
| Modify auth protection | `src/middleware.ts` | JWT + role checks |
| Revalidate paths | `src/actions/admin-content.ts` | `revalidatePath` after content changes |

## CONVENTIONS
- **Route groups** for conditional layouts: `(app)` has BottomNav, `(auth)` does not
- **Admin** is NOT a route group — uses `/admin` path segment for URL clarity
- **Server components by default** — only mark `'use client'` when needed
- **Mutations** go to `src/actions/`, not API routes
- **Queries** inline in server components using Prisma directly
- **Dynamic segments**: `[id]` for diary detail, `[diaryId]` for community detail
- **Not-found**: `notFound()` for private diaries, unauthorized admin access

## ANTI-PATTERNS
- ❌ **Do not add client-side auth checks in pages** — use `middleware.ts` + server-side `requireAdmin()`
- ❌ **Do not create API routes for mutations** — use Server Actions in `src/actions/`
- ❌ **Do not skip `revalidatePath`** after admin content changes
- ❌ **Do not put admin routes in `(app)` group** — keep under `admin/` for middleware targeting
