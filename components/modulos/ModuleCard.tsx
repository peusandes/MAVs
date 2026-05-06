"use client";

import Link from "next/link";
import { Clock, ArrowUpRight, CheckCircle2 } from "lucide-react";
import type { Module } from "@/data/modules";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils/cn";

export function ModuleCard({
  module: m,
  completed,
  questionsCount,
  accuracy,
}: {
  module: Module;
  completed: boolean;
  questionsCount: number;
  accuracy?: number;
}) {
  return (
    <Link
      href={`/modulos/${m.slug}`}
      className={cn(
        "group relative glass rounded-2xl p-5 hover:border-brand-400/30 hover:shadow-glow transition-all flex flex-col gap-4 min-h-[220px]"
      )}
    >
      <div
        aria-hidden
        className="absolute -top-12 -right-10 w-40 h-40 rounded-full bg-brand-400/8 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"
      />
      <div className="flex items-start justify-between relative">
        <div>
          <div className="font-mono text-[11.5px] text-brand-400 mb-1.5">
            Módulo {String(m.number).padStart(2, "0")}
          </div>
          <h3 className="text-[16.5px] font-semibold leading-tight tracking-tight text-balance">
            {m.title}
          </h3>
        </div>
        {completed && (
          <Badge tone="success">
            <CheckCircle2 className="w-3 h-3" />
            Concluído
          </Badge>
        )}
      </div>

      <p className="text-[13px] text-ink-secondary leading-relaxed line-clamp-3 relative">
        {m.subtitle}
      </p>

      <div className="mt-auto relative">
        <div className="flex items-center gap-2 flex-wrap mb-3">
          {m.tags.slice(0, 3).map((t) => (
            <Badge key={t} tone="muted">
              {t}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between text-[11.5px] text-ink-muted">
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3 h-3" /> {m.readingMinutes} min · {questionsCount} questões
          </span>
          <span className="inline-flex items-center gap-1 text-brand-400 group-hover:translate-x-0.5 transition-transform">
            Abrir
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
        {typeof accuracy === "number" && accuracy > 0 && (
          <div className="mt-3 h-1.5 rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full bg-brand-gradient rounded-full"
              style={{ width: `${accuracy}%` }}
            />
          </div>
        )}
      </div>
    </Link>
  );
}
