import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number; // 0-100
  className?: string;
  color?: "primary" | "keigo";
}

export function ProgressBar({ value, className, color = "primary" }: ProgressBarProps) {
  return (
    <div className={cn("w-full bg-gray-100 dark:bg-border-dark rounded-full h-2", className)}>
      <div
        className={cn(
          "h-2 rounded-full transition-all duration-500",
          color === "primary" ? "bg-primary" : "bg-keigo"
        )}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
