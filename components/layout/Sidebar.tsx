"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, Sparkles, Activity } from "lucide-react";
import { primaryNav } from "@/data/navigation";
import { modules } from "@/data/modules";
import { useProgress } from "@/lib/store/progress";
import { cn } from "@/lib/utils/cn";

export function Sidebar() {
  const pathname = usePathname();
  const completed = useProgress((s) => s.completedModules);
  const totalAnswers = useProgress((s) => Object.keys(s.answers).length);
  const correctAnswers = useProgress(
    (s) => Object.values(s.answers).filter((a) => a.correct).length
  );
  const [modulesOpen, setModulesOpen] = React.useState(true);

  const accuracy = totalAnswers ? Math.round((correctAnswers / totalAnswers) * 100) : 0;
  const completedPct = Math.round((completed.length / modules.length) * 100);

  return (
    <aside className="hidden lg:flex w-[260px] shrink-0 sticky top-0 h-screen flex-col px-4 py-5 border-r border-border-soft bg-bg-base/60 backdrop-blur-md">
      <Link
        href="/"
        className="flex flex-col items-start gap-2 px-1 mb-7 ring-focus rounded-lg"
        aria-label="LANC — Liga Acadêmica de Neurocirurgia da Bahia"
      >
        <Image
          src="/lanc-logo.png"
          alt="Liga Acadêmica de Neurocirurgia da Bahia"
          width={956}
          height={661}
          priority
          className="h-auto w-[128px] -ml-1 select-none pointer-events-none"
        />
        <div className="px-1.5 py-1 rounded-md bg-brand-400/10 border border-brand-400/25 text-[10.5px] uppercase tracking-widest text-brand-400 font-semibold">
          Sessão · MAVs Cerebrais
        </div>
      </Link>

      <nav className="flex flex-col gap-1">
        {primaryNav.map((item) => {
          const Icon = item.icon;
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 px-3 h-10 rounded-xl text-sm transition-all ring-focus",
                active
                  ? "bg-white/5 text-ink-primary border border-border-soft"
                  : "text-ink-secondary hover:text-ink-primary hover:bg-white/3"
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4 transition-colors",
                  active ? "text-brand-400" : "text-ink-secondary group-hover:text-brand-400"
                )}
              />
              <span className="flex-1">{item.label}</span>
              {item.href === "/modulos" && completed.length > 0 && (
                <span className="text-[10px] font-mono text-brand-400">
                  {completed.length}/{modules.length}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-6">
        <button
          type="button"
          onClick={() => setModulesOpen((v) => !v)}
          className="w-full flex items-center justify-between px-3 mb-2 text-[11px] uppercase tracking-widest text-ink-muted hover:text-ink-secondary"
        >
          <span>Módulos</span>
          <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", !modulesOpen && "-rotate-90")} />
        </button>
        {modulesOpen && (
          <div className="flex flex-col gap-0.5 max-h-[42vh] overflow-y-auto pr-1">
            {modules.map((m, i) => {
              const isDone = completed.includes(m.slug);
              const active = pathname === `/modulos/${m.slug}`;
              return (
                <Link
                  key={m.slug}
                  href={`/modulos/${m.slug}`}
                  className={cn(
                    "flex items-center gap-2.5 px-3 h-8 rounded-lg text-[12.5px] transition-colors",
                    active
                      ? "bg-brand-400/10 text-brand-400"
                      : "text-ink-secondary hover:text-ink-primary hover:bg-white/3"
                  )}
                >
                  <span
                    className={cn(
                      "w-5 h-5 rounded-md text-[10px] font-mono flex items-center justify-center border",
                      isDone
                        ? "bg-success/15 border-success/30 text-success"
                        : "bg-white/5 border-border-soft text-ink-muted"
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="truncate">{m.title}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-auto">
        <div className="rounded-2xl p-4 bg-brand-gradient relative overflow-hidden shadow-glow">
          <div
            aria-hidden
            className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/15 blur-2xl"
          />
          <div className="relative">
            <div className="flex items-center gap-2 text-white text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              Estatísticas rápidas
            </div>
            <div className="mt-3 flex items-end justify-between">
              <div>
                <div className="text-[28px] font-semibold leading-none font-mono text-white">
                  {accuracy}%
                </div>
                <div className="text-[11px] text-white/70 mt-1">aproveitamento</div>
              </div>
              <Activity className="w-8 h-8 text-white/40" />
            </div>
            <div className="mt-3 h-1.5 rounded-full bg-white/20 overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-700"
                style={{ width: `${completedPct}%` }}
              />
            </div>
            <div className="mt-2 text-[10.5px] text-white/80 font-mono tracking-wide">
              {completed.length}/{modules.length} módulos · {totalAnswers} questões
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
