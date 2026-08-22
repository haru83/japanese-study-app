"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/home", icon: "home", label: "홈" },
  { href: "/diary", icon: "book_2", label: "일기" },
  { href: "/keigo", icon: "record_voice_over", label: "경어" },
  { href: "/learning", icon: "menu_book", label: "어휘" },
  { href: "/entertainment", icon: "movie", label: "엔터" },
  { href: "/community", icon: "people", label: "커뮤니티" },
  { href: "/profile", icon: "face", label: "프로필" },
];

export function BottomNav({ unreadCount = 0 }: { unreadCount?: number }) {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-paper-white border-t-4 border-black z-50 pb-[env(safe-area-inset-bottom,0px)]">
      <div className="flex justify-around items-center h-16 px-1">
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/home" && pathname.startsWith(item.href));
          const showBadge = item.href === "/community" && unreadCount > 0;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              className={`flex flex-col items-center justify-center flex-1 min-w-0 px-0.5 shrink-0 transition-transform ${
                isActive ? "scale-105" : "scale-100 opacity-60"
              }`}
            >
              <div className="relative flex items-center justify-center h-7 w-7 overflow-hidden">
                <span
                  aria-hidden="true"
                  className="material-symbols-outlined text-2xl text-black select-none leading-none block"
                  style={{
                    fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
                  }}
                >
                  {item.icon}
                </span>
                {showBadge && (
                  <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border border-white" />
                )}
              </div>
              <span
                className={`text-[10px] font-bold text-black leading-tight mt-0.5 truncate max-w-full ${isActive ? "" : "opacity-70"}`}
              >
                {item.label}
              </span>
              {isActive && (
                <div className="w-1.5 h-1.5 rounded-full bg-sakura-pink border border-black mt-0.5" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
