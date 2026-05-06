import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center text-center">
      <div>
        <div className="text-[80px] font-mono font-semibold leading-none bg-brand-gradient bg-clip-text text-transparent">
          404
        </div>
        <p className="text-[15px] text-ink-secondary mt-3">
          A página que você procurava não existe.
        </p>
        <div className="mt-5">
          <Link href="/">
            <Button>
              <Home className="w-4 h-4" />
              Voltar ao dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
