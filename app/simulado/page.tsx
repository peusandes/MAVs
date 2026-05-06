"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import {
  ArrowRight,
  Check,
  Clock,
  Trophy,
  X,
  ChevronDown,
  RotateCcw,
} from "lucide-react";

import { questions } from "@/data/questions";
import { modules } from "@/data/modules";
import { useProgress } from "@/lib/store/progress";

import { QuestionRunner } from "@/components/questoes/QuestionRunner";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CircularProgress } from "@/components/ui/progress";
import { formatClock } from "@/lib/utils/format";

const SIMULADO_LENGTH = 20;
const SIMULADO_MS = 30 * 60 * 1000; // 30 min

type State = "idle" | "running" | "results";
type Result = { id: string; chosen: string; correct: boolean; timeMs: number };

function pickBalanced(): typeof questions {
  const byMod: Record<string, typeof questions> = {};
  questions.forEach((q) => {
    (byMod[q.module] = byMod[q.module] || []).push(q);
  });
  // pick one per module first (16), then top-up to 20 with random
  const picks: typeof questions = [];
  modules.forEach((m) => {
    const list = byMod[m.slug];
    if (!list || list.length === 0) return;
    const r = list[Math.floor(Math.random() * list.length)];
    picks.push(r);
  });
  // shuffle and slice
  const all = [...picks];
  if (all.length < SIMULADO_LENGTH) {
    const remaining = questions.filter((q) => !all.includes(q));
    while (all.length < SIMULADO_LENGTH && remaining.length) {
      const i = Math.floor(Math.random() * remaining.length);
      all.push(remaining.splice(i, 1)[0]);
    }
  }
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [all[i], all[j]] = [all[j], all[i]];
  }
  return all.slice(0, SIMULADO_LENGTH);
}

