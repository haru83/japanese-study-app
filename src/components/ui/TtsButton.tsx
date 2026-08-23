"use client";

import { useState, useEffect } from "react";

export type VoiceGender = "female" | "male" | "neutral";

export interface SpeakOptions {
  text: string;
  rate?: number;
  pitch?: number;
  gender?: VoiceGender;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: () => void;
}

/**
 * Searches for a suitable Japanese voice from the browser's available voices list.
 */
export function getJapaneseVoice(gender: VoiceGender = "female"): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;

  const voices = window.speechSynthesis
    .getVoices()
    .filter((v) => v.lang.startsWith("ja") || v.lang.includes("JP"));

  if (voices.length === 0) return null;

  if (gender === "male") {
    const maleVoice = voices.find((v) =>
      /otoya|ichiro|hattori|male|kenji|daiki|takumi|keita/i.test(v.name)
    );
    if (maleVoice) return maleVoice;
  } else if (gender === "female") {
    const femaleVoice = voices.find((v) =>
      /kyoko|ayumi|nanami|haruka|female|sayaka|mizuki|yui/i.test(v.name)
    );
    if (femaleVoice) return femaleVoice;
  }

  return voices[0] || null;
}

/**
 * Speaks Japanese text with character-tailored pitch and gender voice.
 */
export function speakJapanese({
  text,
  rate = 0.9,
  pitch,
  gender = "female",
  onStart,
  onEnd,
  onError,
}: SpeakOptions) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    alert("이 브라우저에서는 음성 합성(TTS) 기능을 지원하지 않습니다.");
    return null;
  }

  window.speechSynthesis.cancel();

  // Remove ruby brackets if any
  const cleanText = text.replace(/\[([^|]+)\|[^\]]+\]/g, "$1").trim();
  if (!cleanText) return null;

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = "ja-JP";
  utterance.rate = rate;

  // Set character pitch: female = 1.15 (bright/high), male = 0.82 (deep/masculine)
  if (pitch !== undefined) {
    utterance.pitch = pitch;
  } else {
    utterance.pitch = gender === "male" ? 0.82 : gender === "female" ? 1.15 : 1.0;
  }

  const voice = getJapaneseVoice(gender);
  if (voice) {
    utterance.voice = voice;
  }

  if (onStart) utterance.onstart = onStart;
  if (onEnd) utterance.onend = onEnd;
  if (onError) utterance.onerror = onError;

  window.speechSynthesis.speak(utterance);
  return utterance;
}

interface TtsButtonProps {
  text: string;
  audioSrc?: string;
  rate?: number;
  pitch?: number;
  gender?: VoiceGender;
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
  showLabel?: boolean;
}

export function TtsButton({
  text,
  audioSrc,
  rate = 0.9,
  pitch,
  gender = "female",
  size = "md",
  className = "",
  label,
  showLabel = false,
}: TtsButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Pre-load voices
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.getVoices();
    }

    return () => {
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

    if (isPlaying) {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlaying(false);
      return;
    }

    if (audioSrc && typeof window !== "undefined") {
      try {
        const audio = new Audio(audioSrc);
        setIsPlaying(true);
        audio.onended = () => setIsPlaying(false);
        audio.onerror = () => {
          // Fallback to speech synthesis if audio file fails
          speakJapanese({
            text,
            rate,
            pitch,
            gender,
            onStart: () => setIsPlaying(true),
            onEnd: () => setIsPlaying(false),
            onError: () => setIsPlaying(false),
          });
        };
        audio.play().catch(() => {
          speakJapanese({
            text,
            rate,
            pitch,
            gender,
            onStart: () => setIsPlaying(true),
            onEnd: () => setIsPlaying(false),
            onError: () => setIsPlaying(false),
          });
        });
        return;
      } catch {
        // Fallback below
      }
    }

    speakJapanese({
      text,
      rate,
      pitch,
      gender,
      onStart: () => setIsPlaying(true),
      onEnd: () => setIsPlaying(false),
      onError: () => setIsPlaying(false),
    });
  };

  const sizeClasses = {
    sm: "p-1.5 rounded-lg text-xs font-bold",
    md: "py-1.5 px-2.5 rounded-xl text-xs font-black",
    lg: "py-2 px-2.5 rounded-xl text-xs font-black",
  };

  const iconSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-base",
  };

  return (
    <button
      type="button"
      onClick={handlePlay}
      aria-label={isPlaying ? "음성 중지" : `${label || text} 일본어 발음 듣기`}
      title={isPlaying ? "음성 중지" : "일본어 발음 듣기"}
      className={`border-2 border-black shadow-[2px_2px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-1.5 shrink-0 ${
        isPlaying
          ? "bg-sakura-pink text-type-black animate-pulse"
          : "bg-paper-white hover:bg-shiba-orange/20 text-type-black"
      } ${sizeClasses[size]} ${className}`}
    >
      <span
        className={`material-symbols-outlined ${iconSizes[size]} leading-none block select-none`}
      >
        {isPlaying ? "stop_circle" : "volume_up"}
      </span>
      {showLabel && (
        <span className="select-none font-bold">
          {label || (isPlaying ? "재생 중" : "듣기")}
        </span>
      )}
    </button>
  );
}
