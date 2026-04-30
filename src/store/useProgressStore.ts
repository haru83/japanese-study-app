"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ProgressState {
  completedLessons: string[];
  completeLesson: (id: string) => void;
  setCompleted: (ids: string[]) => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      completedLessons: [],
      completeLesson: (id) =>
        set((state) => ({
          completedLessons: state.completedLessons.includes(id)
            ? state.completedLessons
            : [...state.completedLessons, id],
        })),
      setCompleted: (ids) => set({ completedLessons: ids }),
    }),
    {
      name: "keigo-progress-storage",
      storage: createJSONStorage(() =>
        typeof window !== "undefined"
          ? window.localStorage
          : ({} as Storage)
      ),
    }
  )
);
