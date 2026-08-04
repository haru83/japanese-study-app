import type { MonoRubySegment } from "@/lib/rubyParser";
import type { RubySegment } from "@/types/learningDiary";

interface RubyTextProps {
  segments: (RubySegment | MonoRubySegment)[];
  showRuby: boolean;
  showPitchAccent?: boolean;
  className?: string;
}

export function RubyText({ segments, showRuby, showPitchAccent = false, className = "" }: RubyTextProps) {
  return (
    <span className={className}>
      {segments.map((seg, i) => {
        const monoSeg = seg as MonoRubySegment;
        const isHighPitch = showPitchAccent && monoSeg.pitch === "high";
        const hasKanji = seg.text ? /[一-龯㐀-䶿]/.test(seg.text) : false;

        return seg.ruby && showRuby && hasKanji ? (
          <ruby key={i} className="relative inline-block text-center align-baseline">
            <rt
              className={`absolute bottom-full left-1/2 -translate-x-1/2 translate-y-[6px] text-[0.55em] text-type-black/60 whitespace-nowrap leading-none pointer-events-none ${
                isHighPitch ? "border-t-2 border-grape-punch text-grape-punch font-bold" : ""
              }`}
            >
              {seg.ruby}
            </rt>
            <span>{seg.text}</span>
          </ruby>
        ) : (
          <span key={i}>{seg.text}</span>
        );
      })}
    </span>
  );
}
