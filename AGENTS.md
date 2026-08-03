# PROJECT KNOWLEDGE BASE

**Generated:** 2026-05-23
**Commit:** 1a767e1
**Branch:** master

## OVERVIEW
Japanese language learning app (Next.js 15 + React 19) featuring diary writing, keigo (honorifics) lessons, SRS vocabulary review, and a Shiba Inu mascot gamification system.

## STRUCTURE
```
japanese-study-app/
├── src/
│   ├── app/              # Next.js App Router (route groups, API, admin)
│   ├── actions/          # Server Actions (Next.js 15 pattern)
│   ├── components/       # Feature-based React components
│   ├── lib/              # Utilities, auth, game logic, parsing
│   ├── store/            # Zustand stores (progress persistence)
│   ├── types/            # TypeScript definitions
│   └── data/             # EMPTY — remove or populate
├── prisma/               # SQLite schema + seed scripts
├── public/mascot/        # Shiba overlay PNG assets
└── scripts/              # Python chroma-key script (non-standard)
```

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| Add a new page | `src/app/(app)/` | Use route group for BottomNav |
| Add an API endpoint | `src/app/api/` or `src/actions/` | Prefer Server Actions for mutations |
| Add a shared UI component | `src/components/ui/` | Follow Wobbly Card / Bubble Card pattern |
| Add a feature component | `src/components/<feature>/` | Match existing feature directories |
| Add utility function | `src/lib/` | Group with related utilities |
| Add database model | `prisma/schema.prisma` | Then `npx prisma generate` |
| Modify auth | `src/lib/auth.ts`, `src/middleware.ts` | Double-check admin routes |
| Modify game logic | `src/lib/xp.ts`, `src/lib/streak.ts` | XP thresholds, level calculation |
| Add test | `src/lib/__tests__/` or `src/store/__tests__/` | `.test.ts` naming, co-located |

## CODE MAP

| Symbol | Type | Location | Role |
|--------|------|----------|------|
| `middleware.ts` | Edge function | `src/` | Auth + admin route protection |
| `auth.ts` | Config | `src/lib/` | NextAuth credentials provider |
| `admin-auth.ts` | Utility | `src/lib/` | Centralized `requireAdmin()` guard |
| `db.ts` | Singleton | `src/lib/` | Prisma client singleton |
| `xp.ts` | Logic | `src/lib/` | XP thresholds, level calculation |
| `streak.ts` | Logic | `src/lib/` | Timezone-aware streak calculation |
| `wardrobe.ts` | Logic | `src/lib/` | Item equip/unequip, z-index layers |
| `japaneseInput.ts` | Utility | `src/lib/` | IME input filter (hiragana/katakana only) |
| `rubyParser.ts` | Utility | `src/lib/` | Furigana ruby text parser & Mono-Ruby parser |
| `fsrs.ts` | Logic | `src/lib/` | FSRS-4.5 machine learning spaced repetition engine |
| `recommendAction.ts` | Logic | `src/lib/` | Hick's Law single guided action recommendation engine |
| `useProgressStore` | Store | `src/store/` | Zustand (persisted) — keigo progress |
| `ShibaAvatar` | Component | `src/components/mascot/` | Overlay layer system + level-up animation |

## CONVENTIONS
- **Path alias**: `@/*` maps to `./src/*` — always use `@/` imports
- **Strict TypeScript**: `strict: true` — no `any`, no `@ts-ignore`
- **Mobile-first**: Root layout constrains to `max-w-md` (~448px)
- **Tailwind v4**: CSS-based `@theme` in `globals.css` — no `tailwind.config.js`
- **ESLint 9**: Flat Config (`eslint.config.mjs`) — not legacy `.eslintrc`
- **Server Actions**: Mutations live in `src/actions/`, queries in server components
- **No barrel files**: Explicit imports only — no `index.ts` re-exports
- **Korean comments**: Test descriptions and section dividers use Korean
- **No custom hooks dir**: Hooks live in `src/store/` or inline in components

## ANTI-PATTERNS (THIS PROJECT)
- ❌ **Do not use soft shadows** — use `border-2 border-black shadow-[4px_4px_0px_0px_#000]`
- ❌ **Do not commit `.env`** — explicitly in `.gitignore`
- ❌ **Do not skip Zod validation** — all Server Actions must validate inputs
- ❌ **Do not use `as any` or `@ts-ignore`** — strict mode, find proper types
- ❌ **Do not place providers in `src/providers/`** — keep in `src/components/providers/`
- ❌ **Do not add `src/hooks/` directory** — hooks live in `src/store/` or inline
- ❌ **Do not rely on client-side auth checks alone** — always verify server-side
- ❌ **Do not mutate `streakDays` twice in one day** — idempotency enforced in `streak.ts`

## UNIQUE STYLES
- **WangWang Japanese Sticker Bomb** design system:
  - Wobbly Card: `border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-[15px] .wobbly-*`
  - Bubble Card: `rounded-[144px] shadow-[0px_0px_0px_2px_#ffd80c]`
  - Sticker: `.sticker` class (white border + drop-shadow)
  - Primary button: `bg-sakura-pink` with thick shadow, hover shifts
  - Header: `bg-canvas-almond border-b-4 border-black`
- **Shiba Avatar overlay z-index**: head(30) → face(22) → ears(18) → neck(14-16) → body(6-10)
- **Japanese input filter**: `japaneseInput.ts` blocks non-Japanese characters

## COMMANDS
```bash
# Dev
npm run dev

# Test
npx vitest run
npx vitest run src/lib/__tests__/streak.test.ts

# Build
npm run build
# ⚠️ MUST restart server after build for changes to take effect

# Database
npx prisma generate
npx prisma db push
npx tsx prisma/seed-wardrobe.ts
npm run seed:learning

# Admin setup
npx prisma studio  # manually change User.role to "admin"
```

## NOTES
- **No CI/CD configured** — no `.github/workflows/`, no Docker
- **SQLite in dev** — `prisma/dev.db` is local, never commit
- **Server Actions origins** hardcoded to `localhost:3000/8000` + production IP `34.10.198.226`
- **Guest users** can browse community but login required for reactions/comments
- **One deprecated package**: `uuid@10` in lockfile — upgrade recommended
- **`src/data/` is empty** — remove if unused
- **`scripts/remove_green_bg.py`** — Python chroma-key for mascot assets (non-standard for Next.js)
