import { ShibaAvatar } from "@/components/mascot/ShibaAvatar";

export default function Loading() {
  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="animate-bounce">
          <ShibaAvatar level={1} size={48} />
        </div>
        <p className="text-text-sub dark:text-text-sub-dark text-sm">로딩 중...</p>
      </div>
    </div>
  );
}
