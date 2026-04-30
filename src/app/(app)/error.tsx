"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark flex flex-col items-center justify-center gap-4 px-6">
      <div className="text-6xl">😕</div>
      <h2 className="text-xl font-bold text-text-main dark:text-text-main-dark">
        오류가 발생했습니다
      </h2>
      <p className="text-sm text-text-sub dark:text-text-sub-dark text-center">
        {error.message}
      </p>
      <button
        onClick={reset}
        className="bg-primary hover:bg-primary-hover text-text-main font-bold px-6 py-3 rounded-2xl"
      >
        다시 시도
      </button>
    </div>
  );
}
