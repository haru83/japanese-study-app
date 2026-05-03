"use client";

import { useState } from "react";

interface ComicViewerProps {
  frames: string[];
  title: string;
}

export function ComicViewer({ frames, title }: ComicViewerProps) {
  const [current, setCurrent] = useState(0);

  return (
    <div className="bg-canvas-almond rounded-[15px] p-5 border-2 border-black shadow-[4px_4px_0px_0px_#000]">
      <p className="text-xs text-grape-punch font-black mb-3 text-center">
        만화 {current + 1}/{frames.length}
      </p>

      {/* Comic frame */}
      <div className="bg-paper-white rounded-[15px] p-8 text-center mb-4 min-h-[140px] flex items-center justify-center border-2 border-black shadow-[3px_3px_0px_0px_#000]">
        <span className="text-8xl">{frames[current]}</span>
      </div>

      <p className="text-center text-sm font-black text-type-black mb-3">{title}</p>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          disabled={current === 0}
          className="w-8 h-8 rounded-full bg-paper-white border-2 border-black flex items-center justify-center disabled:opacity-30 shadow-[2px_2px_0px_0px_#000]"
        >
          <span className="material-symbols-outlined text-sm">chevron_left</span>
        </button>

        {frames.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all border border-black ${
              i === current ? "bg-grape-punch w-4" : "bg-paper-white w-2"
            }`}
          />
        ))}

        <button
          onClick={() => setCurrent((c) => Math.min(frames.length - 1, c + 1))}
          disabled={current === frames.length - 1}
          className="w-8 h-8 rounded-full bg-paper-white border-2 border-black flex items-center justify-center disabled:opacity-30 shadow-[2px_2px_0px_0px_#000]"
        >
          <span className="material-symbols-outlined text-sm">chevron_right</span>
        </button>
      </div>
    </div>
  );
}
