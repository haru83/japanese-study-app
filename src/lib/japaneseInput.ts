/**
 * 일본어 전용 입력 유틸리티
 *
 * 입력 모드:
 * - 작성 중: 일본어 + 영문(로마지) + 숫자 허용 (IME 로마지 입력 지원)
 * - 저장 시: 일본어만 허용 (영문/숫자 등은 제거)
 *
 * 허용 문자 범위 (일본어):
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

/** 단일 문자가 로마지 입력에 허용되는 문자인지 확인 (영문 + 숫자 + 일본어) */
export function isRomajiInputAllowed(char: string): boolean {
  const code = char.codePointAt(0);
  if (code === undefined) return false;

  // 공백
  if (code === 0x0020 || code === 0x3000) return true;
  // 개행
  if (code === 0x000a || code === 0x000d) return true;
  // 영문 (a-z, A-Z)
  if ((code >= 0x0041 && code <= 0x005a) || (code >= 0x0061 && code <= 0x007a))
    return true;
  // 숫자 (0-9)
  if (code >= 0x0030 && code <= 0x0039) return true;

  // 일본어
  return JP_RANGES.some(([lo, hi]) => code >= lo && code <= hi);
}

/** 문자열에서 일본어가 아닌 문자를 제거하고 반환 (저장용) */
export function filterJapaneseOnly(text: string): string {
  return Array.from(text)
    .filter((char) => isJapaneseChar(char))
    .join("");
}

/** 문자열에서 로마지 입력에 허용되지 않는 문자를 제거 (입력중용: 한글 등 차단) */
export function filterRomajiInput(text: string): string {
  return Array.from(text)
    .filter((char) => isRomajiInputAllowed(char))
    .join("");
}

/** 문자열에 일본어가 아닌 문자가 포함되어 있는지 확인 (영문/숫자 포함, 저장 시 검사용) */
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

/** 텍스트에 영문/숫자가 포함되어 있는지 확인 (로마지 변환 안 된 부분 검사) */
export function hasUnconvertedRomaji(text: string): boolean {
  return /[a-zA-Z0-9]/.test(text);
}

/**
 * 커뮤니티 댓글 입력용 필터
 *
 * 허용:
 * - 일본어 (히라가나·가타카나·한자·구두점)
 * - 영문 (a-z, A-Z)
 * - 숫자 (0-9)
 * - 기본 ASCII 구두점·기호 (! @ # … 등)
 * - 이모지 (U+1F000~)
 * - 공백·개행
 *
 * 차단:
 * - 한글 (U+AC00~U+D7A3, U+1100~U+11FF, U+3130~U+318F)
 */

/** 단일 문자가 한글인지 확인 */
export function isKoreanChar(char: string): boolean {
  const code = char.codePointAt(0);
  if (code === undefined) return false;
  return (
    (code >= 0xac00 && code <= 0xd7a3) || // 완성형 한글
    (code >= 0x1100 && code <= 0x11ff) || // 자모
    (code >= 0x3130 && code <= 0x318f) || // 호환 자모
    (code >= 0xa960 && code <= 0xa97f) || // 자모 확장 A
    (code >= 0xd7b0 && code <= 0xd7ff)    // 자모 확장 B
  );
}

/** 일기 입력 허용 여부 — 일본어·영문·숫자·기호·이모지 허용, 한글 차단 */
export function isDiaryInputAllowed(char: string): boolean {
  return isCommentInputAllowed(char);
}

/** 일기 텍스트에서 한글 차단 — 한글 제외한 모든 영문/숫자/기호/일본어/이모지 유지 */
export function filterDiaryInput(text: string): string {
  return Array.from(text)
    .filter((char) => isDiaryInputAllowed(char))
    .join("");
}

/** 댓글 입력 허용 여부 — 일본어·영어·이모지 허용, 한글 차단 */
export function isCommentInputAllowed(char: string): boolean {
  const code = char.codePointAt(0);
  if (code === undefined) return false;

  // 한글은 명시적으로 false
  if (isKoreanChar(char)) return false;

  // 공백·개행 허용
  if (code === 0x0020 || code === 0x0009 || code === 0x000a || code === 0x000d || code === 0x3000) return true;
  // ASCII 구두점·기호 (U+0021~U+007E, 영문·숫자 포함)
  if (code >= 0x0021 && code <= 0x007e) return true;
  // 전각 기호 및 문자 (U+FF01~U+FFEF: ！, ？, 전각 로마자 등)
  if (code >= 0xff01 && code <= 0xffef) return true;
  // 이모지 (기본 이모지 블록)
  if (code >= 0x1f000) return true;
  // 이모지 보충 기호
  if (code >= 0x2600 && code <= 0x27bf) return true;
  // 일본어 범위
  if (JP_RANGES.some(([lo, hi]) => code >= lo && code <= hi)) return true;

  return false;
}

/** 댓글 텍스트에서 한글 차단 — 한글 포함 시 필터된 텍스트 반환 */
export function filterCommentInput(text: string): string {
  return Array.from(text)
    .filter((char) => isCommentInputAllowed(char))
    .join("");
}

/** 텍스트에 한글이 포함되어 있는지 확인 */
export function hasKorean(text: string): boolean {
  return Array.from(text).some(isKoreanChar);
}

