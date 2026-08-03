"use client";

import { useProgressStore } from "@/store/useProgressStore";
import { completeKeigoLesson } from "@/actions/keigo";

export async function syncGuestProgressToServer(): Promise<void> {
  if (typeof window === "undefined") return;

  const localLessons = useProgressStore.getState().completedLessons;
  if (!localLessons || localLessons.length === 0) return;

  try {
    for (const lessonId of localLessons) {
      await completeKeigoLesson(lessonId, 3, 3).catch(() => {});
    }
  } catch {
    // silent catch if sync fails
  }
}
