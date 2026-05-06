export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "subheading"; text: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "keyPoints"; title?: string; items: string[] }
  | {
      type: "callout";
      tone: "info" | "warning" | "success" | "danger";
      title?: string;
      text: string;
    }
  | {
      type: "table";
      headers: string[];
      rows: string[][];
      caption?: string;
      highlight?: number[];
    }
  | { type: "stats"; items: { value: string; label: string; tone?: "blue" | "success" | "warning" | "danger" | "default" }[] }
  | {
      type: "barChart";
      title?: string;
      caption?: string;
      data: { label: string; value: number; tone?: "blue" | "success" | "warning" | "danger" }[];
      maxValue?: number;
    }
  | { type: "calculator"; kind: "spetzler-martin" | "lawton-young" | "vras" | "lifetime-risk" }
  | { type: "definition"; term: string; text: string };

export type Module = {
  slug: string;
  number: number;
  title: string;
  subtitle: string;
  readingMinutes: number;
  tags: string[];
  reference: string;
  blocks: ContentBlock[];
};

export const modules: Module[] = [
  {
    slug: "01-classificacao",
    number: 1,
    title: "Introdução e Classificação",
    subtitle: "Malformações vasculares do SNC — visão geral e os 4 tipos clássicos de McCormick",
    readingMinutes: 6,
    tags: ["Anatomia", "Classificação", "Fundamentos"],
    reference: "Greenberg, cap. 90.1",
    blocks: [
      {
        type: "paragraph",
        text:
          "Malformações vasculares do sistema nervoso central são lesões vasculares não-neoplásicas que englobam quatro tipos clássicos descritos por McCormick em 1966, além de outras categorias menos frequentes. Compreender essa classificação é o primeiro passo para o estudo das MAVs.",
      },
      { type: "subheading", text: "Os 4 tipos clássicos de McCormick (1966)" },
      {
        type: "table",
        caption: "Frequência relativa entre malformações vasculares do SNC",
        headers: ["Tipo", "Frequência relativa", "Características-chave"],
        rows: [
          [
            "MAV (Malformação Arteriovenosa)",
            "44–60%",
            "Shunt arteriovenoso de alto fluxo, com nidus, sem leito capilar.",
          ],
          [
            "Malformação Cavernosa (cavernoma)",
            "19–31%",
            "Vasos sinusoidais sem parênquima interposto; baixo fluxo.",
          ],
          [
            "Telangiectasia Capilar",
            "4–12%",
            "Capilares dilatados com parênquima normal interposto; geralmente assintomática.",
          ],
          [
            "Anomalia Venosa do Desenvolvimento (DVA / “angioma venoso”)",
            "9–10%",
            "Veias medulares confluentes em padrão de “cabeça de medusa”; geralmente benigna.",
          ],
        ],
        highlight: [0],
      },
      { type: "subheading", text: "Categorias adicionais" },
      {
        type: "list",
        items: [
          "Angiomas mistos / não classificados (~11%): combinações de duas ou mais formas anteriores.",
        ],
      },
      {
        type: "callout",
        tone: "info",
        title: "Por que isso importa?",
        text:
          "A conduta terapêutica diverge radicalmente entre as categorias: a MAV é tratada com base em escalas como Spetzler-Martin, enquanto cavernomas, DVAs e telangiectasias têm comportamento e tratamento distintos. Identificar corretamente a lesão é decisivo.",
      },
      {
        type: "keyPoints",
        title: "Pontos-chave",
        items: [
          "MAV é a malformação vascular sintomática mais comum (44–60%).",
          "Cavernomas e DVAs podem coexistir; a presença de uma DVA não contraindica obrigatoriamente a ressecção do cavernoma associado.",
          "Telangiectasias capilares e DVAs raramente exigem tratamento.",
          "MAV define-se por shunt arteriovenoso de alto fluxo, com nidus e sem leito capilar.",
        ],
      },
    ],
  },

  {
    slug: "02-conceitos-fundamentais",
    number: 2,
    title: "MAV — Conceitos Fundamentais",
    subtitle: "O que define uma malformação arteriovenosa cerebral",
    readingMinutes: 7,
    tags: ["Conceito", "Histopatologia", "Hemodinâmica"],
    reference: "Greenberg, cap. 90.2.1–90.2.2",
    blocks: [
      {
        type: "paragraph",
        text:
          "MAV é uma rede de artérias e veias displásicas em que o sangue arterial é desviado diretamente para o sistema venoso, sem leito capilar e sem parênquima cerebral interposto no nidus. As pressões internas são médio-altas e o fluxo é alto.",
      },
      {
        type: "definition",
        term: "Nidus",
        text:
          "Emaranhado central de vasos da MAV, bem circunscrito, onde ocorre o shunt arteriovenoso. É o alvo principal de qualquer modalidade terapêutica curativa.",
      },
      { type: "subheading", text: "Origem e dinâmica" },
      {
        type: "list",
        items: [
          "Podem ser congênitas; muitas evidências mostram MAVs adquiridas (de novo).",
          "Hemodinâmica: fluxo alto e pressão arterializada nas veias drenantes — daí o aspecto de “veias vermelhas”.",
          "Crescimento ao longo da vida é possível, especialmente em pacientes jovens e em MAVs com aneurismas associados.",
        ],
      },
      { type: "subheading", text: "Aspecto macroscópico e cirúrgico" },
      {
        type: "paragraph",
        text:
          "Massa em emaranhado de vasos com nidus central e veias arterializadas drenantes. Na cirurgia, identificam-se artérias nutridoras tortuosas, nidus compacto ou difuso e veias drenantes vermelho-vivas (oxigenadas e sob alta pressão).",
      },
      { type: "subheading", text: "Classificação anatômica" },
      {
        type: "list",
        items: [
          "Parenquimatosa: pial, subcortical, paraventricular ou combinada.",
          "Dural pura.",
          "Mista (rara): componentes pial e dural.",
        ],
      },
      {
        type: "keyPoints",
        title: "Pontos-chave",
        items: [
          "Sem leito capilar e sem parênquima cerebral no nidus.",
          "Risco anual de 1ª hemorragia em MAV não-rota: ~1%/ano.",
          "Risco anual de hemorragia recorrente após sangramento: ~5%/ano.",
          "Risco de 1ª crise epiléptica em 5 anos (MAV não-rota): 8%.",
          "Após a 1ª crise, risco de epilepsia em 5 anos: 58%.",
          "Aneurismas em artérias nutridoras são comuns e influenciam a conduta.",
        ],
      },
    ],
  },

  {
    slug: "03-epidemiologia",
    number: 3,
    title: "Epidemiologia",
    subtitle: "Prevalência, incidência, hereditariedade e perfil demográfico",
    readingMinutes: 5,
    tags: ["Epidemiologia"],
    reference: "Greenberg, cap. 90.2.3",
    blocks: [
      {
        type: "stats",
        items: [
          { value: "0,14%", label: "Prevalência geral" },
          { value: "0,05%", label: "Prevalência assintomática (RM)" },
          { value: "1,3 / 100.000", label: "Incidência detectada/ano" },
          { value: "~33 anos", label: "Idade média ao diagnóstico" },
        ],
      },
      {
        type: "list",
        items: [
          "Prevalência total estimada em ~0,14% (sintomáticas + assintomáticas).",
          "Prevalência assintomática em RM populacional: 0,05%.",
          "Incidência detectada: ~1,3 / 100.000 pessoas-ano.",
          "Leve predomínio masculino.",
          "Idade média ao diagnóstico: aproximadamente 33 anos — cerca de 10 anos mais jovem que aneurismas saculares.",
          "64% das MAVs são diagnosticadas antes dos 40 anos (vs. 26% dos aneurismas).",
        ],
      },
      { type: "subheading", text: "Hereditariedade" },
      {
        type: "callout",
        tone: "info",
        title: "Osler-Weber-Rendu (HHT)",
        text:
          "15–20% dos pacientes com Telangiectasia Hemorrágica Hereditária (Osler-Weber-Rendu) apresentam MAVs cerebrais — a causa genética mais comum identificada para MAVs cerebrais. Pesquisar nesses pacientes é mandatório.",
      },
      {
        type: "keyPoints",
        title: "Pontos-chave",
        items: [
          "MAVs são doença do adulto jovem; pico clínico nas 2ª–4ª décadas.",
          "A maior parte é diagnosticada antes dos 40 anos.",
          "Triagem para MAV é razoável em portadores de HHT.",
        ],
      },
    ],
  },

  {
    slug: "04-apresentacao-clinica",
    number: 4,
    title: "Apresentação Clínica",
    subtitle: "Hemorragia, crises e outras formas de apresentação",
    readingMinutes: 6,
    tags: ["Clínica", "Sinais e sintomas"],
    reference: "Greenberg, cap. 90.2.4",
    blocks: [
      {
        type: "barChart",
        title: "Distribuição da apresentação clínica",
        data: [
          { label: "Hemorragia", value: 58, tone: "danger" },
          { label: "Crises convulsivas", value: 34, tone: "warning" },
          { label: "Outras", value: 8, tone: "blue" },
        ],
        maxValue: 100,
      },
      { type: "subheading", text: "Hemorragia (58%) — mais comum" },
      {
        type: "paragraph",
        text:
          "Forma de apresentação mais frequente, podendo ser intraparenquimatosa, intraventricular, subaracnóidea ou subdural. O risco e o prognóstico do sangramento são detalhados no Módulo 5.",
      },
      { type: "subheading", text: "Crises convulsivas (34%)" },
      {
        type: "paragraph",
        text:
          "Crises focais ou generalizadas, especialmente em MAVs corticais ou temporais. Mecanismo exato desconhecido — gliose, hemossiderina perimáxima e isquemia local foram propostos como causas (Módulo 6).",
      },
      { type: "subheading", text: "Outras apresentações (8%)" },
      {
        type: "list",
        items: [
          "Efeito de massa: ex.: neuralgia do trigêmeo em MAV de ângulo ponto-cerebelar (APC).",
          "Isquemia por roubo (steal): déficit focal por desvio do fluxo sanguíneo.",
          "Cefaleia: rara como sintoma exclusivo; pode mimetizar enxaqueca, sobretudo em MAVs occipitais com hemianopsia/quadrantanopsia.",
          "Sopro intracraniano: especialmente em MAVs durais.",
          "Hipertensão intracraniana: por hidrocefalia ou hipertensão venosa.",
          "Achados pediátricos típicos da MAV mediana com drenagem para veia de Galeno: hidrocefalia + macrocefalia, insuficiência cardíaca de alto débito com cardiomegalia, proeminência de veias frontais.",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "Atenção pediátrica",
        text:
          "MAV de Galeno em neonatos pode se apresentar como ICC severa antes mesmo do achado neurológico — o ecocardiograma e o sopro craniano podem ser as primeiras pistas.",
      },
      {
        type: "keyPoints",
        items: [
          "Hemorragia é a apresentação mais comum (58%).",
          "Crises convulsivas: 34% — mais frequentes em MAVs corticais.",
          "Cefaleia isolada é rara; suspeitar em MAVs occipitais com defeito de campo visual.",
          "Em crianças, MAV de Galeno pode apresentar-se como insuficiência cardíaca.",
        ],
      },
    ],
  },

  {
    slug: "05-hemorragia-risco",
    number: 5,
    title: "Hemorragia: Risco e Prognóstico",
    subtitle: "Riscos anuais, fatores associados e cálculo do risco vitalício",
    readingMinutes: 9,
    tags: ["Hemorragia", "Prognóstico", "Calculadora"],
    reference: "Greenberg, cap. 90.2.5",
    blocks: [
      {
        type: "stats",
        items: [
          { value: "15–20a", label: "Pico de hemorragia", tone: "blue" },
          { value: "~10%", label: "Mortalidade por evento", tone: "danger" },
          { value: "30–50%", label: "Morbidade", tone: "warning" },
          { value: "~2,3%/ano", label: "Risco anual médio", tone: "blue" },
        ],
      },
      { type: "subheading", text: "Localização da hemorragia" },
      {
        type: "list",
        items: [
          "Intraparenquimatosa (HIP): 82%.",
          "Intraventricular: geralmente acompanha HIP; HIV pura sugere MAV intraventricular.",
          "Subaracnóidea: pode ser por aneurisma em artéria nutridora.",
          "Subdural: incomum.",
        ],
      },
      { type: "subheading", text: "Risco anual de hemorragia" },
      {
        type: "list",
        items: [
          "Meta-análise: ~2,3%/ano.",
          "MAVs não-rotas: 1,3%/ano.",
          "MAVs rotas (rebleeding): 4,3%/ano.",
        ],
      },
      { type: "subheading", text: "Fatores que aumentam o risco" },
      {
        type: "list",
        items: [
          "Sangramento prévio — preditor mais forte.",
          "Idade ao diagnóstico (acréscimo de ~30% por década).",
          "Drenagem venosa profunda exclusiva (1,6–2,4× maior).",
          "Tamanho do nidus (controverso na literatura).",
        ],
      },
      {
        type: "table",
        caption: "Risco anual de hemorragia por combinação de fatores (Stapf et al — Tabela 90.2)",
        headers: [
          "Drenagem profunda?",
          "Nidus profundo?",
          "Sem sangramento prévio",
          "Com sangramento prévio",
        ],
        rows: [
          ["Não", "Não", "0,9%", "4,5%"],
          ["Não", "Sim", "3,1%", "14,8%"],
          ["Sim", "Não", "2,4%", "11,4%"],
          ["Sim", "Sim", "8,0%", "34,4%"],
        ],
        highlight: [3],
      },
      { type: "subheading", text: "Risco vitalício — fórmula" },
      {
        type: "callout",
        tone: "info",
        title: "Cálculo",
        text:
          "Risco vitalício = 1 − (1 − risco anual)^anos restantes. Aproximação clínica simples para 3% ao ano: Risco ≈ 105 − idade do paciente.",
      },
      { type: "calculator", kind: "lifetime-risk" },
      {
        type: "keyPoints",
        items: [
          "Sangramento prévio é o preditor mais forte — eleva o risco anual em ~3–4×.",
          "Drenagem profunda + nidus profundo + sangramento prévio: risco anual de 34,4%.",
          "Em pacientes jovens, mesmo riscos anuais ‘baixos’ acumulam-se a um risco vitalício alto.",
          "A regra ‘105 − idade’ aproxima o risco vitalício para um risco anual de 3%.",
        ],
      },
    ],
  },

  {
    slug: "06-crises",
    number: 6,
    title: "Crises Convulsivas em MAVs",
    subtitle: "Risco temporal e fatores associados",
    readingMinutes: 4,
    tags: ["Epilepsia", "Clínica"],
    reference: "Greenberg, cap. 90.2.6",
    blocks: [
      {
        type: "paragraph",
        text:
          "O mecanismo das crises em MAVs permanece incerto. Quanto mais jovem o paciente ao diagnóstico, maior o risco de desenvolver convulsões ao longo do seguimento.",
      },
      {
        type: "table",
        caption: "Risco de crises convulsivas em 20 anos por idade ao diagnóstico",
        headers: ["Idade ao diagnóstico", "Risco em 20 anos"],
        rows: [
          ["10–19 anos", "44%"],
          ["20–29 anos", "31%"],
          ["30–60 anos", "6%"],
        ],
      },
      { type: "subheading", text: "Fatores de risco" },
      {
        type: "list",
        items: [
          "Localização temporal.",
          "Envolvimento cortical.",
          "Nidus > 3 cm.",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "Após hemorragia inicial",
        text:
          "Pacientes que apresentam-se com hemorragia têm 22% de risco de epilepsia em 20 anos.",
      },
      {
        type: "keyPoints",
        items: [
          "MAVs corticais e temporais convulsivam mais.",
          "Nidus maior que 3 cm é fator de risco para epilepsia.",
          "Quanto mais cedo o diagnóstico, maior o risco cumulativo de crises.",
        ],
      },
    ],
  },

  {
    slug: "07-aneurismas-associados",
    number: 7,
    title: "MAVs e Aneurismas Associados",
    subtitle: "Tipos, frequência e implicações terapêuticas",
    readingMinutes: 5,
    tags: ["Aneurisma", "Tratamento"],
    reference: "Greenberg, cap. 90.2.7 (Tabela 90.5)",
    blocks: [
      {
        type: "stats",
        items: [
          { value: "7%", label: "MAVs com aneurisma associado", tone: "blue" },
          { value: "75%", label: "Em artéria nutridora principal", tone: "warning" },
          { value: "~66%", label: "Regridem após retirada da MAV", tone: "success" },
        ],
      },
      {
        type: "paragraph",
        text:
          "Aneurismas em pacientes com MAV são frequentemente atribuídos ao aumento de fluxo nas artérias nutridoras. A presença e o tipo modificam a abordagem terapêutica e o risco de sangramento.",
      },
      {
        type: "table",
        caption: "Tipos de aneurismas associados (Tabela 90.5 do Greenberg)",
        headers: ["Tipo", "Localização"],
        rows: [
          ["Tipo I", "Proximal em artéria principal ipsilateral nutridora"],
          ["Tipo IA", "Proximal em artéria principal contralateral"],
          ["Tipo II", "Distal em artéria nutridora superficial"],
          ["Tipo III", "Proximal/distal em artéria nutridora profunda (“bizarro”)"],
          ["Tipo IV", "Em artéria não relacionada à MAV"],
          ["+", "Aneurismas intranidais e venosos (separados)"],
        ],
      },
      {
        type: "callout",
        tone: "info",
        title: "Conduta",
        text:
          "Trata-se primeiro o aneurisma sintomático/responsável pela hemorragia. Aneurismas tipo I/IA frequentemente regridem (~66%) após a retirada da MAV, por redução do fluxo. Aneurismas intranidais devem ser priorizados quando identificados como fonte do sangramento.",
      },
      {
        type: "keyPoints",
        items: [
          "7% dos pacientes com MAV têm aneurismas associados.",
          "75% dos aneurismas estão em artérias nutridoras principais.",
          "Trata-se primeiro o sintomático/sangrante.",
          "Cerca de 2/3 dos aneurismas tipo fluxo regridem após cura da MAV.",
        ],
      },
    ],
  },

  {
    slug: "08-imagem",
    number: 8,
    title: "Avaliação por Imagem",
    subtitle: "TC, RM, angio-RM/TC e angiografia por cateter",
    readingMinutes: 8,
    tags: ["Imagem", "Diagnóstico"],
    reference: "Greenberg, cap. 90.2.8",
    blocks: [
      { type: "subheading", text: "TC sem contraste" },
      {
        type: "list",
        items: [
          "Melhor método para descartar hemorragia aguda (sensibilidade > 90%).",
          "Pode mostrar calcificações no nidus.",
          "Aumento sutil de densidade do emaranhado vascular.",
        ],
      },
      { type: "subheading", text: "TC com contraste / Angio-TC" },
      {
        type: "list",
        items: [
          "Sensibilidade 84–100% e especificidade 77–100% para detecção de MAV em HIC.",
          "Comparável à angiografia para identificação inicial.",
          "Útil em emergência para planejamento imediato.",
        ],
      },
      { type: "subheading", text: "Ressonância Magnética" },
      {
        type: "list",
        ordered: true,
        items: [
          "Flow void em T1 e T2 dentro da MAV (vasos de fluxo rápido).",
          "Artérias nutridoras visíveis e tortuosas.",
          "Veias drenantes dilatadas.",
          "Sequências de partial flip-angle aumentam o sinal vascular — diferenciam de calcificação.",
          "Edema significativo sugere tumor com sangramento, não MAV.",
          "T2*/GRE/SWI mostram hemossiderina (hemorragia prévia).",
          "Anel completo de baixa intensidade ao redor sugere MAV (não neoplasia).",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "Limitações da Angio-RM",
        text:
          "Subestima vasos < 1 mm, aneurismas pequenos, MAVs com nidus < 10 mm e a anatomia venosa detalhada. É boa para triagem e seguimento, não para planejamento cirúrgico definitivo.",
      },
      { type: "subheading", text: "Angiografia por cateter — padrão-ouro" },
      {
        type: "list",
        ordered: true,
        items: [
          "Emaranhado de vasos dentro do nidus.",
          "Artéria nutridora dilatada e arterializada.",
          "Veias drenantes calibrosas.",
          "Aparecimento de veias de drenagem ainda na fase arterial — assinatura do shunt.",
        ],
      },
      {
        type: "keyPoints",
        items: [
          "TC sem contraste: primeiro exame na emergência.",
          "RM com SWI/T2* identifica hemorragias prévias e flow void.",
          "Angiografia por cateter é mandatória para planejamento terapêutico.",
          "Angio-RM é útil em seguimento, mas insuficiente para decisão de tratamento.",
        ],
      },
    ],
  },

  {
    slug: "09-spetzler-martin",
    number: 9,
    title: "Escala de Spetzler-Martin",
    subtitle: "Estratificação de risco cirúrgico",
    readingMinutes: 8,
    tags: ["Escala", "Calculadora", "Cirurgia"],
    reference: "Greenberg, cap. 90.2.8 (S-M)",
    blocks: [
      {
        type: "paragraph",
        text:
          "A escala de Spetzler-Martin estratifica o risco cirúrgico de MAVs com base em três variáveis simples: tamanho do nidus, eloquência do parênquima e padrão de drenagem venosa. A pontuação total varia de 1 a 5 (Grau 6 = lesão considerada inoperável).",
      },
      {
        type: "table",
        caption: "Pontuação de Spetzler-Martin",
        headers: ["Variável", "Categoria", "Pontos"],
        rows: [
          ["Tamanho", "Pequeno (< 3 cm)", "1"],
          ["Tamanho", "Médio (3–6 cm)", "2"],
          ["Tamanho", "Grande (> 6 cm)", "3"],
          ["Eloquência", "Não-eloquente", "0"],
          ["Eloquência", "Eloquente", "1"],
          ["Drenagem venosa", "Superficial", "0"],
          ["Drenagem venosa", "Profunda", "1"],
        ],
      },
      {
        type: "callout",
        tone: "info",
        title: "Áreas eloquentes",
        text:
          "Córtex sensitivo-motor; áreas de linguagem; córtex visual; hipotálamo; tálamo; cápsula interna; tronco encefálico; pedúnculos cerebelares; núcleos cerebelares profundos.",
      },
      { type: "calculator", kind: "spetzler-martin" },
      { type: "subheading", text: "Resultados cirúrgicos por grau (Tabela 90.7)" },
      {
        type: "barChart",
        title: "Sem déficit pós-operatório",
        data: [
          { label: "Grau 1", value: 100, tone: "success" },
          { label: "Grau 2", value: 95, tone: "success" },
          { label: "Grau 3", value: 84, tone: "warning" },
          { label: "Grau 4", value: 73, tone: "warning" },
          { label: "Grau 5", value: 69, tone: "danger" },
        ],
        maxValue: 100,
      },
      {
        type: "barChart",
        title: "Mau resultado (déficit grave/óbito)",
        data: [
          { label: "Grau 1", value: 4, tone: "success" },
          { label: "Grau 2", value: 10, tone: "success" },
          { label: "Grau 3", value: 18, tone: "warning" },
          { label: "Grau 4", value: 31, tone: "danger" },
          { label: "Grau 5", value: 37, tone: "danger" },
        ],
        maxValue: 50,
      },
      { type: "subheading", text: "Esquema simplificado de Spetzler em 3 níveis" },
      {
        type: "list",
        items: [
          "Classe A (graus I–II): ressecção cirúrgica.",
          "Classe B (grau III): tratamento multimodal.",
          "Classe C (graus IV–V): seguimento; tratar apenas se déficit progressivo, sintomas de roubo ou aneurismas associados.",
        ],
      },
      {
        type: "keyPoints",
        items: [
          "Tamanho + eloquência + drenagem = grau S-M (1–5; 6 = inoperável).",
          "Áreas eloquentes valem 1 ponto e podem ser decisivas no grau.",
          "Drenagem venosa profunda é fator-chave (1 ponto).",
          "S-M I–II: cirurgia; III: multimodal; IV–V: tipicamente conservador.",
        ],
      },
    ],
  },

  {
    slug: "10-lawton-young",
    number: 10,
    title: "Escala Suplementar de Lawton-Young",
    subtitle: "Refinando a previsão de desfecho cirúrgico",
    readingMinutes: 5,
    tags: ["Escala", "Calculadora", "Cirurgia"],
    reference: "Greenberg, cap. 90.2.8 (Suplementar)",
    blocks: [
      {
        type: "paragraph",
        text:
          "A escala suplementar de Lawton-Young agrega três variáveis adicionais ao Spetzler-Martin para refinar a previsão de morbidade cirúrgica (mRS pós-operatório).",
      },
      {
        type: "table",
        caption: "Pontuação de Lawton-Young",
        headers: ["Variável", "Categoria", "Pontos"],
        rows: [
          ["Idade", "< 20 anos", "1"],
          ["Idade", "20–40 anos", "2"],
          ["Idade", "> 40 anos", "3"],
          ["Apresentação", "Rota (sangramento)", "0"],
          ["Apresentação", "Não-rota", "1"],
          ["Padrão do nidus", "Compacto", "0"],
          ["Padrão do nidus", "Difuso", "1"],
        ],
      },
      { type: "calculator", kind: "lawton-young" },
      {
        type: "callout",
        tone: "info",
        title: "Como interpretar",
        text:
          "MAV S-M III com baixo Lawton-Young se comporta clinicamente como S-M II; com alto Lawton-Young, comporta-se como S-M IV. A combinação Spetzler-Martin + Lawton-Young melhora a previsão de mRS pós-operatório.",
      },
      {
        type: "keyPoints",
        items: [
          "Score de 1 a 5; somado ao S-M para refinamento prognóstico.",
          "Idade > 40 anos, MAV não-rota e nidus difuso pioram o desfecho.",
          "Útil principalmente para resgatar decisão em S-M III (limítrofes).",
        ],
      },
    ],
  },

  {
    slug: "11-manejo",
    number: 11,
    title: "Manejo Geral",
    subtitle: "MAVs rotas, não-rotas e o estudo ARUBA",
    readingMinutes: 6,
    tags: ["Manejo", "ARUBA"],
    reference: "Greenberg, cap. 90.2.9",
    blocks: [
      { type: "subheading", text: "Hemorragia intracraniana inicial" },
      {
        type: "list",
        items: [
          "Tratar conforme guidelines AHA 2015 para HIC: controle pressórico, anticonvulsivantes conforme necessidade, correção de coagulopatia.",
          "Evacuação cirúrgica do hematoma se indicada — independentemente da MAV.",
          "MAVs pequenas e superficiais podem ser ressecadas na cirurgia de emergência.",
          "MAVs grandes ou profundas: postergar a ressecção em 2–6 semanas para reduzir edema e organizar o hematoma.",
        ],
      },
      { type: "subheading", text: "MAVs rotas" },
      {
        type: "paragraph",
        text:
          "Considerar ressecção em pacientes com S-M baixo e Lawton-Young baixo. Em alguns casos S-M IV com Lawton-Young baixo, a cirurgia ainda pode ser apropriada.",
      },
      { type: "subheading", text: "MAVs não-rotas" },
      {
        type: "callout",
        tone: "warning",
        title: "Estudo ARUBA",
        text:
          "ARUBA (2014) sugeriu superioridade do tratamento medicamentoso isolado sobre intervenção em MAVs não-rotas. O estudo é amplamente criticado pelo desenho heterogêneo (mistura de modalidades), pelo fechamento prematuro e pelo seguimento curto. Por isso, suas conclusões são interpretadas com cautela.",
      },
      {
        type: "keyPoints",
        items: [
          "MAV rota com baixo S-M + baixo L-Y: indicar cirurgia.",
          "Adiamento de 2–6 semanas pode ser apropriado em MAVs grandes/profundas com HIC.",
          "ARUBA é um marco mas tem limitações metodológicas importantes.",
        ],
      },
    ],
  },

  {
    slug: "12-cirurgia",
    number: 12,
    title: "Tratamento Cirúrgico",
    subtitle: "Princípios e técnica de microcirurgia para MAV",
    readingMinutes: 8,
    tags: ["Cirurgia", "Técnica"],
    reference: "Greenberg, cap. 90.2.10",
    blocks: [
      { type: "subheading", text: "Indicações" },
      {
        type: "list",
        items: [
          "Indicação ideal: S-M I e II.",
          "S-M IV e V: alto risco — só com indicação clara (déficit progressivo, hemorragia recorrente).",
        ],
      },
      { type: "subheading", text: "Pré-operatório medicamentoso" },
      {
        type: "list",
        items: [
          "Propranolol 20 mg VO 6/6h por 3 dias antes da cirurgia: minimiza breakthrough de pressão de perfusão normal.",
          "Labetalol também é utilizado (PAM-alvo 70–80 mmHg).",
        ],
      },
      { type: "subheading", text: "Princípios técnicos" },
      {
        type: "list",
        ordered: true,
        items: [
          "Exposição cirúrgica ampla.",
          "Identificar, isolar e ocluir as artérias nutridoras antes das veias drenantes — princípio fundamental.",
          "Excisão completa do nidus: oclusão das nutridoras isoladamente não é suficiente.",
          "Identificar e preservar vasos en passant e artérias adjacentes saudáveis.",
          "Dissecar diretamente sobre o nidus, trabalhando em sulcos e fissuras naturais.",
          "Considerar embolização pré-operatória em MAVs de alto fluxo.",
          "MAVs com múltiplos territórios: realizar em estágios (staging).",
          "Clipar aneurismas acessíveis em artérias nutridoras na mesma cirurgia, quando possível.",
        ],
      },
      {
        type: "callout",
        tone: "danger",
        title: "Deterioração pós-operatória tardia",
        text:
          "Causas: breakthrough de pressão de perfusão normal, hiperemia oclusiva, ressangramento de nidus residual e crises convulsivas. Ressecção incompleta é o cenário mais perigoso — exige re-exploração ou complementação com SRS/embolização.",
      },
      {
        type: "keyPoints",
        items: [
          "Ocluir artérias nutridoras ANTES das veias drenantes.",
          "Excisão completa do nidus é mandatória (não basta apenas as nutridoras).",
          "Propranolol e PAM controlada minimizam breakthrough pós-op.",
          "Reservar S-M IV–V para casos selecionados.",
        ],
      },
    ],
  },

  {
    slug: "13-radiocirurgia",
    number: 13,
    title: "Radiocirurgia Estereotáxica (SRS)",
    subtitle: "Mecanismo, dose, escala VRAS e resultados",
    readingMinutes: 9,
    tags: ["Radiocirurgia", "VRAS", "Calculadora"],
    reference: "Greenberg, cap. 115.6.5",
    blocks: [
      {
        type: "paragraph",
        text:
          "A radiocirurgia estereotáxica (SRS) é especialmente útil em MAVs pequenas a moderadas (< 3 cm), profundas ou eloquentes, com nidus compacto, e em pacientes com alto risco cirúrgico.",
      },
      { type: "subheading", text: "Mecanismo" },
      {
        type: "paragraph",
        text:
          "A irradiação causa dano endotelial → proliferação de musculatura lisa → espessamento parietal → obliteração progressiva da luz vascular ao longo de 1 a 3 anos (período de latência). Durante a latência, o risco de hemorragia permanece em 1–3% ao ano (semelhante à história natural).",
      },
      { type: "subheading", text: "Dose" },
      {
        type: "list",
        items: [
          "Dose ótima: 23–25 Gy.",
          "Platô em torno de 25 Gy — doses maiores aumentam complicações sem ganho de obliteração.",
        ],
      },
      { type: "subheading", text: "Resultados" },
      {
        type: "list",
        items: [
          "Obliteração global: 70–80%.",
          "Obliteração angiográfica em 1 ano: 46–61%.",
          "Em 2 anos: ~86%.",
          "MAVs < 2 cm tratadas com Bragg-peak: 94% em 2 anos, 100% em 3 anos.",
          "Nidus > 25 mm: ~50% de obliteração em uma única SRS.",
        ],
      },
      { type: "subheading", text: "Escala VRAS — Virginia Radiosurgery AVM Scale" },
      {
        type: "table",
        caption: "Pontuação VRAS",
        headers: ["Variável", "Categoria", "Pontos"],
        rows: [
          ["Volume", "< 2 cm³", "0"],
          ["Volume", "2–4 cm³", "1"],
          ["Volume", "> 4 cm³", "2"],
          ["Eloquência", "Não", "0"],
          ["Eloquência", "Sim", "1"],
          ["Hemorragia prévia", "Não", "0"],
          ["Hemorragia prévia", "Sim", "1"],
        ],
      },
      { type: "calculator", kind: "vras" },
      {
        type: "barChart",
        title: "Desfecho favorável por pontuação VRAS",
        data: [
          { label: "0 pts", value: 83, tone: "success" },
          { label: "1 pt", value: 79, tone: "success" },
          { label: "2 pts", value: 70, tone: "warning" },
          { label: "3 pts", value: 48, tone: "warning" },
          { label: "4 pts", value: 39, tone: "danger" },
        ],
        maxValue: 100,
      },
      {
        type: "callout",
        tone: "info",
        title: "Embolização pré-SRS — controversa",
        text:
          "Pode reduzir a taxa de obliteração de 70% para ~47% (presumivelmente por mascaramento do nidus residual com material radio-opaco). Por outro lado, é útil em MAVs grandes para reduzir o volume-alvo. Decisão multidisciplinar.",
      },
      { type: "subheading", text: "MAVs grandes (> 10 cm³)" },
      {
        type: "list",
        items: [
          "SRS volume-staged: aplicação fracionada por volumes.",
          "Obliteração total: 18% em 5a; 45% em 7a; 56% em 10a.",
        ],
      },
      { type: "subheading", text: "Falhas de tratamento" },
      {
        type: "list",
        items: [
          "Definição angiográfica incompleta do nidus (57% — causa mais comum).",
          "Recanalização (~7%).",
          "Mascaramento por hematoma.",
          "Radiorresistência teórica.",
        ],
      },
      {
        type: "keyPoints",
        items: [
          "Indicação ideal: MAVs < 3 cm, profundas/eloquentes, com nidus compacto.",
          "Dose ótima 23–25 Gy; latência 1–3 anos com risco residual de sangramento.",
          "VRAS prevê desfecho favorável; 0 pts → 83%, 4 pts → 39%.",
          "Embolização pré-SRS pode reduzir a taxa de obliteração.",
        ],
      },
    ],
  },

  {
    slug: "14-embolizacao",
    number: 14,
    title: "Embolização Endovascular",
    subtitle: "Indicações, agentes e considerações pós-procedimento",
    readingMinutes: 8,
    tags: ["Endovascular", "Tratamento"],
    reference: "Greenberg, cap. 116.9.3",
    blocks: [
      { type: "subheading", text: "Indicações" },
      {
        type: "list",
        items: [
          "Embolização pré-operatória — uso mais comum: facilita a ressecção microcirúrgica.",
          "Aneurismas/pseudoaneurismas em pedículo arterial ou no nidus.",
          "Trombose venosa, restrição de saída venosa, pouches venosos.",
          "MAV pequena e cirurgicamente inacessível — cura por embolização isolada é rara mas possível em casos selecionados.",
          "Paliativo em MAVs sintomáticas não tratáveis (cuidado: embolização parcial pode aumentar risco de ruptura).",
        ],
      },
      { type: "subheading", text: "Agentes embolizantes" },
      {
        type: "table",
        caption: "Comparação dos agentes",
        headers: ["Agente", "Características"],
        rows: [
          [
            "Coils",
            "Fecham vaso nutridor, pouch venoso ou aneurisma associado. Não obliteram o nidus isoladamente.",
          ],
          [
            "Onyx™ (EVOH em DMSO + tantálio)",
            "Comportamento “lava-like”, solidifica por precipitação. Melhor penetração do nidus. Cura completa em 20–51% de casos selecionados. Onyx-18 é o mais usado; Onyx-34 para alto fluxo.",
          ],
          [
            "NBCA (cianoacrilato)",
            "Uso declinou pós-Onyx. Tempo de trabalho curto, risco de embolização venosa e adesão a cateteres.",
          ],
          [
            "PVA (50–1000 µm)",
            "Devascularização temporária pré-cirúrgica; não durável isoladamente.",
          ],
        ],
      },
      {
        type: "callout",
        tone: "info",
        title: "Detalhes técnicos do Onyx",
        text:
          "Agitar (shake) por aproximadamente 20 minutos antes do uso para suspender o tantálio. Primer com DMSO 0,3–0,8 mL no microcateter. Evitar refluxo > 1 cm na ponta do microcateter para impedir aprisionamento do cateter no plug.",
      },
      { type: "subheading", text: "Manejo pós-procedimento" },
      {
        type: "list",
        items: [
          "Internação em UTI neurológica.",
          "Perna estendida por 2 horas (Angioseal) ou 6–8 horas (compressão manual).",
          "Sem heparinização pós-procedimento (eventos isquêmicos ocorrem na sala).",
          "Hipotensão leve por 12–72 horas, conforme caso.",
          "Acompanhamento clínico em 4 semanas; angiografia controle em 3 meses.",
        ],
      },
      {
        type: "keyPoints",
        items: [
          "Onyx é o agente líquido de escolha; melhor penetração de nidus.",
          "Embolização pré-cirúrgica é o uso mais comum.",
          "Embolização paliativa pode aumentar o risco de ruptura — usar com critério.",
          "Sem heparinização pós-procedimento.",
        ],
      },
    ],
  },

  {
    slug: "15-seguimento",
    number: 15,
    title: "Seguimento Pós-Tratamento",
    subtitle: "Estratégias de imagem após cirurgia, embolização e SRS",
    readingMinutes: 4,
    tags: ["Seguimento", "Imagem"],
    reference: "Greenberg, cap. 90.2.11",
    blocks: [
      { type: "subheading", text: "Pós-cirurgia" },
      {
        type: "list",
        items: [
          "Angiografia intra-operatória ou pós-op precoce.",
          "Se houver nidus residual: re-ressecção ou outra modalidade complementar.",
          "Angiografia por cateter em 1 e 5 anos (não TC/RM isolada).",
        ],
      },
      { type: "subheading", text: "Pós-radiocirurgia" },
      {
        type: "list",
        items: [
          "RM/Angio-RM a cada 6 meses durante o período de latência.",
          "Se imagem sugerir obliteração: confirmar com angiografia por cateter.",
          "Seguimento longo para complicações tardias: necrose por radiação, cistos.",
        ],
      },
      {
        type: "callout",
        tone: "info",
        title: "Acurácia da RM no seguimento",
        text:
          "Para MAVs < 2,8 cm³, a RM tem ~90% de acurácia em comparação com a angiografia por cateter. Em casos limítrofes ou com clínica sugestiva, manter cateter como referência.",
      },
      {
        type: "keyPoints",
        items: [
          "Confirmação angiográfica em 1 e 5 anos pós-cirurgia.",
          "RM seriada durante a latência da SRS.",
          "Sempre confirmar “cura” com angiografia por cateter.",
        ],
      },
    ],
  },

];

export const moduleBySlug = (slug: string) => modules.find((m) => m.slug === slug);
