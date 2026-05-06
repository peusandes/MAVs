"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { CircularProgress } from "@/components/ui/progress";
import { Picker } from "./SpetzlerMartin";

export function LawtonYoungCalculator() {
  const [age, setAge] = React.useState(2);
  const [pres, setPres] = React.useState(0);
  const [nidus, setNidus] = React.useState(0);
  const score = age + pres + nidus;

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between gap-4 mb-4">
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">Calculadora interativa</div>
          <h4 className="text-base font-semibold mt-0.5">Lawton-Young (suplementar)</h4>
        </div>
        <CircularProgress value={(score / 5) * 100} label={<span className="font-mono text-sm">{score}</span>} size={60} />
      </div>

      <Picker
        label="Idade"
        value={age}
        onChange={setAge}
        options={[
          { value: 1, label: "< 20 anos" },
          { value: 2, label: "20–40 anos" },
          { value: 3, label: "> 40 anos" },
        ]}
      />
      <Picker
        label="Apresentação"
        value={pres}
        onChange={setPres}
        options={[
          { value: 0, label: "Rota" },
          { value: 1, label: "Não-rota" },
        ]}
      />
      <Picker
        label="Padrão do nidus"
        value={nidus}
        onChange={setNidus}
        options={[
          { value: 0, label: "Compacto" },
          { value: 1, label: "Difuso" },
        ]}
      />

      <div className="mt-4 p-4 rounded-xl bg-white/3 border border-border-soft">
        <div className="text-[12.5px] text-ink-secondary">
          Lawton-Young total = <span className="font-mono text-ink-primary">{score}</span>. Combine com Spetzler-Martin: baixo L-Y refina o desfecho de S-M III para nível S-M II; alto L-Y aproxima de S-M IV.
        </div>
      </div>
    </Card>
  );
}
