"use client";

import * as React from "react";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { modules } from "@/data/modules";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils/cn";

export type FilterState = {
  modules: string[];
  difficulties: ("facil" | "medio" | "dificil")[];
  status: "all" | "unanswered" | "correct" | "wrong" | "flagged";
};

const diffs: { value: "facil" | "medio" | "dificil"; label: string; tone: "success" | "warning" | "danger" }[] = [
  { value: "facil", label: "Fácil", tone: "success" },
  { value: "medio", label: "Médio", tone: "warning" },
  { value: "dificil", label: "Difícil", tone: "danger" },
];

const statusOptions: { value: FilterState["status"]; label: string }[] = [
  { value: "all", label: "Todas" },
  { value: "unanswered", label: "Não respondidas" },
  { value: "correct", label: "Acertei" },
  { value: "wrong", label: "Errei" },
  { value: "flagged", label: "Marcadas" },
];

export function QuestionFilters({
  state,
  onChange,
  total,
}: {
  state: FilterState;
  onChange: (s: FilterState) => void;
  total: number;
}) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const toggleModule = (slug: string) => {
    const has = state.modules.includes(slug);
    onChange({
      ...state,
      modules: has ? state.modules.filter((s) => s !== slug) : [...state.modules, slug],
    });
  };
  const toggleDiff = (d: "facil" | "medio" | "dificil") => {
    const has = state.difficulties.includes(d);
    onChange({
      ...state,
      difficulties: has ? state.difficulties.filter((x) => x !== d) : [...state.difficulties, d],
    });
  };

  const activeCount =
    state.modules.length +
    state.difficulties.length +
    (state.status !== "all" ? 1 : 0);

  const inner = (
    <div className="space-y-5">
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[13px] font-semibold tracking-tight">Filtros</h3>
          <Badge tone="blue" className="font-mono">
            {total}
          </Badge>
        </div>
        <button
          className="text-[12px] text-ink-secondary hover:text-brand-400 min-h-[28px]"
          onClick={() => onChange({ modules: [], difficulties: [], status: "all" })}
        >
          Limpar filtros
        </button>
      </div>

      <Section title="Dificuldade">
        <div className="flex gap-1.5 flex-wrap">
          {diffs.map((d) => {
            const active = state.difficulties.includes(d.value);
            return (
              <button
                key={d.value}
                onClick={() => toggleDiff(d.value)}
                className={cn(
                  "px-3 min-h-[36px] text-[12.5px] rounded-full border transition-colors",
                  active
                    ? d.tone === "success"
                      ? "bg-success/15 border-success/35 text-success"
                      : d.tone === "warning"
                      ? "bg-warning/15 border-warning/35 text-warning"
                      : "bg-danger/15 border-danger/35 text-danger"
                    : "bg-white/3 border-border-soft text-ink-secondary hover:text-ink-primary"
                )}
              >
                {d.label}
              </button>
            );
          })}
        </div>
      </Section>

      <Section title="Status">
        <div className="grid grid-cols-2 gap-1.5">
          {statusOptions.map((opt) => {
            const active = state.status === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => onChange({ ...state, status: opt.value })}
                className={cn(
                  "px-3 min-h-[40px] text-[12.5px] rounded-lg border transition-colors text-left",
                  active
                    ? "bg-brand-400/10 border-brand-400/30 text-brand-400"
                    : "bg-white/3 border-border-soft text-ink-secondary hover:text-ink-primary"
                )}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </Section>

      <Section title="Módulo">
        <div className="space-y-1 max-h-[44vh] overflow-y-auto pr-1 -mr-1">
          {modules.map((m) => {
            const active = state.modules.includes(m.slug);
            return (
              <button
                key={m.slug}
                onClick={() => toggleModule(m.slug)}
                className={cn(
                  "w-full text-left flex items-center gap-2 px-2.5 min-h-[36px] rounded-lg text-[12.5px] transition-colors",
                  active
                    ? "bg-brand-400/10 text-brand-400"
                    : "text-ink-secondary hover:text-ink-primary hover:bg-white/3"
                )}
              >
                <span
                  className={cn(
                    "w-4 h-4 rounded-sm border flex items-center justify-center shrink-0",
                    active ? "bg-brand-400 border-brand-400" : "border-border-soft"
                  )}
                >
                  {active && <span className="w-1.5 h-1.5 rounded-[1px] bg-white" />}
                </span>
                <span className="font-mono text-[10px] text-ink-muted w-5 shrink-0">
                  {String(m.number).padStart(2, "0")}
                </span>
                <span className="truncate">{m.title}</span>
              </button>
            );
          })}
        </div>
      </Section>
    </div>
  );

  return (
    <>
      {/* Mobile trigger */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="lg:hidden inline-flex items-center justify-center gap-2 h-11 px-4 rounded-xl glass border-border-soft text-[13px] font-medium ring-focus w-full"
      >
        <SlidersHorizontal className="w-4 h-4 text-brand-400" />
        Filtros
        {activeCount > 0 && (
          <Badge tone="blue" className="font-mono">
            {activeCount}
          </Badge>
        )}
        <span className="ml-auto text-ink-muted text-[11.5px] font-mono">{total}</span>
      </button>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block glass rounded-2xl p-5 sticky top-24">
        {inner}
      </aside>

      {/* Mobile bottom sheet */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-[60] flex flex-col">
          <div
            className="absolute inset-0 bg-black/65 backdrop-blur-sm animate-fade-in-up"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative mt-auto rounded-t-3xl glass-strong p-5 max-h-[88vh] overflow-y-auto pb-[calc(env(safe-area-inset-bottom)+1rem)] animate-fade-in-up">
            <div className="sticky top-0 -mx-5 -mt-5 px-5 pt-3 pb-3 mb-3 bg-bg-raised/85 backdrop-blur border-b border-border-soft flex items-center justify-between rounded-t-3xl">
              <div className="flex items-center gap-2">
                <span className="block w-10 h-1 rounded-full bg-white/20 mx-auto absolute left-1/2 -translate-x-1/2 -top-2" />
                <SlidersHorizontal className="w-4 h-4 text-brand-400" />
                <span className="text-[14px] font-semibold">Filtros</span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="h-9 w-9 inline-flex items-center justify-center rounded-lg text-ink-secondary hover:text-ink-primary hover:bg-white/5"
                aria-label="Fechar filtros"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            {inner}
            <div className="sticky bottom-0 -mx-5 mt-4 px-5 py-3 bg-bg-raised/85 backdrop-blur border-t border-border-soft">
              <button
                onClick={() => setMobileOpen(false)}
                className="w-full h-11 rounded-xl bg-brand-gradient text-white text-[13.5px] font-semibold shadow-glow"
              >
                Aplicar · {total} questões
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[10.5px] uppercase tracking-widest text-ink-muted mb-2">{title}</div>
      {children}
    </div>
  );
}
