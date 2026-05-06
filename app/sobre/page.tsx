"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  BookCheck,
  GraduationCap,
  HeartPulse,
  Users,
  ExternalLink,
  Sparkles,
  Trophy,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { modules } from "@/data/modules";
import { questions } from "@/data/questions";
import { glossary } from "@/data/glossary";

export default function AboutPage() {
  return (
    <div className="space-y-8 max-w-[920px] mx-auto">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <Badge tone="blue" className="mb-2">
          <Sparkles className="w-3 h-3" /> Sobre o projeto
        </Badge>
        <h1 className="text-[26px] sm:text-[32px] lg:text-[34px] font-semibold tracking-tight leading-tight text-balance">
          MAVs Cerebrais — Sessão da Liga de Neurocirurgia da Bahia
        </h1>
        <p className="text-[14px] sm:text-[15px] text-ink-secondary mt-3 max-w-[700px] text-balance">
          Site educacional construído para apoiar a apresentação e o estudo das
          Malformações Arteriovenosas Cerebrais. Reúne 16 módulos didáticos,
          calculadoras interativas (Spetzler-Martin, Lawton-Young, VRAS, risco
          vitalício) e {questions.length} questões com explicações detalhadas.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5">
          <div className="text-brand-400 text-[11px] uppercase tracking-widest font-semibold mb-1 flex items-center gap-1.5">
            <BookCheck className="w-3.5 h-3.5" /> Módulos
          </div>
          <div className="text-[26px] font-mono font-semibold">{modules.length}</div>
          <p className="text-[12px] text-ink-secondary mt-1">capítulos didáticos</p>
        </Card>
        <Card className="p-5">
          <div className="text-brand-400 text-[11px] uppercase tracking-widest font-semibold mb-1 flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5" /> Questões
          </div>
          <div className="text-[26px] font-mono font-semibold">{questions.length}</div>
          <p className="text-[12px] text-ink-secondary mt-1">com feedback e referência</p>
        </Card>
        <Card className="p-5">
          <div className="text-brand-400 text-[11px] uppercase tracking-widest font-semibold mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Glossário
          </div>
          <div className="text-[26px] font-mono font-semibold">{glossary.length}</div>
          <p className="text-[12px] text-ink-secondary mt-1">termos técnicos</p>
        </Card>
      </div>

      <Card className="p-7">
        <div className="flex items-center gap-2 mb-3">
          <GraduationCap className="w-4 h-4 text-brand-400" />
          <h2 className="text-[18px] font-semibold tracking-tight">Liga de Neurocirurgia da Bahia (LANC)</h2>
        </div>
        <p className="text-[14px] text-ink-secondary leading-relaxed">
          A LANC é uma liga acadêmica voltada ao estudo, ensino e divulgação da neurocirurgia entre
          estudantes e residentes. Esta sessão apresenta as MAVs cerebrais — uma das doenças
          neurovasculares mais desafiadoras do ponto de vista clínico-decisório, pelo seu risco de
          hemorragia, espectro de apresentações e múltiplas modalidades terapêuticas.
        </p>
      </Card>

      <Card className="p-7">
        <div className="flex items-center gap-2 mb-3">
          <Users className="w-4 h-4 text-brand-400" />
          <h2 className="text-[18px] font-semibold tracking-tight">Equipe</h2>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Person
            initials="PS"
            name="Pedro Sandes Pereira"
            role="Apresentador"
          />
          <Person
            initials="GN"
            name="Guilherme Nery"
            role="Apresentador"
          />
          <Person
            initials="AD"
            name="Dr. Alexandre Drayton"
            role="Orientador · Neurologista Intervencionista"
            highlight
          />
        </ul>
      </Card>

      <Card className="p-7">
        <div className="flex items-center gap-2 mb-3">
          <HeartPulse className="w-4 h-4 text-brand-400" />
          <h2 className="text-[18px] font-semibold tracking-tight">Fontes do conteúdo</h2>
        </div>
        <p className="text-[14px] text-ink-secondary leading-relaxed">
          Todo o conteúdo médico foi traduzido, condensado e adaptado a partir de{" "}
          <em>Greenberg's Handbook of Neurosurgery</em>, especialmente:
        </p>
        <ul className="mt-3 text-[14px] text-ink-primary/95 space-y-1.5">
          <li>· Capítulo 90 — <strong>Vascular Malformations</strong> (seções de MAV)</li>
          <li>· Capítulo 115 — <strong>Radiation Therapy / SRS</strong> (seções de MAV)</li>
          <li>· Capítulo 116 — <strong>Endovascular Intervention</strong> (seções de MAV)</li>
        </ul>
        <p className="text-[12px] text-ink-muted mt-4">
          O material aqui apresentado é estritamente educacional, voltado para discussão acadêmica em ambiente de Liga.
          Não substitui leitura primária, julgamento clínico ou consulta a guidelines atualizadas.
        </p>
      </Card>

      <div className="flex flex-wrap gap-2">
        <Link href="/">
          <Button variant="primary">
            Ir para o Dashboard
          </Button>
        </Link>
        <Link href="/modulos">
          <Button variant="secondary">
            Começar pelo Módulo 1
            <ExternalLink className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

function Person({
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
    <li
      className={`flex items-center gap-3 p-3 rounded-xl border ${
        highlight
          ? "bg-brand-400/8 border-brand-400/25"
          : "bg-white/3 border-border-soft"
      }`}
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-[12px] font-semibold ${
        highlight ? "bg-brand-gradient text-white" : "bg-white/8 text-ink-primary"
      }`}>
        {initials}
      </div>
      <div className="leading-tight">
        <div className="text-[14px] font-semibold">{name}</div>
        <div className="text-[12px] text-ink-secondary">{role}</div>
      </div>
    </li>
  );
}
