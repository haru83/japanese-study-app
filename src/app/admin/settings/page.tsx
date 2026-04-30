import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminSettingsPage() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") redirect("/home");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-bg-dark">
      <div className="bg-white dark:bg-surface-dark px-5 pt-12 pb-5 shadow-sm">
        <h1 className="text-xl font-bold text-text-main dark:text-text-main-dark">
          관리자 설정
        </h1>
      </div>

      <div className="px-5 py-4 flex flex-col gap-3">
        {[
          { label: "앱 이름", value: "일본어 학습 앱" },
          { label: "버전", value: "1.0.0" },
          { label: "학습 스탬프 / 일기", value: "1개" },
          { label: "학습 스탬프 / 레슨", value: "1개" },
          { label: "일기 완료 XP", value: "10 XP" },
          { label: "레슨 완료 XP", value: "15 XP" },
          { label: "만점 보너스 XP", value: "5 XP" },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-white dark:bg-surface-dark rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-border-dark flex justify-between items-center"
          >
            <span className="text-text-sub text-sm">{item.label}</span>
            <span className="font-bold text-text-main dark:text-text-main-dark">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
