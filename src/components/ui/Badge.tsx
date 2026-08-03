import React from "react";
import { clsx } from "clsx";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "pink" | "orange" | "grape" | "matcha" | "white" | "outline";
  size?: "sm" | "md";
}

export function Badge({
  className,
  variant = "pink",
  size = "md",
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    pink: "bg-sakura-pink text-type-black border-black",
    orange: "bg-shiba-orange text-type-black border-black",
    grape: "bg-grape-punch text-white border-black",
    matcha: "bg-matcha-green text-type-black border-black",
    white: "bg-paper-white text-type-black border-black",
    outline: "bg-transparent text-type-black border-black/40",
  };

  const sizeStyles = {
    sm: "text-[10px] font-black px-2 py-0.5 rounded-full border",
    md: "text-xs font-black px-3 py-1 rounded-full border-2",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center justify-center tracking-tight shrink-0 select-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
