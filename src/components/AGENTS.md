# COMPONENTS KNOWLEDGE BASE

**Scope:** React components organized by feature domain

## OVERVIEW
Feature-based component organization with shared UI primitives. All components follow the Sakura Shiba Sticker Bomb design system.

## STRUCTURE
```
src/components/
├── ui/                     # Shared UI primitives
│   ├── Button.tsx
│   ├── Card.tsx
│   └── ProgressBar.tsx
├── layout/                 # Navigation shells
│   ├── BottomNav.tsx
│   └── AdminBottomNav.tsx
├── mascot/                 # Shiba Avatar system
│   └── ShibaAvatar.tsx     # Overlay layers + animations
├── keigo/                  # Honorific lesson UI
│   ├── LessonCard.tsx
│   ├── LessonDetail.tsx    # Gated section tabs & detail view
│   ├── DialoguePlayer.tsx  # 2-Voice sequential player
│   └── QuizSection.tsx     # 60% pass threshold & retry
├── learningDiary/          # Learning diary UI
│   ├── RubyText.tsx        # Furigana ruby parser
│   ├── DiaryList.tsx
│   ├── DiaryDetail.tsx     # Gated section tabs & detail view
│   └── LearningDiaryCard.tsx
├── diary/                  # Personal diary + AI tutor
│   ├── AiTutorReview.tsx
│   └── TutorResultPanel.tsx
├── community/              # Feed + interactions
│   ├── PublicDiaryCard.tsx
│   ├── LikeButton.tsx      # Optimistic update
│   ├── CommentSection.tsx
│   └── ReportModal.tsx
├── wardrobe/               # Shop + equip UI
│   ├── PurchaseButton.tsx
│   └── EquipButton.tsx
├── admin/                  # Admin panel components
│   └── JsonTextarea.tsx    # Real-time JSON validation
├── guest/                  # Guest upsell
│   ├── GuestSignupBanner.tsx
│   └── GuestUpsellModal.tsx
└── providers/              # Context providers (non-standard location)
    └── SessionProvider.tsx
```

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| Add a shared button/card | `src/components/ui/` | Follow Wobbly/Bubble Card pattern |
| Add a feature component | `src/components/<feature>/` | Match existing feature dirs |
| Modify mascot | `src/components/mascot/` | Check z-index layering rules |
| Modify nav | `src/components/layout/` | BottomNav / AdminBottomNav |
| Add provider | `src/components/providers/` | NOT `src/providers/` |

## CONVENTIONS
- **No barrel files (`index.ts`)** — import directly: `@/components/ui/Button`
- **Wobbly Card**: `border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-[15px]`
- **Bubble Card**: `rounded-[144px] shadow-[0px_0px_0px_2px_#ffd80c]`
- **Sticker effect**: `.sticker` class (white border + drop-shadow)
- **Primary button**: `bg-sakura-pink border-2 border-black shadow-[4px_4px_0px_0px_#000]`
- **Client components** only when using `useState`, `useEffect`, browser APIs
- **Props interfaces** inline in component file

## ANTI-PATTERNS
- ❌ **Do not create barrel files (`index.ts`)** — explicit imports only
