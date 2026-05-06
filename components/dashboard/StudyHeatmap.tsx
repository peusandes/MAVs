"use client";

import { Tooltip } from "@/components/ui/tooltip";

function intensity(c: number): string {
  if (c === 0) return "rgba(255,255,255,0.05)";
  if (c < 3) return "rgba(91,157,255,0.25)";
  if (c < 8) return "rgba(91,157,255,0.5)";
  if (c < 15) return "rgba(91,157,255,0.75)";
  return "rgba(91,157,255,1)";
}

export function StudyHeatmap({ data }: { data: { date: string; count: number }[] }) {
  // 91 days, displayed as 13 weeks × 7 days. Day 0 = day-90.
  const cols = 13;
  const rows = 7;
  const padded = [...data];
  while (padded.length < cols * rows) padded.unshift({ date: "", count: 0 });

  return (
    <div className="flex flex-col gap-2">
      <div className="grid gap-[3px]" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {Array.from({ length: cols }).map((_, ci) => (
          <div key={ci} className="grid gap-[3px]" style={{ gridTemplateRows: `repeat(${rows}, 1fr)` }}>
            {Array.from({ length: rows }).map((__, ri) => {
              const idx = ci * rows + ri;
              const cell = padded[idx];
              if (!cell || !cell.date) {
                return (
                  <div
                    key={ri}
                    className="w-full aspect-square rounded-[3px]"
                    style={{ background: "transparent" }}
                  />
                );
              }
              return (
                <Tooltip key={ri} content={`${cell.date} · ${cell.count} questões`}>
                  <div
                    className="w-full aspect-square rounded-[3px] hover:scale-110 transition-transform border border-white/5"
                    style={{ background: intensity(cell.count) }}
                  />
                </Tooltip>
              );
            })}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1.5 text-[10.5px] text-ink-muted ml-auto">
        <span>Menos</span>
        {[0, 2, 6, 12, 20].map((c, i) => (
          <span
            key={i}
            className="w-3 h-3 rounded-[3px] border border-white/5"
            style={{ background: intensity(c) }}
          />
        ))}
        <span>Mais</span>
      </div>
    </div>
  );
}
