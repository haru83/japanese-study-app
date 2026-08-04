# Real Data Monthly Attendance Stamp Calendar Design Spec

**Date:** 2026-08-05  
**Status:** Approved  
**Topic:** Replacing Artificial 28-Day Heatmap with Real-Data Monthly Attendance Stamp Calendar  

---

## 1. Executive Summary

The previous `LearningHeatmap` component generated artificial dummy active days (`i % 3 === 0`) and rendered an unlabelled 28-day grid that users found confusing. 

This redesign replaces it with a **Real-Data Monthly Attendance Stamp Calendar** (`LearningCalendar`):
1. **100% Real Attendance Data**: Removes all dummy/fake active day calculations. Attendance is strictly determined by real user learning activity dates.
2. **Intuitive Monthly Calendar Layout**: Displays a familiar calendar with Year & Month header (e.g. `< 2026년 8월 >`), month navigation arrows, day-of-week headers (일 ~ 토), and exact calendar day boxes.
3. **Mascot Attendance Stamp**: Days with recorded learning activity feature a cute Shiba Inu attendance stamp (`🐾`) and matcha-green highlight badge.
4. **Monthly Summary Stats**: Shows total attendance days for the selected month and current continuous streak.

---

## 2. Detailed Architecture & Data Flow

### 2.1 Study Date Aggregation (`src/actions/user.ts`)

Export `getUserStudyDates(userId: string): Promise<string[]>` to aggregate unique dates (`YYYY-MM-DD` string format in local time) from:
- `KeigoLessonProgress.completedAt`
- `LearningDiaryProgress.completedAt`
- `Diary.createdAt`
- `DailyChallenge.claimedAt`
- `VocabReview.updatedAt`
- `UserProgress.lastStudyAt`

### 2.2 Component Interface (`LearningCalendar.tsx`)

`src/components/profile/LearningCalendar.tsx`:
```tsx
interface LearningCalendarProps {
  studyDates: string[]; // Array of "YYYY-MM-DD" dates where user completed study
  streakDays: number;
}
```

* **Interactive Navigation**: State for `year` and `month` initialized to current date. Controls to navigate to previous month (`<`) and next month (`>`).
* **Calendar Grid Logic**:
  * Calculates `firstDayOfWeek` (0 for Sun, 1 for Mon...) and `daysInMonth` for the selected year and month.
  * Fills empty lead cells for proper day-of-week alignment.
  * Matches each day `YYYY-MM-DD` against `studyDates` set for 100% accurate attendance rendering.

---

## 3. Data Flow & Components Affected

1. `src/actions/user.ts` — Add `getUserStudyDates()` server action.
2. `src/components/profile/LearningCalendar.tsx` — Implement client interactive Monthly Calendar component with stamp visuals.
3. `src/app/(app)/profile/page.tsx` — Replace `LearningHeatmap` with `LearningCalendar` and pass `studyDates`.
4. `src/lib/__tests__/` — Add unit tests for study date formatting and calendar calculations.

---

## 4. Verification Plan

* Run `npx vitest run` to ensure all unit tests pass.
* Verify `LearningCalendar` displays accurate attendance stamps without artificial dummy days.
