"use client";

import * as React from "react";
import {
  Info,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  Sparkles,
  Star,
} from "lucide-react";
import type { ContentBlock } from "@/data/modules";
import { cn } from "@/lib/utils/cn";
import { SpetzlerMartinCalculator } from "./calculators/SpetzlerMartin";
import { LawtonYoungCalculator } from "./calculators/LawtonYoung";
import { VRASCalculator } from "./calculators/VRAS";
import { LifetimeRiskCalculator } from "./calculators/LifetimeRisk";

const calloutStyles = {
  info: { wrap: "bg-brand-400/8 border-brand-400/25", icon: Info, color: "text-brand-400" },
  warning: { wrap: "bg-warning/8 border-warning/25", icon: AlertTriangle, color: "text-warning" },
  success: { wrap: "bg-success/8 border-success/25", icon: CheckCircle2, color: "text-success" },
  danger: { wrap: "bg-danger/8 border-danger/25", icon: ShieldAlert, color: "text-danger" },
};

const statTones = {
  default: "text-ink-primary",
  blue: "text-brand-400",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
};

const barTones = {
  blue: "from-brand-800 via-brand-500 to-brand-400",
  success: "from-success/70 via-success to-success/90",
  warning: "from-warning/70 via-warning to-warning/90",
  danger: "from-danger/70 via-danger to-danger/90",
};

export function ContentRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </div>
  );
}

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="text-[14.5px] sm:text-[15px] leading-relaxed text-ink-primary/90">
          {block.text}
        </p>
      );

    case "subheading":
      return (
        <h3 className="text-[17px] sm:text-[18px] font-semibold tracking-tight pt-2 text-ink-primary">
          {block.text}
        </h3>
      );

    case "list": {
      const Tag = block.ordered ? "ol" : "ul";
      return (
        <Tag
          className={cn(
            "space-y-2 pl-1.5 text-[14px] sm:text-[14.5px] leading-relaxed text-ink-primary/90",
            block.ordered ? "list-decimal pl-5 marker:text-brand-400 marker:font-mono" : "list-none"
          )}
        >
          {block.items.map((item, i) => (
            <li key={i} className={cn(block.ordered ? "" : "flex gap-2.5")}>
              {!block.ordered && (
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-400 shrink-0" aria-hidden />
              )}
              <span>{item}</span>
            </li>
          ))}
        </Tag>
      );
    }

    case "keyPoints":
      return (
        <div className="rounded-2xl border border-brand-400/25 bg-brand-400/8 p-5 relative overflow-hidden">
          <div className="absolute -top-12 -right-10 w-40 h-40 rounded-full bg-brand-400/15 blur-3xl" aria-hidden />
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-4 h-4 text-brand-400" />
              <span className="text-[12px] uppercase tracking-widest font-semibold text-brand-400">
                {block.title ?? "Pontos-chave"}
              </span>
            </div>
            <ul className="space-y-2">
              {block.items.map((it, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[14px] text-ink-primary/95">
                  <Sparkles className="w-3.5 h-3.5 mt-1 shrink-0 text-brand-400" />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );

    case "callout": {
      const s = calloutStyles[block.tone];
      const Icon = s.icon;
      return (
        <div className={cn("rounded-2xl border p-4 flex gap-3", s.wrap)}>
          <Icon className={cn("w-5 h-5 mt-0.5 shrink-0", s.color)} />
          <div className="min-w-0">
            {block.title && <div className={cn("font-semibold text-[14px] mb-1", s.color)}>{block.title}</div>}
            <div className="text-[13.5px] leading-relaxed text-ink-primary/90">{block.text}</div>
          </div>
        </div>
      );
    }

    case "table":
      return (
        <div className="rounded-2xl border border-border-soft overflow-hidden">
          {block.caption && (
            <div className="px-4 py-2.5 bg-white/3 border-b border-border-soft text-[12px] text-ink-secondary">
              {block.caption}
            </div>
          )}
          <div className="overflow-x-auto">
            <table className="w-full text-[13.5px]">
              <thead>
                <tr className="text-left border-b border-border-soft bg-white/3">
                  {block.headers.map((h, i) => (
                    <th
                      key={i}
                      className="px-4 py-2.5 font-semibold text-ink-primary text-[11.5px] uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, ri) => (
                  <tr
                    key={ri}
                    className={cn(
                      "border-b border-border-soft last:border-b-0 transition-colors hover:bg-white/3",
                      block.highlight?.includes(ri) && "bg-brand-400/8"
                    )}
                  >
                    {row.map((cell, ci) => (
                      <td key={ci} className="px-4 py-2.5 text-ink-primary/90 align-top">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );

    case "stats":
      return (
        <div
          className={cn(
            "grid gap-2.5 sm:gap-3",
            block.items.length === 2
              ? "grid-cols-2"
              : block.items.length === 3
              ? "grid-cols-3"
              : "grid-cols-2 sm:grid-cols-4"
          )}
        >
          {block.items.map((s, i) => (
            <div key={i} className="glass rounded-xl p-3 sm:p-4">
              <div
                className={cn(
                  "font-mono text-xl sm:text-2xl font-semibold leading-none",
                  statTones[s.tone ?? "default"]
                )}
              >
                {s.value}
              </div>
              <div className="text-[11px] sm:text-[11.5px] text-ink-secondary mt-1.5">{s.label}</div>
            </div>
          ))}
        </div>
      );

    case "barChart": {
      const max = block.maxValue ?? Math.max(...block.data.map((d) => d.value));
      return (
        <div className="rounded-2xl border border-border-soft bg-white/3 p-4 sm:p-5">
          {block.title && (
            <div className="text-[13px] sm:text-[13.5px] font-semibold text-ink-primary mb-3">
              {block.title}
            </div>
          )}
          <div className="space-y-2.5">
            {block.data.map((d, i) => {
              const w = (d.value / max) * 100;
              return (
                <div
                  key={i}
                  className="grid grid-cols-[64px_1fr_44px] sm:grid-cols-[80px_1fr_60px] items-center gap-2 sm:gap-3"
                >
                  <span className="text-[11.5px] sm:text-[12.5px] text-ink-secondary truncate">
                    {d.label}
                  </span>
                  <div className="h-2.5 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full bg-gradient-to-r transition-all duration-700",
                        barTones[d.tone ?? "blue"]
                      )}
                      style={{ width: `${w}%` }}
                    />
                  </div>
                  <span className="text-[11.5px] sm:text-[12px] font-mono text-right text-ink-primary tabular-nums">
                    {d.value}%
                  </span>
                </div>
              );
            })}
          </div>
          {block.caption && (
            <div className="text-[11px] sm:text-[11.5px] text-ink-muted mt-3">{block.caption}</div>
          )}
        </div>
      );
    }

    case "calculator":
      switch (block.kind) {
        case "spetzler-martin":
          return <SpetzlerMartinCalculator />;
        case "lawton-young":
          return <LawtonYoungCalculator />;
        case "vras":
          return <VRASCalculator />;
        case "lifetime-risk":
          return <LifetimeRiskCalculator />;
        default:
          return null;
      }

    case "definition":
      return (
        <div className="rounded-xl border border-brand-400/20 bg-white/3 px-4 py-3">
          <div className="flex items-center gap-2 text-[11px] text-brand-400 uppercase tracking-widest font-semibold">
            <Sparkles className="w-3 h-3" /> Definição
          </div>
          <div className="mt-2 text-[15px]">
            <span className="font-semibold text-ink-primary">{block.term}.</span>{" "}
            <span className="text-ink-primary/85">{block.text}</span>
          </div>
        </div>
      );

    default:
      return null;
  }
}