export default function SimuladoPage() {
  const [state, setState] = React.useState<State>("idle");
  const [pool, setPool] = React.useState<typeof questions>([]);
  const [endsAt, setEndsAt] = React.useState<number>(0);
  const [now, setNow] = React.useState<number>(Date.now());
  const [results, setResults] = React.useState<Result[]>([]);
  const [startedAt, setStartedAt] = React.useState<number>(0);
  const recordSimuladoRun = useProgress((s) => s.recordSimuladoRun);
  const recordAnswer = useProgress((s) => s.recordAnswer);
  const recentRuns = useProgress((s) => s.simuladoRuns);

  React.useEffect(() => {
    if (state !== "running") return;
    const t = setInterval(() => setNow(Date.now()), 500);
    return () => clearInterval(t);
  }, [state]);

  React.useEffect(() => {
    if (state === "running" && now >= endsAt) {
      finalize(results);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [now, state]);

  const start = () => {
    const p = pickBalanced();
    setPool(p);
    setResults([]);
    setStartedAt(Date.now());
    setEndsAt(Date.now() + SIMULADO_MS);
    setNow(Date.now());
    setState("running");
  };

  const finalize = (rs: Result[]) => {
    if (state !== "running") return;
    const correct = rs.filter((r) => r.correct).length;
    const perModule: Record<string, { correct: number; total: number }> = {};
    rs.forEach((r) => {
      const q = questions.find((x) => x.id === r.id);
      if (!q) return;
      const slot = (perModule[q.module] = perModule[q.module] || { correct: 0, total: 0 });
      slot.total += 1;
      if (r.correct) slot.correct += 1;

      // also record into general progress
      recordAnswer({
        questionId: q.id,
        module: q.module,
        difficulty: q.difficulty,
        correct: r.correct,
        chosenId: r.chosen,
        timeMs: r.timeMs,
        at: Date.now(),
      });
    });

    const run = {
      at: Date.now(),
      score: correct,
      total: pool.length,
      durationMs: Date.now() - startedAt,
      perModule,
    };
    recordSimuladoRun(run);
    setResults(rs);
    setState("results");

    if (pool.length && correct / pool.length >= 0.8) {
      setTimeout(() => {
        confetti({
          particleCount: 140,
          spread: 70,
          origin: { y: 0.3 },
          colors: ["#5B9DFF", "#3B7DDD", "#1E3A8A", "#FFFFFF"],
        });
      }, 200);
    }
  };

  if (state === "idle") {
    return (
      <div className="space-y-6 max-w-[760px] mx-auto">
        <div>
          <Badge tone="warning" className="mb-2">
            <Trophy className="w-3 h-3" /> Modo simulado
          </Badge>
          <h1 className="text-[26px] sm:text-[32px] font-semibold tracking-tight">
            Simulado cronometrado
          </h1>
          <p className="text-[13.5px] sm:text-[14px] text-ink-secondary mt-2 max-w-[600px]">
            {SIMULADO_LENGTH} questões balanceadas entre os {modules.length} módulos, em {SIMULADO_MS / 60000} minutos. Sem feedback durante a prova — o resultado é mostrado ao final, com explicações detalhadas.
          </p>
        </div>

        <Card className="p-4 sm:p-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
            <Stat label="Questões" value={SIMULADO_LENGTH} />
            <Stat label="Tempo" value={`${SIMULADO_MS / 60000} min`} />
            <Stat label="Cobertura" value={`${modules.length} módulos`} />
            <Stat label="Aprovação" value="≥ 70%" />
          </div>
          <div className="mt-5 sm:mt-6 grid grid-cols-1 sm:flex gap-2">
            <Button onClick={start} size="lg" className="w-full sm:w-auto">
              <Trophy className="w-4 h-4" />
              Iniciar simulado
            </Button>
            <Link href="/questoes" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full">
                Praticar livremente
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </Card>

        {recentRuns.length > 0 && (
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Suas tentativas anteriores</CardTitle>
                <CardDescription>Histórico recente de simulados</CardDescription>
              </div>
            </CardHeader>
            <ul className="divide-y divide-white/5">
              {recentRuns.slice(0, 6).map((r, i) => (
                <li key={i} className="flex items-center justify-between py-3">
                  <div>
                    <div className="text-[13px] text-ink-primary font-medium">
                      {new Date(r.at).toLocaleString("pt-BR")}
                    </div>
                    <div className="text-[11.5px] text-ink-muted font-mono">
                      duração: {Math.round(r.durationMs / 60000)} min
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      tone={
                        r.score / r.total >= 0.8
                          ? "success"
                          : r.score / r.total >= 0.5
                          ? "warning"
                          : "danger"
                      }
                      className="font-mono"
                    >
                      {r.score}/{r.total}
                    </Badge>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        )}
      </div>
    );
  }

  if (state === "running") {
    const remaining = Math.max(0, endsAt - now);
    return (
      <div>
        <div className="sticky top-14 sm:top-16 z-20 -mx-4 sm:-mx-5 lg:-mx-8 px-4 sm:px-5 lg:px-8 py-2.5 sm:py-3 mb-5 sm:mb-6 bg-bg-base/90 backdrop-blur border-b border-border-soft">
          <div className="max-w-[820px] mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <Trophy className="w-4 h-4 text-warning shrink-0" />
              <span className="text-[12px] sm:text-[13px] font-medium truncate">
                Simulado em andamento
              </span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <Clock className="w-4 h-4 text-brand-400" />
              <span className="text-[18px] sm:text-[20px] font-mono font-semibold tabular-nums">
                {formatClock(remaining)}
              </span>
            </div>
          </div>
        </div>
        <QuestionRunner
          questions={pool}
          showFeedback={false}
          title="Simulado"
          onFinish={({ answers }) => finalize(answers)}
        />
      </div>
    );
  }

  // results
  const correct = results.filter((r) => r.correct).length;
  const total = pool.length;
  const pct = Math.round((correct / total) * 100);
  const duration = Date.now() - startedAt;
  const perModule = pool.reduce<Record<string, { correct: number; total: number; title: string }>>(
    (acc, q) => {
      const m = modules.find((mod) => mod.slug === q.module);
      const slot = (acc[q.module] = acc[q.module] || {
        correct: 0,
        total: 0,
        title: m?.title ?? q.module,
      });
      slot.total += 1;
      const r = results.find((x) => x.id === q.id);
      if (r?.correct) slot.correct += 1;
      return acc;
    },
    {}
  );

  return (
    <div className="space-y-6 max-w-[820px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-5 sm:p-7 relative overflow-hidden">
          <div
            className="absolute -top-20 -right-16 w-72 h-72 rounded-full bg-brand-gradient opacity-22 blur-3xl"
            aria-hidden
          />
          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 sm:gap-4">
            <div className="flex-1 min-w-0">
              <Badge tone={pct >= 80 ? "success" : pct >= 50 ? "warning" : "danger"}>
                <Trophy className="w-3 h-3" />
                {pct >= 80 ? "Excelente desempenho" : pct >= 50 ? "Bom desempenho" : "Há espaço para evoluir"}
              </Badge>
              <h2 className="text-[24px] sm:text-[28px] font-semibold tracking-tight mt-3">
                {correct} de {total} corretas
              </h2>
              <p className="text-[12.5px] sm:text-[13px] text-ink-secondary mt-1.5">
                Duração: {Math.round(duration / 60000)} min · {pct}% de aproveitamento
              </p>
            </div>
            <div className="self-center sm:self-auto">
              <CircularProgress
                value={pct}
                size={104}
                stroke={9}
                label={
                  <div className="text-center">
                    <div className="text-[20px] sm:text-[22px] font-mono font-semibold">{pct}%</div>
                  </div>
                }
              />
            </div>
          </div>
          <div className="mt-5 grid grid-cols-1 sm:flex gap-2">
            <Button onClick={start} className="w-full sm:w-auto">
              <RotateCcw className="w-4 h-4" />
              Refazer simulado
            </Button>
            <Link href="/questoes" className="w-full sm:w-auto">
              <Button variant="secondary" className="w-full">
                Voltar para o banco
              </Button>
            </Link>
          </div>
        </Card>
      </motion.div>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>Desempenho por módulo</CardTitle>
            <CardDescription>Acertos em cada capítulo</CardDescription>
          </div>
        </CardHeader>
        <div className="space-y-2">
          {Object.entries(perModule).map(([slug, m]) => {
            const p = m.total ? Math.round((m.correct / m.total) * 100) : 0;
            const tone =
              p >= 80 ? "bg-success" : p >= 50 ? "bg-warning" : "bg-danger";
            return (
              <div
                key={slug}
                className="grid grid-cols-[1fr_50px] sm:grid-cols-[1fr_120px_60px] gap-2 sm:gap-3 items-center"
              >
                <span className="text-[12px] sm:text-[12.5px] truncate">{m.title}</span>
                <div className="hidden sm:block h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${tone} transition-all duration-700`}
                    style={{ width: `${Math.max(p, 4)}%` }}
                  />
                </div>
                <span className="text-[11.5px] text-ink-muted font-mono text-right">
                  {m.correct}/{m.total}
                </span>
                <div className="sm:hidden col-span-2 h-1.5 -mt-1 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${tone} transition-all duration-700`}
                    style={{ width: `${Math.max(p, 4)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>Revisão das respostas</CardTitle>
            <CardDescription>Clique para expandir explicações</CardDescription>
          </div>
        </CardHeader>
        <div className="space-y-2">
          {pool.map((q, i) => {
            const r = results.find((x) => x.id === q.id);
            const isRight = !!r?.correct;
            return (
              <details
                key={q.id}
                className="group rounded-xl border border-border-soft bg-white/3 open:border-brand-400/30"
              >
                <summary className="cursor-pointer list-none flex items-center gap-3 p-3 select-none">
                  <span
                    className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${
                      isRight ? "bg-success/15 text-success" : "bg-danger/15 text-danger"
                    }`}
                  >
                    {isRight ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                  </span>
                  <span className="text-[12.5px] flex-1 truncate text-ink-primary">
                    <span className="font-mono text-[10px] text-ink-muted mr-2">
                      Q{String(i + 1).padStart(2, "0")}
                    </span>
                    {q.question}
                  </span>
                  <ChevronDown className="w-4 h-4 text-ink-muted group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-3 pb-4 pt-1">
                  <div className="space-y-1 mb-3">
                    {q.options.map((o) => {
                      const correctOpt = o.id === q.correctAnswerId;
                      const chosen = r?.chosen === o.id;
                      return (
                        <div
                          key={o.id}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-[12.5px] ${
                            correctOpt
                              ? "bg-success/10 text-success"
                              : chosen
                              ? "bg-danger/10 text-danger"
                              : "text-ink-secondary"
                          }`}
                        >
                          <span className="font-mono w-4">{o.id.toUpperCase()}.</span>
                          <span>{o.text}</span>
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-[12.5px] text-ink-primary/90 leading-relaxed">
                    <strong>Explicação.</strong> {q.explanation}
                  </p>
                  <div className="text-[11px] text-ink-muted mt-2 font-mono">{q.reference}</div>
                </div>
              </details>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl bg-white/3 border border-border-soft p-3">
      <div className="text-[10.5px] uppercase tracking-widest text-ink-muted">{label}</div>
      <div className="text-[22px] font-mono font-semibold mt-1">{value}</div>
    </div>
  );
}
