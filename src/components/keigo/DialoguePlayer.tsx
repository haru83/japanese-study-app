"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { RubyText } from "@/components/learningDiary/RubyText";
import { buildRubySegments } from "@/lib/rubyParser";
import { TtsButton, speakJapanese, type VoiceGender } from "@/components/ui/TtsButton";

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
  const [showPronunciation, setShowPronunciation] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [activePlayingIndex, setActivePlayingIndex] = useState<number | null>(null);
  const isPlayingRef = useRef(false);

  const rubySegments = useMemo(
    () => dialogue.map((line) => buildRubySegments(line.text, line.pronunciation)),
    [dialogue]
  );

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      isPlayingRef.current = false;
    };
  }, []);

  const getSpeakerConfig = (speaker: string): { gender: VoiceGender; pitch: number } => {
    const isRabbit = speaker.includes("토끼") || speaker.includes("후배") || speaker.includes("여성");
    return {
      gender: isRabbit ? "female" : "male",
      pitch: isRabbit ? 1.18 : 0.82,
    };
  };

  const stopFullPlay = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    isPlayingRef.current = false;
    setActivePlayingIndex(null);
  };

  const playSequentially = (index: number) => {
    if (!isPlayingRef.current || index >= dialogue.length) {
      stopFullPlay();
      return;
    }

    setActivePlayingIndex(index);
    const line = dialogue[index];
    const config = getSpeakerConfig(line.speaker);

    speakJapanese({
      text: line.text,
      rate: 0.9,
      gender: config.gender,
      pitch: config.pitch,
      onEnd: () => {
        if (isPlayingRef.current) {
          setTimeout(() => {
            playSequentially(index + 1);
          }, 350); // slight natural pause between dialogue turns
        }
      },
      onError: () => {
        stopFullPlay();
      },
    });
  };

  const handleToggleFullPlay = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isPlayingRef.current) {
      stopFullPlay();
    } else {
      isPlayingRef.current = true;
      playSequentially(0);
    }
  };

  return (
    <div>
      {/* Toggle buttons & TTS */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setShowPronunciation((v) => !v)}
          className={`flex-1 py-2 px-2 rounded-xl text-xs font-black border-2 border-black transition-all flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 ${
            showPronunciation
              ? "bg-grape-punch text-white"
              : "bg-paper-white text-type-black/70 hover:bg-canvas-almond/60"
          }`}
        >
          <span className="material-symbols-outlined text-sm leading-none block select-none">
            translate
          </span>
          <span>요미가나 {showPronunciation ? "표시" : "숨김"}</span>
        </button>
        <button
          onClick={() => setShowTranslation((v) => !v)}
          className={`flex-1 py-2 px-2 rounded-xl text-xs font-black border-2 border-black transition-all flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 ${
            showTranslation
              ? "bg-sakura-pink text-black"
              : "bg-paper-white text-type-black/70 hover:bg-canvas-almond/60"
          }`}
        >
          <span className="material-symbols-outlined text-sm leading-none block select-none">
            subtitles
          </span>
          <span>한국어 해석 {showTranslation ? "표시" : "숨김"}</span>
        </button>

        {/* 2-Voice Sequential Dialogue Player Button */}
        <button
          type="button"
          onClick={handleToggleFullPlay}
          className={`py-2 px-2.5 rounded-xl text-xs font-black border-2 border-black shadow-[2px_2px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-1.5 shrink-0 ${
            activePlayingIndex !== null
              ? "bg-sakura-pink text-type-black animate-pulse"
              : "bg-paper-white hover:bg-shiba-orange/20 text-type-black"
          }`}
        >
          <span className="material-symbols-outlined text-base leading-none block select-none">
            {activePlayingIndex !== null ? "stop_circle" : "record_voice_over"}
          </span>
          <span>{activePlayingIndex !== null ? "재생 중지" : "대화 듣기"}</span>
        </button>
      </div>

      {/* Dialogue lines */}
      <div className="flex flex-col gap-3">
        {dialogue.map((line, i) => {
          const config = getSpeakerConfig(line.speaker);
          const isLeft = config.gender === "female";
          const isCurrentlySpeaking = activePlayingIndex === i;

          return (
            <div
              key={i}
              className={`flex gap-3 transition-all ${isLeft ? "" : "flex-row-reverse"} ${
                isCurrentlySpeaking ? "scale-[1.02]" : ""
              }`}
            >
              {/* Speaker avatar */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0 border-2 border-black ${
                  isLeft ? "bg-canvas-almond" : "bg-sakura-pink"
                } ${isCurrentlySpeaking ? "ring-2 ring-sakura-pink animate-bounce" : ""}`}
              >
                {isLeft ? "🐰" : "🐻"}
              </div>

              {/* Bubble */}
              <div className={`max-w-[78%] flex flex-col gap-1 ${isLeft ? "" : "items-end"}`}>
                <div className={`flex items-center gap-1.5 ${isLeft ? "" : "flex-row-reverse"}`}>
                  <p className="text-xs text-type-black/60 font-bold flex items-center gap-1">
                    <span>{line.speaker}</span>
                    <span className="text-[10px] text-type-black/40">
                      ({isLeft ? "여성 음성" : "남성 음성"})
                    </span>
                  </p>
                  <TtsButton
                    text={line.text}
                    size="sm"
                    gender={config.gender}
                    pitch={config.pitch}
                  />
                </div>
                <div
                  className={`rounded-[15px] px-4 py-2.5 border-2 border-black transition-all ${
                    isLeft
                      ? "bg-paper-white shadow-[3px_3px_0px_0px_#000] rounded-tl-sm"
                      : "bg-canvas-almond shadow-[3px_3px_0px_0px_#000] rounded-tr-sm"
                  } ${
                    isCurrentlySpeaking
                      ? "ring-2 ring-shiba-orange bg-shiba-orange/15 shadow-[4px_4px_0px_0px_#000]"
                      : ""
                  }`}
                >
                  <p className="text-sm text-type-black font-bold leading-loose">
                    <RubyText segments={rubySegments[i]} showRuby={showPronunciation} />
                  </p>
                  {showTranslation && (
                    <p className="text-xs text-type-black/70 font-bold mt-0.5 border-t border-black/10 pt-1">
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
