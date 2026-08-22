"use client";

import { useState } from "react";
import { resolveReport, deleteReportTarget, setDiaryPrivate } from "@/actions/admin";

interface ReportProps {
  id: string;
  targetType: string;
  targetId: string;
  reason: string | null;
  createdAt: Date;
  reporter: {
    id: string;
    name: string | null;
    email: string | null;
    _count: { reports: number };
  };
  preview: string | null;
  previewTitle: string | null;
}

export default function ReportCard({ report }: { report: ReportProps }) {
  const [adminNote, setAdminNote] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResolve = async () => {
    setLoading(true);
    try {
      await resolveReport(report.id, adminNote);
    } catch {
      alert("오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    setLoading(true);
    try {
      await deleteReportTarget(report.id, report.targetType, report.targetId, adminNote);
    } catch {
      alert("오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handlePrivate = async () => {
    setLoading(true);
    try {
      await setDiaryPrivate(report.id, report.targetId, adminNote);
    } catch {
      alert("오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border-2 border-black rounded-[15px] p-4 shadow-[4px_4px_0px_0px_#000] mb-4 text-black">
      <div className="mb-3 border-b-2 border-black pb-3">
        <h3 className="font-black text-lg mb-1">
          [{report.targetType}] 신고 사유: {report.reason || "없음"}
        </h3>
        <p className="text-sm font-bold">
          신고자: {report.reporter.name || report.reporter.email} (전체 {report.reporter._count.reports}건 신고한 유저)
        </p>
        <p className="text-xs text-gray-600 mt-1">
          {new Date(report.createdAt).toLocaleString("ko-KR")}
        </p>
      </div>

      <div className="mb-3 border-b-2 border-black pb-3">
        {report.previewTitle && (
          <h4 className="font-bold mb-1">피리뷰: {report.previewTitle}</h4>
        )}
        <p className="text-sm text-gray-800 break-words whitespace-pre-wrap">
          {report.preview ? report.preview : "콘텐츠를 찾을 수 없습니다."}
        </p>
      </div>

      <div className="mb-4">
        <textarea
          value={adminNote}
          onChange={(e) => setAdminNote(e.target.value)}
          placeholder="관리자 메모 (선택)"
          className="w-full p-2 border-2 border-black rounded-[15px] text-sm focus:outline-none focus:ring-2 focus:ring-[#FFB6C1] resize-none h-20 bg-white"
          disabled={loading}
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleResolve}
          disabled={loading}
          className="flex-1 bg-[#F5F5DC] border-2 border-black rounded-[15px] py-2 font-black shadow-[2px_2px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all disabled:opacity-50"
        >
          무시
        </button>
        {report.targetType === "diary" && (
          <button
            onClick={handlePrivate}
            disabled={loading}
            className="flex-1 bg-[#FFB6C1] border-2 border-black rounded-[15px] py-2 font-black shadow-[2px_2px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all disabled:opacity-50"
          >
            비공개
          </button>
        )}
        <button
          onClick={handleDelete}
          disabled={loading}
          className="flex-1 bg-red-400 text-white border-2 border-black rounded-[15px] py-2 font-black shadow-[2px_2px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all disabled:opacity-50"
        >
          삭제
        </button>
      </div>
    </div>
  );
}
