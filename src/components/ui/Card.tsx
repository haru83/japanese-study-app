import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "bubble" | "wobbly" | "flat";
  wobble?: 1 | 2 | 3 | 4 | 5;
}

const WOBBLE_CLASS: Record<number, string> = {
  1: "wobbly-1",
  2: "wobbly-2",
  3: "wobbly-3",
  4: "wobbly-4",
  5: "wobbly-5",
};

export function Card({ children, className, onClick, variant = "flat", wobble }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-paper-white border-2 border-black",
        variant === "bubble" && "rounded-[144px] shadow-[0px_0px_0px_2px_#ffd80c]",
        variant === "wobbly" && "rounded-[15px] shadow-[4px_4px_0px_0px_#000]",
        variant === "flat" && "rounded-2xl shadow-[4px_4px_0px_0px_#000]",
        wobble && WOBBLE_CLASS[wobble],
        onClick && "cursor-pointer hover:scale-[1.02] transition-transform",
        className
      )}
    >
      {children}
    </div>
  );
}
