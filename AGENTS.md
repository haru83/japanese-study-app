# PROJECT KNOWLEDGE BASE

**Generated:** 2026-08-13
**Commit:** dec3004
**Branch:** master

## OVERVIEW
Japanese language learning app (Next.js 15 + React 19 + Prisma/PostgreSQL + Cloud Run) featuring 300 Keigo (honorifics) lessons, 300 Learning Diaries, Level-Gated Content (Lv1~10), Vocab Hub ("어휘"), Entertainment Hub (Anime Quotes with Gemini 3.1 Flash TTS voice acting), SRS vocabulary review, Star Bookmarks, Unified Platform Headers, and a Shiba Inu mascot gamification system (XP, levels, 2-slot wardrobe).

## STRUCTURE
```
japanese-study-app/
├── src/
│   ├── app/              # Next.js App Router (route groups, API, admin, learning, vocab, entertainment)
│   ├── actions/          # Server Actions (Next.js 15 pattern - auth, keigo, diary, bookmark, quest)
│   ├── components/       # Feature-based React components
│   │   ├── bookmark/     # Star Bookmark toggle button
│   │   ├── keigo/        # Keigo lesson list & detail components (DialoguePlayer)
│   │   ├── learningDiary/# Learning diary list, detail & Mono-Ruby components (DiaryDetail)
│   │   ├── entertainment/# Anime quotes (AnimeQuoteCard) & J-POP hub
│   │   ├── mascot/       # Shiba Avatar overlay layer system & level-up animation
│   │   └── wotd/         # Word of the Day card
│   ├── lib/              # Utilities, auth, game logic, contentGate, parsing, FSRS
│   ├── store/            # Zustand stores (progress persistence)
│   ├── types/            # TypeScript definitions
│   └── data/             # Content data files (kl_p1~11.ts, ld_p1~30.ts, animeQuotes.ts)
├── prisma/               # Schema + seed scripts (seed-learning.ts)
├── public/
│   ├── mascot/           # Mascot overlay PNG assets (Shiba, Poodle, Beagle, Pomeranian)
│   └── audio/anime-quotes/# Gemini 3.1 Flash TTS voice acting WAV/MP3 files (32 quotes)
└── scripts/              # Gemini 3.1 Flash TTS generator (generate-gemini-tts.js)
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
| Modify auth | `src/lib/auth.ts`, `src/middleware.ts` | Double-check admin routes & level-gated paths |
| Modify game logic | `src/lib/xp.ts`, `src/lib/streak.ts`, `src/lib/contentGate.ts` | XP thresholds, level calculation, content gating |
| Add test | `src/lib/__tests__/` or `src/store/__tests__/` | `.test.ts` naming, co-located |

## CODE MAP

| Symbol | Type | Location | Role |
|--------|------|----------|------|
| `middleware.ts` | Edge function | `src/` | Auth + admin + learning route protection |
| `auth.ts` | Config | `src/lib/` | NextAuth credentials provider |
| `admin-auth.ts` | Utility | `src/lib/` | Centralized `requireAdmin()` guard |
| `contentGate.ts` | Utility | `src/lib/` | Level calculation (`Math.ceil(sortOrder/30)`) & unlock verification |
| `db.ts` | Singleton | `src/lib/` | Prisma client singleton |
| `xp.ts` | Logic | `src/lib/` | XP thresholds, level calculation |
| `streak.ts` | Logic | `src/lib/` | Timezone-aware streak calculation |
| `wardrobe.ts` | Logic | `src/lib/` | Item equip/unequip, z-index layers |
| `quiz.ts` | Logic | `src/lib/` | Quiz passing threshold (60%) & score validation |
| `japaneseInput.ts` | Utility | `src/lib/` | IME input filter (hiragana/katakana only) |
| `rubyParser.ts` | Utility | `src/lib/` | Furigana ruby text parser & Mono-Ruby parser |
| `fsrs.ts` | Logic | `src/lib/` | FSRS-4.5 machine learning spaced repetition engine |
| `bookmark.ts` | Server Actions | `src/actions/` | Star bookmark toggle (`toggleBookmark`, `getBookmarkMap`, `getBookmarkedItems`) |
| `TtsButton` | Component | `src/components/ui/` | Standardized audio playback with `audioSrc` (Gemini TTS) & Web Speech fallback |
| `AnimeQuoteCard` | Component | `src/components/entertainment/` | Anime quote card with Gemini 3.1 Flash TTS, ruby toggle, full-width dialogue |
| `BottomNav` | Component | `src/components/layout/` | 6-item bottom navigation (`홈`, `일기`, `경어`, `어휘`, `커뮤니티`, `프로필`) |
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
  - Unified Full-Width Header: `bg-canvas-almond border-b-4 border-black px-4 pt-3 pb-3 sticky top-0 z-20` across all main tabs (`/diary`, `/keigo`, `/learning`, `/entertainment`, `/community`, `/profile`)
  - Standardized Learning Controls: `border-2 border-black shadow-[2px_2px_0px_0px_#000] rounded-xl text-xs font-black` with short labels (`요미가나`, `한국어`, `듣기`)
  - Wobbly Card: `border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-[15px] .wobbly-*`
  - Bubble Card: `rounded-[144px] shadow-[0px_0px_0px_2px_#ffd80c]`
  - Sticker: `.sticker` class (white border + drop-shadow)
  - Primary button: `bg-sakura-pink` with thick shadow, hover shifts
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

# TTS Audio Generation (Gemini 3.1 Flash TTS)
node scripts/generate-gemini-tts.js

# Database
npx prisma generate
npx prisma db push
npx tsx prisma/seed-wardrobe.ts
npm run seed:learning

# Admin setup
npx prisma studio  # manually change User.role to "admin"
```

## NOTES
- **Cloud Run deployment** — `gcloud run deploy japanese-study-app --source . --region asia-northeast3 --allow-unauthenticated`
- **Level Gating System**: 30 content items per level (Lv1: 1~30, Lv2: 31~60 ... Lv10: 271~300)
- **Lesson Completion Requirements**: Requires viewing all preceding sections (dialogue/text, grammar, vocab) to unlock quiz + minimum 60% quiz score to complete
- **Vocab Hub Routes**: `/learning` (어휘 Main Hub), `/learning/vocabulary` (학습한 단어), `/learning/grammar` (학습한 문법), `/learning/topics` (주제별 단어), `/learning/idioms` (재미있는 숙어), `/learning/confusing-grammar` (헷갈리는 문법), `/learning/bookmarks` (북마크)
- **Entertainment Hub Routes**: `/entertainment` (Culture Main Hub), `/entertainment/anime-quotes` (애니 톤 일본어 - Gemini 3.1 Flash TTS 연동)

