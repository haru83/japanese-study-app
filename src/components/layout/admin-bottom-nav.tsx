"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ADMIN_NAV_ITEMS = [
  { href: "/admin/dashboard", icon: "dashboard", label: "대시보드" },
  { href: "/admin/users", icon: "group", label: "사용자" },
  { href: "/admin/keigo", icon: "school", label: "경어" },
  { href: "/admin/diary", icon: "book_2", label: "학습일기" },
  { href: "/admin/reports", icon: "flag", label: "신고" },
];

export function AdminBottomNav({ pendingReports = 0 }: { pendingReports?: number }) {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-paper-white border-t-4 border-black flex justify-around items-center pb-[calc(env(safe-area-inset-bottom)+8px)] pt-2 h-[72px] z-50">
      {ADMIN_NAV_ITEMS.map((item) => {
        const isActive = pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-label={item.label}
            className={`flex flex-col items-center justify-center w-1/5 shrink-0 transition-transform ${
              isActive ? "scale-105" : "scale-100 opacity-60"
            }`}
          >
            <div className="relative flex items-center justify-center h-7 w-7">
              <span
                aria-hidden="true"
                className="material-symbols-outlined text-2xl text-black select-none leading-none block"
                style={{
                  fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
                }}
              >
                {item.icon}
              </span>
              {item.href === '/admin/reports' && pendingReports > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border border-white text-white text-[9px] font-black flex items-center justify-center">
                  {pendingReports > 9 ? '9+' : pendingReports}
                </span>
              )}
            </div>
            <span
              className={`text-[11px] font-bold text-black leading-tight mt-0.5 truncate max-w-full ${
                isActive ? "" : "opacity-70"
              }`}
            >
              {item.label}
            </span>
            {isActive && (
              <div className="w-1.5 h-1.5 rounded-full bg-grape-punch border border-black mt-0.5" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
