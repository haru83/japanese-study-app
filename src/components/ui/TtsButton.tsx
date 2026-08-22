"use client";

import { useState, useEffect } from "react";

interface TtsButtonProps {
  text: string;
  rate?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
  showLabel?: boolean;
}

export function TtsButton({
  text,
  rate = 0.9,
  size = "md",
  className = "",
  label,
  showLabel = false,
}: TtsButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return () => {
      // Cleanup if unmounted while playing
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        if (isPlaying) {
          window.speechSynthesis.cancel();
        }
      }
    };
  }, [isPlaying]);

  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("이 브라우저에서는 음성 합성(TTS) 기능을 지원하지 않습니다.");
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    window.speechSynthesis.cancel();

    // Remove ruby/bracket markers if any remain
    const cleanText = text.replace(/\[([^|]+)\|[^\]]+\]/g, "$1").trim();
    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = "ja-JP";
    utterance.rate = rate;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  const sizeClasses = {
    sm: "p-1 rounded-lg text-sm",
    md: "p-1.5 rounded-xl text-base",
    lg: "px-3 py-1.5 rounded-xl text-xs font-black",
  };

  const iconSizes = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-lg",
  };

  return (
    <button
      type="button"
      onClick={handlePlay}
      aria-label={isPlaying ? "음성 중지" : `${label || text} 일본어 발음 듣기`}
      title={isPlaying ? "음성 중지" : "일본어 발음 듣기"}
      className={`border border-black shadow-[1.5px_1.5px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-1 shrink-0 ${
        isPlaying
          ? "bg-sakura-pink text-type-black animate-pulse"
          : "bg-paper-white hover:bg-shiba-orange/20 text-type-black/80 hover:text-type-black"
      } ${sizeClasses[size]} ${className}`}
    >
      <span
        className={`material-symbols-outlined ${iconSizes[size]} leading-none block select-none`}
      >
        {isPlaying ? "volume_up" : "volume_up"}
      </span>
      {showLabel && (
        <span className="select-none font-bold">
          {label || (isPlaying ? "재생 중" : "듣기")}
        </span>
      )}
    </button>
  );
}
