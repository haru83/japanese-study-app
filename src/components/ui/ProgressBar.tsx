import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  className?: string;
  color?: "primary" | "grape" | "matcha";
}

export function ProgressBar({ value, className, color = "primary" }: ProgressBarProps) {
  return (
    <div className={cn("w-full bg-canvas-almond rounded-full h-3 border-2 border-black overflow-hidden", className)}>
      <div
        className={cn(
          "h-full rounded-full transition-all duration-500",
          color === "primary" && "bg-sakura-pink",
          color === "grape" && "bg-grape-punch",
          color === "matcha" && "bg-matcha-green",
        )}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
