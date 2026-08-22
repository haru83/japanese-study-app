"use client";

import { signOut } from "next-auth/react";

export function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: `${window.location.origin}/login` })}
      className="flex items-center gap-4 px-5 py-4 w-full text-left hover:bg-sakura-blush/50 transition-colors border-b-2 border-black"
    >
      <span className="text-2xl">🚪</span>
      <div className="flex-1">
        <p className="text-sm font-black text-type-black">로그아웃</p>
        <p className="text-xs text-type-black/60 font-bold">계정에서 로그아웃</p>
      </div>
      <span className="text-type-black/30">→</span>
    </button>
  );
}
