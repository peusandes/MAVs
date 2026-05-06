"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";

export function LifetimeRiskCalculator() {
  const [age, setAge] = React.useState(35);
  const [annual, setAnnual] = React.useState(3);
  const [expectancy, setExpectancy] = React.useState(80);

  const yearsRemaining = Math.max(0, expectancy - age);
  const exact = (1 - Math.pow(1 - annual / 100, yearsRemaining)) * 100;
  const simple = Math.max(0, 105 - age); // approximate when annual ~ 3%

  return (
    <Card className="p-5">
      <div className="mb-4">
        <div className="text-[11px] uppercase tracking-widest text-ink-muted">Calculadora interativa</div>
        <h4 className="text-base font-semibold mt-0.5">Risco vitalício de hemorragia</h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SliderField label="Idade do paciente" min={1} max={90} value={age} onChange={setAge} suffix="anos" />
        <SliderField label="Risco anual estimado" min={0.5} max={20} step={0.1} value={annual} onChange={setAnnual} suffix="%" />
        <SliderField label="Expectativa de vida" min={50} max={100} value={expectancy} onChange={setExpectancy} suffix="anos" />
      </div>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-xl bg-brand-400/10 border border-brand-400/25 p-4">
          <div className="text-[11px] uppercase tracking-widest text-brand-400">
            Cálculo exato
          </div>
          <div className="mt-1 font-mono text-3xl font-semibold text-ink-primary">
            {exact.toFixed(1)}%
          </div>
          <div className="text-[11px] text-ink-secondary mt-1">
            1 − (1 − {annual}%)^{yearsRemaining} anos
          </div>
        </div>
        <div className="rounded-xl bg-white/3 border border-border-soft p-4">
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">
            Aproximação clínica (3%/ano)
          </div>
          <div className="mt-1 font-mono text-3xl font-semibold text-ink-primary">{simple}%</div>
          <div className="text-[11px] text-ink-secondary mt-1">105 − idade</div>
        </div>
      </div>
    </Card>
  );
}

function SliderField({
  label,
  min,
  max,
  step = 1,
  value,
  onChange,
  suffix,
}: {
  label: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (v: number) => void;
  suffix?: string;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-[11.5px] text-ink-secondary">{label}</span>
        <span className="text-[12px] font-mono text-ink-primary">
          {value}
          {suffix ? ` ${suffix}` : ""}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-brand-400 h-1.5 cursor-pointer"
      />
    </div>
  );
}
