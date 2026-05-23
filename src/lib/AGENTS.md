# LIB KNOWLEDGE BASE

**Scope:** Utilities, authentication, game logic, parsing, validation

## OVERVIEW
Pure utility functions and shared logic. All modules are server-safe unless explicitly marked. Tests co-located in `__tests__/`.

## STRUCTURE
```
src/lib/
├── auth.ts                 # NextAuth credentials provider config
├── admin-auth.ts           # Centralized `requireAdmin()` guard
├── db.ts                   # Prisma client singleton
├── xp.ts                   # XP thresholds, level calculation
├── streak.ts               # Timezone-aware streak logic
├── wardrobe.ts             # Item equip/unequip, z-index layers
├── japaneseInput.ts        # IME filter (hiragana/katakana only)
├── rubyParser.ts           # Furigana ruby text parser
├── lessonUtils.ts          # Lesson completion helpers
├── jsonUtils.ts            # JSON validation helpers
├── validation.ts           # Zod schemas for Server Actions
├── admin-paths.ts          # Admin route path utilities
├── __tests__/              # Co-located tests (13 files, 177 tests)
│   ├── streak.test.ts
│   ├── xp.test.ts
│   ├── wardrobe.test.ts
│   └── ...
```

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| Modify auth flow | `auth.ts` + `admin-auth.ts` | Check middleware.ts too |
| Adjust XP/levels | `xp.ts` | Thresholds array + level calculation |
| Fix streak logic | `streak.ts` | Timezone-aware, idempotent |
| Add wardrobe item | `wardrobe.ts` | Update z-index layers |
| Validate inputs | `validation.ts` | Zod schemas reused in actions |
| Parse Japanese text | `rubyParser.ts` | Furigana annotation |
| Filter input | `japaneseInput.ts` | Blocks non-Japanese characters |
| Add test | `__tests__/<module>.test.ts` | Co-located, `.test.ts` naming |

## CONVENTIONS
- **Pure functions preferred** — minimize side effects
- **Zod schemas** in `validation.ts` for all user input
- **Prisma singleton** via `db.ts` — always import from there
- **Tests co-located** in `__tests__/` with matching filename
- **Korean comments** in tests for section dividers
- **No `as any`** — strict TypeScript, find proper types

## ANTI-PATTERNS
- ❌ **Do not import Prisma client directly** — use `@/lib/db`
- ❌ **Do not mutate `streakDays` twice in one day** — idempotency in `streak.ts`
- ❌ **Do not put game logic in components** — keep in `xp.ts`, `streak.ts`, `wardrobe.ts`
