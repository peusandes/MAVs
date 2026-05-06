"use client";

import * as React from "react";
import CountUp from "react-countup";
import { TrendingUp, TrendingDown, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function StatCard({
  icon: Icon,
  label,
  value,
  suffix,
  prefix,
  decimals = 0,
  trend,
  trendLabel,
  spark,
  accent = "blue",
}: {
  icon: LucideIcon;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  trend?: number;
  trendLabel?: string;
  spark?: number[];
  accent?: "blue" | "success" | "warning" | "danger";
}) {
  const accentMap = {
    blue: "text-brand-400 bg-brand-400/10",
    success: "text-success bg-success/10",
    warning: "text-warning bg-warning/10",
    danger: "text-danger bg-danger/10",
  };
  const trendUp = (trend ?? 0) >= 0;

  return (
    <div className="glass rounded-2xl p-5 transition-all hover:border-brand-400/30 hover:shadow-glow group">
      <div className="flex items-center justify-between">
        <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center", accentMap[accent])}>
          <Icon className="w-4 h-4" />
        </div>
        {typeof trend === "number" && (
          <div
            className={cn(
              "inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full border",
              trendUp
                ? "bg-success/10 text-success border-success/20"
                : "bg-danger/10 text-danger border-danger/20"
            )}
          >
            {trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {trendUp ? "+" : ""}
            {trend.toFixed(0)}%
          </div>
        )}
      </div>

      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-[34px] leading-none font-mono font-semibold text-ink-primary">
          {prefix}
          <CountUp end={value} duration={1.2} separator="." decimals={decimals} />
          {suffix}
        </span>
      </div>

      <div className="mt-2 flex items-center justify-between">
        <span className="text-[12.5px] text-ink-secondary">{label}</span>
        {trendLabel && <span className="text-[10.5px] text-ink-muted">{trendLabel}</span>}
      </div>

      {spark && spark.length > 1 && <Sparkline data={spark} className="mt-4" />}
    </div>
  );
}

function Sparkline({ data, className }: { data: number[]; className?: string }) {
  const w = 120;
  const h = 32;
  const max = Math.max(...data, 1);
  const step = w / Math.max(1, data.length - 1);
  const points = data
    .map((v, i) => `${(i * step).toFixed(1)},${(h - (v / max) * h).toFixed(1)}`)
    .join(" ");
  const id = React.useId().replace(/:/g, "");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={cn("w-full h-8", className)}>
      <defs>
        <linearGradient id={`spark-${id}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#5B9DFF" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#5B9DFF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        fill={`url(#spark-${id})`}
        stroke="none"
        points={`0,${h} ${points} ${w},${h}`}
      />
      <polyline fill="none" stroke="#5B9DFF" strokeWidth="1.5" points={points} />
    </svg>
  );
}
