"use client";

import * as React from "react";
import { useProgress } from "@/lib/store/progress";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { RotateCcw } from "lucide-react";
import { toast } from "sonner";

export function ResetButton() {
  const reset = useProgress((s) => s.resetAll);
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button variant="ghost" size="sm" onClick={() => setOpen(true)}>
        <RotateCcw className="w-3.5 h-3.5" />
        Resetar progresso
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <h3 className="text-base font-semibold mb-2">Resetar todo o progresso?</h3>
        <p className="text-sm text-ink-secondary mb-5">
          Esta ação remove todas as questões respondidas, módulos concluídos, sessões e simulados.
          Não pode ser desfeita.
        </p>
        <div className="flex items-center gap-2 justify-end">
          <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              reset();
              setOpen(false);
              toast.success("Progresso resetado.");
            }}
          >
            Confirmar reset
          </Button>
        </div>
      </Dialog>
    </>
  );
}
