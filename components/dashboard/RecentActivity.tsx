"use client";

import type { AnswerRecord } from "@/lib/store/progress";
import { questions } from "@/data/questions";
import { modules } from "@/data/modules";
import { Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatRelative } from "@/lib/utils/format";

const diffMap = {
  facil: { label: "Fácil", tone: "success" as const },
  medio: { label: "Médio", tone: "warning" as const },
  dificil: { label: "Difícil", tone: "danger" as const },
};

export function RecentActivity({ items }: { items: AnswerRecord[] }) {
  if (items.length === 0) {
    return (
      <div className="text-[13px] text-ink-secondary py-10 text-center">
        Sem atividade ainda. Comece pelo{" "}
        <a href="/questoes" className="text-brand-400 hover:underline">
          banco de questões
        </a>
        .
      </div>
    );
  }

  return (
    <ul className="divide-y divide-white/5">
      {items.map((a) => {
        const q = questions.find((x) => x.id === a.questionId);
        const m = modules.find((x) => x.slug === a.module);
        return (
          <li key={a.questionId} className="flex items-center gap-3 py-2.5">
            <div
              className={`w-7 h-7 shrink-0 rounded-lg flex items-center justify-center ${
                a.correct ? "bg-success/15 text-success" : "bg-danger/15 text-danger"
              }`}
            >
              {a.correct ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[12.5px] text-ink-primary truncate">
                {q?.topic ?? "Questão"}
                <span className="text-ink-muted">
                  {" · "}
                  {m?.title ?? a.module}
                </span>
              </div>
              <div className="mt-0.5 flex items-center gap-2">
                <Badge tone={diffMap[a.difficulty].tone}>{diffMap[a.difficulty].label}</Badge>
                <span className="text-[10.5px] text-ink-muted font-mono">
                  {(a.timeMs / 1000).toFixed(0)}s · {formatRelative(a.at)}
                </span>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
