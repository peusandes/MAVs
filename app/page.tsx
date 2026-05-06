"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Activity,
  BookCheck,
  Clock,
  ListChecks,
  Sparkles,
  Trophy,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

import { StatCard } from "@/components/dashboard/StatCard";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { ModulePerformanceBars } from "@/components/dashboard/ModulePerformanceBars";
import { DifficultyBreakdown } from "@/components/dashboard/DifficultyBreakdown";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { StudyHeatmap } from "@/components/dashboard/StudyHeatmap";
import { ContinueCard } from "@/components/dashboard/ContinueCard";
import { ResetButton } from "@/components/dashboard/ResetButton";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CircularProgress } from "@/components/ui/progress";

import { useProgress } from "@/lib/store/progress";
import {
  buildDifficultyStats,
  buildHeatmap,
  buildModuleStats,
  buildPerformanceSeries,
  recentAnswers,
  totalStudyMs,
} from "@/lib/utils/stats";
import { formatDuration } from "@/lib/utils/format";
import { modules } from "@/data/modules";
import { questions, totalQuestions } from "@/data/questions";

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.05, ease: [0.2, 0.8, 0.2, 1] as any },
  }),
};

export default function DashboardPage() {
  const answers = useProgress((s) => s.answers);
  const completed = useProgress((s) => s.completedModules);
  const sessions = useProgress((s) => s.sessions);
  const lastModule = useProgress((s) => s.lastModule);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => setHydrated(true), []);

  const totalAnswered = Object.keys(answers).length;
  const correctCount = Object.values(answers).filter((a) => a.correct).length;
  const accuracy = totalAnswered ? Math.round((correctCount / totalAnswered) * 100) : 0;
  const completionPct = Math.round((completed.length / modules.length) * 100);
  const studyMs = totalStudyMs(sessions);

  const questionsByModule = React.useMemo(() => {
    return modules.reduce<Record<string, { id: string }[]>>((acc, m) => {
      acc[m.slug] = questions.filter((q) => q.module === m.slug).map(({ id }) => ({ id }));
      return acc;
    }, {});
  }, []);

  const moduleStats = React.useMemo(
    () => buildModuleStats(answers, questionsByModule),
    [answers, questionsByModule]
  );
  const difficultyStats = React.useMemo(() => buildDifficultyStats(answers), [answers]);
  const heatmap = React.useMemo(() => buildHeatmap(sessions), [sessions]);
  const performanceSeries = React.useMemo(
    () => buildPerformanceSeries(sessions),
    [sessions]
  );
  const recents = React.useMemo(() => recentAnswers(answers, 10), [answers]);

  const continueModule = React.useMemo(() => {
    if (lastModule) {
      const m = modules.find((m) => m.slug === lastModule);
      if (m) return m;
    }
    const next = modules.find((m) => !completed.includes(m.slug));
    return next ?? modules[0];
  }, [lastModule, completed]);

  // Rolling sparklines (last up to 7 sessions)
  const lastSeries = performanceSeries.slice(-7).map((s) => s.pct);
  const answeredSpark = performanceSeries.slice(-7).map((s) => s.answered);

  // Trend: compare last vs preceding session pct
  const trendPct = (() => {
    if (performanceSeries.length < 2) return undefined;
    const last = performanceSeries[performanceSeries.length - 1].pct;
    const prev = performanceSeries[performanceSeries.length - 2].pct;
    return last - prev;
  })();

  return (
    <div className="space-y-7">
      {/* Hero */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={0}
        className="relative overflow-hidden rounded-2xl glass-strong p-6 sm:p-8"
      >
        <div
          aria-hidden
          className="absolute -top-32 -right-24 w-[460px] h-[460px] rounded-full bg-brand-gradient opacity-22 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute -bottom-32 -left-16 w-[360px] h-[360px] rounded-full bg-brand-400/15 blur-3xl"
        />

        <div className="relative flex flex-col xl:flex-row xl:items-end gap-6 xl:gap-10">
          <div className="flex-1 min-w-0">
            <Badge tone="blue" className="mb-3">
              <Sparkles className="w-3 h-3" />
              Sessão LANC · Liga de Neurocirurgia da Bahia
            </Badge>

            <h1 className="text-[30px] sm:text-[42px] font-semibold tracking-tight leading-[1.05] text-balance">
              MAVs Cerebrais
              <span className="block text-ink-secondary font-medium text-[20px] sm:text-[24px] mt-1">
                Material didático · {modules.length} módulos · {totalQuestions} questões
              </span>
            </h1>

            <p className="text-[13.5px] sm:text-[14px] text-ink-secondary mt-3 max-w-[640px]">
              Conteúdo baseado em <em>Greenberg's Handbook of Neurosurgery</em>, capítulos 90, 115 e 116.
            </p>

            {/* Authors */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-[760px]">
              <AuthorChip
                initials="PS"
                name="Pedro Sandes Pereira"
                role="Apresentação"
              />
              <AuthorChip
                initials="GN"
                name="Guilherme Nery"
                role="Apresentação"
              />
              <AuthorChip
                initials="AD"
                name="Dr. Alexandre Drayton"
                role="Orientação · Neuroint."
                highlight
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 xl:flex-col xl:items-stretch xl:w-[220px]">
            <Link
              href="/questoes"
              className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl bg-brand-gradient text-white text-sm font-medium shadow-glow hover:brightness-110 transition-all"
            >
              Praticar questões
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/simulado"
              className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl border border-border-soft bg-white/5 text-sm hover:bg-white/8 transition-colors"
            >
              <Trophy className="w-4 h-4 text-warning" />
              Iniciar simulado
            </Link>
            <Link
              href="/modulos"
              className="hidden xl:inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl border border-border-soft text-ink-secondary hover:text-ink-primary text-sm transition-colors"
            >
              Ver módulos
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Stat row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {hydrated && (
          <>
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={1}>
              <StatCard
                icon={ListChecks}
                label="Questões respondidas"
                value={totalAnswered}
                trend={answeredSpark.length > 1 ? answeredSpark[answeredSpark.length - 1] - answeredSpark[0] : undefined}
                trendLabel={`de ${totalQuestions}`}
                spark={answeredSpark.length > 1 ? answeredSpark : undefined}
                accent="blue"
              />
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={2}>
              <StatCard
                icon={Activity}
                label="% de aproveitamento"
                value={accuracy}
                suffix="%"
                trend={trendPct}
                trendLabel={trendPct === undefined ? undefined : "vs sessão anterior"}
                spark={lastSeries.length > 1 ? lastSeries : undefined}
                accent="success"
              />
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3}>
              <StatCard
                icon={BookCheck}
                label={`Módulos concluídos · ${completed.length}/${modules.length}`}
                value={completionPct}
                suffix="%"
                accent="warning"
              />
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4}>
              <StatCard
                icon={Clock}
                label="Tempo total estudado"
                value={Math.round(studyMs / 60000)}
                suffix=" min"
                accent="blue"
              />
            </motion.div>
          </>
        )}
      </div>

      {/* Performance chart + continue card */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <Card className="xl:col-span-2 p-6">
          <CardHeader>
            <div>
              <CardTitle>Desempenho ao longo do tempo</CardTitle>
              <CardDescription>Aproveitamento (%) por sessão de estudo</CardDescription>
            </div>
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="7d">7 dias</TabsTrigger>
                <TabsTrigger value="30d">30 dias</TabsTrigger>
                <TabsTrigger value="all">Tudo</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          {hydrated && <PerformanceChart data={performanceSeries} />}
        </Card>

        <ContinueCard
          module={continueModule}
          total={modules.length}
          completed={completed.length}
        />
      </div>

      {/* Module bars + difficulty + heatmap */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <Card className="xl:col-span-2 p-6">
          <CardHeader>
            <div>
              <CardTitle>Desempenho por módulo</CardTitle>
              <CardDescription>Acertos vs total respondido em cada capítulo</CardDescription>
            </div>
            <CircularProgress value={completionPct} label={`${completionPct}%`} />
          </CardHeader>
          {hydrated && <ModulePerformanceBars stats={moduleStats} />}
        </Card>

        <div className="space-y-5">
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Por dificuldade</CardTitle>
                <CardDescription>Aproveitamento por nível</CardDescription>
              </div>
            </CardHeader>
            {hydrated && <DifficultyBreakdown data={difficultyStats} />}
          </Card>

          <Card>
            <CardHeader>
              <div>
                <CardTitle>Atividade — últimos 91 dias</CardTitle>
                <CardDescription>Intensidade de estudo</CardDescription>
              </div>
            </CardHeader>
            {hydrated && <StudyHeatmap data={heatmap} />}
          </Card>
        </div>
      </div>

      {/* Recent activity */}
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Atividade recente</CardTitle>
            <CardDescription>Últimas 10 questões respondidas</CardDescription>
          </div>
          <ResetButton />
        </CardHeader>
        {hydrated && <RecentActivity items={recents} />}
      </Card>
    </div>
  );
}

function AuthorChip({
  initials,
  name,
  role,
  highlight,
}: {
  initials: string;
  name: string;
  role: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${
        highlight
          ? "bg-brand-400/10 border-brand-400/30 shadow-glow"
          : "bg-white/4 border-border-soft hover:bg-white/8"
      }`}
    >
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center text-[12px] font-semibold tracking-tight shrink-0 ${
          highlight ? "bg-brand-gradient text-white" : "bg-white/10 text-ink-primary"
        }`}
      >
        {initials}
      </div>
      <div className="leading-tight min-w-0">
        <div className="text-[10px] uppercase tracking-widest font-semibold text-brand-400">
          {role}
        </div>
        <div className="text-[13.5px] font-semibold text-ink-primary truncate mt-0.5">
          {name}
        </div>
      </div>
    </div>
  );
}
