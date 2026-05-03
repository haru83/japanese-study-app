import type { RubySegment } from "@/types/learningDiary";

const KANJI_RE = /[一-龯㐀-䶿]/;

function isKanji(char: string): boolean {
  return KANJI_RE.test(char);
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
        // Mismatch (e.g., Arabic numeral read differently in pronunciation)
        // Don't advance pi — let the next kanji block absorb the extra reading
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
