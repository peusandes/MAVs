"use client";

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { questions } from "@/data/questions";
import { useProgress } from "@/lib/store/progress";
import { QuestionRunner } from "@/components/questoes/QuestionRunner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function PracticeInner() {
  const search = useSearchParams();
  const router = useRouter();
  const answers = useProgress((s) => s.answers);
  const flagged = useProgress((s) => s.flagged);

  const ids = search.get("ids")?.split(",").filter(Boolean) ?? [];
  const moduleSingle = search.get("module");
  const moduleMulti = search.get("modules")?.split(",").filter(Boolean) ?? [];
  const diffs = (search.get("difficulties")?.split(",").filter(Boolean) ?? []) as Array<
    "facil" | "medio" | "dificil"
  >;
  const status = (search.get("status") ?? "all") as
    | "all"
    | "unanswered"
    | "correct"
    | "wrong"
    | "flagged";
  const shouldShuffle = !!search.get("shuffle");

  const pool = React.useMemo(() => {
    let list = questions.slice();
    if (ids.length) {
      list = list.filter((q) => ids.includes(q.id));
    } else {
      const wantedModules = moduleSingle ? [moduleSingle] : moduleMulti;
      if (wantedModules.length) list = list.filter((q) => wantedModules.includes(q.module));
      if (diffs.length) list = list.filter((q) => diffs.includes(q.difficulty));
      if (status === "unanswered") list = list.filter((q) => !answers[q.id]);
      if (status === "correct") list = list.filter((q) => answers[q.id]?.correct);
      if (status === "wrong") list = list.filter((q) => answers[q.id] && !answers[q.id].correct);
      if (status === "flagged") list = list.filter((q) => flagged[q.id]);
    }
    return shouldShuffle ? shuffle(list) : list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  if (pool.length === 0) {
    return (
      <Card className="max-w-[600px] mx-auto text-center p-10 mt-10">
        <h2 className="text-lg font-semibold mb-2">Nenhuma questão disponível</h2>
        <p className="text-[13px] text-ink-secondary mb-5">
          Os filtros não retornaram resultados. Volte e ajuste sua seleção.
        </p>
        <Link href="/questoes">
          <Button>
            <ArrowLeft className="w-4 h-4" />
            Voltar ao banco
          </Button>
        </Link>
      </Card>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <Link
          href="/questoes"
          className="inline-flex items-center gap-1.5 text-[12.5px] text-ink-secondary hover:text-ink-primary"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Banco de questões
        </Link>
      </div>
      <QuestionRunner
        questions={pool}
        showFeedback
        title="Modo prática"
        onFinish={() => router.push("/questoes")}
      />
    </div>
  );
}

export default function PracticePage() {
  return (
    <React.Suspense fallback={<div className="text-ink-secondary py-10 text-center">Carregando…</div>}>
      <PracticeInner />
    </React.Suspense>
  );
}
