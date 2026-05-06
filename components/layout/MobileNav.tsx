"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, X } from "lucide-react";
import { primaryNav } from "@/data/navigation";
import { modules } from "@/data/modules";
import { useProgress } from "@/lib/store/progress";
import { cn } from "@/lib/utils/cn";

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const completed = useProgress((s) => s.completedModules);
  const [showModules, setShowModules] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;
  return (
    <div className="lg:hidden fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in-up"
        onClick={onClose}
      />
      <div
        className="absolute left-0 top-0 bottom-0 w-[88vw] max-w-[320px] glass-strong p-4 flex flex-col animate-fade-in-up"
        style={{
          paddingTop: "calc(env(safe-area-inset-top) + 1rem)",
          paddingBottom: "calc(env(safe-area-inset-bottom) + 1rem)",
        }}
      >
        <div className="flex items-start justify-between mb-5 gap-3">
          <Link
            href="/"
            onClick={onClose}
            className="flex flex-col items-start gap-1.5 ring-focus rounded-lg min-w-0"
            aria-label="LANC — Liga Acadêmica de Neurocirurgia da Bahia"
          >
            <Image
              src="/lanc-logo.png"
              alt="Liga Acadêmica de Neurocirurgia da Bahia"
              width={956}
              height={661}
              priority
              className="h-auto w-[150px] -ml-1 select-none pointer-events-none"
            />
            <span className="px-1.5 py-0.5 rounded-md bg-brand-400/10 border border-brand-400/25 text-[10px] uppercase tracking-widest text-brand-400 font-semibold">
              Sessão · MAVs Cerebrais
            </span>
          </Link>
          <button
            onClick={onClose}
            aria-label="Fechar menu"
            className="h-10 w-10 shrink-0 inline-flex items-center justify-center text-ink-secondary hover:text-ink-primary rounded-lg hover:bg-white/5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <nav className="flex flex-col gap-1">
          {primaryNav.map((item) => {
            const Icon = item.icon;
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 min-h-[44px] px-3 rounded-xl text-[14px] transition-colors ring-focus",
                  active
                    ? "bg-white/8 text-ink-primary border border-border-soft"
                    : "text-ink-secondary hover:text-ink-primary hover:bg-white/3"
                )}
              >
                <Icon className={cn("w-4 h-4", active ? "text-brand-400" : "text-ink-secondary")} />
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

        <div className="mt-5 flex-1 min-h-0 flex flex-col">
          <button
            type="button"
            onClick={() => setShowModules((v) => !v)}
            className="flex items-center justify-between px-3 py-1.5 text-[10.5px] uppercase tracking-widest text-ink-muted hover:text-ink-secondary"
          >
            <span>Módulos</span>
            <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", !showModules && "-rotate-90")} />
          </button>
          {showModules && (
            <div className="flex-1 overflow-y-auto pr-1 -mr-1 mt-1">
              {modules.map((m, i) => {
                const isDone = completed.includes(m.slug);
                const active = pathname === `/modulos/${m.slug}`;
                return (
                  <Link
                    key={m.slug}
                    href={`/modulos/${m.slug}`}
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-2.5 px-3 min-h-[40px] rounded-lg text-[12.5px] transition-colors",
                      active
                        ? "bg-brand-400/10 text-brand-400"
                        : "text-ink-secondary hover:text-ink-primary hover:bg-white/3"
                    )}
                  >
                    <span
                      className={cn(
                        "w-6 h-6 rounded-md text-[10px] font-mono flex items-center justify-center border shrink-0",
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

        <div className="mt-4 rounded-xl p-3 bg-brand-gradient text-white relative overflow-hidden">
          <div aria-hidden className="absolute -top-12 -right-10 w-32 h-32 rounded-full bg-white/15 blur-2xl" />
          <div className="relative text-[10.5px] uppercase tracking-widest text-white/85">Sessão LANC</div>
          <div className="relative text-[12px] mt-1 leading-snug">
            <strong>Pedro Sandes Pereira</strong> &amp; <strong>Guilherme Nery</strong>
            <br />
            <span className="text-white/80">Orientação:</span> Dr. Alexandre Drayton
          </div>
        </div>
      </div>
    </div>
  );
}
