"use client";

import * as React from "react";
import { Search, Bell, Settings, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNav } from "@/data/navigation";
import { modules } from "@/data/modules";
import { cn } from "@/lib/utils/cn";

function pathLabel(pathname: string): string {
  if (pathname === "/") return "Dashboard";
  if (pathname.startsWith("/modulos/")) {
    const slug = pathname.split("/")[2];
    const m = modules.find((x) => x.slug === slug);
    return m ? m.title : "Módulo";
  }
  const item = primaryNav.find((n) => pathname.startsWith(n.href) && n.href !== "/");
  return item?.label ?? "MAVs LANC";
}

export function Header({ onMenu }: { onMenu?: () => void }) {
  const pathname = usePathname();
  return (
    <header
      className="sticky top-0 z-30 backdrop-blur-md bg-bg-base/75 border-b border-border-soft"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="flex items-center gap-3 px-4 sm:px-5 lg:px-8 h-14 sm:h-16">
        <button
          type="button"
          onClick={onMenu}
          className="lg:hidden h-10 w-10 inline-flex items-center justify-center rounded-lg text-ink-secondary hover:text-ink-primary hover:bg-white/5 ring-focus -ml-2"
          aria-label="Abrir menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex flex-col leading-tight min-w-0">
          <span className="text-[10.5px] sm:text-[11px] text-ink-secondary tracking-wide truncate">
            <span className="hidden sm:inline">Liga de Neurocirurgia da Bahia</span>
            <span className="sm:hidden">LANC</span>
          </span>
          <span className="text-[14px] sm:text-[15px] font-semibold text-ink-primary -mt-0.5 truncate max-w-[55vw] sm:max-w-none">
            {pathLabel(pathname)}
          </span>
        </div>

        <div className="ml-auto hidden md:flex items-center gap-2 w-[260px] xl:w-[320px] h-9 px-3 rounded-xl bg-white/4 border border-border-soft text-ink-secondary">
          <Search className="w-4 h-4" />
          <input
            type="text"
            placeholder="Buscar conteúdo…"
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-ink-muted"
          />
          <kbd className="text-[10px] font-mono text-ink-muted border border-border-soft px-1.5 rounded">
            ⌘K
          </kbd>
        </div>

        <div className="flex items-center gap-1 ml-auto md:ml-0">
          <IconBtn label="Notificações">
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-brand-400" />
          </IconBtn>
          <Link
            href="/sobre"
            className="hidden sm:inline-flex relative items-center justify-center h-10 w-10 rounded-xl text-ink-secondary hover:text-ink-primary hover:bg-white/5 ring-focus"
            aria-label="Sobre o projeto"
          >
            <Settings className="w-4 h-4" />
          </Link>
          <div className="sm:ml-2 inline-flex items-center gap-2.5 sm:pl-2 sm:pr-3 h-10 rounded-xl sm:border sm:border-border-soft sm:bg-white/3">
            <div className="w-9 h-9 sm:w-7 sm:h-7 rounded-lg bg-brand-gradient text-white flex items-center justify-center text-[11.5px] font-semibold shadow-glow">
              PS
            </div>
            <div className="hidden sm:block leading-tight">
              <div className="text-[12.5px] font-medium text-ink-primary">Pedro &amp; Guilherme</div>
              <div className="text-[10px] text-ink-secondary">LANC · 2026</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function IconBtn({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cn(
        "relative inline-flex items-center justify-center h-10 w-10 rounded-xl text-ink-secondary hover:text-ink-primary hover:bg-white/5 ring-focus"
      )}
    >
      {children}
    </button>
  );
}
