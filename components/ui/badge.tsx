import * as React from "react";
import { cn } from "@/lib/utils/cn";

type Tone = "default" | "blue" | "success" | "warning" | "danger" | "muted";

const tones: Record<Tone, string> = {
  default: "bg-white/5 text-ink-primary border-border-soft",
  blue: "bg-brand-400/10 text-brand-400 border-brand-400/20",
  success: "bg-success/10 text-success border-success/20",
  warning: "bg-warning/10 text-warning border-warning/25",
  danger: "bg-danger/10 text-danger border-danger/25",
  muted: "bg-white/3 text-ink-secondary border-border-soft",
};

export function Badge({
  tone = "default",
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border tracking-wide",
        tones[tone],
        className
      )}
      {...props}
    />
  );
}
