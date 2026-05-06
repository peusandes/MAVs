import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { Shell } from "@/components/layout/Shell";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MAVs Cerebrais — Sessão LANC",
  description:
    "Site educacional sobre Malformações Arteriovenosas Cerebrais — Liga de Neurocirurgia da Bahia. Apresentação por Pedro Sandes Pereira & Guilherme Nery, orientação Dr. Alexandre Drayton.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${mono.variable}`}>
      <body className="font-sans antialiased">
        <Shell>{children}</Shell>
        <Toaster
          theme="dark"
          position="top-right"
          toastOptions={{
            className: "!glass-strong !text-ink-primary !border-border-soft",
          }}
        />
      </body>
    </html>
  );
}
