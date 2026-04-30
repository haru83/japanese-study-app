import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "keigo" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-2xl font-bold transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
          {
            "bg-primary hover:bg-primary-hover text-text-main": variant === "primary",
            "bg-gray-100 hover:bg-gray-200 text-text-main dark:bg-border-dark dark:text-text-main-dark": variant === "secondary",
            "bg-keigo hover:bg-keigo-hover text-white": variant === "keigo",
            "bg-transparent hover:bg-gray-100 dark:hover:bg-border-dark text-text-sub": variant === "ghost",
            "bg-red-500 hover:bg-red-600 text-white": variant === "danger",
            "px-3 py-1.5 text-sm": size === "sm",
            "px-5 py-2.5 text-base": size === "md",
            "px-6 py-3.5 text-lg w-full": size === "lg",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
