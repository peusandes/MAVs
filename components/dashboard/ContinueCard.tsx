"use client";

import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import type { Module } from "@/data/modules";

export function ContinueCard({ module: m, total, completed }: {
  module: Module;
  total: number;
  completed: number;
}) {
  const pct = total ? Math.round((completed / total) * 100) : 0;
  return (
    <div className="relative overflow-hidden rounded-2xl bg-brand-gradient text-white p-6 shadow-glow group">
      <div aria-hidden className="absolute -top-20 -right-16 w-56 h-56 rounded-full bg-white/15 blur-3xl" />
      <div aria-hidden className="absolute -bottom-16 -left-12 w-44 h-44 rounded-full bg-brand-400/30 blur-2xl" />
      <div className="relative">
        <div className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-widest text-white/80">
          <Sparkles className="w-3.5 h-3.5" /> Continue de onde parou
        </div>
        <h3 className="mt-3 text-2xl font-semibold leading-tight max-w-[80%] text-balance">
          {m.title}
        </h3>
        <p className="mt-2 text-[13px] text-white/80 max-w-[90%]">{m.subtitle}</p>

        <div className="mt-5 flex items-end justify-between">
          <div>
            <div className="text-[10.5px] uppercase tracking-widest text-white/70">Progresso geral</div>
            <div className="text-[28px] font-mono font-semibold leading-none mt-1">{pct}%</div>
            <div className="text-[11px] text-white/70 mt-1 font-mono">{completed}/{total} módulos</div>
          </div>
          <Link
            href={`/modulos/${m.slug}`}
            className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-white text-brand-800 font-semibold text-sm hover:bg-white/95 active:scale-[0.98] transition-all shadow-lg"
          >
            Abrir módulo
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
