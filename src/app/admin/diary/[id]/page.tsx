import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { upsertLearningDiaryEntry, deleteLearningDiaryEntry } from "@/actions/admin-content";
import { DIARY_CATEGORIES } from "@/types/learningDiary";
import { JsonTextarea } from "@/components/admin/JsonTextarea";

export default async function AdminDiaryEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isNew = id === "new";

  const entry = isNew
    ? null
    : await prisma.learningDiaryEntry.findUnique({ where: { id } });

  if (!isNew && !entry) notFound();

  const defaultId = isNew ? `ld-${Date.now()}` : entry!.id;

  async function handleSave(formData: FormData) {
    "use server";
    await upsertLearningDiaryEntry({
      id: formData.get("id") as string,
      title: formData.get("title") as string,
      titleKo: formData.get("titleKo") as string,
      category: formData.get("category") as string,
      level: formData.get("level") as string,
      thumbnail: formData.get("thumbnail") as string,
      contentJp: formData.get("contentJp") as string,
      contentKo: formData.get("contentKo") as string,
      vocabulary: formData.get("vocabulary") as string,
      grammarPoints: formData.get("grammarPoints") as string,
      quiz: formData.get("quiz") as string,
      sortOrder: parseInt(formData.get("sortOrder") as string, 10) || 0,
      isActive: formData.get("isActive") === "true",
    });
    redirect("/admin/diary");
  }

  async function handleDelete() {
    "use server";
    await deleteLearningDiaryEntry(id);
    redirect("/admin/diary");
  }

  const pretty = (val: string) => {
    try {
      return JSON.stringify(JSON.parse(val), null, 2);
    } catch {
      return val;
    }
  };

  const CATEGORIES = DIARY_CATEGORIES;

  return (
    <div className="min-h-screen bg-sakura-blush">
      <div className="bg-canvas-almond border-b-4 border-black px-5 pt-12 pb-5">
        <h1 className="text-xl font-black text-type-black">
          {isNew ? "학습 일기 추가" : "학습 일기 편집"}
        </h1>
        <p className="text-sm text-type-black/60 font-bold">{defaultId}</p>
      </div>

      <form action={handleSave} className="px-5 py-4 flex flex-col gap-4 pb-24">
        <input type="hidden" name="id" value={defaultId} />

        <Field label="제목 (일본어)">
          <input
            name="title"
            defaultValue={entry?.title ?? ""}
            required
            className="w-full px-3 py-2 border-2 border-black rounded-xl bg-paper-white font-bold text-sm"
          />
        </Field>

        <Field label="제목 (한국어)">
          <input
            name="titleKo"
            defaultValue={entry?.titleKo ?? ""}
            required
            className="w-full px-3 py-2 border-2 border-black rounded-xl bg-paper-white font-bold text-sm"
          />
        </Field>

        <Field label="카테고리">
          <select
            name="category"
            defaultValue={entry?.category ?? "일상"}
            className="w-full px-3 py-2 border-2 border-black rounded-xl bg-paper-white font-bold text-sm"
          >
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>

        <Field label="레벨">
          <select
            name="level"
            defaultValue={entry?.level ?? "초급"}
            className="w-full px-3 py-2 border-2 border-black rounded-xl bg-paper-white font-bold text-sm"
          >
            <option value="초급">초급</option>
            <option value="중급">중급</option>
            <option value="고급">고급</option>
          </select>
        </Field>

        <Field label="썸네일 (이모지)">
          <input
            name="thumbnail"
            defaultValue={entry?.thumbnail ?? "📖"}
            className="w-full px-3 py-2 border-2 border-black rounded-xl bg-paper-white font-bold text-sm"
          />
        </Field>

        <Field label="정렬 순서">
          <input
            name="sortOrder"
            type="number"
            defaultValue={entry?.sortOrder ?? 0}
            className="w-full px-3 py-2 border-2 border-black rounded-xl bg-paper-white font-bold text-sm"
          />
        </Field>

        <Field label="활성 여부">
          <select
            name="isActive"
            defaultValue={entry?.isActive !== false ? "true" : "false"}
            className="w-full px-3 py-2 border-2 border-black rounded-xl bg-paper-white font-bold text-sm"
          >
            <option value="true">활성</option>
            <option value="false">비활성</option>
          </select>
        </Field>

        <Field label="한국어 본문 (contentKo)">
          <textarea
            name="contentKo"
            defaultValue={entry?.contentKo ?? ""}
            rows={5}
            className="w-full px-3 py-2 border-2 border-black rounded-xl bg-paper-white text-sm resize-y"
          />
        </Field>

        <JsonLabeledField label="일본어 본문 (contentJp) — RubySegment[]">
          <JsonTextarea name="contentJp" defaultValue={pretty(entry?.contentJp ?? "[]")} rows={10} />
        </JsonLabeledField>
        <JsonLabeledField label="어휘 (vocabulary)">
          <JsonTextarea name="vocabulary" defaultValue={pretty(entry?.vocabulary ?? "[]")} rows={8} />
        </JsonLabeledField>
        <JsonLabeledField label="문법 포인트 (grammarPoints)">
          <JsonTextarea name="grammarPoints" defaultValue={pretty(entry?.grammarPoints ?? "[]")} rows={6} />
        </JsonLabeledField>
        <JsonLabeledField label="퀴즈 (quiz)">
          <JsonTextarea name="quiz" defaultValue={pretty(entry?.quiz ?? "[]")} rows={8} />
        </JsonLabeledField>

        <div className="flex gap-3 mt-2">
          <button
            type="submit"
            className="flex-1 py-3 bg-sakura-pink text-black font-black rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_#000]"
          >
            저장
          </button>
          {!isNew && (
            <form action={handleDelete}>
              <button
                type="submit"
                className="px-6 py-3 bg-red-500 text-white font-black rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_#000]"
              >
                삭제
              </button>
            </form>
          )}
        </div>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-black text-type-black/70">{label}</label>
      {children}
    </div>
  );
}

function JsonLabeledField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-black text-type-black/70">{label}</label>
      {children}
    </div>
  );
}
