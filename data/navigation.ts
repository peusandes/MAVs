import {
  LayoutDashboard,
  BookOpen,
  HelpCircle,
  Timer,
  Library,
  Info,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  description?: string;
};

export const primaryNav: NavItem[] = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard, description: "Visão geral" },
  { href: "/modulos", label: "Módulos", icon: BookOpen, description: "16 capítulos" },
  { href: "/questoes", label: "Banco de Questões", icon: HelpCircle, description: "Praticar" },
  { href: "/simulado", label: "Simulado", icon: Timer, description: "Cronometrado" },
  { href: "/glossario", label: "Glossário", icon: Library, description: "Termos técnicos" },
  { href: "/sobre", label: "Sobre", icon: Info, description: "Projeto LANC" },
];
