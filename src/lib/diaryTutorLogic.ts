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

// ─── 문장 분리 ──────────────────────────────────────────────

export function splitSentences(text: string): string[] {
  return text
    .split(/(?<=[。！？\n])/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

// ─── 규칙 기반 검사 및 교정 ──────────────────────────────────

/** 문장 단위 규칙 기반 교정 규칙 */
interface SentenceRule {
  id: string;
  name: string;
  check: (sentence: string, fullContext: { title: string; content: string }) => {
    hasIssue: boolean;
    issues: string[];
    fix: (sentence: string) => string;
    improvedKo?: string;
  };
}

const SENTENCE_RULES: SentenceRule[] = [
  // 1. 중복 조사 (にに, を를, が가, はは, でで, とと, がは 등)
  {
    id: "duplicate-particles",
    name: "중복 조사",
    check: (sentence) => {
      const issues: string[] = [];
      let fixed = sentence;

      if (/がは/.test(fixed)) {
        issues.push("「がは」는 부자연스러운 조사 결합입니다. 문맥에 맞게 「は」 또는 「が」로 수정해주세요.");
        fixed = fixed.replace(/がは/g, "は");
      }
      if (/はが/.test(fixed)) {
        issues.push("「はが」는 부자연스러운 조사 결합입니다. 「は」로 수정해주세요.");
        fixed = fixed.replace(/はが/g, "は");
      }
      if (/([にでをがはとからもへ])\1+/.test(fixed)) {
        issues.push("같은 조사가 연속으로 중복 사용되었어요.");
        fixed = fixed.replace(/([にでを가はとからもへ])\1+/g, "$1");
      }

      return {
        hasIssue: issues.length > 0,
        issues,
        fix: () => fixed,
      };
    },
  },

  // 2. 형용사 과거형 오류: い형용사 + でした (예: 美味しいでした ❌ → 美味しかったです ⭕)
  {
    id: "i-adjective-past-error",
    name: "い형용사 과거형 오류",
    check: (sentence) => {
      const issues: string[] = [];
      let fixed = sentence;

      // 흔한 い형용사 + でした 패턴
      const patterns: [RegExp, string, string][] = [
        [/いいでした/g, "よかったです", "좋았습니다"],
        [/良いでした/g, "よかったです", "좋았습니다"],
        [/美味しいでした/g, "美味しかったです", "맛있었습니다"],
        [/おいしいでした/g, "おいしかったです", "맛있었습니다"],
        [/楽しいでした/g, "楽しかったです", "즐거웠습니다"],
        [/たのしいでした/g, "たのしかったです", "즐거웠습니다"],
        [/嬉しいでした/g, "嬉しかったです", "기뻤습니다"],
        [/うれしいでした/g, "うれしかったです", "기뻤습니다"],
        [/面白いでした/g, "面白かったです", "재미있었습니다"],
        [/おもしろいでした/g, "おもしろかったです", "재미있었습니다"],
        [/暑いでした/g, "暑かったです", "더웠습니다"],
        [/あついでした/g, "あつかったです", "더웠습니다"],
        [/寒いでした/g, "寒かったです", "추웠습니다"],
        [/さむいでした/g, "さむかったです", "추웠습니다"],
        [/かわいいでした/g, "かわいかったです", "귀여웠습니다"],
        [/可愛いでした/g, "可愛かったです", "귀여웠습니다"],
        [/忙しいでした/g, "忙しかったです", "바빴습니다"],
        [/いそがしいでした/g, "いそがしかったです", "바빴습니다"],
        [/難しいでした/g, "難しかったです", "어려웠습니다"],
        [/むずかしいでした/g, "むずかしかったです", "어려웠습니다"],
        [/優しいでした/g, "優しかったです", "상냥했습니다 / 쉬웠습니다"],
        [/やすいでした/g, "やすかったです", "저렴했습니다 / 쉬웠습니다"],
        [/高いでした/g, "高かったです", "비쌌습니다 / 높았습니다"],
        [/たかいでした/g, "たかかったです", "비쌌습니다 / 높았습니다"],
        [/すごいでした/g, "すごかったです", "대단했습니다"],
        [/凄いでした/g, "凄かったです", "대단했습니다"],
        // 일반적 い형용사 + でした (한자/히라가나 + いでした)
        [/([ぁ-ん一-龥]+)いでした/g, "$1かったです", ""],
      ];

      for (const [regex, replacement] of patterns) {
        if (regex.test(fixed)) {
          issues.push(
            "い형용사의 과거형은 '〜い'를 빼고 '〜かったです'를 붙입니다. (예: 美味しいでした ❌ → 美味しかったです ⭕)"
          );
          fixed = fixed.replace(regex, replacement);
          break;
        }
      }

      return {
        hasIssue: issues.length > 0,
        issues,
        fix: () => fixed,
      };
    },
  },

  // 3. 형용사 부정형 오류: い형용사 + 옥상옥 (예: 美味しいくない ❌ → 美味しくない ⭕)
  {
    id: "i-adjective-negative-error",
    name: "い형용사 부정형 오류",
    check: (sentence) => {
      const issues: string[] = [];
      let fixed = sentence;

      if (/いいくない|良いくない/.test(fixed)) {
        issues.push("「いい」의 부정형은 「よくない」입니다.");
        fixed = fixed.replace(/(?:いい|良い)くない/g, "よくない");
      } else if (/([ぁ-ん一-龥]+)い(くない|くありません|くなかった)/.test(fixed)) {
        issues.push(
          "い형용사의 부정형은 '〜い'를 떼고 '〜くない'를 연결합니다. (예: 美味しいくない ❌ → 美味しくない ⭕)"
        );
        fixed = fixed.replace(/([ぁ-ん一-龥]+)い(くない|くありません|くなかった)/g, "$1$2");
      }

      return {
        hasIssue: issues.length > 0,
        issues,
        fix: () => fixed,
      };
    },
  },

  // 4. 감정/기호/능력 대상 조사 오류 (〜を好き ❌ → 〜が好き ⭕ 등)
  {
    id: "target-particle-error",
    name: "기호/능력 조사 오류",
    check: (sentence) => {
      const issues: string[] = [];
      let fixed = sentence;

      // を好き / をすき
      if (/([ぁ-んァ-ヶ一-龥]+)を(?:好|す)き/.test(fixed)) {
        issues.push("좋아하는 대상(好き) 앞에는 조사 「を」 대신 「が」를 씁니다. (예: 日本語を好き ❌ → 日本語が好き ⭕)");
        fixed = fixed.replace(/([ぁ-んァ-ヶ一-龥]+)を((?:好|す)き)/g, "$1が$2");
      }
      // を嫌い / をきらい
      if (/([ぁ-んァ-ヶ一-龥]+)를(?:嫌|きら)い/.test(fixed)) {
        issues.push("싫어하는 대상(嫌い) 앞에는 조사 「を」 대신 「가」를 씁니다.");
        fixed = fixed.replace(/([ぁ-んァ-ヶ一-龥]+)を((?:嫌|きら)い)/g, "$1が$2");
      }
      // を上手 / を下手 / を得意 / を苦手
      if (/([ぁ-んァ-ヶ一-龥]+)を(?:上|じょう)手/.test(fixed)) {
        issues.push("잘하는 대상(上手) 앞에는 조사 「が」를 씁니다. (예: 日本語を上手 ❌ → 日本語が上手 ⭕)");
        fixed = fixed.replace(/([ぁ-んァ-ヶ一-龥]+)を((?:上|じょう)手)/g, "$1が$2");
      }
      if (/([ぁ-んァ-ヶ一-龥]+)を(?:下|へ)手/.test(fixed)) {
        issues.push("서툰 대상(下手) 앞에는 조사 「が」를 씁니다.");
        fixed = fixed.replace(/([ぁ-んァ-ヶ一-龥]+)를((?:下|へ)手)/g, "$1が$2");
      }
      if (/([ぁ-んァ-ヶ一-龥]+)を(?:得意|苦手)/.test(fixed)) {
        issues.push("자신 있거나 서툰 대상(得意/苦手) 앞에는 조사 「が」를 씁니다.");
        fixed = fixed.replace(/([ぁ-んァ-ヶ一-龥]+)を(得意|苦手)/g, "$1が$2");
      }
      // を分かる / をわかります
      if (/([ぁ-んァ-ヶ一-龥]+)を(?:分か|わか)(?:る|ります|った|りました)/.test(fixed)) {
        issues.push("이해의 대상(分かる) 앞에는 보통 조사 「が」를 씁니다.");
        fixed = fixed.replace(/([ぁ-んァ-ヶ一-龥]+)を((?:分か|わか)(?:る|ります|った|りました))/g, "$1が$2");
      }
      // 을 만나다: を会う ❌ → に会う ⭕
      if (/([ぁ-んァ-ヶ一-龥]+)を(?:会|あ)(?:う|います|った|いました)/.test(fixed)) {
        issues.push("사람을 만날 때 일본어에서는 조사 「に」를 씁니다. (예: 友達を会う ❌ → 友達に会う ⭕)");
        fixed = fixed.replace(/([ぁ-んァ-ヶ一-龥]+)を((?:会|あ)(?:う|います|った|いました))/g, "$1に$2");
      }
      // 을 타다: を乗る ❌ → に乗る ⭕
      if (/([ぁ-んァ-ヶ一-龥]+)を(?:乗|の)(?:る|ります|った|りました)/.test(fixed)) {
        issues.push("교통수단을 탈 때는 조사 「に」를 씁니다. (예: 電車を乗る ❌ → 電車に乗る ⭕)");
        fixed = fixed.replace(/([ぁ-んァ-ヶ一-龥]+)を((?:乗|の)(?:る|ります|った|りました))/g, "$1に$2");
      }
      // 장소에 가다: を行く ❌ → に行く / へ行く ⭕
      if (/([ぁ-んァ-ヶ一-龥]+)を(?:行|い)(?:く|きます|った|きました)/.test(fixed)) {
        issues.push("목적지로 이동할 때는 조사 「に」 또는 「へ」를 씁니다. (예: 東京を行く ❌ → 東京に行く ⭕)");
        fixed = fixed.replace(/([ぁ-んァ-ヶ一-龥]+)を((?:行|い)(?:く|きます|った|きました))/g, "$1に$2");
      }

      return {
        hasIssue: issues.length > 0,
        issues,
        fix: () => fixed,
      };
    },
  },

  // 5. 과거 시제 불일치 (어제/오늘 일기인데 동사가 현재형인 경우)
  {
    id: "tense-past-mismatch",
    name: "과거 시제 불일치",
    check: (sentence, context) => {
      const issues: string[] = [];
      let fixed = sentence;

      const sentenceHasPast = /今日|昨日|きのう|先週|せんしゅう|さっき|この間|このあいだ|おととい|去年|先月/.test(sentence);
      const contextHasPast = /今日|昨日|きのう|先週|この間|おととい|日記|にっき/.test(context.title + " " + context.content);

      // 과거 맥락인데 문장이 현재형으로 끝나는 경우
      if (sentenceHasPast || contextHasPast) {
        // 〜ます -> 〜ました
        if (/(?<![ぁ-ん])ます([。！？]?)$/.test(fixed) || /ます[。！？]$/.test(fixed)) {
          issues.push("일기에서 이미 일어난 일은 동사를 과거형(〜ました)으로 표현하는 것이 자연스럽습니다.");
          fixed = fixed.replace(/ます([。！？]?)$/, "ました$1");
        }
        // 〜です -> 〜でした (명사/な형용사 단문)
        else if (/(?:天気|雨|晴れ|休み|仕事|テスト|日|暇|元気|大変)です([。！？]?)$/.test(fixed)) {
          issues.push("과거 상태를 나타낼 때는 '〜でした'로 작성해주세요.");
          fixed = fixed.replace(/です([。！？]?)$/, "でした$1");
        }
        // 특정 대표 기본형 동사들 -> 과거형 교정
        else if (/行きます([。！？]?)$/.test(fixed)) {
          issues.push("동사를 과거형(行きました)으로 수정해주세요.");
          fixed = fixed.replace(/行きます([。！？]?)$/, "行きました$1");
        } else if (/食べます([。！？]?)$/.test(fixed)) {
          issues.push("동사를 과거형(食べました)으로 수정해주세요.");
          fixed = fixed.replace(/食べます([。！？]?)$/, "食べました$1");
        } else if (/見ます([。！？]?)$/.test(fixed)) {
          issues.push("동사를 과거형(見ました)으로 수정해주세요.");
          fixed = fixed.replace(/見ます([。！？]?)$/, "見ました$1");
        } else if (/します([。！？]?)$/.test(fixed)) {
          issues.push("동사를 과거형(しました)으로 수정해주세요.");
          fixed = fixed.replace(/します([。！？]?)$/, "しました$1");
        }
      }

      return {
        hasIssue: issues.length > 0,
        issues,
        fix: () => fixed,
      };
    },
  },

  // 6. 보통체(だ/である/た) 혼용 시 정중체(です/ます)로 통일 권장 및 자동 교정
  {
    id: "politeness-style-consistency",
    name: "정중체(です/ます) 통일",
    check: (sentence, context) => {
      const issues: string[] = [];
      let fixed = sentence;

      const wholeText = context.content;
      const hasPolite = /です|ます|ました|でした/.test(wholeText);
      const hasPlainEnd = /(?:だ|だった|である|た|ない)([。！？]?)$/.test(sentence);

      // 전체적으로 です/ます체인데 특정 문장이 보통체로 끝난 경우
      if (hasPolite && hasPlainEnd) {
        if (/だ([。！？]?)$/.test(fixed) && !/んだ([。！？]?)$/.test(fixed)) {
          issues.push("です/ます체로 문체를 통일하기 위해 '〜だ'를 '〜です'로 수정합니다.");
          fixed = fixed.replace(/だ([。！？]?)$/, "です$1");
        } else if (/だった([。！？]?)$/.test(fixed)) {
          issues.push("입니다/했습니다 체 통일을 위해 '〜だった'를 '〜でした'로 수정합니다.");
          fixed = fixed.replace(/だった([。！？]?)$/, "でした$1");
        } else if (/楽しかった([。！？]?)$/.test(fixed)) {
          issues.push("정중체 통일을 위해 뒤에 'です'를 붙여주세요.");
          fixed = fixed.replace(/楽しかった([。！？]?)$/, "楽しかったです$1");
        } else if (/美味しかった([。！？]?)$/.test(fixed)) {
          issues.push("정중체 통일을 위해 뒤에 'です'를 붙여주세요.");
          fixed = fixed.replace(/美味しかった([。！？]?)$/, "美味しかったです$1");
        } else if (/よかった([。！？]?)$/.test(fixed)) {
          issues.push("정중체 통일을 위해 뒤에 'です'를 붙여주세요.");
          fixed = fixed.replace(/よかった([。！？]?)$/, "よかったです$1");
        } else if (/嬉しかった([。！？]?)$/.test(fixed)) {
          issues.push("정중체 통일을 위해 뒤에 'です'를 붙여주세요.");
          fixed = fixed.replace(/嬉しかった([。！？]?)$/, "嬉しかったです$1");
        }
      }

      return {
        hasIssue: issues.length > 0,
        issues,
        fix: () => fixed,
      };
    },
  },
];

/** 텍스트 길이 기반 기본 점수 */
function baseScore(text: string): number {
  const len = text.length;
  if (len < 10) return 60;
  if (len < 30) return 75;
  if (len < 60) return 85;
  if (len < 100) return 90;
  return 95;
}

/** 규칙 기반 리뷰 생성 */
export function ruleBasedReview(
  title: string,
  content: string
): TutorReviewResult {
  const sentences = splitSentences(content);
  const reviews: SentenceReview[] = [];
  const improvedSentences: string[] = [];

  const context = { title, content };

  for (const sentence of sentences) {
    let currentSentence = sentence;
    const sentenceIssues: string[] = [];

    for (const rule of SENTENCE_RULES) {
      const res = rule.check(currentSentence, context);
      if (res.hasIssue) {
        sentenceIssues.push(...res.issues);
        currentSentence = res.fix(currentSentence);
      }
    }

    if (sentenceIssues.length > 0) {
      reviews.push({
        original: sentence,
        issues: Array.from(new Set(sentenceIssues)),
        improved: currentSentence,
      });
      improvedSentences.push(currentSentence);
    } else {
      improvedSentences.push(sentence);
    }
  }

  const improvedText = improvedSentences.join(" ");

  // 점수 계산
  const base = baseScore(content);
  const penalty = reviews.reduce((acc, r) => acc + r.issues.length * 10, 0);
  const score = Math.max(30, Math.min(100, base - penalty));

  let overallComment = "";
  if (reviews.length === 0) {
    overallComment = `총 ${sentences.length}문장, ${content.length}자의 일기를 작성하셨네요! 문법과 표현이 모두 아주 자연스럽고 훌륭합니다. 👏 이대로 꾸준히 써보세요!`;
  } else {
    overallComment = `${reviews.length}개의 문장에서 문법·표현 수정 포인트를 발견했어요! 아래 첨삭 내용을 확인하고 개선안을 적용해보세요. ✨`;
  }

  return {
    overallScore: score,
    overallComment,
    reviews,
    improvedText: reviews.length > 0 ? improvedText : content,
  };
}

// ─── AI 기반 리뷰 (Gemini Flash API) ──────────────────────────

const GEMINI_BASE_URL =
  process.env.GEMINI_BASE_URL ??
  "https://generativelanguage.googleapis.com/v1beta";

/** Gemini REST API를 통한 AI 첨삭 호출 */
export async function aiBasedReview(
  title: string,
  content: string,
  providedKey?: string
): Promise<TutorReviewResult | null> {
  const apiKey =
    providedKey ||
    process.env.GOOGLE_API_KEY ||
    process.env.GEMINI_API_KEY;

  if (!apiKey) return null;

  const systemInstruction = `あなたはプロの日本語教師です。韓国語を母国語とする日本語学習者が書いた日記を丁寧に添削してください。

以下のJSONフォーマットのみを出力してください。Markdownバッククォート等の余計な文字は一切含めないでください。
{
  "overallScore": 0から100の整数,
  "overallComment": "全体的な総評と励まし（韓国語）",
  "reviews": [
    {
      "original": "学習者が書いた元の文",
      "issues": ["文法・語彙の問題点や、より自然な表現に関するアドバイス（韓国語）"],
      "improved": "修正・改善後の自然な日本語文",
      "improvedKo": "修正後の文の自然な韓国語訳"
    }
  ],
  "improvedText": "日記全体の修正・完成版（自然な日本語）"
}

添削ルール:
1. overallComment, issues, improvedKo は必ず親切でわかりやすい【韓国語】で記述すること。
2. 文法ミス、助詞の誤用、不自然な直訳表現、時制の不一致、敬体/常体の混在をしっかり見つけて修正すること。
3. 問題のない文は reviews に含めないこと。
4. 学習者のレベル（JLPT N5〜N3程度）に合わせた分かりやすく温かいフィードバックを提供すること。
5. improvedText は修正済みの文をすべて繋ぎ合わせた完全な日記テキストにすること。`;

  // 1. Gemini generateContent 엔드포인트 시도
  const models = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash"];

  for (const model of models) {
    try {
      const url = `${GEMINI_BASE_URL}/models/${model}:generateContent?key=${apiKey}`;
      const payload = {
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `${systemInstruction}\n\n【添削対象の日記】\nタイトル: ${title || "無題"}\n本文:\n${content}`,
              },
            ],
          },
        ],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.2,
        },
      };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        console.warn(`[diaryTutor] Gemini (${model}) failed with status ${res.status}`);
        continue;
      }

      const data = await res.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) continue;

      // Clean markdown code blocks if any
      const cleaned = rawText.replace(/^```json\s*/i, "").replace(/\s*```$/i, "").trim();
      const parsed = JSON.parse(cleaned) as TutorReviewResult;

      if (typeof parsed.overallScore === "number" && parsed.overallComment) {
        return {
          overallScore: parsed.overallScore,
          overallComment: parsed.overallComment,
          reviews: Array.isArray(parsed.reviews) ? parsed.reviews : [],
          improvedText: parsed.improvedText || content,
        };
      }
    } catch (err) {
      console.warn(`[diaryTutor] Error calling Gemini model ${model}:`, err);
    }
  }

  // 2. OpenAI 호환 엔드포인트 시도 (Fallback)
  try {
    const openAiUrl = "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions";
    const res = await fetch(openAiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gemini-2.5-flash",
        temperature: 0.2,
        messages: [
          { role: "system", content: systemInstruction },
          {
            role: "user",
            content: `タイトル: ${title || "無題"}\n\n本文:\n${content}`,
          },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (res.ok) {
      const data = await res.json();
      const contentStr = data.choices?.[0]?.message?.content;
      if (contentStr) {
        const cleaned = contentStr.replace(/^```json\s*/i, "").replace(/\s*```$/i, "").trim();
        const parsed = JSON.parse(cleaned) as TutorReviewResult;
        if (typeof parsed.overallScore === "number") {
          return {
            overallScore: parsed.overallScore,
            overallComment: parsed.overallComment,
            reviews: Array.isArray(parsed.reviews) ? parsed.reviews : [],
            improvedText: parsed.improvedText || content,
          };
        }
      }
    }
  } catch (err) {
    console.warn("[diaryTutor] OpenAI endpoint fallback failed:", err);
  }

  return null;
}
