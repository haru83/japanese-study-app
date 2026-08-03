import { describe, it, expect } from "vitest";
import { parseMonoRubySegments } from "../rubyParser";

describe("Mono-Ruby & Pitch Accent Parser", () => {
  it("parses mono-ruby bracket syntax with pitch accent", () => {
    const input = "[漢|かん|high][字|じ|low]を[習|なら|high]う";
    const res = parseMonoRubySegments(input);

    expect(res).toHaveLength(5);
    expect(res[0]).toEqual({ text: "漢", ruby: "かん", pitch: "high" });
    expect(res[1]).toEqual({ text: "字", ruby: "じ", pitch: "low" });
    expect(res[2]).toEqual({ text: "を" });
    expect(res[3]).toEqual({ text: "習", ruby: "なら", pitch: "high" });
    expect(res[4]).toEqual({ text: "う" });
  });

  it("handles standard ruby without pitch accent", () => {
    const input = "[私|わたし]は";
    const res = parseMonoRubySegments(input);

    expect(res).toHaveLength(2);
    expect(res[0]).toEqual({ text: "私", ruby: "わたし", pitch: "high" });
    expect(res[1]).toEqual({ text: "は" });
  });
});
