"use client";

import { useState } from "react";

interface LearningCalendarProps {
  studyDates?: string[];
  streakDays?: number;
}

const DAY_NAMES = ["일", "월", "화", "수", "목", "금", "토"];

export function LearningCalendar({ studyDates = [], streakDays = 0 }: LearningCalendarProps) {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth()); // 0-11

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const studyDateSet = new Set(studyDates);

  // Build calendar days array
  const calendarCells = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarCells.push(null);
  }

  let monthlyAttendedCount = 0;

  for (let day = 1; day <= daysInMonth; day++) {
    const monthStr = String(currentMonth + 1).padStart(2, "0");
    const dayStr = String(day).padStart(2, "0");
    const dateKey = `${currentYear}-${monthStr}-${dayStr}`;

    const isToday =
      today.getFullYear() === currentYear &&
      today.getMonth() === currentMonth &&
      today.getDate() === day;

    const attended = studyDateSet.has(dateKey);
    if (attended) monthlyAttendedCount++;

    calendarCells.push({ day, dateKey, isToday, attended });
  }

  return (
    <div className="bg-paper-white rounded-[15px] border-2 border-black shadow-[4px_4px_0px_0px_#000] p-5">
      {/* Month Navigation Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrevMonth}
          className="w-8 h-8 rounded-full border-2 border-black bg-canvas-almond font-black text-type-black flex items-center justify-center shadow-[1px_1px_0px_0px_#000] active:translate-y-[1px]"
        >
          ‹
        </button>
        <div className="text-center">
          <h3 className="font-black text-type-black text-base">
            {currentYear}년 {currentMonth + 1}월 📅
          </h3>
          <p className="text-[11px] font-bold text-type-black/60 mt-0.5">
            이번 달 <span className="text-matcha-green font-black">{monthlyAttendedCount}일</span> 출석 달성!
          </p>
        </div>
        <button
          onClick={handleNextMonth}
          className="w-8 h-8 rounded-full border-2 border-black bg-canvas-almond font-black text-type-black flex items-center justify-center shadow-[1px_1px_0px_0px_#000] active:translate-y-[1px]"
        >
          ›
        </button>
      </div>

      {/* Day of Week Headers */}
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {DAY_NAMES.map((name, idx) => (
          <span
            key={name}
            className={`text-xs font-black ${
              idx === 0 ? "text-red-500" : idx === 6 ? "text-blue-500" : "text-type-black/60"
            }`}
          >
            {name}
          </span>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1.5">
        {calendarCells.map((cell, idx) => {
          if (!cell) {
            return <div key={`empty-${idx}`} className="h-10" />;
          }

          return (
            <div
              key={cell.dateKey}
              className={`h-10 rounded-xl border-2 flex flex-col items-center justify-center relative transition-all ${
                cell.isToday
                  ? "border-shiba-orange bg-shiba-orange/10 font-black shadow-[1px_1px_0px_0px_#ffa54f]"
                  : cell.attended
                  ? "border-black bg-matcha-green/20 text-type-black shadow-[2px_2px_0px_0px_#000]"
                  : "border-black/10 bg-canvas-almond/20 text-type-black/40"
              }`}
            >
              <span className="text-[10px] font-black leading-none">{cell.day}</span>
              {cell.attended && (
                <span className="text-xs mt-0.5 animate-bounce leading-none" title="출석 완료!">
                  🐾
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary Footer */}
      <div className="mt-4 pt-3 border-t-2 border-black/10 flex items-center justify-between text-xs font-bold text-type-black">
        <span className="flex items-center gap-1.5">
          <span className="text-sm">🔥</span> 연속 학습: <span className="font-black text-shiba-orange">{streakDays}일째</span>
        </span>
        <span className="flex items-center gap-1 text-[11px] text-type-black/60">
          <span className="w-2.5 h-2.5 rounded-full bg-matcha-green/40 border border-black inline-block" /> 출석일 (🐾)
        </span>
      </div>
    </div>
  );
}
