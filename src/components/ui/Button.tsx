import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "grape" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-bold transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-black",
          {
            "bg-sakura-pink text-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px]":
              variant === "primary",
            "bg-canvas-almond text-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px]":
              variant === "secondary",
            "bg-grape-punch text-white shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px]":
              variant === "grape",
            "bg-transparent border-transparent text-type-black hover:bg-sakura-pink/20":
              variant === "ghost",
            "bg-red-400 text-white shadow-[4px_4px_0px_0px_#000]":
              variant === "danger",
            "px-3 py-1.5 text-sm rounded-xl": size === "sm",
            "px-5 py-2.5 text-base rounded-2xl": size === "md",
            "px-6 py-3.5 text-lg w-full rounded-2xl": size === "lg",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
