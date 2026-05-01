"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/home", icon: "home", label: "홈" },
  { href: "/diary", icon: "book_2", label: "일기" },
  { href: "/keigo", icon: "record_voice_over", label: "경어" },
  { href: "/profile", icon: "face", label: "프로필" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-paper-white border-t-4 border-black flex justify-around items-end pb-[env(safe-area-inset-bottom)] pt-3 h-[85px] z-50">
      {NAV_ITEMS.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== "/home" && pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 w-1/4 pb-2 transition-transform ${
              isActive ? "scale-110" : "scale-100 opacity-50"
            }`}
          >
            <span
              className="material-symbols-outlined text-2xl text-black"
              style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
            >
              {item.icon}
            </span>
            <span className={`text-xs font-bold text-black ${isActive ? "" : "opacity-60"}`}>
              {item.label}
            </span>
            {isActive && (
              <div className="w-1.5 h-1.5 rounded-full bg-sakura-pink border border-black" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
