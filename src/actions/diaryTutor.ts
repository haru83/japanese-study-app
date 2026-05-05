"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// ─── 타입 정의 ──────────────────────────────────────────────

export interface SentenceReview {
  original: string;
  issues: string[];         // 문법/어휘 문제 설명 (한국어)
  improved: string;         // 개선된 문장
  improvedKo?: string;      // 개선 문장 한국어 번역
}

export interface TutorReviewResult {
  overallScore: number;     // 0~100 종합 점수
  overallComment: string;   // 종합 코멘트 (한국어)
  reviews: SentenceReview[];
  improvedText: string;     // 전체 개선 텍스트
}

// ─── 규칙 기반 검사 ──────────────────────────────────────────

/** 흔한 초보자 문법 실수 패턴 */
const GRAMMAR_PATTERNS: {
  pattern: RegExp;
  message: string;
  suggestion: string;
}[] = [
  // だ/である 체와 です/ます 체 혼용 경고
  {
    pattern: /(?<=[^\n。！？]{10,}。).*?(?:だ|である|だった|であった)/,
    message: "です/ます체와 だ/である체가 혼용되어 있어요. 일기에서는 です/ます체를 추천합니다.",
    suggestion: "",
  },
  // する→しました (과거 미사용)
  {
    pattern: /今日|昨日|このあいだ|さっき/,
    message: "", // 컨텍스트 체크용 - 함수에서 처리
    suggestion: "",
  },
  // 조사 오감지 (연속 같은 조사)
  {
    pattern: /([にでをがはと])\1/,
    message: "같은 조사가 연속으로 사용되었어요. 조사를 다시 확인해주세요.",
    suggestion: "",
  },
  // は/가 혼동
  {
    pattern: /[^\u3040-\u309F]がは/,
    message: "「がは」는 자연스럽지 않은 표현이에요. 「が」 또는 「は」 중 하나를 선택해주세요.",
    suggestion: "",
  },
];

