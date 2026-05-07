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

export function AdminBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white dark:bg-surface-dark border-t border-gray-100 dark:border-border-dark flex justify-around items-end pb-[env(safe-area-inset-bottom)] pt-3 h-[85px] z-50 rounded-t-3xl shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.05)]">
      {ADMIN_NAV_ITEMS.map((item) => {
        const isActive = pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 w-1/5 pb-2 group ${
              isActive ? "text-primary" : "text-gray-400 hover:text-gray-500"
            }`}
          >
            <span
              className="material-symbols-outlined text-2xl"
              style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
            >
              {item.icon}
            </span>
            <span className={`text-xs font-medium ${isActive ? "font-bold" : ""}`}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
