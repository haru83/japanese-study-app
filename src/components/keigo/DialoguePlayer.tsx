"use client";

import { useState, useMemo } from "react";
import { RubyText } from "@/components/learningDiary/RubyText";
import { buildRubySegments } from "@/lib/rubyParser";

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

  const rubySegments = useMemo(
    () => dialogue.map((line) => buildRubySegments(line.text, line.pronunciation)),
    [dialogue]
  );

  return (
    <div>
      {/* Toggle buttons */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setShowPronunciation((v) => !v)}
          className={`flex-1 py-2 rounded-xl text-xs font-black border-2 border-black transition-all ${
            showPronunciation
              ? "bg-grape-punch text-white shadow-[2px_2px_0px_0px_#000]"
              : "bg-paper-white text-type-black/60"
          }`}
        >
          요미가나 {showPronunciation ? "표시" : "숨김"}
        </button>
        <button
          onClick={() => setShowTranslation((v) => !v)}
          className={`flex-1 py-2 rounded-xl text-xs font-black border-2 border-black transition-all ${
            showTranslation
              ? "bg-sakura-pink text-black shadow-[2px_2px_0px_0px_#000]"
              : "bg-paper-white text-type-black/60"
          }`}
        >
          한국어 해석 {showTranslation ? "표시" : "숨김"}
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
                className={`w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0 border-2 border-black ${
                  isLeft ? "bg-canvas-almond" : "bg-sakura-pink"
                }`}
              >
                {isLeft ? "🐰" : "🐻"}
              </div>

              {/* Bubble */}
              <div className={`max-w-[75%] flex flex-col gap-1 ${isLeft ? "" : "items-end"}`}>
                <p className="text-xs text-type-black/60 font-bold">{line.speaker}</p>
                <div
                  className={`rounded-[15px] px-4 py-2.5 border-2 border-black ${
                    isLeft
                      ? "bg-paper-white shadow-[3px_3px_0px_0px_#000] rounded-tl-sm"
                      : "bg-canvas-almond shadow-[3px_3px_0px_0px_#000] rounded-tr-sm"
                  }`}
                >
                  <p className="text-sm text-type-black font-bold leading-loose">
                    <RubyText segments={rubySegments[i]} showRuby={showPronunciation} />
                  </p>
                  {showTranslation && (
                    <p className="text-xs text-type-black/70 font-bold mt-0.5">
                      {line.translation}
                    </p>
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