/** 문장별로 분리 */
function splitSentences(text: string): string[] {
  return text
    .split(/(?<=[。！？\n])/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

/** 텍스트 길이 기반 기본 점수 */
function baseScore(text: string): number {
  const len = text.length;
  if (len < 10) return 40;
  if (len < 30) return 55;
  if (len < 60) return 65;
  if (len < 100) return 72;
  if (len < 200) return 78;
  return 82;
}

/** 과거 시제 감지: 과거 표현 맥락에 する/ます(현재)가 있으면 경고 */
function checkTenseConsistency(text: string): string[] {
  const issues: string[] = [];
  const hasPastContext = /今日|昨日|先週|このあいだ/.test(text);
  const hasPastVerb = /ました|だった|だったり|た$|ました/.test(text);
  const hasPresentVerb = /ます$|する$|です$|いる$|なる$/.test(text);

  if (hasPastContext && hasPresentVerb && !hasPastVerb) {
    issues.push(
      "과거의 일을 쓸 때는 동사를 과거형(～ました)으로 써주세요. 예: 行きます → 行きました"
    );
  }
  return issues;
}

/** です/ます체 vs だ/である체 혼용 체크 */
function checkPolitenessConsistency(text: string): string[] {
  const issues: string[] = [];
  const hasPolite = /です|ます|ました|でしょう/.test(text);
  const hasPlain = /(?:[^\n。！？]{5,}(?:だ|である|だった|でない))/.test(text);

  if (hasPolite && hasPlain) {
    issues.push(
      "です/ます체(정중체)와 だ/である체(보통체)가 섞여 있어요. 일기에서는 한 가지로 통일하는 것이 좋습니다. です/마음체를 추천합니다."
    );
  }
  return issues;
}

/** 조사 중복 체크 */
function checkParticleDuplicate(text: string): string[] {
  const issues: string[] = [];
  if (/([にでをがはとにもから])\1/.test(text)) {
    issues.push("같은 조사가 연속 사용되었어요. 조사를 다시 확인해주세요.");
  }
  return issues;
}

/** 짧은 문장만 있는지 체크 */
function checkSentenceLength(sentences: string[]): string[] {
  const issues: string[] = [];
  const shortCount = sentences.filter((s) => s.length < 5).length;
  if (sentences.length > 2 && shortCount / sentences.length > 0.5) {
    issues.push(
      "문장이 너무 짧아요. 접속사(そして、だから、しかし 등)를 사용해 문장을 연결해보면 더 자연스럽습니다."
    );
  }
  return issues;
}

/** 규칙 기반 리뷰 생성 */
function ruleBasedReview(
  title: string,
  content: string
): TutorReviewResult {
  const sentences = splitSentences(content);
  const allIssues: string[] = [];
  const reviews: SentenceReview[] = [];

  // 전체 텍스트 수준 검사
  const tenseIssues = checkTenseConsistency(content);
  const politeIssues = checkPolitenessConsistency(content);
  const particleIssues = checkParticleDuplicate(content);
  const lengthIssues = checkSentenceLength(sentences);

  allIssues.push(...tenseIssues, ...politeIssues, ...particleIssues, ...lengthIssues);

  // 문장별 기본 리뷰
  for (const sentence of sentences) {
    const sentIssues: string[] = [];

    // 조사 중복
    if (/([にでをがはとにもから])\1/.test(sentence)) {
      sentIssues.push("같은 조사가 연속 사용되었어요.");
    }

    // がは 체크
    if (/がは/.test(sentence)) {
      sentIssues.push("「がは」는 자연스럽지 않은 표현입니다.");
    }

    if (sentIssues.length > 0) {
      reviews.push({
        original: sentence,
        issues: sentIssues,
        improved: sentence, // 규칙 기반은 자동 수정 어려움
      });
    }
  }

  const score = Math.max(
    20,
    baseScore(content) - allIssues.length * 5
  );

  const overallComment =
    allIssues.length === 0
      ? `총 ${sentences.length}문장, ${content.length}자의 일기를 썼네요! 기본적인 문법은 잘 지켜졌습니다. ${content.length < 50 ? "조금 더 길게 써보면 더 좋겠어요!" : "좋은 길이의 일기예요!"}`
      : `${allIssues.length}개의 개선 포인트를 발견했어요. 아래 피드백을 참고해서 수정해보세요!`;

  return {
    overallScore: score,
    overallComment,
    reviews,
    improvedText: content, // 규칙 기반은 원문 그대로
  };
}

// ─── AI 기반 리뷰 (Gemini 3.1 Flash Lite Preview) ─────────────

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const GEMINI_MODEL = "gemini-3.1-flash-lite-preview";
const GEMINI_BASE_URL =
  process.env.GEMINI_BASE_URL ??
  "https://generativelanguage.googleapis.com/v1beta/openai";

interface AIReviewResponse {
  overallScore: number;
  overallComment: string;
  reviews: SentenceReview[];
  improvedText: string;
}

async function aiBasedReview(
  title: string,
  content: string
): Promise<AIReviewResponse | null> {
  if (!GOOGLE_API_KEY) return null;

  const systemPrompt = `あなたは日本語教師です。韓国語を母国語とする日本語学習者が書いた日記を添削してください。

以下のJSON形式で回答してください。他の説明は不要です。
{
  "overallScore": 0~100の整数,
  "overallComment": "韓国語での総評コメント",
  "reviews": [
    {
      "original": "元の文",
      "issues": ["韓国語での問題点の説明"],
      "improved": "修正後の文",
      "improvedKo": "修正文の韓国語訳"
    }
  ],
  "improvedText": "修正後の全文"
}

ルール:
- overallComment は韓国語で書く
- issues は韓国語で書く
- 文法、語彙、表現の自然さをチェック
- JLPT N5~N3レベルの学習者向けにアドバイス
- 問題がない文にはレビューを含めない
- improvedKoはオプション（あると親切）`;

  try {
    const res = await fetch(`${GEMINI_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GOOGLE_API_KEY}`,
      },
      body: JSON.stringify({
        model: GEMINI_MODEL,
        temperature: 0.3,
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: `タイトル: ${title}\n\n本文:\n${content}`,
          },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!res.ok) {
      console.error(`[diaryTutor] Gemini API error: ${res.status}`);
      return null;
    }

    const data = await res.json();
    const content_str = data.choices?.[0]?.message?.content;
    if (!content_str) return null;

    const parsed = JSON.parse(content_str) as AIReviewResponse;
    return parsed;
  } catch (err) {
    console.error("[diaryTutor] Gemini API fetch failed:", err);
    return null;
  }
}

// ─── 메인 Server Action ──────────────────────────────────────

export async function reviewDiary(data: {
  title: string;
  content: string;
}): Promise<TutorReviewResult> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return {
      overallScore: 0,
      overallComment: "로그인이 필요합니다.",
      reviews: [],
      improvedText: data.content,
    };
  }

  // 1) AI 리뷰 시도 (API 키 있으면)
  const aiResult = await aiBasedReview(data.title, data.content);
  if (aiResult) {
    return {
      overallScore: aiResult.overallScore,
      overallComment: aiResult.overallComment,
      reviews: aiResult.reviews,
      improvedText: aiResult.improvedText,
    };
  }

  // 2) AI 없으면 규칙 기반 리뷰
  return ruleBasedReview(data.title, data.content);
}
