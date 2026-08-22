"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ANIME_CATEGORIES, ANIME_QUOTES_DATA, type PersonaId } from "@/data/animeQuotes";
import { AnimeQuoteCard } from "@/components/entertainment/AnimeQuoteCard";

interface Props {
  initialBookmarkMap: Record<string, boolean>;
}

export function AnimeQuotesClient({ initialBookmarkMap }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<"all" | PersonaId>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredQuotes = useMemo(() => {
    return ANIME_QUOTES_DATA.filter((item) => {
      const matchCategory =
        selectedCategory === "all" || item.animeId === selectedCategory;
      if (!matchCategory) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.trim().toLowerCase();
      return (
        item.animeTitleKo.toLowerCase().includes(q) ||
        item.characterKo.toLowerCase().includes(q) ||
        item.quoteJa.toLowerCase().includes(q) ||
        item.quoteKo.toLowerCase().includes(q) ||
        (item.quoteReading && item.quoteReading.toLowerCase().includes(q)) ||
        item.tag.toLowerCase().includes(q) ||
        item.vocabulary.some(
          (v) =>
            v.word.toLowerCase().includes(q) ||
            v.reading.toLowerCase().includes(q) ||
            v.meaning.toLowerCase().includes(q)
        )
      );
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="flex flex-col min-h-screen bg-sakura-blush px-5 pt-8 pb-24 space-y-5">
      {/* Header */}
      <header className="flex items-center gap-3">
        <Link
          href="/entertainment"
          className="p-2 rounded-full border-2 border-black bg-paper-white shadow-[2px_2px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] transition-all shrink-0"
          aria-label="엔터 허브로 돌아가기"
        >
          <span className="material-symbols-outlined text-type-black text-xl leading-none block">
            arrow_back
          </span>
        </Link>
        <div>
          <h1 className="text-xl font-black text-type-black flex items-center gap-2">
            애니 톤 일본어 🎬
          </h1>
          <p className="text-xs font-bold text-type-black/60">
            만화·애니 속 캐릭터 페르소나별 실전 말투와 핵심 문법
          </p>
        </div>
      </header>

      {/* Search Input */}
      <div className="relative">
        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-type-black/50 text-xl pointer-events-none">
          search
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="캐릭터 유형, 대사, 단어로 검색..."
          className="w-full pl-10 pr-9 py-2.5 bg-paper-white rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_#000] text-sm font-bold placeholder:text-type-black/40 text-type-black focus:outline-none focus:ring-2 focus:ring-shiba-orange/50 transition-all"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-type-black/40 hover:text-type-black"
            aria-label="검색어 지우기"
          >
            <span className="material-symbols-outlined text-lg leading-none block">
              close
            </span>
          </button>
        )}
      </div>

      {/* Category Horizontal Scroll Chips */}
      <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-none -mx-1 px-1">
        {ANIME_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 border-black text-xs font-black shrink-0 transition-all ${
                isSelected
                  ? `${cat.badgeBg} text-type-black shadow-[2px_2px_0px_0px_#000] -translate-y-0.5`
                  : "bg-paper-white text-type-black/70 hover:bg-canvas-almond/60 shadow-[1px_1px_0px_0px_#000]"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Count & Info Banner */}
      <div className="flex items-center justify-between px-1">
        <span className="text-xs font-black text-type-black/70 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-matcha-green border border-black inline-block" />
          총 <strong className="text-type-black font-black">{filteredQuotes.length}</strong>개의 페르소나 대사
        </span>
        <span className="text-[11px] font-bold text-type-black/50">
          💡 단어의 ⭐를 눌러 북마크에 보관하세요
        </span>
      </div>

      {/* Quotes Card List */}
      {filteredQuotes.length === 0 ? (
        <div className="bg-paper-white rounded-[20px] border-2 border-black p-8 text-center shadow-[4px_4px_0px_0px_#000] space-y-2">
          <p className="text-4xl">🔍</p>
          <p className="text-sm font-black text-type-black">검색 결과가 없습니다</p>
          <p className="text-xs text-type-black/60 font-bold">
            다른 검색어나 캐릭터 유형을 선택해 보세요!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredQuotes.map((quote) => (
            <AnimeQuoteCard
              key={quote.id}
              quote={quote}
              initialBookmarkMap={initialBookmarkMap}
            />
          ))}
        </div>
      )}
    </div>
  );
}
