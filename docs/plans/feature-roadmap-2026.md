# Japanese Study App — Feature Roadmap 2026

**Generated:** 2026-05-23 via /hyperplan adversarial multi-agent planning
**Team:** unspecified-low, unspecified-high, ultrabrain, artistry, deep
**Plan Agent:** ses_1aade9cedffeuOS7NNKh8VKWdJ

---

## Context

Japanese learning app (Next.js 15 + React 19 + Prisma/SQLite). Current features: diary writing with AI tutor, keigo lessons, SRS vocabulary review, Shiba Inu mascot gamification (XP, levels, wardrobe with overlay layers), community feed, 100 learning diaries, admin panel.

**Goal:** Add creative, fun, engaging features that drive user acquisition and retention. Must actually help with Japanese learning.

**Key Constraints:**
- SQLite + Prisma (no real-time/WebSockets — async only)
- Mobile-first (`max-w-md`)
- No audio infrastructure yet
- `@/` path alias, strict TypeScript, no `any`/`@ts-ignore`
- Korean UI text

---

## How This Plan Was Made

Five adversarial agents debated across 3 rounds:

1. **Independent Analysis** — Each agent proposed features from their perspective
2. **Cross-Attack** — Members ruthlessly critiqued each other's proposals
3. **Defend/Refine/Concede** — Honest self-assessment and adjustment

The plan agent synthesized the **surviving ideas** into a structured roadmap.

---

## Surviving Ideas by Phase

| Phase | Features | Why They Survived Cross-Attack |
|-------|----------|-------------------------------|
| **Phase 1** (Ship now) | Daily Quests, Word of the Day, Grammar SRS | Low effort, high retention, reuse existing data. Unspecified-high's safe approach + Deep's retention research. |
| **Phase 2** (Next quarter) | Achievement Badges, Keigo Roast Battle | Badges leverage all existing progress data. Roast Battle is the viral hook that fits existing AI tutor + keigo infra. Artistry's creativity + Ultrabrain's technical feasibility filter. |
| **Phase 3** (Future) | Leagues | Proven Duolingo mechanic (22% completion boost). Uses daily quest + XP systems already built. Deep's competitive analysis + Unspecified-low's gaming instincts. |
| **Deferred** | Study Squads, Shiba Battle Royale, Pitch Accent | Require social critical mass, real-time infra, or audio infra. Cut by consensus in cross-attack. |

---

## Task Dependency Graph

```
Wave 1 (Start immediately — no dependencies):
├── 1A: Daily Quest System
├── 1C: Word of the Day
└── 1D: Grammar SRS Extension

Wave 2 (After Wave 1 completes):
├── 1B: Achievement/Badge System (depends on 1A for quest-triggered achievements)
└── 2A: Keigo Roast Battle (independent, can start in parallel)

Wave 3 (After Wave 2 completes):
└── 2B: Leagues (depends on 1A + 1B for scoring)

Wave 4 (Future):
├── 3A: Study Squads (depends on 2B)
├── 3B: Shiba Battle Royale (depends on 1D + 2B)
└── 3C: Pitch Accent (depends on audio infra)

Critical Path: 1A → 1B → 2B → 3A/3B
```

---

## Phase 1 — Ship in 2-3 Sprints

### 1A: Daily Challenge/Quest System

**What:** 3 daily quests per day (easy/medium/hard), deterministic selection from existing content pools, with stamp + XP rewards.
**Effort:** Medium | **Risk:** Low

**Schema:**
- Add `DailyQuest` model to Prisma (`userId`, `date`, `type`, `target`, `progress`, `xpReward`, `stampReward`, `completed`, `claimedAt`)
- Add `dailyQuests` relation to `User`

**New Files:**
- `src/lib/quest-logic.ts` — deterministic quest generation using date-based hash
- `src/lib/__tests__/quest-logic.test.ts`
- `src/actions/quest.ts` — `getDailyQuests()`, `claimQuestReward()`
- `src/components/quest/DailyQuestCard.tsx` + `DailyQuestPanel.tsx`
- `src/lib/validation.ts` — `QuestClaimSchema`

**Modified Files:**
- `prisma/schema.prisma`, `src/app/(app)/home/page.tsx`, `src/lib/xp.ts`
- Wire quest progress into `keigo.ts`, `learningDiary.ts`, `diary.ts`, `review.ts`

**Verification:**
- `npx vitest run src/lib/__tests__/quest-logic.test.ts` — 15+ tests
- Same date always produces same 3 quest types
- Quests reset at midnight KST
- Manual: complete quest → progress updates → claim → XP/stamps increment

---

### 1C: Word of the Day

**What:** Deterministic "word of the day" on home dashboard, drawn from existing vocab pool. No schema changes.
**Effort:** Small | **Risk:** Low

**New Files:**
- `src/lib/wotd-logic.ts` — deterministic selection from date + vocab pool
- `src/lib/__tests__/wotd-logic.test.ts`
- `src/components/wotd/WordOfTheDayCard.tsx`

