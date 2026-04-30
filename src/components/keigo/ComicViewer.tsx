"use client";

import { useState } from "react";

interface ComicViewerProps {
  frames: string[];
  title: string;
}

export function ComicViewer({ frames, title }: ComicViewerProps) {
  const [current, setCurrent] = useState(0);

  return (
    <div className="bg-keigo-soft rounded-3xl p-5">
      <p className="text-xs text-keigo font-bold mb-3 text-center">만화 {current + 1}/{frames.length}</p>

      {/* Comic frame */}
      <div className="bg-white rounded-2xl p-8 text-center mb-4 min-h-[140px] flex items-center justify-center shadow-sm">
        <span className="text-8xl">{frames[current]}</span>
      </div>

      <p className="text-center text-sm font-medium text-text-main dark:text-text-main-dark mb-3">
        {title}
      </p>

      {/* Navigation dots */}
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          disabled={current === 0}
          className="w-8 h-8 rounded-full bg-white flex items-center justify-center disabled:opacity-30 shadow-sm"
        >
          <span className="material-symbols-outlined text-sm">chevron_left</span>
        </button>

        {frames.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === current ? "bg-keigo w-4" : "bg-keigo/30"
            }`}
          />
        ))}

        <button
          onClick={() => setCurrent((c) => Math.min(frames.length - 1, c + 1))}
          disabled={current === frames.length - 1}
          className="w-8 h-8 rounded-full bg-white flex items-center justify-center disabled:opacity-30 shadow-sm"
        >
          <span className="material-symbols-outlined text-sm">chevron_right</span>
        </button>
      </div>
    </div>
  );
}
