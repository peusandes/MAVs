export type GlossaryTerm = {
  term: string;
  definition: string;
  related?: string[];
  reference?: string;
};

export const glossary: GlossaryTerm[] = [
  {
    term: "Nidus",
    definition:
      "Emaranhado central de vasos da MAV onde ocorre o shunt arteriovenoso, sem leito capilar e sem parênquima cerebral interposto. É o alvo de qualquer terapia curativa.",
    reference: "Greenberg, 90.2.1",
  },
  {
    term: "Shunt arteriovenoso",
    definition:
      "Comunicação direta entre artérias e veias, sem leito capilar normal — a base hemodinâmica das MAVs.",
  },
  {
    term: "Eloquente (área eloquente)",
    definition:
      "Em Spetzler-Martin: córtex sensitivo-motor, áreas de linguagem, córtex visual; hipotálamo, tálamo, cápsula interna, tronco encefálico, pedúnculos e núcleos cerebelares profundos.",
    reference: "Greenberg, 90.2.8",
  },
  {
    term: "Drenagem venosa profunda",
    definition:
      "Drenagem para veias cerebrais internas, basais ou do sistema profundo (Galeno). Conta 1 ponto na escala de Spetzler-Martin e é fator de risco para hemorragia.",
  },
  {
    term: "Spetzler-Martin (S-M)",
    definition:
      "Escala de pontuação 1–5 (+ Grau 6 = inoperável) que estratifica o risco cirúrgico da MAV, baseada em tamanho, eloquência e drenagem venosa.",
    related: ["Lawton-Young"],
  },
  {
    term: "Lawton-Young (L-Y)",
    definition:
      "Escala suplementar 1–5 que adiciona idade, apresentação rota/não-rota e padrão do nidus para refinar o prognóstico cirúrgico.",
    related: ["Spetzler-Martin"],
  },
  {
    term: "VRAS",
    definition:
      "Virginia Radiosurgery AVM Scale: pontua volume, eloquência e hemorragia prévia para prever desfecho favorável da SRS.",
  },
  {
    term: "Breakthrough de pressão de perfusão normal",
    definition:
      "Hiperemia/hemorragia paradoxal de cérebro previamente hipoperfundido após retirada da MAV, por incapacidade autorregulatória dos vasos circundantes.",
  },
  {
    term: "Hiperemia oclusiva",
    definition:
      "Estado de fluxo aumentado por congestão venosa após oclusão da drenagem de uma MAV; mecanismo de deterioração pós-op.",
  },
  {
    term: "ARUBA",
    definition:
      "Estudo randomizado (2014) que comparou tratamento medicamentoso vs. intervenção em MAVs não-rotas. Sugeriu superioridade do tratamento medicamentoso, mas é criticado por mistura de modalidades, fechamento prematuro e seguimento curto.",
    reference: "Greenberg, 90.2.9",
  },
  {
    term: "Onyx™",
    definition:
      "Agente líquido embolizante (EVOH em DMSO + tantálio) que solidifica por precipitação. Comportamento 'lava-like' com ótima penetração do nidus.",
    reference: "Greenberg, 116.9.3",
  },
  {
    term: "NBCA",
    definition:
      "Cianoacrilato — agente embolizante adesivo. Tempo de trabalho curto, risco de embolização venosa e de aprisionamento do microcateter.",
  },
  {
    term: "Bragg-peak",
    definition:
      "Pico de deposição de energia em terapia com prótons; permite radiocirurgia com deposição precisa em volumes pequenos.",
  },
  {
    term: "DVA / Angioma venoso",
    definition:
      "Anomalia venosa do desenvolvimento — confluência de veias medulares em padrão de 'cabeça de medusa', geralmente benigna.",
  },
  {
    term: "Cavernoma",
    definition:
      "Malformação cavernosa: vasos sinusoidais sem parênquima interposto, baixo fluxo. Diferente da MAV.",
  },
  {
    term: "Telangiectasia capilar",
    definition:
      "Dilatação de capilares com parênquima normal interposto; geralmente assintomática e de achado incidental.",
  },
  {
    term: "Steal (roubo)",
    definition:
      "Desvio do fluxo sanguíneo para o nidus da MAV, gerando hipoperfusão e déficit neurológico no parênquima adjacente.",
  },
  {
    term: "Osler-Weber-Rendu (HHT)",
    definition:
      "Telangiectasia hemorrágica hereditária. 15–20% dos pacientes têm MAVs cerebrais — causa genética mais comum identificada.",
  },
  {
    term: "Volume-staged SRS",
    definition:
      "Radiocirurgia fracionada por volumes em MAVs grandes (> 10 cm³), com obliteração total de 18% em 5a, 45% em 7a e 56% em 10a.",
  },
  {
    term: "Angiografia por cateter",
    definition:
      "Padrão-ouro para diagnóstico e planejamento terapêutico de MAVs. Define artérias nutridoras, nidus, drenagem venosa e aneurismas associados.",
  },
];