**Modified Files:**
- `src/app/(app)/home/page.tsx` — add WotD card between "오늘 할 일" and stats
- `src/actions/stats.ts` — add `getWordOfTheDay()`

**Verification:**
- `npx vitest run src/lib/__tests__/wotd-logic.test.ts` — 5+ tests
- Same word for same date across refreshes
- Clicking navigates to source lesson

---

### 1D: Grammar SRS Extension

**What:** Extend `VocabReview` to support grammar points alongside vocabulary. Separate review tab.
**Effort:** Medium | **Risk:** Low

**Schema:**
- Add `itemType` ("vocab" | "grammar") and `context` (JSON) to `VocabReview`
- Update `@@unique` from `[userId, word]` to `[userId, word, itemType]`
- Add `@@index([userId, itemType])`

**New Files:**
- `src/app/(app)/learning/grammar-review/page.tsx`
- `src/components/learning/GrammarReviewSession.tsx` (similar to existing ReviewSession)
- `src/components/learning/ReviewTabSwitcher.tsx`

**Modified Files:**
- `prisma/schema.prisma`, `src/actions/review.ts`, `src/actions/keigo.ts`, `src/actions/learningDiary.ts`
- `src/app/(app)/learning/review/page.tsx` — add tab switcher

**Verification:**
- `npx prisma db push` succeeds
- Existing vocab reviews unaffected (backward compatibility)
- Complete keigo lesson → grammar points appear in grammar review tab
- Both tabs work independently

---

## Phase 2 — Next Quarter

### 1B: Achievement/Badge System

**What:** 30 achievement badges derived from existing progress data. Shiba mascot awards badges with animation. Retroactive detection.
**Effort:** Medium | **Risk:** Low

**Schema:**
- Add `Achievement` model (key, nameKo, nameEn, descriptionKo, icon, category, tier, threshold)
- Add `UserAchievement` model (userId, achievementId, earnedAt)
- Add `achievements` relation to `User`

**Seed Data:** ~30 badges across categories (learning, streak, social, quest, mastery)

**New Files:**
- `src/lib/achievements.ts` — progress computation, check-and-award logic
- `src/lib/__tests__/achievements.test.ts`
- `src/actions/achievements.ts`
- `src/components/achievement/AchievementBadge.tsx` + `AchievementPanel.tsx` + `AchievementUnlockAnimation.tsx`
- `prisma/seed-achievements.ts`

**Modified Files:**
- `src/app/(app)/profile/page.tsx` — add achievement grid
- `src/app/(app)/home/page.tsx` — toast on unlock
- Wire achievement checks into `keigo.ts`, `diary.ts`, `community.ts`, `wardrobe.ts`, `quest.ts`

**Verification:**
- `npx vitest run src/lib/__tests__/achievements.test.ts` — 20+ tests
- `npm run seed:achievements` succeeds
- Retroactive progress: existing users earn badges immediately on deploy
- Shiba animation triggers on unlock

---

### 2A: Keigo Roast Battle

**What:** Social feature where users compete to craft honorific-laden responses to absurd scenarios. AI (Gemini) judges. Winner gets "Politeness Crown." Async turn-based.
**Effort:** Large | **Risk:** Medium

**Schema:**
- Add `RoastBattle` model (challengerId, defenderId, scenarioId, texts, scores, status, winnerId, expiresAt)
- Add `RoastScenario` model (title, description, difficulty, category, isActive)
- Add User relations for challenger/defender battles

**New Files:**
- `src/lib/roast-judge.ts` — Gemini prompt construction + response parsing
- `src/lib/__tests__/roast-judge.test.ts`
- `src/actions/roast-battle.ts` — create/respond/judge/get battles
- `src/app/(app)/battle/page.tsx` + `battle/[id]/page.tsx`
- `src/components/battle/BattleCard.tsx` + `ScenarioSelector.tsx` + `ResponseForm.tsx` + `JudgeResultPanel.tsx`
- `prisma/seed-scenarios.ts` — 10-20 seed scenarios

**Modified Files:**
- `prisma/schema.prisma`, `src/app/(app)/layout.tsx`, `src/middleware.ts`
- Add battle tab to BottomNav

**Verification:**
- `npx vitest run src/lib/__tests__/roast-judge.test.ts` — 10+ tests
- Manual: create → respond → AI judges → scores display
- 24h expiry enforced
- Japanese-only validation via existing `japaneseInput.ts`

---

## Phase 3 — Future

### 2B: Leagues / Weekly Competition

**What:** Weekly competitive leagues (Sakura → Matcha → Fuji → Torii → Komainu). 30 users per league. Top 10 promoted, bottom 10 demoted.
**Effort:** Large | **Risk:** Medium

**Schema:**
- Add `League` model (name, tier, seasonWeek, startedAt, endedAt)
- Add `LeagueMember` model (leagueId, userId, xpEarned, questsCompleted, rank, promoted, demoted)
- Add `leagueMemberships` relation to `User`

