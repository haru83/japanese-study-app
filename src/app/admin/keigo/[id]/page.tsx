import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { upsertKeigoLesson, deleteKeigoLesson } from "@/actions/admin-content";

export default async function AdminKeigoEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isNew = id === "new";

  const lesson = isNew
    ? null
    : await prisma.keigoLesson.findUnique({ where: { id } });

  if (!isNew && !lesson) notFound();

  const defaultId = isNew ? `keigo-${Date.now()}` : lesson!.id;

  async function handleSave(formData: FormData) {
    "use server";
    await upsertKeigoLesson({
      id: formData.get("id") as string,
      title: formData.get("title") as string,
      category: formData.get("category") as string,
      thumbnail: formData.get("thumbnail") as string,
      dialogue: formData.get("dialogue") as string,
      grammarPoints: formData.get("grammarPoints") as string,
      vocab: formData.get("vocab") as string,
      quiz: formData.get("quiz") as string,
      sortOrder: parseInt(formData.get("sortOrder") as string, 10) || 0,
      isActive: formData.get("isActive") === "true",
    });
    redirect("/admin/keigo");
  }

  async function handleDelete() {
    "use server";
    await deleteKeigoLesson(id);
    redirect("/admin/keigo");
  }

  const pretty = (val: string) => {
    try {
      return JSON.stringify(JSON.parse(val), null, 2);
    } catch {
      return val;
    }
  };

  return (
    <div className="min-h-screen bg-sakura-blush">
      <div className="bg-canvas-almond border-b-4 border-black px-5 pt-12 pb-5">
        <h1 className="text-xl font-black text-type-black">
          {isNew ? "경어 레슨 추가" : "경어 레슨 편집"}
        </h1>
        <p className="text-sm text-type-black/60 font-bold">{defaultId}</p>
      </div>

      <form action={handleSave} className="px-5 py-4 flex flex-col gap-4 pb-24">
        {/* Basic fields */}
        <input type="hidden" name="id" value={defaultId} />

        <Field label="제목">
          <input
            name="title"
            defaultValue={lesson?.title ?? ""}
            required
            className="w-full px-3 py-2 border-2 border-black rounded-xl bg-paper-white font-bold text-sm"
          />
        </Field>

        <Field label="카테고리">
          <select
            name="category"
            defaultValue={lesson?.category ?? "business"}
            className="w-full px-3 py-2 border-2 border-black rounded-xl bg-paper-white font-bold text-sm"
          >
            <option value="business">비즈니스</option>
            <option value="hospitality">서비스/접객</option>
            <option value="social">사교</option>
          </select>
        </Field>

        <Field label="썸네일 (이모지)">
          <input
            name="thumbnail"
            defaultValue={lesson?.thumbnail ?? "🎯"}
            className="w-full px-3 py-2 border-2 border-black rounded-xl bg-paper-white font-bold text-sm"
          />
        </Field>

        <Field label="정렬 순서">
          <input
            name="sortOrder"
            type="number"
            defaultValue={lesson?.sortOrder ?? 0}
            className="w-full px-3 py-2 border-2 border-black rounded-xl bg-paper-white font-bold text-sm"
          />
        </Field>

        <Field label="활성 여부">
          <select
            name="isActive"
            defaultValue={lesson?.isActive !== false ? "true" : "false"}
            className="w-full px-3 py-2 border-2 border-black rounded-xl bg-paper-white font-bold text-sm"
          >
            <option value="true">활성</option>
            <option value="false">비활성</option>
          </select>
        </Field>

        {/* JSON fields */}
        <JsonField label="대화 (dialogue)" name="dialogue" value={lesson?.dialogue ?? "[]"} pretty={pretty} />
        <JsonField label="문법 포인트 (grammarPoints)" name="grammarPoints" value={lesson?.grammarPoints ?? "[]"} pretty={pretty} />
        <JsonField label="어휘 (vocab)" name="vocab" value={lesson?.vocab ?? "[]"} pretty={pretty} />
        <JsonField label="퀴즈 (quiz)" name="quiz" value={lesson?.quiz ?? "[]"} pretty={pretty} />

        <div className="flex gap-3 mt-2">
          <button
            type="submit"
            className="flex-1 py-3 bg-grape-punch text-white font-black rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_#000]"
          >
            저장
          </button>
          {!isNew && (
            <form action={handleDelete}>
              <button
                type="submit"
                className="px-6 py-3 bg-red-500 text-white font-black rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_#000]"
                onClick={(e) => {
                  if (!confirm("정말 삭제하시겠습니까?")) e.preventDefault();
                }}
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

function JsonField({
  label, name, value, pretty,
}: {
  label: string;
  name: string;
  value: string;
  pretty: (v: string) => string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-black text-type-black/70">{label}</label>
      <textarea
        name={name}
        defaultValue={pretty(value)}
        rows={8}
        className="w-full px-3 py-2 border-2 border-black rounded-xl bg-paper-white font-mono text-xs resize-y"
      />
    </div>
  );
}
