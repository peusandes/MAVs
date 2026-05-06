"use client";

import { motion } from "framer-motion";
import { modules } from "@/data/modules";
import { questions } from "@/data/questions";
import { ModuleCard } from "@/components/modulos/ModuleCard";
import { useProgress } from "@/lib/store/progress";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";

export default function ModulesPage() {
  const completed = useProgress((s) => s.completedModules);
  const answers = useProgress((s) => s.answers);

  return (
    <div className="space-y-6">
      <div>
        <Badge tone="blue" className="mb-2">
          <BookOpen className="w-3 h-3" />
          16 módulos · pt-BR
        </Badge>
        <h1 className="text-[26px] sm:text-[32px] font-semibold tracking-tight">Módulos didáticos</h1>
        <p className="text-[13.5px] sm:text-[14px] text-ink-secondary mt-1.5 max-w-[700px]">
          Conteúdo estruturado a partir de <em>Greenberg's Handbook of Neurosurgery</em>, capítulos 90 (Vascular Malformations), 115 (Radiation Therapy / SRS) e 116 (Endovascular Intervention) — apenas seções referentes a MAVs.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {modules.map((m, i) => {
          const moduleQuestions = questions.filter((q) => q.module === m.slug);
          const answered = moduleQuestions.filter((q) => answers[q.id]);
          const correct = answered.filter((q) => answers[q.id]?.correct).length;
          const accuracy = answered.length ? Math.round((correct / answered.length) * 100) : 0;
          return (
            <motion.div
              key={m.slug}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: Math.min(i, 8) * 0.04 }}
            >
              <ModuleCard
                module={m}
                completed={completed.includes(m.slug)}
                questionsCount={moduleQuestions.length}
                accuracy={accuracy}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