**New Files:**
- `src/lib/league-logic.ts` — placement + promotion/demotion
- `src/lib/__tests__/league-logic.test.ts`
- `src/actions/league.ts`
- `src/app/(app)/league/page.tsx`
- `src/components/league/LeagueCard.tsx` + `LeaderboardPanel.tsx`

**Modified Files:**
- `prisma/schema.prisma`, `src/app/(app)/layout.tsx`, `src/app/(app)/home/page.tsx`
- Add league tab to BottomNav

**Verification:**
- `npx vitest run src/lib/__tests__/league-logic.test.ts` — 15+ tests
- Reproducible placement
- Week finalization correctly promotes/demotes

---

## Phase 4 — Deferred (Not Sprinted)

| Feature | Blocked By | Why Deferred |
|---------|-----------|-------------|
| **Study Squads** (3A) | Task 2B (Leagues) | Requires social critical mass. Cross-attack consensus: private squad chats = moderation burden, scheduling conflicts kill momentum |
| **Shiba Battle Royale** (3B) | Tasks 1D + 2B | Async turn-based kanji battles. Very large effort, game logic complexity. Consensus: fun but not core learning |
| **Pitch Accent** (3C) | Audio infrastructure | Requires Web Audio API or external audio processing. No audio infra exists. Consensus: advanced niche, poor effort-to-value at current stage |

---

## Features That Died in Cross-Attack

| Feature | Killed By | Reason |
|---------|-----------|--------|
| Karaoke Booth | Unspecified-low | Copyright nightmare (JASRAC licensing) |
| Voice AI Clone | Unspecified-low | Creepy + ML infrastructure gap |
| Conbini Heist | Unspecified-high | Content creation burden, culturally risky |
| Onomatopoeia Orchestra | Unspecified-low | Niche appeal, advanced only |
| Real World Scavenger Hunt | Artistry | Requires native app/GPS, web-based AR is janky |
| AI Conversation Partner | Unspecified-high | Expensive, existing AI tutor is better use of budget |
| Stroke Order Practice | Unspecified-high | Canvas complexity, dedicated apps exist |
| Social Following/Friend Graph | Unspecified-high | Overlaps with existing community |
| Kanji Tattoo Parlor | Unspecified-high | Funny but not a core learning loop feature |
| Fortune Cookie Factory | Unspecified-high | Overlaps with Word of the Day |

---

## Commit Strategy

Atomic commits per feature. Each commit must:
1. Pass `npx vitest run` (all tests)
2. Pass `npm run build` (no type errors)
3. Follow `@/` import convention
4. Include co-located tests for new lib files
5. Include `npx prisma db push` if schema changed

### Suggested Commit Order

```
# Wave 1
feat: add DailyQuest Prisma model + migration
feat: add quest-logic lib + tests
feat: add quest Server Actions + validation
feat: add DailyQuestCard + DailyQuestPanel components
feat: integrate daily quests into home page
feat: wire quest progress into keigo/diary/review actions

feat: add WordOfTheDay logic + tests
feat: add WordOfTheDayCard component
feat: integrate WotD into home dashboard

feat: extend VocabReview with itemType + grammar context
feat: add grammar review page + ReviewTabSwitcher
feat: wire grammar SRS into keigo + learning diary actions

# Wave 2
feat: add Achievement + UserAchievement Prisma models
feat: add achievements logic lib + tests
feat: add achievement seed data
feat: add AchievementBadge + AchievementUnlockAnimation components
feat: integrate achievements into profile page
feat: wire achievement checks into all completion actions

feat: add RoastBattle + RoastScenario Prisma models
feat: add roast-judge lib + tests
feat: add roast-battle Server Actions + validation
feat: add battle pages + components
feat: add battle tab to BottomNav

# Wave 3
feat: add League + LeagueMember Prisma models
feat: add league-logic lib + tests
feat: add league Server Actions
feat: add league page + components
feat: add league tab to BottomNav
```

---

## Success Criteria

1. **Daily Quests**: 3 quests appear daily, progress tracks, rewards claim correctly, reset at midnight KST
2. **Word of the Day**: Shows daily, deterministic, links to source lesson
3. **Grammar SRS**: Grammar items appear in review, separate tab works, existing vocab unaffected
4. **Achievements**: 30 badges defined, retroactive progress computed, Shiba animation on unlock
5. **Roast Battle**: Create/respond/judge flow works, 24h timeout enforced, AI judge produces consistent scores
6. **Leagues**: Weekly placement, leaderboard ranks by weekly XP, promotion/demotion at week end

---

## Next Decision Point

After Phase 1 ships, evaluate:
- Daily quest completion rates (target: >50% of DAU complete at least 1 quest)
- Word of the Day click-through rates (target: >30% click to source lesson)
- Grammar SRS adoption (target: >20% of users review grammar within first week)

If metrics are strong, proceed to Phase 2. If not, iterate on Phase 1 UX before expanding scope.
