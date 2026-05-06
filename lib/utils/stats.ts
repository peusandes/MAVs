import type { AnswerRecord, SessionRecord } from "@/lib/store/progress";
import { todayKey } from "@/lib/utils/format";

export type ModuleStats = {
  slug: string;
  total: number;
  correct: number;
  wrong: number;
  pct: number;
};

export function buildModuleStats(
  answers: Record<string, AnswerRecord>,
  questionsByModule: Record<string, { id: string }[]>
): ModuleStats[] {
  return Object.keys(questionsByModule).map((slug) => {
    const qs = questionsByModule[slug];
    let correct = 0;
    let wrong = 0;
    qs.forEach((q) => {
      const a = answers[q.id];
      if (!a) return;
      if (a.correct) correct++;
      else wrong++;
    });
    const total = correct + wrong;
    return {
      slug,
      total,
      correct,
      wrong,
      pct: total ? Math.round((correct / total) * 100) : 0,
    };
  });
}

export function buildDifficultyStats(answers: Record<string, AnswerRecord>) {
  const out: Record<"facil" | "medio" | "dificil", { total: number; correct: number; pct: number }> = {
    facil: { total: 0, correct: 0, pct: 0 },
    medio: { total: 0, correct: 0, pct: 0 },
    dificil: { total: 0, correct: 0, pct: 0 },
  };
  Object.values(answers).forEach((a) => {
    const k = a.difficulty;
    out[k].total += 1;
    if (a.correct) out[k].correct += 1;
  });
  (Object.keys(out) as Array<keyof typeof out>).forEach((k) => {
    out[k].pct = out[k].total ? Math.round((out[k].correct / out[k].total) * 100) : 0;
  });
  return out;
}

export function buildHeatmap(sessions: SessionRecord[], days = 91): { date: string; count: number }[] {
  const map = new Map<string, number>();
  sessions.forEach((s) => map.set(s.date, s.answeredCount));
  const out: { date: string; count: number }[] = [];
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    const key = todayKey(d);
    out.push({ date: key, count: map.get(key) ?? 0 });
  }
  return out;
}

export function buildPerformanceSeries(sessions: SessionRecord[]) {
  return sessions
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((s) => ({
      date: s.date,
      pct: s.answeredCount ? Math.round((s.correctCount / s.answeredCount) * 100) : 0,
      answered: s.answeredCount,
    }));
}

export function totalStudyMs(sessions: SessionRecord[]): number {
  return sessions.reduce((acc, s) => acc + s.durationMs, 0);
}

export function recentAnswers(
  answers: Record<string, AnswerRecord>,
  limit = 10
): AnswerRecord[] {
  return Object.values(answers)
    .sort((a, b) => b.at - a.at)
    .slice(0, limit);
}
