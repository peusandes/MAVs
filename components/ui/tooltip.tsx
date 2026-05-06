"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";

export function Tooltip({
  content,
  children,
  className,
}: {
  content: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}
      {open && (
        <span
          role="tooltip"
          className={cn(
            "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 px-3 py-2 rounded-lg text-xs glass-strong text-ink-primary whitespace-pre-wrap min-w-[180px] max-w-[280px] shadow-xl animate-fade-in-up",
            className
          )}
        >
          {content}
        </span>
      )}
    </span>
  );
}
