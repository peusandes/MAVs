# MAVs Cerebrais — Sessão LANC

Site educacional sobre **Malformações Arteriovenosas Cerebrais (MAVs)**, construído para a sessão da **Liga de Neurocirurgia da Bahia (LANC)**.

- Apresentação: **Pedro Sandes Pereira** & **Guilherme Nery**
- Orientação: **Dr. Alexandre Drayton** (Neurologista Intervencionista)
- Conteúdo baseado em *Greenberg's Handbook of Neurosurgery* (cap. 90, 115 e 116)

## Como rodar localmente

Pré-requisitos: **Node.js 18.17+** (recomendado 20+).

```bash
cd "/Users/pedrosandes/Documents/Claude trend/Claude MAV"
npm install
npm run dev
```

Abra http://localhost:3000.

## Funcionalidades

- 📚 **15 módulos didáticos** em pt-BR (parágrafos, listas, tabelas, callouts, gráficos de barras) — exclusivamente sobre MAV
- 🧮 **Calculadoras interativas:** Spetzler-Martin, Lawton-Young, VRAS, risco vitalício de hemorragia
- ❓ **61 questões** com feedback imediato, explicação detalhada e referência ao Greenberg
- 🎯 **Modo simulado** cronometrado (20 questões, 30 min, balanceado entre módulos) com confete em ≥80%
- 📊 **Dashboard** com cards de estatística, gráfico de aproveitamento, barras por módulo, breakdown por dificuldade, atividade recente e heatmap de estudo (91 dias)
- 📖 **Glossário** com 23 termos técnicos
- 💾 **Persistência local** via Zustand + localStorage (recarregar mantém o progresso)
- 🎨 **Tema escuro** com paleta azul, glassmorphism e Framer Motion

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (componentes UI customizados, sem shadcn CLI)
- Framer Motion · Recharts · Lucide React · Zustand · Sonner · canvas-confetti · react-countup

## Estrutura

```
app/                # rotas (dashboard, módulos, questões, simulado, glossário, sobre)
components/
  layout/           # Sidebar, Header, Footer, Shell
  ui/               # primitivos (Button, Card, Badge, etc.)
  dashboard/        # widgets do dashboard
  modulos/          # ContentRenderer + 4 calculadoras
  questoes/         # QuestionRunner + filtros
data/               # modules.ts, questions.ts, glossary.ts, navigation.ts
lib/
  store/progress.ts # Zustand + persist
  utils/            # cn, format, stats
```

## Resetar progresso

No dashboard, há um botão "Resetar progresso" no card de Atividade recente.

---

> Material estritamente educacional para discussão acadêmica em ambiente de Liga. Não substitui leitura primária, julgamento clínico ou guidelines atualizadas.
