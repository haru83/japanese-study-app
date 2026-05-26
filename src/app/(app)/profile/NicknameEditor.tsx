"use client";

import { useState } from "react";
import { updateUserName } from "@/actions/user";
import { useRouter } from "next/navigation";

export default function NicknameEditor({ currentName }: { currentName: string }) {
  const [name, setName] = useState(currentName);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  async function handleSave() {
    const trimmed = name.trim();
    if (!trimmed || trimmed === currentName) {
      setEditing(false);
      setName(currentName);
      return;
    }
    setSaving(true);
    try {
      await updateUserName(trimmed);
      setEditing(false);
      router.refresh();
    } catch {
      setName(currentName);
    } finally {
      setSaving(false);
    }
  }

  if (editing) {
    return (
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
          maxLength={20}
          className="text-lg font-black text-type-black bg-paper-white border-2 border-black rounded-xl px-3 py-1 w-36 focus:outline-none focus:border-grape-punch"
          autoFocus
          disabled={saving}
        />
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-grape-punch text-white text-xs font-black px-3 py-1.5 rounded-xl border-2 border-black hover:shadow-[2px_2px_0px_0px_#000] transition-all disabled:opacity-50"
        >
          {saving ? "..." : "저장"}
        </button>
        <button
          onClick={() => { setEditing(false); setName(currentName); }}
          className="text-xs font-bold text-type-black/50 hover:text-type-black"
        >
          취소
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setEditing(true)}
      className="flex items-center gap-1.5 group"
    >
      <span className="text-lg font-black text-type-black">{currentName}</span>
      <span className="text-xs text-type-black/30 group-hover:text-type-black/60 transition-colors">✏️</span>
    </button>
  );
}
