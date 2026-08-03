"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/Button";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [showFurigana, setShowFurigana] = useState(true);

  useEffect(() => {
    // Load initial preferences from localStorage
    const savedTheme = localStorage.getItem("theme");
    const savedNoti = localStorage.getItem("notificationsEnabled");
    const savedFuri = localStorage.getItem("showFurigana");

    if (savedTheme === "dark" || document.documentElement.classList.contains("dark")) {
      setDarkMode(true);
    }
    if (savedNoti !== null) {
      setNotifications(savedNoti === "true");
    }
    if (savedFuri !== null) {
      setShowFurigana(savedFuri === "true");
    }
  }, []);

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const toggleNotifications = () => {
    const next = !notifications;
    setNotifications(next);
    localStorage.setItem("notificationsEnabled", String(next));
  };

  const toggleFurigana = () => {
    const next = !showFurigana;
    setShowFurigana(next);
    localStorage.setItem("showFurigana", String(next));
  };

  return (
    <div className="min-h-screen bg-sakura-blush px-5 pt-8 pb-12 flex flex-col">
      {/* Header */}
      <header className="flex items-center gap-3 mb-6">
        <Link
          href="/profile"
          className="p-2 rounded-full border-2 border-black bg-paper-white shadow-[2px_2px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] transition-all shrink-0"
          aria-label="프로필로 돌아가기"
        >
          <span className="material-symbols-outlined text-type-black text-xl leading-none block" aria-hidden="true">
            arrow_back
          </span>
        </Link>
        <div>
          <h1 className="text-xl font-black text-type-black flex items-center gap-2">
            <span className="material-symbols-outlined text-shiba-orange" aria-hidden="true" style={{ fontVariationSettings: "'FILL' 1" }}>
              settings
            </span>
            설정 ⚙️
          </h1>
          <p className="text-xs font-bold text-type-black/60">
            앱 환경 및 학습 옵션을 관리해요
          </p>
        </div>
      </header>

      {/* Settings list */}
      <div className="flex flex-col gap-4 mb-8">
        <div className="bg-paper-white rounded-[20px] border-2 border-black shadow-[4px_4px_0px_0px_#000] overflow-hidden">
          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between px-5 py-4 border-b-2 border-black">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-type-black text-2xl" aria-hidden="true">
                dark_mode
              </span>
              <div>
                <p className="font-black text-type-black text-sm">다크 모드</p>
                <p className="text-xs text-type-black/60 font-bold">화면 어둡게 표시</p>
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={darkMode}
              aria-label="다크 모드 토글"
              onClick={toggleDarkMode}
              className={`w-12 h-6 rounded-full border-2 border-black p-0.5 transition-colors relative ${
                darkMode ? "bg-grape-punch" : "bg-canvas-almond"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-paper-white border border-black shadow-sm transition-transform ${
                  darkMode ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Notifications Toggle */}
          <div className="flex items-center justify-between px-5 py-4 border-b-2 border-black">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-type-black text-2xl" aria-hidden="true">
                notifications
              </span>
              <div>
                <p className="font-black text-type-black text-sm">학습 리마인더 알림</p>
                <p className="text-xs text-type-black/60 font-bold">매일 일기 및 복습 알림 수신</p>
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={notifications}
              aria-label="학습 리마인더 알림 토글"
              onClick={toggleNotifications}
              className={`w-12 h-6 rounded-full border-2 border-black p-0.5 transition-colors relative ${
                notifications ? "bg-matcha-green" : "bg-canvas-almond"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-paper-white border border-black shadow-sm transition-transform ${
                  notifications ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Furigana Display Toggle */}
          <div className="flex items-center justify-between px-5 py-4">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-type-black text-2xl" aria-hidden="true">
                translate
              </span>
              <div>
                <p className="font-black text-type-black text-sm">후리가나(발음) 자동 표시</p>
                <p className="text-xs text-type-black/60 font-bold">한자 위에 히라가나 읽기 표시</p>
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={showFurigana}
              aria-label="후리가나 자동 표시 토글"
              onClick={toggleFurigana}
              className={`w-12 h-6 rounded-full border-2 border-black p-0.5 transition-colors relative ${
                showFurigana ? "bg-shiba-orange" : "bg-canvas-almond"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-paper-white border border-black shadow-sm transition-transform ${
                  showFurigana ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        {/* App Info Box */}
        <div className="bg-paper-white rounded-[20px] border-2 border-black shadow-[4px_4px_0px_0px_#000] p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-type-black/60 font-bold">앱 정보</p>
            <p className="font-black text-type-black text-base">왕왕 일본어 v1.0.0</p>
          </div>
          <span className="text-2xl">🐶</span>
        </div>
      </div>

      {/* Logout Button */}
      <div className="mt-auto">
        <Button
          variant="danger"
          size="lg"
          className="w-full"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          로그아웃
        </Button>
      </div>
    </div>
  );
}
