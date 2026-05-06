"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  Check,
  X,
  RotateCcw,
  Clock,
  Sparkles,
} from "lucide-react";

import type { Question } from "@/data/questions";
import { useProgress } from "@/lib/store/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils/cn";
import { formatClock } from "@/lib/utils/format";
import { modules } from "@/data/modules";

const diffMap = {
  facil: { label: "Fácil", tone: "success" as const },
  medio: { label: "Médio", tone: "warning" as const },
  dificil: { label: "Difícil", tone: "danger" as const },
};

export function QuestionRunner({
  questions: pool,
  showFeedback = true,
  onFinish,
  title,
}: {
  questions: Question[];
  showFeedback?: boolean;
  onFinish?: (result: { answers: { id: string; chosen: string; correct: boolean; timeMs: number }[] }) => void;
  title?: string;
}) {
  const recordAnswer = useProgress((s) => s.recordAnswer);
  const flagged = useProgress((s) => s.flagged);
  const toggleFlag = useProgress((s) => s.toggleFlag);

  const [index, setIndex] = React.useState(0);
  const [chosen, setChosen] = React.useState<string | null>(null);
  const [revealed, setRevealed] = React.useState(false);
  const [startedAt, setStartedAt] = React.useState<number>(() => Date.now());
  const [tick, setTick] = React.useState(0);
  const [results, setResults] = React.useState<
    { id: string; chosen: string; correct: boolean; timeMs: number }[]
  >([]);

  const q = pool[index];

  React.useEffect(() => {
    setChosen(null);
    setRevealed(false);
    setStartedAt(Date.now());
  }, [index]);

  React.useEffect(() => {
    const t = setInterval(() => setTick((x) => x + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const elapsedMs = Date.now() - startedAt;

  if (!q) {
    return (
      <Card className="text-center p-10">
        <div className="text-base">Nenhuma questão disponível com os filtros atuais.</div>
      </Card>
    );
  }

  const isLast = index === pool.length - 1;
  const moduleObj = modules.find((m) => m.slug === q.module);
  const isFlagged = !!flagged[q.id];

  const submit = () => {
    if (!chosen) return;
    const timeMs = Date.now() - startedAt;
    const correct = chosen === q.correctAnswerId;
    setRevealed(true);
    if (showFeedback) {
      recordAnswer({
        questionId: q.id,
        module: q.module,
        difficulty: q.difficulty,
        correct,
        chosenId: chosen,
        timeMs,
        at: Date.now(),
      });
    }
    setResults((r) => [...r, { id: q.id, chosen, correct, timeMs }]);
    if (!showFeedback) {
      // Simulado mode: no reveal — auto-advance
      if (isLast) {
        const next = [...results, { id: q.id, chosen, correct, timeMs }];
        onFinish?.({ answers: next });
      } else {
        setIndex((i) => i + 1);
      }
    }
  };

  const advance = () => {
    if (isLast) {
      onFinish?.({ answers: results });
      return;
    }
    setIndex((i) => i + 1);
  };

  return (
    <div className="max-w-[820px] mx-auto">
      {/* Header strip */}
      <div className="flex items-center gap-2 mb-3">
        {title && (
          <span className="text-[12px] text-ink-secondary hidden sm:inline">{title}</span>
        )}
        <Badge tone="muted" className="font-mono">
          {index + 1}/{pool.length}
        </Badge>
        <Badge tone={diffMap[q.difficulty].tone}>{diffMap[q.difficulty].label}</Badge>
        <span className="ml-auto inline-flex items-center gap-1.5 text-[12px] text-ink-secondary font-mono">
          <Clock className="w-3.5 h-3.5" />
          {formatClock(elapsedMs)}
        </span>
        <button
          type="button"
          onClick={() => toggleFlag(q.id)}
          className={cn(
            "h-9 w-9 inline-flex items-center justify-center rounded-lg ring-focus border transition-colors",
            isFlagged
              ? "bg-warning/15 text-warning border-warning/30"
              : "bg-white/3 text-ink-secondary border-border-soft hover:text-ink-primary"
          )}
          aria-label={isFlagged ? "Remover marcação" : "Marcar para revisar"}
        >
          {isFlagged ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
        </button>
      </div>
      {moduleObj && (
        <div className="mb-3 -mt-1">
          <Badge tone="blue" className="max-w-full">
            <span className="truncate">{moduleObj.title}</span>
          </Badge>
        </div>
      )}

      {/* Progress */}
      <div className="h-1 rounded-full bg-white/5 overflow-hidden mb-5">
        <div
          className="h-full bg-brand-gradient transition-all duration-500"
          style={{ width: `${((index + (revealed ? 1 : 0)) / pool.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-4 sm:p-6">
            <div className="text-[10.5px] uppercase tracking-widest text-brand-400 font-semibold mb-2">
              {q.topic}
            </div>
            <h2 className="text-[17px] sm:text-[19px] leading-snug font-semibold text-ink-primary text-balance">
              {q.question}
            </h2>

            <div className="mt-5 grid gap-2.5">
              {q.options.map((opt) => {
                const isChosen = chosen === opt.id;
                const isCorrect = revealed && opt.id === q.correctAnswerId;
                const isWrong = revealed && isChosen && !isCorrect;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    disabled={revealed}
                    onClick={() => setChosen(opt.id)}
                    className={cn(
                      "group flex items-start gap-3 text-left p-3.5 sm:p-4 min-h-[60px] rounded-xl border transition-all ring-focus active:scale-[0.99]",
                      "bg-white/3 border-border-soft hover:bg-white/8",
                      isChosen && !revealed && "border-brand-400 bg-brand-400/8 shadow-glow",
                      isCorrect && "border-success bg-success/10",
                      isWrong && "border-danger bg-danger/10",
                      revealed && !isCorrect && !isWrong && "opacity-60"
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 w-6 h-6 shrink-0 rounded-md text-[12px] font-mono font-semibold flex items-center justify-center border transition-colors",
                        isChosen && !revealed && "bg-brand-400 border-brand-400 text-white",
                        isCorrect && "bg-success border-success text-white",
                        isWrong && "bg-danger border-danger text-white",
                        !isChosen && !revealed && "bg-white/5 border-border-soft text-ink-secondary"
                      )}
                    >
                      {isCorrect ? <Check className="w-3.5 h-3.5" /> : isWrong ? <X className="w-3.5 h-3.5" /> : opt.id.toUpperCase()}
                    </span>
                    <span className="text-[14.5px] text-ink-primary leading-relaxed">
                      {opt.text}
                    </span>
                  </button>
                );
              })}
            </div>

            {!revealed && (
              <div className="mt-5">
                <Button onClick={submit} disabled={!chosen} className="w-full sm:w-auto sm:ml-auto sm:flex">
                  {showFeedback ? "Confirmar resposta" : isLast ? "Finalizar" : "Próxima"}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Feedback panel */}
      <AnimatePresence>
        {revealed && showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.35 }}
          >
            <Card
              className={cn(
                "mt-4 p-4 sm:p-6 border-l-4",
                chosen === q.correctAnswerId
                  ? "border-l-success"
                  : "border-l-danger"
              )}
            >
              <div className="flex items-center gap-2 mb-2">
                {chosen === q.correctAnswerId ? (
                  <span className="inline-flex items-center gap-1.5 text-success font-semibold text-sm">
                    <Check className="w-4 h-4" />
                    Resposta correta
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-danger font-semibold text-sm">
                    <X className="w-4 h-4" />
                    Incorreto · resposta certa: {q.correctAnswerId.toUpperCase()}
                  </span>
                )}
              </div>
              <p className="text-[14px] text-ink-primary/95 leading-relaxed">{q.explanation}</p>
              <div className="mt-3 inline-flex items-center gap-1.5 text-[11.5px] text-ink-muted">
                <Sparkles className="w-3 h-3 text-brand-400" /> Referência: {q.reference}
              </div>
              <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <Button variant="ghost" size="sm" onClick={() => toggleFlag(q.id)} className="w-full sm:w-auto justify-start">
                  {isFlagged ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                  {isFlagged ? "Desmarcar" : "Marcar para revisar"}
                </Button>
                <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 w-full sm:w-auto">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      setChosen(null);
                      setRevealed(false);
                      setStartedAt(Date.now());
                    }}
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Refazer
                  </Button>
                  <Button onClick={advance}>
                    {isLast ? "Concluir" : "Próxima"}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
