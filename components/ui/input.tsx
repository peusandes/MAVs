import * as React from "react";
import { cn } from "@/lib/utils/cn";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "w-full h-10 px-3 rounded-xl bg-white/5 border border-border-soft text-sm text-ink-primary placeholder:text-ink-muted ring-focus hover:bg-white/8 transition-colors",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";
