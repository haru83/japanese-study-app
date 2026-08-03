import React, { forwardRef } from "react";
import { clsx } from "clsx";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="text-xs font-black text-type-black tracking-tight">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={clsx(
            "w-full px-4 py-3 rounded-[15px] border-2 border-black bg-canvas-almond text-type-black placeholder:text-type-black/40 text-sm font-bold shadow-[2px_2px_0px_0px_#000] focus:outline-none focus:ring-2 focus:ring-sakura-pink transition-all disabled:opacity-50 disabled:cursor-not-allowed",
            error && "border-red-500 bg-red-50",
            className
          )}
          {...props}
        />
        {error && (
          <span className="text-xs font-bold text-red-500 mt-0.5">{error}</span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
