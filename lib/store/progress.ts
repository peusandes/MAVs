"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { todayKey } from "@/lib/utils/format";

export type AnswerRecord = {
  questionId: string;
  module: string;
  difficulty: "facil" | "medio" | "dificil";
  correct: boolean;
  chosenId: string;
  timeMs: number;
  at: number;
};

export type SessionRecord = {
  date: string;
  answeredCount: number;
  correctCount: number;
  durationMs: number;
};

export type SimuladoRun = {
  at: number;
  score: number;
  total: number;
  durationMs: number;
  perModule: Record<string, { correct: number; total: number }>;
};

type ProgressState = {
  answers: Record<string, AnswerRecord>;
  flagged: Record<string, true>;
  completedModules: string[];
  sessions: SessionRecord[];
  lastModule?: string;
  simuladoRuns: SimuladoRun[];

  recordAnswer: (a: AnswerRecord) => void;
  toggleFlag: (questionId: string) => void;
  markModuleComplete: (slug: string) => void;
  unmarkModuleComplete: (slug: string) => void;
  setLastModule: (slug: string) => void;
  recordSimuladoRun: (run: SimuladoRun) => void;
  resetAll: () => void;
};

const initial = {
  answers: {},
  flagged: {},
  completedModules: [],
  sessions: [],
  lastModule: undefined,
  simuladoRuns: [],
};

export const useProgress = create<ProgressState>()(
  persist(
    (set) => ({
      ...initial,

      recordAnswer: (a) =>
        set((state) => {
          const date = todayKey(new Date(a.at));
          const sessions = [...state.sessions];
          const idx = sessions.findIndex((s) => s.date === date);
          if (idx >= 0) {
            sessions[idx] = {
              ...sessions[idx],
              answeredCount: sessions[idx].answeredCount + 1,
              correctCount: sessions[idx].correctCount + (a.correct ? 1 : 0),
              durationMs: sessions[idx].durationMs + a.timeMs,
            };
          } else {
            sessions.push({
              date,
              answeredCount: 1,
              correctCount: a.correct ? 1 : 0,
              durationMs: a.timeMs,
            });
          }
          return {
            answers: { ...state.answers, [a.questionId]: a },
            sessions,
          };
        }),

      toggleFlag: (questionId) =>
        set((state) => {
          const next = { ...state.flagged };
          if (next[questionId]) delete next[questionId];
          else next[questionId] = true;
          return { flagged: next };
        }),

      markModuleComplete: (slug) =>
        set((state) =>
          state.completedModules.includes(slug)
            ? state
            : { completedModules: [...state.completedModules, slug] }
        ),

      unmarkModuleComplete: (slug) =>
        set((state) => ({
          completedModules: state.completedModules.filter((s) => s !== slug),
        })),

      setLastModule: (slug) => set({ lastModule: slug }),

      recordSimuladoRun: (run) =>
        set((state) => ({ simuladoRuns: [run, ...state.simuladoRuns].slice(0, 50) })),

      resetAll: () => set({ ...initial }),
    }),
    {
      name: "mavs-lanc-progress",
      version: 1,
    }
  )
);
