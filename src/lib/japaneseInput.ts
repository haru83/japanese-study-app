/**
 * 일본어 전용 입력 필터링 유틸리티
 *
 * 허용 문자 범위:
 * - 히라가나: U+3040~U+309F
 * - 가타카나: U+30A0~U+30FF
 * - 한자 (CJK 통합 한자): U+4E00~U+9FFF
 * - 일본어 기호/구두점: U+3000~U+303F (。、「」etc.)
 * - 전각 숫자: U+FF10~U+FF19
 * - 전각 라틴: U+FF21~U+FF3A, U+FF41~U+FF5A
 * - 일본어 확장 A: U+3400~U+4DBF
 * - 반점 가타카나/가나 확장: U+31F0~U+31FF
 * - CJK 호환 한자: U+F900~U+FAFF
 * - 공백 (일반+전각)
 * - 개행 문자
 */

const JP_RANGES: [number, number][] = [
  [0x3000, 0x303f], // 기호/구두점
  [0x3040, 0x309f], // 히라가나
  [0x30a0, 0x30ff], // 가타카나
  [0x31f0, 0x31ff], // 확장 가타카나
  [0x3400, 0x4dbf], // CJK 확장 A
  [0x4e00, 0x9fff], // CJK 통합 한자
  [0xff10, 0xff19], // 전각 숫자
  [0xff21, 0xff3a], // 전각 대문자
  [0xff41, 0xff5a], // 전각 소문자
  [0xf900, 0xfaff], // CJK 호환 한자
];

/** 단일 문자가 일본어 허용 범위인지 확인 */
export function isJapaneseChar(char: string): boolean {
  const code = char.codePointAt(0);
  if (code === undefined) return false;

  // 공백 (일반 공백 + 전각 공백)
  if (code === 0x0020 || code === 0x3000) return true;
  // 개행
  if (code === 0x000a || code === 0x000d) return true;

  return JP_RANGES.some(([lo, hi]) => code >= lo && code <= hi);
}

/** 문자열에서 일본어가 아닌 문자를 제거하고 반환 */
export function filterJapaneseOnly(text: string): string {
  return Array.from(text)
    .filter((char) => isJapaneseChar(char))
    .join("");
}

/** 문자열에 일본어가 아닌 문자가 포함되어 있는지 확인 */
export function hasNonJapanese(text: string): boolean {
  return Array.from(text).some(
    (char) => !isJapaneseChar(char) && char !== "\n"
  );
}

/** 일본어가 아닌 문자의 첫 번째 위치 반환 (0-indexed), 없으면 -1 */
export function findFirstNonJapanese(text: string): number {
  let pos = 0;
  for (const char of text) {
    if (!isJapaneseChar(char) && char !== "\n") return pos;
    pos += char.length; // 서로게이트 페어 대응
  }
  return -1;
}
