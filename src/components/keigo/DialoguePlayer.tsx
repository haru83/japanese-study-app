"use client";

import { useState } from "react";

interface DialogueLine {
  speaker: string;
  text: string;
  pronunciation: string;
  translation: string;
}

interface DialoguePlayerProps {
  dialogue: DialogueLine[];
}

export function DialoguePlayer({ dialogue }: DialoguePlayerProps) {
  const [showPronunciation, setShowPronunciation] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);

  return (
    <div>
      {/* Toggle buttons */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setShowPronunciation((v) => !v)}
          className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all ${
            showPronunciation
              ? "bg-keigo text-white"
              : "bg-gray-100 dark:bg-border-dark text-text-sub"
          }`}
        >
          발음 {showPronunciation ? "표시" : "숨김"}
        </button>
        <button
          onClick={() => setShowTranslation((v) => !v)}
          className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all ${
            showTranslation
              ? "bg-primary text-text-main"
              : "bg-gray-100 dark:bg-border-dark text-text-sub"
          }`}
        >
          번역 {showTranslation ? "표시" : "숨김"}
        </button>
      </div>

      {/* Dialogue lines */}
      <div className="flex flex-col gap-3">
        {dialogue.map((line, i) => {
          const isLeft = i % 2 === 0;
          return (
            <div
              key={i}
              className={`flex gap-3 ${isLeft ? "" : "flex-row-reverse"}`}
            >
              {/* Speaker avatar */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0 ${
                  isLeft
                    ? "bg-keigo-soft"
                    : "bg-primary/10"
                }`}
              >
                {isLeft ? "🐰" : "🐻"}
              </div>

              {/* Bubble */}
              <div className={`max-w-[75%] ${isLeft ? "" : "items-end"} flex flex-col gap-1`}>
                <p className="text-xs text-text-sub dark:text-text-sub-dark">{line.speaker}</p>
                <div
                  className={`rounded-2xl px-4 py-2.5 ${
                    isLeft
                      ? "bg-white dark:bg-surface-dark rounded-tl-sm border border-gray-100 dark:border-border-dark"
                      : "bg-primary/10 rounded-tr-sm"
                  }`}
                >
                  <p className="text-sm text-text-main dark:text-text-main-dark font-japanese font-medium">
                    {line.text}
                  </p>
                  {showPronunciation && (
                    <p className="text-xs text-text-sub dark:text-text-sub-dark mt-0.5 font-japanese">
                      {line.pronunciation}
                    </p>
                  )}
                  {showTranslation && (
                    <p className="text-xs text-keigo-hover mt-0.5">{line.translation}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
