import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer
      className="mt-10 border-t border-border-soft px-4 sm:px-5 lg:px-8 py-5 sm:py-6 text-[11.5px] sm:text-[12px] text-ink-secondary"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 1.25rem)" }}
    >
      <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Heart className="w-3.5 h-3.5 text-brand-400" />
          <span>
            <strong className="text-ink-primary font-semibold">Sessão LANC</strong> · Liga de Neurocirurgia da Bahia
          </span>
        </div>
        <div className="leading-relaxed">
          Apresentação: <span className="text-ink-primary">Pedro Sandes Pereira</span> &amp;{" "}
          <span className="text-ink-primary">Guilherme Nery</span> · Orientação:{" "}
          <span className="text-ink-primary">Dr. Alexandre Drayton</span>
        </div>
        <div className="text-ink-muted">
          Baseado em <em>Greenberg's Handbook of Neurosurgery</em>
        </div>
      </div>
    </footer>
  );
}
