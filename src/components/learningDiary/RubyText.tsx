import type { RubySegment } from "@/types/learningDiary";

interface RubyTextProps {
  segments: RubySegment[];
  showRuby: boolean;
  className?: string;
}

export function RubyText({ segments, showRuby, className = "" }: RubyTextProps) {
  return (
    <span className={className}>
      {segments.map((seg, i) =>
        seg.ruby && showRuby ? (
          <ruby key={i}>
            {seg.text}
            <rt className="text-[0.55em] text-text-sub dark:text-text-sub-dark">{seg.ruby}</rt>
          </ruby>
        ) : (
          <span key={i}>{seg.text}</span>
        )
      )}
    </span>
  );
}
