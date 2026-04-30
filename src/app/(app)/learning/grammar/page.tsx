const GRAMMAR_POINTS = [
  { form: "〜ます/〜ません", level: "초급", desc: "정중한 현재형과 부정형", example: "食べます・食べません" },
  { form: "〜ました/〜ませんでした", level: "초급", desc: "정중한 과거형과 과거부정형", example: "食べました・食べませんでした" },
  { form: "〜てください", level: "초급", desc: "정중한 부탁/요청", example: "見せてください" },
  { form: "〜ていただけますか", level: "중급", desc: "정중한 요청 (경어)", example: "教えていただけますか" },
  { form: "〜でしょうか", level: "중급", desc: "정중한 의문 표현", example: "よろしいでしょうか" },
  { form: "〜おります", level: "고급", desc: "겸양어 (います의 경어)", example: "こちらにおります" },
  { form: "〜いたします", level: "고급", desc: "겸양어 (します의 경어)", example: "ご連絡いたします" },
  { form: "〜いらっしゃいます", level: "고급", desc: "존경어 (います의 경어)", example: "社長がいらっしゃいます" },
];

const LEVEL_COLORS: Record<string, string> = {
  초급: "bg-green-100 text-green-700",
  중급: "bg-amber-100 text-amber-700",
  고급: "bg-red-100 text-red-700",
};

export default function GrammarPage() {
  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark">
      <div className="bg-white dark:bg-surface-dark px-5 pt-12 pb-5 shadow-sm">
        <h1 className="text-xl font-bold text-text-main dark:text-text-main-dark">
          문법 포인트 📚
        </h1>
        <p className="text-sm text-text-sub dark:text-text-sub-dark mt-0.5">
          경어와 정중 표현 정리
        </p>
      </div>

      <div className="px-5 py-4 flex flex-col gap-3">
        {GRAMMAR_POINTS.map((gp) => (
          <div
            key={gp.form}
            className="bg-white dark:bg-surface-dark rounded-2xl p-4 shadow-sm border border-orange-50 dark:border-border-dark"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-text-main dark:text-text-main-dark font-japanese">
                {gp.form}
              </span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${LEVEL_COLORS[gp.level]}`}
              >
                {gp.level}
              </span>
            </div>
            <p className="text-sm text-text-sub dark:text-text-sub-dark">{gp.desc}</p>
            <p className="text-sm mt-2 text-text-main dark:text-text-main-dark font-japanese">
              예: {gp.example}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
