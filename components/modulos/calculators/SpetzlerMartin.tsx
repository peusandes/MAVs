"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { CircularProgress } from "@/components/ui/progress";

const sizeOpts = [
  { value: 1, label: "Pequeno (< 3 cm)" },
  { value: 2, label: "Médio (3–6 cm)" },
  { value: 3, label: "Grande (> 6 cm)" },
];
const eloOpts = [
  { value: 0, label: "Não-eloquente" },
  { value: 1, label: "Eloquente" },
];
const drainOpts = [
  { value: 0, label: "Superficial" },
  { value: 1, label: "Profunda" },
];

export function SpetzlerMartinCalculator() {
  const [size, setSize] = React.useState(1);
  const [elo, setElo] = React.useState(0);
  const [drain, setDrain] = React.useState(0);
  const score = size + elo + drain;

  const interpret = () => {
    if (score === 1) return { tone: "success", label: "Grau I", note: "100% sem déficit, 4% mau resultado." };
    if (score === 2) return { tone: "success", label: "Grau II", note: "95% sem déficit, 10% mau resultado." };
    if (score === 3) return { tone: "warning", label: "Grau III", note: "84% sem déficit, 18% mau resultado." };
    if (score === 4) return { tone: "warning", label: "Grau IV", note: "73% sem déficit, 31% mau resultado." };
    return { tone: "danger", label: "Grau V", note: "69% sem déficit, 37% mau resultado." };
  };

  const r = interpret();
  const toneClass = {
    success: "text-success",
    warning: "text-warning",
    danger: "text-danger",
  }[r.tone as "success" | "warning" | "danger"];

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between gap-4 mb-4">
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">Calculadora interativa</div>
          <h4 className="text-base font-semibold mt-0.5">Spetzler-Martin</h4>
        </div>
        <CircularProgress value={(score / 5) * 100} label={<span className="font-mono text-sm">{score}</span>} size={60} />
      </div>

      <Picker label="Tamanho do nidus" value={size} onChange={setSize} options={sizeOpts} />
      <Picker label="Localização" value={elo} onChange={setElo} options={eloOpts} />
      <Picker label="Drenagem venosa" value={drain} onChange={setDrain} options={drainOpts} />

      <div className="mt-4 p-4 rounded-xl bg-white/3 border border-border-soft">
        <div className="flex items-baseline gap-3">
          <div className={`text-2xl font-mono font-semibold ${toneClass}`}>{r.label}</div>
          <div className="text-[12px] text-ink-secondary font-mono">total = {score}</div>
        </div>
        <p className="text-[12.5px] text-ink-secondary mt-1.5">{r.note}</p>
      </div>
    </Card>
  );
}

export function Picker({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  options: { value: number; label: string }[];
}) {
  return (
    <div className="mb-3 last:mb-0">
      <div className="text-[11.5px] text-ink-secondary mb-1.5">{label}</div>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => (
          <button
            key={o.value + o.label}
            type="button"
            onClick={() => onChange(o.value)}
            className={`px-3 h-8 text-[12px] rounded-lg border transition-all ${
              value === o.value
                ? "bg-brand-gradient border-transparent text-white shadow-glow"
                : "bg-white/3 border-border-soft text-ink-secondary hover:text-ink-primary hover:bg-white/8"
            }`}
          >
            <span>{o.label}</span>
            <span className="ml-1.5 font-mono opacity-70 text-[10.5px]">+{o.value}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
