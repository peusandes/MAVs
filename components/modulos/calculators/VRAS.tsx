"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { CircularProgress } from "@/components/ui/progress";
import { Picker } from "./SpetzlerMartin";

const favorable = [83, 79, 70, 48, 39];

export function VRASCalculator() {
  const [vol, setVol] = React.useState(0);
  const [elo, setElo] = React.useState(0);
  const [bleed, setBleed] = React.useState(0);
  const score = vol + elo + bleed;
  const desfecho = favorable[Math.min(score, 4)];

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between gap-4 mb-4">
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-muted">Calculadora interativa</div>
          <h4 className="text-base font-semibold mt-0.5">VRAS — Virginia Radiosurgery AVM Scale</h4>
        </div>
        <CircularProgress
          value={(score / 4) * 100}
          label={<span className="font-mono text-sm">{score}</span>}
          size={60}
        />
      </div>

      <Picker
        label="Volume"
        value={vol}
        onChange={setVol}
        options={[
          { value: 0, label: "< 2 cm³" },
          { value: 1, label: "2–4 cm³" },
          { value: 2, label: "> 4 cm³" },
        ]}
      />
      <Picker
        label="Eloquência"
        value={elo}
        onChange={setElo}
        options={[
          { value: 0, label: "Não" },
          { value: 1, label: "Sim" },
        ]}
      />
      <Picker
        label="Hemorragia prévia"
        value={bleed}
        onChange={setBleed}
        options={[
          { value: 0, label: "Não" },
          { value: 1, label: "Sim" },
        ]}
      />

      <div className="mt-4 p-4 rounded-xl bg-white/3 border border-border-soft">
        <div className="text-[12.5px] text-ink-secondary">Desfecho favorável estimado</div>
        <div className="text-2xl font-mono font-semibold text-brand-400 mt-1">{desfecho}%</div>
      </div>
    </Card>
  );
}
