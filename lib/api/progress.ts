/**
 * Progress API — sync wrapper around the local Zustand store.
 *
 * Each function:
 *   1. Updates the local store synchronously (optimistic UI).
 *   2. Pushes the change to Supabase (best-effort, fire-and-forget).
 *
 * Failures in the remote write never break the UI — the local store
 * remains the source of truth for the current session. On the next page
 * load, BackgroundSync re-hydrates the store from Supabase, so partial
 * writes are eventually consistent.
 */

import {
  useProgress,
  type AnswerRecord,
  type SimuladoRun,
} from "@/lib/store/progress";
import { ensureAuth, supabase, isSupabaseConfigured } from "@/lib/supabase/client";

async function authedUserId(): Promise<string | null> {
  if (!isSupabaseConfigured || !supabase) return null;
  const session = await ensureAuth();
  return session?.user.id ?? null;
}

export async function recordAnswer(input: AnswerRecord): Promise<void> {
  // Local first
  useProgress.getState().recordAnswer(input);

  const userId = await authedUserId();
  if (!userId || !supabase) return;
  try {
    await supabase.from("answers").upsert(
      {
        user_id: userId,
        question_id: input.questionId,
        module: input.module,
        difficulty: input.difficulty,
        correct: input.correct,
        chosen_id: input.chosenId,
        time_ms: input.timeMs,
        answered_at: new Date(input.at).toISOString(),
      },
      { onConflict: "user_id,question_id" }
    );
  } catch (err: any) {
    console.warn("[progress] recordAnswer remote failed:", err?.message);
  }
}

export async function toggleFlag(questionId: string): Promise<void> {
  useProgress.getState().toggleFlag(questionId);
  const flagged = !!useProgress.getState().flagged[questionId];

  const userId = await authedUserId();
  if (!userId || !supabase) return;
  try {
    await supabase
      .from("answers")
      .update({ flagged })
      .eq("user_id", userId)
      .eq("question_id", questionId);
  } catch (err: any) {
    console.warn("[progress] toggleFlag remote failed:", err?.message);
  }
}

export async function markModuleComplete(slug: string): Promise<void> {
  useProgress.getState().markModuleComplete(slug);

  const userId = await authedUserId();
  if (!userId || !supabase) return;
  try {
    await supabase.from("completed_modules").upsert(
      { user_id: userId, module_slug: slug },
      { onConflict: "user_id,module_slug" }
    );
  } catch (err: any) {
    console.warn("[progress] markModuleComplete remote failed:", err?.message);
  }
}

export async function unmarkModuleComplete(slug: string): Promise<void> {
  useProgress.getState().unmarkModuleComplete(slug);

  const userId = await authedUserId();
  if (!userId || !supabase) return;
  try {
    await supabase
      .from("completed_modules")
      .delete()
      .eq("user_id", userId)
      .eq("module_slug", slug);
  } catch (err: any) {
    console.warn("[progress] unmarkModuleComplete remote failed:", err?.message);
  }
}

export async function setLastModule(slug: string): Promise<void> {
  useProgress.getState().setLastModule(slug);

  const userId = await authedUserId();
  if (!userId || !supabase) return;
  try {
    await supabase.from("last_module").upsert(
      {
        user_id: userId,
        module_slug: slug,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    );
  } catch (err: any) {
    console.warn("[progress] setLastModule remote failed:", err?.message);
  }
}

export async function recordSimuladoRun(run: SimuladoRun): Promise<void> {
  useProgress.getState().recordSimuladoRun(run);

  const userId = await authedUserId();
  if (!userId || !supabase) return;
  try {
    await supabase.from("simulado_runs").insert({
      user_id: userId,
      score: run.score,
      total: run.total,
      duration_ms: run.durationMs,
      per_module: run.perModule,
      ran_at: new Date(run.at).toISOString(),
    });
  } catch (err: any) {
    console.warn("[progress] recordSimuladoRun remote failed:", err?.message);
  }
}

/**
 * Pulls the user's progress from Supabase and merges it into the local
 * store. Server data wins for keys present remotely; local-only entries
 * (made offline) are preserved.
 */
export async function hydrateProgress(): Promise<void> {
  const userId = await authedUserId();
  if (!userId || !supabase) return;

  try {
    const [
      { data: answers },
      { data: completed },
      { data: lastModule },
      { data: simulados },
    ] = await Promise.all([
      supabase.from("answers").select("*").eq("user_id", userId),
      supabase.from("completed_modules").select("module_slug").eq("user_id", userId),
      supabase
        .from("last_module")
        .select("module_slug")
        .eq("user_id", userId)
        .maybeSingle(),
      supabase
        .from("simulado_runs")
        .select("*")
        .eq("user_id", userId)
        .order("ran_at", { ascending: false })
        .limit(50),
    ]);

    // Build remote answer map
    const remoteAnswers: Record<string, AnswerRecord> = {};
    const remoteFlags: Record<string, true> = {};
    (answers ?? []).forEach((a: any) => {
      remoteAnswers[a.question_id] = {
        questionId: a.question_id,
        module: a.module,
        difficulty: a.difficulty,
        correct: a.correct,
        chosenId: a.chosen_id,
        timeMs: a.time_ms,
        at: new Date(a.answered_at).getTime(),
      };
      if (a.flagged) remoteFlags[a.question_id] = true;
    });

    const state = useProgress.getState();
    const mergedAnswers = { ...state.answers, ...remoteAnswers };
    // Server answers take precedence (canonical) but keep any local entries
    // that haven't synced yet.
    Object.entries(state.answers).forEach(([id, local]) => {
      const remote = remoteAnswers[id];
      if (!remote || local.at > remote.at) mergedAnswers[id] = local;
    });

    const mergedCompleted = Array.from(
      new Set([
        ...state.completedModules,
        ...((completed ?? []).map((c: any) => c.module_slug) as string[]),
      ])
    );

    const mergedFlags: Record<string, true> = { ...state.flagged };
    Object.keys(remoteFlags).forEach((k) => (mergedFlags[k] = true));

    const mergedSimulados =
      simulados && simulados.length > 0
        ? (simulados as any[]).map((r) => ({
            at: new Date(r.ran_at).getTime(),
            score: r.score,
            total: r.total,
            durationMs: Number(r.duration_ms),
            perModule: r.per_module ?? {},
          }))
        : state.simuladoRuns;

    useProgress.setState({
      answers: mergedAnswers,
      flagged: mergedFlags,
      completedModules: mergedCompleted,
      simuladoRuns: mergedSimulados,
      lastModule: (lastModule as any)?.module_slug ?? state.lastModule,
    });
  } catch (err: any) {
    console.warn("[progress] hydrate failed:", err?.message);
  }
}
