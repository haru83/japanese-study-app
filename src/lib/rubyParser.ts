import type { RubySegment } from "@/types/learningDiary";

const KANJI_RE = /[一-龯㐀-䶿]/;

function isKanji(char: string): boolean {
  return KANJI_RE.test(char);
}

export interface MonoRubySegment extends RubySegment {
  pitch?: "high" | "low";
}

/**
 * Parses Mono-Ruby bracket syntax string:
 * Example: "[漢|かん|high][字|じ|low]を[習|なら|high]う"
 */
export function parseMonoRubySegments(input: string): MonoRubySegment[] {
  const segments: MonoRubySegment[] = [];
  const regex = /\[([^|]+)\|([^|\n]+)(?:\|(high|low))?\]|([^[\n]+)/g;

  let match: RegExpExecArray | null;
  while ((match = regex.exec(input)) !== null) {
    if (match[1]) {
      // Bracket segment: [text|ruby|pitch]
      segments.push({
        text: match[1],
        ruby: match[2],
        pitch: (match[3] as "high" | "low") || "high",
      });
    } else if (match[4]) {
      // Plain text segment
      segments.push({
        text: match[4],
      });
    }
  }

  return segments;
}

export function buildRubySegments(text: string, pronunciation: string): RubySegment[] {
  const raw: RubySegment[] = [];
  let ti = 0;
  let pi = 0;

  while (ti < text.length) {
    const ch = text[ti];

    if (isKanji(ch)) {
      const kanjiStart = ti;
      while (ti < text.length && isKanji(text[ti])) {
        ti++;
      }
      const kanji = text.slice(kanjiStart, ti);
      const rubyStart = pi;

      if (ti < text.length) {
        const anchor = text[ti];
        let found = -1;
        for (let j = pi; j < pronunciation.length; j++) {
          if (pronunciation[j] === anchor) {
            found = j;
            break;
          }
        }
        if (found !== -1) {
          const ruby = pronunciation.slice(rubyStart, found);
          raw.push({ text: kanji, ruby: ruby || undefined });
          pi = found;
        } else {
          raw.push({ text: kanji });
        }
      } else {
        const ruby = pronunciation.slice(rubyStart);
        raw.push({ text: kanji, ruby: ruby || undefined });
        pi = pronunciation.length;
      }
    } else {
      if (pi < pronunciation.length && pronunciation[pi] === ch) {
        raw.push({ text: ch });
        pi++;
      } else {
        // Mismatch
        raw.push({ text: ch });
      }
      ti++;
    }
  }

  // Merge consecutive non-ruby segments
  const merged: RubySegment[] = [];
  for (const seg of raw) {
    const last = merged[merged.length - 1];
    if (!seg.ruby && last && !last.ruby) {
      last.text += seg.text;
    } else {
      merged.push({ text: seg.text, ruby: seg.ruby });
    }
  }

  return merged;
}
