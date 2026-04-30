"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/Button";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark">
      <div className="bg-white dark:bg-surface-dark px-5 pt-12 pb-5 shadow-sm">
        <h1 className="text-xl font-bold text-text-main dark:text-text-main-dark">
          설정 ⚙️
        </h1>
      </div>

      <div className="px-5 py-4 flex flex-col gap-4">
        <div className="bg-white dark:bg-surface-dark rounded-2xl overflow-hidden shadow-sm border border-orange-50 dark:border-border-dark">
          {[
            { label: "알림 설정", desc: "학습 리마인더", icon: "notifications" },
            { label: "다크 모드", desc: "테마 변경", icon: "dark_mode" },
            { label: "언어 설정", desc: "한국어", icon: "language" },
          ].map((item, i) => (
            <div
              key={item.label}
              className={`flex items-center gap-4 px-5 py-4 ${
                i < 2 ? "border-b border-gray-50 dark:border-border-dark" : ""
              }`}
            >
              <span className="material-symbols-outlined text-text-sub">{item.icon}</span>
              <div className="flex-1">
                <p className="font-medium text-text-main dark:text-text-main-dark text-sm">
                  {item.label}
                </p>
                <p className="text-xs text-text-sub dark:text-text-sub-dark">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-surface-dark rounded-2xl overflow-hidden shadow-sm border border-orange-50 dark:border-border-dark">
          <div className="px-5 py-4">
            <p className="text-sm text-text-sub dark:text-text-sub-dark mb-1">앱 버전</p>
            <p className="font-medium text-text-main dark:text-text-main-dark">v1.0.0</p>
          </div>
        </div>

        <Button
          variant="danger"
          size="lg"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          로그아웃
        </Button>
      </div>
    </div>
  );
}
