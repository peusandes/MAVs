"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Lock, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { useProfile } from "@/lib/store/profile";
import { saveProfile, skipOnboarding } from "@/lib/api/profile";

export function OnboardingGate() {
  const profile = useProfile((s) => s.profile);
  const skipped = useProfile((s) => s.skipped);
  const [hydrated, setHydrated] = React.useState(false);
  const [name, setName] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => setHydrated(true), []);

  const showGate = hydrated && !profile && !skipped;

  React.useEffect(() => {
    if (showGate) {
      // Lock body scroll while gate is open
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => inputRef.current?.focus());
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [showGate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed || submitting) return;
    setSubmitting(true);
    try {
      const profile = await saveProfile({ name: trimmed });
      const first = profile.name.split(" ")[0];
      toast.success(`Bem-vindo(a), ${first}.`);
    } catch (err) {
      toast.error("Não foi possível salvar. Tente novamente.");
      setSubmitting(false);
    }
  };

  const onSkip = async () => {
    await skipOnboarding();
  };

  return (
    <AnimatePresence>
      {showGate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[200] overflow-y-auto"
          aria-modal="true"
          role="dialog"
          aria-labelledby="onboarding-title"
        >
          {/* Canvas */}
          <div className="absolute inset-0 bg-[#08080d]">
            {/* Layered atmospheric background */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(720px circle at 18% 12%, rgba(91,157,255,0.32), transparent 60%), radial-gradient(900px circle at 82% 88%, rgba(30,58,138,0.34), transparent 55%), radial-gradient(420px circle at 50% 60%, rgba(91,157,255,0.08), transparent 70%)",
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
                backgroundSize: "3px 3px",
              }}
            />
          </div>

          <div className="relative min-h-full flex items-center justify-center px-5 py-10 sm:py-16">
            <motion.section
              initial={{ y: 28, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
              className="relative w-full max-w-[560px]"
            >
              {/* Card */}
              <div className="glass-strong rounded-[28px] border border-white/8 px-6 sm:px-10 py-9 sm:py-12 shadow-[0_30px_120px_-30px_rgba(91,157,255,0.45)]">
                {/* Top mark */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                  className="flex items-center gap-3 mb-7 sm:mb-8"
                >
                  <Image
                    src="/lanc-logo.png"
                    alt="Liga Acadêmica de Neurocirurgia da Bahia"
                    width={956}
                    height={661}
                    priority
                    className="h-auto w-[88px] select-none pointer-events-none"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="h-px bg-gradient-to-r from-white/15 via-white/8 to-transparent" />
                    <div className="mt-2 text-[10px] uppercase tracking-[0.22em] text-brand-400 font-semibold">
                      Sessão · MAVs Cerebrais
                    </div>
                  </div>
                </motion.div>

                {/* Eyebrow */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.12 }}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-400/10 border border-brand-400/25 text-[10.5px] uppercase tracking-widest text-brand-400 font-semibold mb-5"
                >
                  <Sparkles className="w-3 h-3" />
                  Antes de começar
                </motion.div>

                {/* Headline (serif) */}
                <motion.h1
                  id="onboarding-title"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.18 }}
                  className="font-display text-[42px] sm:text-[54px] leading-[0.95] tracking-tight text-ink-primary"
                  style={{ fontVariationSettings: "'opsz' 100, 'SOFT' 60" }}
                >
                  Bem-vindo
                  <span className="block text-brand-400 italic font-light">
                    à sessão.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.28 }}
                  className="mt-5 text-[14.5px] sm:text-[15px] text-ink-secondary leading-relaxed max-w-[460px]"
                >
                  Deixe seu nome para que seu progresso, anotações e desempenho
                  fiquem salvos quando voltar a estudar. Nada é compartilhado —
                  é apenas para identificar sua sessão.
                </motion.p>

                {/* Form */}
                <motion.form
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.36 }}
                  onSubmit={submit}
                  className="mt-8 space-y-3"
                >
                  <div className="relative group">
                    <label
                      htmlFor="name"
                      className="block text-[10.5px] uppercase tracking-[0.22em] text-ink-muted font-semibold mb-2"
                    >
                      Como podemos te chamar?
                    </label>
                    <input
                      ref={inputRef}
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="given-name"
                      placeholder="Ex.: Pedro Sandes"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      maxLength={60}
                      disabled={submitting}
                      className="w-full h-14 px-4 rounded-2xl bg-white/4 border border-white/12 text-[18px] text-ink-primary placeholder:text-ink-muted/70 focus:outline-none focus:border-brand-400/60 focus:bg-white/6 focus:ring-4 focus:ring-brand-400/15 transition-all disabled:opacity-50"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/4 group-focus-within:opacity-0 transition-opacity"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!name.trim() || submitting}
                    className="group/btn relative w-full h-14 rounded-2xl bg-brand-gradient text-white font-semibold text-[15px] overflow-hidden shadow-[0_18px_50px_-18px_rgba(91,157,255,0.7)] hover:brightness-110 active:brightness-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <span className="relative z-10 inline-flex items-center justify-center gap-2">
                      {submitting ? "Entrando…" : "Entrar na sessão"}
                      {!submitting && (
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
                      )}
                    </span>
                    <span
                      aria-hidden
                      className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity"
                    />
                  </button>
                </motion.form>

                {/* Privacy + skip */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-[12px] text-ink-muted"
                >
                  <div className="inline-flex items-center gap-1.5">
                    <Lock className="w-3 h-3 text-brand-400" />
                    Salvo localmente neste dispositivo.
                  </div>
                  <button
                    type="button"
                    onClick={onSkip}
                    className="text-ink-secondary hover:text-brand-400 transition-colors underline-offset-4 hover:underline"
                  >
                    Continuar como visitante
                  </button>
                </motion.div>
              </div>

              {/* Footer line */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-6 text-center text-[11px] text-ink-muted/80 font-mono tracking-wide"
              >
                Pedro Sandes Pereira · Guilherme Nery · Orientação Dr. Alexandre Drayton
              </motion.div>
            </motion.section>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
