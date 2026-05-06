"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Library, Search } from "lucide-react";
import { glossary } from "@/data/glossary";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export default function GlossaryPage() {
  const [q, setQ] = React.useState("");
  const filtered = React.useMemo(() => {
    if (!q.trim()) return glossary;
    const lc = q.trim().toLowerCase();
    return glossary.filter(
      (t) => t.term.toLowerCase().includes(lc) || t.definition.toLowerCase().includes(lc)
    );
  }, [q]);

  // Group by first letter
  const groups = React.useMemo(() => {
    const map = new Map<string, typeof glossary>();
    [...filtered]
      .sort((a, b) => a.term.localeCompare(b.term, "pt-BR"))
      .forEach((t) => {
        const k = t.term[0].toUpperCase();
        if (!map.has(k)) map.set(k, []);
        map.get(k)!.push(t);
      });
    return Array.from(map.entries());
  }, [filtered]);

  return (
    <div className="space-y-6">
      <div>
        <Badge tone="blue" className="mb-2">
          <Library className="w-3 h-3" />
          {glossary.length} termos
        </Badge>
        <h1 className="text-[26px] sm:text-[32px] font-semibold tracking-tight">Glossário</h1>
        <p className="text-[13.5px] sm:text-[14px] text-ink-secondary mt-1.5 max-w-[640px]">
          Definições rápidas dos principais termos usados ao longo do conteúdo.
        </p>
      </div>

      <div className="relative max-w-[420px]">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar termo ou conteúdo…"
          className="pl-9"
        />
      </div>

      {groups.map(([letter, items]) => (
        <section key={letter} className="space-y-3">
          <h2 className="text-[20px] font-mono text-brand-400 mt-2">{letter}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {items.map((t, i) => (
              <motion.div
                key={t.term}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: Math.min(i, 6) * 0.03 }}
              >
                <Card className="h-full hover:border-brand-400/30 hover:shadow-glow transition-all">
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-[15.5px] font-semibold text-ink-primary">{t.term}</h3>
                    {t.reference && (
                      <span className="text-[10.5px] text-ink-muted font-mono">{t.reference}</span>
                    )}
                  </div>
                  <p className="text-[13.5px] text-ink-secondary leading-relaxed mt-1.5">
                    {t.definition}
                  </p>
                  {t.related && t.related.length > 0 && (
                    <div className="mt-3 flex gap-1.5 flex-wrap">
                      {t.related.map((r) => (
                        <Badge key={r} tone="muted">
                          {r}
                        </Badge>
                      ))}
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      ))}

      {filtered.length === 0 && (
        <div className="text-center text-[14px] text-ink-secondary py-12">
          Nenhum termo encontrado para “{q}”.
        </div>
      )}
    </div>
  );
}
