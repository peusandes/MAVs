"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Bookmark, Check, Play, Shuffle, X } from "lucide-react";

import { questions } from "@/data/questions";
import { modules } from "@/data/modules";
import { useProgress } from "@/lib/store/progress";

import { QuestionFilters, type FilterState } from "@/components/questoes/QuestionFilters";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const diffMap = {
  facil: { label: "Fácil", tone: "success" as const },
  medio: { label: "Médio", tone: "warning" as const },
  dificil: { label: "Difícil", tone: "danger" as const },
};

export default function QuestionsPage() {
  const answers = useProgress((s) => s.answers);
  const flagged = useProgress((s) => s.flagged);
  const [filters, setFilters] = React.useState<FilterState>({
    modules: [],
    difficulties: [],
    status: "all",
  });

  const filtered = React.useMemo(() => {
    return questions.filter((q) => {
      if (filters.modules.length && !filters.modules.includes(q.module)) return false;
      if (filters.difficulties.length && !filters.difficulties.includes(q.difficulty)) return false;
      const a = answers[q.id];
      if (filters.status === "unanswered" && a) return false;
      if (filters.status === "correct" && (!a || !a.correct)) return false;
      if (filters.status === "wrong" && (!a || a.correct)) return false;
      if (filters.status === "flagged" && !flagged[q.id]) return false;
      return true;
    });
  }, [filters, answers, flagged]);

  const buildPracticeHref = () => {
    const params = new URLSearchParams();
    if (filters.modules.length) params.set("modules", filters.modules.join(","));
    if (filters.difficulties.length) params.set("difficulties", filters.difficulties.join(","));
    if (filters.status !== "all") params.set("status", filters.status);
    return `/questoes/praticar?${params.toString()}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Badge tone="blue" className="mb-2">{questions.length} questões</Badge>
          <h1 className="text-[26px] sm:text-[32px] font-semibold tracking-tight">Banco de questões</h1>
          <p className="text-[13.5px] sm:text-[14px] text-ink-secondary mt-1.5 max-w-[640px]">
            Filtre por módulo, dificuldade ou status. Cada questão traz feedback imediato com referência ao Greenberg.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 lg:flex lg:items-center">
          <Link href={buildPracticeHref()} className="w-full">
            <Button className="w-full">
              <Play className="w-4 h-4" />
              Praticar ({filtered.length})
            </Button>
          </Link>
          <Link href="/questoes/praticar?shuffle=1" className="w-full">
            <Button variant="secondary" className="w-full">
              <Shuffle className="w-4 h-4" />
              Aleatório
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 items-start">
        <QuestionFilters state={filters} onChange={setFilters} total={filtered.length} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.length === 0 && (
            <Card className="md:col-span-2 text-center py-14">
              <p className="text-[14px] text-ink-secondary">
                Nenhuma questão corresponde aos filtros atuais.
              </p>
            </Card>
          )}
          {filtered.map((q, i) => {
            const a = answers[q.id];
            const m = modules.find((x) => x.slug === q.module);
            const isFlagged = !!flagged[q.id];
            return (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(i, 8) * 0.03 }}
              >
                <Link
                  href={`/questoes/praticar?ids=${q.id}`}
                  className="block group"
                >
                  <Card className="hover:border-brand-400/30 hover:shadow-glow transition-all h-full">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge tone={diffMap[q.difficulty].tone}>
                          {diffMap[q.difficulty].label}
                        </Badge>
                        <Badge tone="muted" className="font-mono">
                          {q.id}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {isFlagged && (
                          <Bookmark className="w-3.5 h-3.5 text-warning fill-warning" />
                        )}
                        {a && (a.correct ? (
                          <Check className="w-3.5 h-3.5 text-success" />
                        ) : (
                          <X className="w-3.5 h-3.5 text-danger" />
                        ))}
                      </div>
                    </div>
                    <p className="text-[14px] line-clamp-3 text-ink-primary group-hover:text-brand-200 transition-colors">
                      {q.question}
                    </p>
                    <div className="mt-3 text-[11px] text-ink-muted truncate">
                      <span className="text-brand-400 font-mono mr-1.5">
                        {String(m?.number).padStart(2, "0")}
                      </span>
                      {m?.title} · {q.topic}
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
