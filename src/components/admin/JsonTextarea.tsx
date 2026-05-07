"use client";

import { useState } from "react";

interface Props {
  name: string;
  defaultValue: string;
  rows?: number;
}

export function JsonTextarea({ name, defaultValue, rows = 8 }: Props) {
  const [error, setError] = useState<string | null>(null);

  function validate(value: string) {
    try {
      JSON.parse(value);
      setError(null);
    } catch (e) {
      setError((e as SyntaxError).message);
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <textarea
        name={name}
        defaultValue={defaultValue}
        rows={rows}
        onChange={(e) => validate(e.target.value)}
        className={`w-full px-3 py-2 border-2 rounded-xl bg-paper-white font-mono text-xs resize-y ${
          error ? "border-red-500" : "border-black"
        }`}
      />
      {error && (
        <p className="text-xs text-red-600 font-bold px-1">⚠ {error}</p>
      )}
    </div>
  );
}
