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

        return seg.ruby && showRuby ? (
          <ruby key={i} className="inline-flex flex-col items-center">
            {seg.text}
            <rt
              className={`text-[0.55em] text-type-black/60 px-0.5 ${
                isHighPitch ? "border-t-2 border-grape-punch text-grape-punch font-bold" : ""
              }`}
            >
              {seg.ruby}
            </rt>
          </ruby>
        ) : (
          <span key={i}>{seg.text}</span>
        );
      })}
    </span>
  );
}
