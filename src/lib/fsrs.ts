/**
 * Free Spaced Repetition Scheduler (FSRS) Algorithm Core Engine
 * Based on FSRS-4.5 memory model (Stability, Difficulty, Retrievability)
 */

export type FSRSRating = 1 | 2 | 3 | 4; // 1: Again (🔴), 2: Hard (🟠), 3: Good (🟢), 4: Easy (🔵)

export interface FSRSItemState {
  stability: number;   // S (in days)
  difficulty: number;  // D (1.0 to 10.0)
  reps: number;        // total number of reviews
  lapses: number;      // total number of fails (Again)
  lastReviewAt?: Date | string | null;
}

export interface FSRSCalculationResult {
  stability: number;
  difficulty: number;
  reps: number;
  lapses: number;
  intervalDays: number;
  nextReviewAt: Date;
}

// Default initial stabilities per rating
const INITIAL_STABILITY: Record<FSRSRating, number> = {
  1: 0.4, // Again
  2: 1.2, // Hard
  3: 2.5, // Good
  4: 5.5, // Easy
};

// Initial difficulty modifier per rating
const INITIAL_DIFFICULTY: Record<FSRSRating, number> = {
  1: 6.5,
  2: 5.5,
  3: 4.5,
  4: 3.5,
};

// Rating multipliers for stability growth on success
const RATING_MULTIPLIERS: Record<number, number> = {
  2: 1.2, // Hard
  3: 2.2, // Good
  4: 3.5, // Easy
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Calculates updated FSRS memory state and next review interval.
 */
export function calculateFSRS(
  currentState: FSRSItemState | null | undefined,
  rating: FSRSRating,
  now: Date = new Date()
): FSRSCalculationResult {
  const isNew = !currentState || currentState.reps === 0;

  if (isNew) {
    const stability = INITIAL_STABILITY[rating];
    const difficulty = INITIAL_DIFFICULTY[rating];
    const lapses = rating === 1 ? 1 : 0;
    const reps = 1;
    const intervalDays = Math.max(1, Math.round(stability));
    const nextReviewAt = new Date(now.getTime() + intervalDays * 24 * 60 * 60 * 1000);

    return {
      stability: Number(stability.toFixed(2)),
      difficulty: Number(difficulty.toFixed(2)),
      reps,
      lapses,
      intervalDays,
      nextReviewAt,
    };
  }

  const { stability: prevS, difficulty: prevD, reps: prevReps, lapses: prevLapses, lastReviewAt } = currentState;

  // Calculate elapsed days since last review
  let elapsedDays = 1;
  if (lastReviewAt) {
    const lastDate = new Date(lastReviewAt);
    const diffMs = Math.max(0, now.getTime() - lastDate.getTime());
    elapsedDays = Math.max(0.1, diffMs / (1000 * 60 * 60 * 24));
  }

  // Retrievability R(t) = exp(ln(0.9) * t / S)
  const retrievability = Math.exp((Math.log(0.9) * elapsedDays) / Math.max(0.1, prevS));

  // Update Difficulty D
  const difficultyDelta = -0.8 * (rating - 3);
  const newD = clamp(prevD + difficultyDelta, 1.0, 10.0);

  let newS = prevS;
  let newLapses = prevLapses;

  if (rating === 1) {
    // Fail (Again): lapse occurred, stability drops
    newLapses += 1;
    newS = Math.max(0.4, Number((prevS * 0.25).toFixed(2)));
  } else {
    // Success (Hard, Good, Easy): stability increases based on difficulty & retrievability
    const ratingMod = RATING_MULTIPLIERS[rating] || 2.0;
    const diffFactor = (11 - newD) / 10;
    const recallBonus = 1 - retrievability + 0.1;
    const growth = ratingMod * diffFactor * recallBonus;
    newS = Math.max(prevS + 0.1, Number((prevS * (1 + growth)).toFixed(2)));
  }

  const reps = prevReps + 1;
  const intervalDays = Math.max(1, Math.round(newS));
  const nextReviewAt = new Date(now.getTime() + intervalDays * 24 * 60 * 60 * 1000);

  return {
    stability: Number(newS.toFixed(2)),
    difficulty: Number(newD.toFixed(2)),
    reps,
    lapses: newLapses,
    intervalDays,
    nextReviewAt,
  };
}

/**
 * Returns human-readable preview interval labels for rating buttons (Again, Hard, Good, Easy)
 */
export function getFSRSPreviewIntervals(
  currentState: FSRSItemState | null | undefined,
  now: Date = new Date()
): Record<FSRSRating, string> {
  const ratings: FSRSRating[] = [1, 2, 3, 4];
  const previews: Record<FSRSRating, string> = {
    1: "1일",
    2: "2일",
    3: "3일",
    4: "6일",
  };

  for (const r of ratings) {
    const res = calculateFSRS(currentState, r, now);
    previews[r] = `${res.intervalDays}일`;
  }

  return previews;
}
