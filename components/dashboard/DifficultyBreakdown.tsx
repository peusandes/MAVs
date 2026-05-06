"use client";

import { Sparkles, Flame, Mountain, type LucideIcon } from "lucide-react";

type Diff = { total: number; correct: number; pct: number };

export function DifficultyBreakdown({
  data,
}: {
  data: Record<"facil" | "medio" | "dificil", Diff>;
}) {
  const items: Array<{
    key: "facil" | "medio" | "dificil";
    label: string;
    icon: LucideIcon;
    accent: string;
    border: string;
  }> = [
    { key: "facil", label: "Fácil", icon: Sparkles, accent: "text-success", border: "border-success/25" },
    { key: "medio", label: "Médio", icon: Flame, accent: "text-warning", border: "border-warning/25" },
    { key: "dificil", label: "Difícil", icon: Mountain, accent: "text-danger", border: "border-danger/25" },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {items.map(({ key, label, icon: Icon, accent, border }) => {
        const d = data[key];
        return (
          <div
            key={key}
            className={`glass rounded-xl p-4 border ${border} hover:border-brand-400/30 transition-colors`}
          >
            <div className="flex items-center gap-2">
              <Icon className={`w-3.5 h-3.5 ${accent}`} />
              <span className="text-[12px] text-ink-secondary">{label}</span>
            </div>
            <div className="mt-3 text-[26px] font-mono font-semibold leading-none text-ink-primary">
              {d.pct}%
            </div>
            <div className="mt-2 text-[11px] text-ink-muted font-mono">
              {d.correct}/{d.total} questões
            </div>
          </div>
        );
      })}
    </div>
  );
}
