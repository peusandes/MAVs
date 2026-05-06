"use client";

import * as React from "react";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  PlayCircle,
  Tag,
} from "lucide-react";

import { modules } from "@/data/modules";
import { questions } from "@/data/questions";
import { useProgress } from "@/lib/store/progress";
import { ContentRenderer } from "@/components/modulos/ContentRenderer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

export default function ModuleDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;
  const idx = modules.findIndex((m) => m.slug === slug);
  const m = idx >= 0 ? modules[idx] : null;
  const prev = idx > 0 ? modules[idx - 1] : null;
  const next = idx >= 0 && idx < modules.length - 1 ? modules[idx + 1] : null;

  const completed = useProgress((s) => s.completedModules);
  const markComplete = useProgress((s) => s.markModuleComplete);
  const unmark = useProgress((s) => s.unmarkModuleComplete);
  const setLast = useProgress((s) => s.setLastModule);

  React.useEffect(() => {
    if (m) setLast(m.slug);
  }, [m, setLast]);

  if (!m) {
    notFound();
    return null;
  }

  const isDone = completed.includes(m.slug);
  const moduleQuestions = questions.filter((q) => q.module === m.slug);

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-[860px] mx-auto"
    >
      <Link
        href="/modulos"
        className="inline-flex items-center gap-1.5 text-[12.5px] text-ink-secondary hover:text-ink-primary mb-4"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Todos os módulos
      </Link>

      <header className="space-y-3">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge tone="blue">
            <span className="font-mono">Módulo {String(m.number).padStart(2, "0")}</span>
          </Badge>
          {m.tags.map((t) => (
            <Badge key={t} tone="muted">
              <Tag className="w-3 h-3" /> {t}
            </Badge>
          ))}
        </div>
        <h1 className="text-[26px] sm:text-[32px] lg:text-[34px] font-semibold tracking-tight leading-tight text-balance">
          {m.title}
        </h1>
        <p className="text-[14px] sm:text-[15px] text-ink-secondary max-w-[680px] text-balance">
          {m.subtitle}
        </p>
        <div className="flex items-center gap-3 sm:gap-4 text-[11.5px] sm:text-[12px] text-ink-muted flex-wrap">
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {m.readingMinutes} min
          </span>
          <span aria-hidden>·</span>
          <span>{m.reference}</span>
          <span aria-hidden>·</span>
          <span>{moduleQuestions.length} questões</span>
        </div>
      </header>

      <div className="my-7 h-px bg-border-soft" />

      <ContentRenderer blocks={m.blocks} />

      {/* Footer actions */}
      <Card className="mt-10">
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Button
              variant={isDone ? "secondary" : "primary"}
              className="w-full"
              onClick={() => {
                if (isDone) {
                  unmark(m.slug);
                  toast.message("Marcação removida.");
                } else {
                  markComplete(m.slug);
                  toast.success("Módulo concluído!");
                }
              }}
            >
              <CheckCircle2 className="w-4 h-4" />
              {isDone ? "Desmarcar concluído" : "Marcar como concluído"}
            </Button>
            {moduleQuestions.length > 0 && (
              <Link href={`/questoes/praticar?module=${m.slug}`} className="w-full">
                <Button variant="outline" className="w-full">
                  <PlayCircle className="w-4 h-4" />
                  Praticar ({moduleQuestions.length})
                </Button>
              </Link>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-border-soft">
            {prev ? (
              <Link href={`/modulos/${prev.slug}`} className="w-full">
                <Button variant="ghost" size="sm" className="w-full justify-start truncate">
                  <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{prev.title}</span>
                </Button>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link href={`/modulos/${next.slug}`} className="w-full">
                <Button variant="ghost" size="sm" className="w-full justify-end truncate">
                  <span className="truncate">{next.title}</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                </Button>
              </Link>
            ) : (
              <span />
            )}
          </div>
        </div>
      </Card>
    </motion.article>
  );
}
