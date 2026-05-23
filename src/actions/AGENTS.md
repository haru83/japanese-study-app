# ACTIONS KNOWLEDGE BASE

**Scope:** Next.js 15 Server Actions — mutations, CRUD, external API calls

## OVERVIEW
All mutations are Server Actions with Zod validation. One file per domain. No API routes for mutations.

## STRUCTURE
```
src/actions/
├── diary.ts                # Personal diary CRUD
├── diaryTutor.ts           # AI tutor review (Gemini or fallback)
├── keigo.ts                # Lesson progress completion
├── learningDiary.ts        # Learning diary progress
├── user.ts                 # User profile updates
├── wardrobe.ts             # Purchase/equip items
├── community.ts            # Like, comment, report, block
├── learning.ts             # Grammar/vocab aggregation
├── review.ts               # SRS vocabulary review
├── admin-content.ts        # Admin CRUD + revalidatePath
├── stats.ts                # User statistics aggregation
└── ...
```

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| Add diary mutation | `diary.ts` | CRUD + isPublic toggle |
| Add AI tutor call | `diaryTutor.ts` | Gemini API or rule fallback |
| Complete a lesson | `keigo.ts` | XP + progress atomically |
| Handle community | `community.ts` | Like, comment, report, block |
| Admin CRUD | `admin-content.ts` | Includes `revalidatePath` |
| SRS review | `review.ts` | Tiered spaced repetition |
| Add new action | Create `src/actions/<domain>.ts` | Follow existing patterns |

## CONVENTIONS
- **`'use server'`** directive at top of every file
- **Zod validation** at function entry — reuse schemas from `src/lib/validation.ts`
- **Prisma transactions** for atomic updates (`prisma.$transaction`)
- **Return typed objects** — `{ success: boolean, error?: string, data?: T }`
- **Auth check first** — verify session before any DB operation
- **Admin guard** — `requireAdmin()` from `src/lib/admin-auth.ts` for admin actions
- **Revalidate** — `revalidatePath()` after content mutations affecting public pages

## ANTI-PATTERNS
- ❌ **Do not create API routes for mutations** — use Server Actions
- ❌ **Do not forget `revalidatePath`** after admin content changes
- ❌ **Do not mix queries in actions** — actions are mutations only; queries inline in server components
