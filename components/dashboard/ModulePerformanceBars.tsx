"use client";

import { modules } from "@/data/modules";
import type { ModuleStats } from "@/lib/utils/stats";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

function tone(pct: number, total: number) {
  if (total === 0) return "bg-white/8";
  if (pct >= 80) return "bg-success";
  if (pct >= 50) return "bg-warning";
  return "bg-danger";
}

export function ModulePerformanceBars({ stats }: { stats: ModuleStats[] }) {
  return (
    <div className="space-y-2.5">
      {stats.map((s) => {
        const m = modules.find((mod) => mod.slug === s.slug);
        if (!m) return null;
        const width = s.total === 0 ? 4 : Math.max(s.pct, 4);
        return (
          <Link
            href={`/modulos/${s.slug}`}
            key={s.slug}
            className="block group rounded-xl px-3 py-2 hover:bg-white/3 transition-colors"
          >
            <div className="flex items-center justify-between text-[12.5px] mb-1.5">
              <span className="text-ink-primary font-medium truncate">
                <span className="text-ink-muted font-mono mr-2">{String(m.number).padStart(2, "0")}</span>
                {m.title}
              </span>
              <span className="font-mono text-ink-secondary tabular-nums">
                {s.total > 0 ? `${s.pct}% · ${s.correct}/${s.total}` : "—"}
              </span>
            </div>
            <div className="relative h-1.5 rounded-full bg-white/5 overflow-hidden">
              <div
                className={`absolute inset-y-0 left-0 rounded-full transition-all duration-700 ${tone(
                  s.pct,
                  s.total
                )}`}
                style={{ width: `${width}%` }}
              />
            </div>
          </Link>
        );
      })}
      <div className="pt-2">
        <Link
          href="/modulos"
          className="inline-flex items-center gap-1 text-[12px] text-brand-400 hover:text-brand-300"
        >
          Ver todos os módulos <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
