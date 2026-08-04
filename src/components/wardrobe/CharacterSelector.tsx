"use client";

import { useState, useTransition } from "react";
import { updateActiveCharacter } from "@/actions/user";

interface CharacterOption {
  id: string;
  name: string;
  icon: string;
  description: string;
}

const CHARACTERS: CharacterOption[] = [
  { id: "shiba", name: "시바견", icon: "🐕", description: "충직하고 당당한 기본 마스코트" },
  { id: "poodle", name: "몽실이 푸들", icon: "🐩", description: "폭신폭신 사랑스러운 푸들" },
  { id: "beagle", name: "장난꾸러기 비글", icon: "🐶", description: "에너지 넘치는 유쾌한 비글" },
  { id: "pomeranian", name: "솜사탕 포메", icon: "🐾", description: "동글동글 귀여운 포메라니안" },
];

export function CharacterSelector({ currentCharacter = "shiba" }: { currentCharacter?: string }) {
  const [selected, setSelected] = useState(currentCharacter);
  const [isPending, startTransition] = useTransition();

  const handleSelect = (characterId: string) => {
    if (characterId === selected || isPending) return;
    setSelected(characterId);

    startTransition(async () => {
      try {
        await updateActiveCharacter(characterId);
      } catch (err) {
        console.error("캐릭터 변경 실패:", err);
        setSelected(currentCharacter);
      }
    });
  };

  return (
    <div className="bg-paper-white rounded-[15px] border-2 border-black shadow-[4px_4px_0px_0px_#000] p-4 mb-5">
      <h2 className="text-sm font-black text-type-black mb-3 flex items-center gap-1.5">
        <span className="material-symbols-outlined text-sakura-pink text-base" style={{ fontVariationSettings: "'FILL' 1" }}>pets</span>
        마스코트 강아지 선택
      </h2>
      <div className="grid grid-cols-2 gap-2.5">
        {CHARACTERS.map((char) => {
          const isActive = selected === char.id;
          return (
            <button
              key={char.id}
              onClick={() => handleSelect(char.id)}
              disabled={isPending}
              className={`p-3 rounded-[12px] border-2 border-black text-left transition-all relative overflow-hidden flex flex-col items-center justify-center text-center ${
                isActive
                  ? "bg-sakura-pink/30 border-black shadow-[3px_3px_0px_0px_#000] ring-2 ring-sakura-pink"
                  : "bg-paper-white hover:bg-canvas-almond/50 shadow-[2px_2px_0px_0px_#000]"
              }`}
            >
              {isActive && (
                <span className="absolute top-1.5 right-1.5 bg-sakura-pink text-type-black text-[9px] font-black px-1.5 py-0.2 rounded-full border border-black">
                  선택됨
                </span>
              )}
              <div className="text-3xl mb-1">{char.icon}</div>
              <p className="font-black text-xs text-type-black">{char.name}</p>
              <p className="text-[10px] font-bold text-type-black/60 mt-0.5">{char.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
