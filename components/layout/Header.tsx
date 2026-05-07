"use client";

import * as React from "react";
import { Search, Bell, Settings, Menu, LogOut } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { primaryNav } from "@/data/navigation";
import { modules } from "@/data/modules";
import { cn } from "@/lib/utils/cn";
import { useProfile } from "@/lib/store/profile";
import { clearProfile } from "@/lib/api/profile";
import { toast } from "sonner";

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

function getInitials(name?: string): string {
  if (!name) return "PS";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function getFirstName(name?: string): string {
  if (!name) return "Visitante";
  return name.trim().split(/\s+/)[0];
}

export function Header({ onMenu }: { onMenu?: () => void }) {
  const pathname = usePathname();
  const profile = useProfile((s) => s.profile);
  const [hydrated, setHydrated] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => setHydrated(true), []);

  React.useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [menuOpen]);

  const initials = hydrated ? getInitials(profile?.name) : "PS";
  const firstName = hydrated ? getFirstName(profile?.name) : "Visitante";

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

        <Link
          href="/"
          className="lg:hidden flex items-center shrink-0 ring-focus rounded-md"
          aria-label="LANC — Liga Acadêmica de Neurocirurgia da Bahia"
        >
          <Image
            src="/lanc-logo.png"
            alt="LANC"
            width={956}
            height={661}
            priority
            className="h-7 w-auto select-none pointer-events-none"
          />
        </Link>

        <div className="flex flex-col leading-tight min-w-0">
          <span className="text-[10.5px] sm:text-[11px] text-ink-secondary tracking-wide truncate">
            <span className="hidden lg:inline">Liga de Neurocirurgia da Bahia</span>
            <span className="lg:hidden">Sessão · MAVs</span>
          </span>
          <span className="text-[14px] sm:text-[15px] font-semibold text-ink-primary -mt-0.5 truncate max-w-[42vw] sm:max-w-none">
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
          <div className="relative sm:ml-2" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Abrir menu da conta"
              aria-expanded={menuOpen}
              className="inline-flex items-center gap-2.5 sm:pl-2 sm:pr-3 h-10 rounded-xl sm:border sm:border-border-soft sm:bg-white/3 hover:sm:bg-white/8 transition-colors ring-focus"
            >
              <div className="w-9 h-9 sm:w-7 sm:h-7 rounded-lg bg-brand-gradient text-white flex items-center justify-center text-[11.5px] font-semibold shadow-glow">
                {initials}
              </div>
              <div className="hidden sm:block leading-tight text-left">
                <div className="text-[12.5px] font-medium text-ink-primary truncate max-w-[140px]">
                  {firstName}
                </div>
                <div className="text-[10px] text-ink-secondary">
                  {profile ? "LANC · 2026" : "Visitante"}
                </div>
              </div>
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 rounded-xl glass-strong border border-border-soft shadow-2xl py-2 z-40 animate-fade-in-up">
                <div className="px-3 py-2 border-b border-border-soft">
                  <div className="text-[10px] uppercase tracking-widest text-ink-muted">
                    {profile ? "Conectado como" : "Sessão"}
                  </div>
                  <div className="text-[13px] font-medium text-ink-primary truncate mt-0.5">
                    {profile?.name ?? "Visitante anônimo"}
                  </div>
                  {profile?.email && (
                    <div className="text-[11px] text-ink-secondary truncate">
                      {profile.email}
                    </div>
                  )}
                </div>
                <Link
                  href="/sobre"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-[13px] text-ink-secondary hover:text-ink-primary hover:bg-white/5 transition-colors"
                >
                  <Settings className="w-3.5 h-3.5" />
                  Sobre o projeto
                </Link>
                {profile && (
                  <button
                    type="button"
                    onClick={async () => {
                      await clearProfile();
                      setMenuOpen(false);
                      toast.message("Sessão encerrada.");
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-ink-secondary hover:text-danger hover:bg-danger/8 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sair / trocar nome
                  </button>
                )}
              </div>
            )}
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
