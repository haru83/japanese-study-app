import Link from "next/link";
import { getCompletedVocab } from "@/actions/learning";

export default async function VocabularyPage() {
  const vocab = await getCompletedVocab();

  return (
    <div className="min-h-screen bg-sakura-blush">
      <div className="bg-canvas-almond border-b-4 border-black px-5 pt-12 pb-5">
        <h1 className="text-xl font-black text-type-black">어휘 목록 📝</h1>
        <p className="text-sm text-type-black/60 font-bold mt-0.5">
          완료한 레슨·일기에서 수집된 단어
        </p>
      </div>

      <div className="px-5 py-4 flex flex-col gap-3 pb-24">
        {vocab.length === 0 ? (
          <div className="bg-paper-white rounded-[15px] p-6 border-2 border-black shadow-[4px_4px_0px_0px_#000] text-center flex flex-col gap-3">
            <p className="text-4xl">📝</p>
            <p className="font-black text-type-black">아직 수집된 단어가 없어요</p>
            <p className="text-sm text-type-black/60 font-bold">
              경어 레슨이나 학습 일기를 완료하면 단어장이 여기에 쌓여요!
            </p>
            <div className="flex gap-2 mt-1">
              <Link
                href="/keigo"
                className="flex-1 py-2.5 bg-grape-punch text-white text-sm font-black rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_#000] text-center"
              >
                경어 레슨 →
              </Link>
              <Link
                href="/diary/learn"
                className="flex-1 py-2.5 bg-sakura-pink text-black text-sm font-black rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_#000] text-center"
              >
                학습 일기 →
              </Link>
            </div>
          </div>
        ) : (
          vocab.map((v, i) => (
            <div
              key={i}
              className="bg-paper-white rounded-[15px] p-4 border-2 border-black shadow-[4px_4px_0px_0px_#000]"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="font-black text-type-black text-base">{v.word}</span>
                <span className="text-[10px] text-type-black/50 font-bold shrink-0 mt-0.5">
                  {v.source}
                </span>
              </div>
              {v.reading && (
                <p className="text-xs text-type-black/50 font-bold mt-0.5">{v.reading}</p>
              )}
              <p className="text-sm text-grape-punch font-black mt-1">{v.meaning}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
