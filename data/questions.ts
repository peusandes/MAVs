export type Difficulty = "facil" | "medio" | "dificil";

export type Question = {
  id: string;
  module: string;
  topic: string;
  difficulty: Difficulty;
  question: string;
  options: { id: string; text: string }[];
  correctAnswerId: string;
  explanation: string;
  reference: string;
};

const opts = (...arr: string[]) =>
  arr.map((text, i) => ({ id: String.fromCharCode(97 + i), text })); // a, b, c, d…

export const questions: Question[] = [
  // ============ MÓDULO 1 — CLASSIFICAÇÃO (3) ============
  {
    id: "m1-q1",
    module: "01-classificacao",
    topic: "Classificação de McCormick",
    difficulty: "facil",
    question:
      "De acordo com a classificação clássica de McCormick (1966), qual é a malformação vascular do SNC mais frequente?",
    options: opts(
      "Anomalia venosa do desenvolvimento (DVA)",
      "Malformação cavernosa",
      "Malformação arteriovenosa (MAV)",
      "Telangiectasia capilar"
    ),
    correctAnswerId: "c",
    explanation:
      "A MAV corresponde a 44–60% das malformações vasculares do SNC, sendo a forma sintomática mais comum entre os 4 tipos de McCormick.",
    reference: "Greenberg, 90.1",
  },
  {
    id: "m1-q2",
    module: "01-classificacao",
    topic: "Diagnóstico diferencial",
    difficulty: "medio",
    question:
      "Qual destas malformações vasculares do SNC é caracterizada por capilares dilatados com parênquima cerebral normal interposto entre os vasos?",
    options: opts(
      "Malformação arteriovenosa (MAV)",
      "Malformação cavernosa",
      "Telangiectasia capilar",
      "Anomalia venosa do desenvolvimento (DVA)"
    ),
    correctAnswerId: "c",
    explanation:
      "A telangiectasia capilar é definida por capilares dilatados com parênquima cerebral normal interposto. A MAV não tem leito capilar; o cavernoma não tem parênquima interposto entre os vasos sinusoidais; a DVA é uma confluência de veias medulares.",
    reference: "Greenberg, 90.1",
  },
  {
    id: "m1-q3",
    module: "01-classificacao",
    topic: "Frequência",
    difficulty: "facil",
    question:
      "Qual a frequência aproximada das telangiectasias capilares entre as malformações vasculares do SNC?",
    options: opts("1–2%", "4–12%", "19–31%", "44–60%"),
    correctAnswerId: "b",
    explanation:
      "As telangiectasias capilares correspondem a 4–12% das malformações vasculares; geralmente assintomáticas e de achado incidental.",
    reference: "Greenberg, 90.1",
  },

  // ============ MÓDULO 2 — CONCEITOS FUNDAMENTAIS (4) ============
  {
    id: "m2-q1",
    module: "02-conceitos-fundamentais",
    topic: "Histopatologia",
    difficulty: "facil",
    question:
      "Qual a principal característica histopatológica que define o nidus de uma MAV?",
    options: opts(
      "Presença de leito capilar normal",
      "Ausência de parênquima cerebral interposto",
      "Presença exclusivamente de veias displásicas",
      "Presença de tecido neoplásico"
    ),
    correctAnswerId: "b",
    explanation:
      "O nidus da MAV é definido pela ausência de leito capilar e ausência de parênquima cerebral interposto entre os vasos, com sangue arterial fluindo diretamente para as veias drenantes.",
    reference: "Greenberg, 90.2.1–90.2.2",
  },
  {
    id: "m2-q2",
    module: "02-conceitos-fundamentais",
    topic: "Risco anual",
    difficulty: "medio",
    question:
      "Qual o risco aproximado de hemorragia recorrente em uma MAV após o primeiro sangramento?",
    options: opts("1%/ano", "2,3%/ano", "5%/ano", "10%/ano"),
    correctAnswerId: "c",
    explanation:
      "Após sangramento, o risco anual de novo evento hemorrágico passa de ~1%/ano (não-rota) para aproximadamente 5%/ano.",
    reference: "Greenberg, 90.2.1–90.2.2 / 90.2.5",
  },
  {
    id: "m2-q3",
    module: "02-conceitos-fundamentais",
    topic: "Hemodinâmica",
    difficulty: "medio",
    question: "Qual o regime hemodinâmico característico das MAVs cerebrais?",
    options: opts(
      "Baixo fluxo e baixa pressão",
      "Baixo fluxo e alta pressão",
      "Alto fluxo e médio-alta pressão",
      "Alto fluxo apenas no setor venoso"
    ),
    correctAnswerId: "c",
    explanation:
      "MAVs operam em alto fluxo e médio-alta pressão; as veias drenantes ficam arterializadas (vermelho-vivas) por receber sangue oxigenado sob pressão.",
    reference: "Greenberg, 90.2.1–90.2.2",
  },
  {
    id: "m2-q4",
    module: "02-conceitos-fundamentais",
    topic: "Crises e MAV não-rota",
    difficulty: "dificil",
    question:
      "Qual o risco de primeira crise convulsiva em 5 anos numa MAV não-rota e, após a primeira crise, qual o risco de epilepsia em 5 anos?",
    options: opts(
      "5% e 22%",
      "8% e 58%",
      "15% e 80%",
      "20% e 30%"
    ),
    correctAnswerId: "b",
    explanation:
      "Risco de 1ª crise em MAV não-rota em 5 anos: 8%. Após a 1ª crise, risco de epilepsia em 5 anos: 58%.",
    reference: "Greenberg, 90.2.1–90.2.2",
  },

  // ============ MÓDULO 3 — EPIDEMIOLOGIA (3) ============
  {
    id: "m3-q1",
    module: "03-epidemiologia",
    topic: "Prevalência",
    difficulty: "facil",
    question:
      "Qual a prevalência geral aproximada das MAVs cerebrais na população?",
    options: opts("0,014%", "0,14%", "1,4%", "14%"),
    correctAnswerId: "b",
    explanation:
      "A prevalência geral de MAV é estimada em ~0,14%, com prevalência assintomática em RM populacional próxima de 0,05%.",
    reference: "Greenberg, 90.2.3",
  },
  {
    id: "m3-q2",
    module: "03-epidemiologia",
    topic: "Hereditariedade",
    difficulty: "medio",
    question:
      "Qual a causa genética identificada mais comum para MAVs cerebrais?",
    options: opts(
      "Doença de von Hippel-Lindau",
      "Síndrome de Sturge-Weber",
      "Síndrome de Osler-Weber-Rendu (HHT)",
      "Neurofibromatose tipo 1"
    ),
    correctAnswerId: "c",
    explanation:
      "Cerca de 15–20% dos pacientes com Telangiectasia Hemorrágica Hereditária (Osler-Weber-Rendu) têm MAVs cerebrais, sendo a causa genética mais comum identificada.",
    reference: "Greenberg, 90.2.3",
  },
  {
    id: "m3-q3",
    module: "03-epidemiologia",
    topic: "Idade ao diagnóstico",
    difficulty: "facil",
    question:
      "Qual a idade média ao diagnóstico de MAV cerebral, e como ela se compara à dos aneurismas saculares?",
    options: opts(
      "~33 anos; cerca de 10 anos mais jovem que aneurismas",
      "~50 anos; semelhante aos aneurismas",
      "~25 anos; mais velho que aneurismas",
      "~60 anos; mais velho que aneurismas"
    ),
    correctAnswerId: "a",
    explanation:
      "A idade média ao diagnóstico de MAV é ~33 anos, cerca de 10 anos mais jovem que aneurismas saculares; 64% das MAVs são diagnosticadas antes dos 40.",
    reference: "Greenberg, 90.2.3",
  },

  // ============ MÓDULO 4 — APRESENTAÇÃO CLÍNICA (4) ============
  {
    id: "m4-q1",
    module: "04-apresentacao-clinica",
    topic: "Apresentação mais comum",
    difficulty: "facil",
    question: "Qual a forma de apresentação clínica mais comum das MAVs?",
    options: opts(
      "Crises convulsivas",
      "Cefaleia isolada",
      "Hemorragia",
      "Sopro intracraniano"
    ),
    correctAnswerId: "c",
    explanation:
      "Hemorragia é a apresentação mais frequente (58%), seguida por crises convulsivas (34%) e outras manifestações (8%).",
    reference: "Greenberg, 90.2.4",
  },
  {
    id: "m4-q2",
    module: "04-apresentacao-clinica",
    topic: "Cefaleia",
    difficulty: "medio",
    question:
      "Em quais MAVs a cefaleia tipo enxaqueca pode ser uma forma de apresentação, especialmente quando associada a defeito de campo visual?",
    options: opts(
      "MAVs frontais",
      "MAVs occipitais",
      "MAVs cerebelares",
      "MAVs do tronco encefálico"
    ),
    correctAnswerId: "b",
    explanation:
      "MAVs occipitais podem mimetizar enxaqueca, especialmente quando há hemianopsia ou quadrantanopsia associada.",
    reference: "Greenberg, 90.2.4",
  },
  {
    id: "m4-q3",
    module: "04-apresentacao-clinica",
    topic: "Pediatria — MAV de Galeno",
    difficulty: "dificil",
    question:
      "Qual é a tríade clássica de apresentação da MAV mediana com drenagem para a veia de Galeno aumentada em neonatos/lactentes?",
    options: opts(
      "Hidrocefalia, AVC isquêmico e cefaleia",
      "Hidrocefalia + macrocefalia, ICC com cardiomegalia, proeminência de veias frontais",
      "Crises convulsivas, sopro e papiledema",
      "Hemorragia subaracnóidea, sopro e febre"
    ),
    correctAnswerId: "b",
    explanation:
      "A apresentação típica da MAV de Galeno em pediatria é hidrocefalia com macrocefalia, insuficiência cardíaca de alto débito com cardiomegalia, e proeminência de veias frontais.",
    reference: "Greenberg, 90.2.4",
  },
  {
    id: "m4-q4",
    module: "04-apresentacao-clinica",
    topic: "Steal phenomenon",
    difficulty: "medio",
    question:
      "Qual mecanismo descreve déficit neurológico focal por desvio de fluxo sanguíneo a partir do parênquima adjacente para o nidus da MAV?",
    options: opts(
      "Embolismo cerebral",
      "Isquemia por roubo (steal)",
      "Ruptura silenciosa",
      "Hipertensão venosa por estenose"
    ),
    correctAnswerId: "b",
    explanation:
      "A isquemia por roubo (steal) ocorre quando o alto fluxo da MAV desvia sangue do parênquima adjacente, gerando déficit focal sem hemorragia.",
    reference: "Greenberg, 90.2.4",
  },

  // ============ MÓDULO 5 — HEMORRAGIA (5) ============
  {
    id: "m5-q1",
    module: "05-hemorragia-risco",
    topic: "Pico etário",
    difficulty: "facil",
    question: "Qual o pico de idade para hemorragia em MAVs cerebrais?",
    options: opts("0–5 anos", "15–20 anos", "30–40 anos", "50–60 anos"),
    correctAnswerId: "b",
    explanation:
      "O pico de hemorragia em MAVs ocorre entre os 15 e 20 anos, refletindo a apresentação na adolescência/adulto jovem.",
    reference: "Greenberg, 90.2.5",
  },
  {
    id: "m5-q2",
    module: "05-hemorragia-risco",
    topic: "Localização",
    difficulty: "medio",
    question:
      "Qual a localização mais comum da hemorragia em MAVs?",
    options: opts(
      "Subaracnóidea",
      "Intraventricular",
      "Intraparenquimatosa (HIP)",
      "Subdural"
    ),
    correctAnswerId: "c",
    explanation:
      "82% das hemorragias por MAV são intraparenquimatosas (HIP). HIV pura sugere MAV intraventricular; SAH pode indicar aneurisma em nutridora.",
    reference: "Greenberg, 90.2.5",
  },
  {
    id: "m5-q3",
    module: "05-hemorragia-risco",
    topic: "Tabela 90.2 — Stapf",
    difficulty: "dificil",
    question:
      "Segundo a tabela de Stapf et al, qual o risco anual aproximado de hemorragia em uma MAV com nidus profundo, drenagem venosa profunda E história de sangramento prévio?",
    options: opts("8,0%", "11,4%", "14,8%", "34,4%"),
    correctAnswerId: "d",
    explanation:
      "A combinação dos três fatores (drenagem profunda + nidus profundo + sangramento prévio) confere o maior risco da tabela: 34,4% ao ano.",
    reference: "Greenberg, 90.2.5 (Tabela 90.2)",
  },
  {
    id: "m5-q4",
    module: "05-hemorragia-risco",
    topic: "Risco vitalício",
    difficulty: "medio",
    question:
      "Pela aproximação clínica simplificada (105 − idade), qual o risco vitalício aproximado de hemorragia em um paciente de 35 anos com risco anual de 3%?",
    options: opts("35%", "70%", "105%", "150%"),
    correctAnswerId: "b",
    explanation:
      "A regra simplificada para risco anual de 3% estima: risco vitalício ≈ 105 − idade. Para um paciente de 35 anos: 105 − 35 = 70%.",
    reference: "Greenberg, 90.2.5",
  },
  {
    id: "m5-q5",
    module: "05-hemorragia-risco",
    topic: "Mortalidade",
    difficulty: "facil",
    question:
      "Qual a mortalidade aproximada por evento hemorrágico em MAVs cerebrais?",
    options: opts("~1%", "~10%", "~30%", "~50%"),
    correctAnswerId: "b",
    explanation:
      "A mortalidade por hemorragia em MAV é cerca de 10% por evento; a morbidade chega a 30–50%.",
    reference: "Greenberg, 90.2.5",
  },

  // ============ MÓDULO 6 — CRISES (3) ============
  {
    id: "m6-q1",
    module: "06-crises",
    topic: "Risco em 20 anos por idade",
    difficulty: "medio",
    question:
      "Em paciente diagnosticado entre 10–19 anos, qual o risco aproximado de crises convulsivas em 20 anos?",
    options: opts("6%", "22%", "31%", "44%"),
    correctAnswerId: "d",
    explanation:
      "Pacientes diagnosticados entre 10–19 anos têm risco de 44% de crises em 20 anos; o risco diminui com a idade ao diagnóstico.",
    reference: "Greenberg, 90.2.6",
  },
  {
    id: "m6-q2",
    module: "06-crises",
    topic: "Fatores de risco",
    difficulty: "facil",
    question:
      "Qual destes NÃO é fator de risco descrito para crises convulsivas em MAVs?",
    options: opts(
      "Localização temporal",
      "Envolvimento cortical",
      "Nidus > 3 cm",
      "Drenagem venosa profunda exclusiva"
    ),
    correctAnswerId: "d",
    explanation:
      "Drenagem venosa profunda exclusiva é fator de risco para hemorragia, não especificamente para crises. Localização temporal, cortical e nidus > 3 cm são fatores associados a crises.",
    reference: "Greenberg, 90.2.6",
  },
  {
    id: "m6-q3",
    module: "06-crises",
    topic: "Pós-hemorragia",
    difficulty: "medio",
    question:
      "Qual o risco de epilepsia em 20 anos em paciente com MAV apresentada como hemorragia inicial?",
    options: opts("6%", "22%", "44%", "58%"),
    correctAnswerId: "b",
    explanation:
      "Pacientes com hemorragia inicial têm 22% de risco de desenvolver epilepsia em 20 anos.",
    reference: "Greenberg, 90.2.6",
  },

  // ============ MÓDULO 7 — ANEURISMAS (4) ============
  {
    id: "m7-q1",
    module: "07-aneurismas-associados",
    topic: "Frequência",
    difficulty: "facil",
    question:
      "Qual a frequência aproximada de aneurismas associados em pacientes com MAV?",
    options: opts("1%", "7%", "20%", "40%"),
    correctAnswerId: "b",
    explanation:
      "Cerca de 7% dos pacientes com MAV apresentam aneurismas associados, frequentemente em artérias nutridoras (75% deles).",
    reference: "Greenberg, 90.2.7",
  },
  {
    id: "m7-q2",
    module: "07-aneurismas-associados",
    topic: "Tipos de aneurisma",
    difficulty: "medio",
    question:
      "Em qual tipo de aneurisma associado à MAV o termo “bizarro” é frequentemente usado, por sua localização proximal/distal em artéria nutridora profunda?",
    options: opts("Tipo I", "Tipo IA", "Tipo II", "Tipo III"),
    correctAnswerId: "d",
    explanation:
      "Aneurismas tipo III, em artéria nutridora profunda, têm morfologia 'bizarra' e localização proximal/distal pouco usual.",
    reference: "Greenberg, 90.2.7 (Tabela 90.5)",
  },
  {
    id: "m7-q3",
    module: "07-aneurismas-associados",
    topic: "Comportamento pós-tratamento",
    difficulty: "dificil",
    question:
      "Qual a porcentagem aproximada de aneurismas associados que regridem após retirada da MAV?",
    options: opts("~10%", "~33%", "~66%", "~90%"),
    correctAnswerId: "c",
    explanation:
      "Aproximadamente 2/3 (~66%) dos aneurismas associados regridem após a retirada da MAV, especialmente os do tipo I (fluxo).",
    reference: "Greenberg, 90.2.7",
  },
  {
    id: "m7-q4",
    module: "07-aneurismas-associados",
    topic: "Ordem de tratamento",
    difficulty: "medio",
    question:
      "Em paciente com MAV e aneurisma associado responsáveis por hemorragia, qual a estratégia inicial preferencial?",
    options: opts(
      "Tratar primeiro a MAV em todos os casos",
      "Tratar primeiro o aneurisma sintomático/sangrante",
      "Aguardar 6 meses antes de qualquer intervenção",
      "Embolizar ambos no mesmo procedimento sempre"
    ),
    correctAnswerId: "b",
    explanation:
      "Trata-se primeiro a lesão sintomática/sangrante. Aneurismas em artéria nutridora frequentemente regridem após cura da MAV.",
    reference: "Greenberg, 90.2.7",
  },

  // ============ MÓDULO 8 — IMAGEM (5) ============
  {
    id: "m8-q1",
    module: "08-imagem",
    topic: "TC sem contraste",
    difficulty: "facil",
    question:
      "Qual a principal indicação da TC sem contraste na avaliação inicial de uma suspeita de MAV?",
    options: opts(
      "Identificar o nidus com precisão",
      "Diferenciar MAV de cavernoma",
      "Descartar hemorragia aguda",
      "Avaliar a anatomia venosa"
    ),
    correctAnswerId: "c",
    explanation:
      "A TC sem contraste tem >90% de sensibilidade para hemorragia aguda e é o exame inicial na emergência.",
    reference: "Greenberg, 90.2.8",
  },
  {
    id: "m8-q2",
    module: "08-imagem",
    topic: "Achados em RM",
    difficulty: "medio",
    question:
      "Qual achado, presente em quantidade significativa, sugere TUMOR com sangramento e não MAV?",
    options: opts(
      "Flow void em T1/T2",
      "Edema importante adjacente",
      "Artérias nutridoras visíveis",
      "Anel completo de baixa intensidade"
    ),
    correctAnswerId: "b",
    explanation:
      "Edema significativo é mais sugestivo de tumor com sangramento. MAV típica não apresenta edema vasogênico desproporcional.",
    reference: "Greenberg, 90.2.8",
  },
  {
    id: "m8-q3",
    module: "08-imagem",
    topic: "Padrão-ouro",
    difficulty: "facil",
    question:
      "Qual exame é considerado padrão-ouro para o planejamento terapêutico das MAVs?",
    options: opts(
      "Angio-TC",
      "Angio-RM",
      "Angiografia por cateter",
      "RM com SWI"
    ),
    correctAnswerId: "c",
    explanation:
      "Angiografia por cateter é o padrão-ouro: define artérias nutridoras, nidus, drenagem venosa e aneurismas associados.",
    reference: "Greenberg, 90.2.8",
  },
  {
    id: "m8-q4",
    module: "08-imagem",
    topic: "Limitações da Angio-RM",
    difficulty: "dificil",
    question:
      "Qual destas é uma LIMITAÇÃO conhecida da angio-RM para diagnóstico de MAV?",
    options: opts(
      "Subestima vasos < 1 mm e MAVs < 10 mm",
      "Não identifica fluxo arterial",
      "Não permite avaliar nidus",
      "Tem alta exposição à radiação ionizante"
    ),
    correctAnswerId: "a",
    explanation:
      "Angio-RM tem limitação em vasos < 1 mm, MAVs pequenas (< 10 mm), aneurismas pequenos e anatomia venosa fina.",
    reference: "Greenberg, 90.2.8",
  },
  {
    id: "m8-q5",
    module: "08-imagem",
    topic: "Sinal angiográfico",
    difficulty: "medio",
    question:
      "Qual dos achados a seguir é assinatura angiográfica do shunt arteriovenoso?",
    options: opts(
      "Veias drenantes visíveis na fase venosa tardia",
      "Veias drenantes visíveis ainda na fase arterial",
      "Estenose proximal das nutridoras",
      "Calibre venoso normal"
    ),
    correctAnswerId: "b",
    explanation:
      "O aparecimento das veias drenantes ainda na fase arterial é a marca registrada do shunt arteriovenoso, presente nas MAVs.",
    reference: "Greenberg, 90.2.8",
  },

  // ============ MÓDULO 9 — SPETZLER-MARTIN (6) ============
  {
    id: "m9-q1",
    module: "09-spetzler-martin",
    topic: "Componentes",
    difficulty: "facil",
    question: "Quais são as três variáveis da escala de Spetzler-Martin?",
    options: opts(
      "Idade, apresentação, padrão do nidus",
      "Tamanho, eloquência, drenagem venosa",
      "Volume, hemorragia prévia, dose",
      "Localização, sintomatologia, drenagem"
    ),
    correctAnswerId: "b",
    explanation:
      "Spetzler-Martin pontua tamanho do nidus (1–3), eloquência (0–1) e padrão de drenagem (0–1), totalizando 1–5 (+ Grau 6 = inoperável).",
    reference: "Greenberg, 90.2.8",
  },
  {
    id: "m9-q2",
    module: "09-spetzler-martin",
    topic: "Caso clínico — pontuação",
    difficulty: "medio",
    question:
      "Paciente de 28 anos com MAV de 4 cm em região rolândica direita, com drenagem venosa profunda. Qual o grau de Spetzler-Martin?",
    options: opts("2", "3", "4", "5"),
    correctAnswerId: "c",
    explanation:
      "Tamanho 3–6 cm = 2 pts; eloquente (sensitivo-motor) = 1 pt; drenagem profunda = 1 pt. Total = 4.",
    reference: "Greenberg, 90.2.8",
  },
  {
    id: "m9-q3",
    module: "09-spetzler-martin",
    topic: "Áreas eloquentes",
    difficulty: "facil",
    question:
      "Qual destas áreas NÃO é considerada eloquente segundo Spetzler-Martin?",
    options: opts(
      "Córtex sensitivo-motor",
      "Polo frontal",
      "Tálamo",
      "Tronco encefálico"
    ),
    correctAnswerId: "b",
    explanation:
      "Polo frontal não-dominante NÃO é considerado eloquente. Eloquentes: córtex sensitivo-motor, linguagem, visual, hipotálamo, tálamo, cápsula interna, tronco, pedúnculos cerebelares e núcleos profundos do cerebelo.",
    reference: "Greenberg, 90.2.8",
  },
  {
    id: "m9-q4",
    module: "09-spetzler-martin",
    topic: "Resultados cirúrgicos",
    difficulty: "medio",
    question:
      "Segundo a tabela 90.7, qual a porcentagem aproximada de pacientes SEM déficit pós-operatório em MAVs Grau 1?",
    options: opts("69%", "84%", "95%", "100%"),
    correctAnswerId: "d",
    explanation:
      "MAVs Grau 1 têm cerca de 100% de pacientes sem déficit pós-operatório, com 4% de mau resultado.",
    reference: "Greenberg, 90.2.8 (Tabela 90.7)",
  },
  {
    id: "m9-q5",
    module: "09-spetzler-martin",
    topic: "Esquema simplificado",
    difficulty: "medio",
    question:
      "No esquema simplificado de Spetzler em 3 níveis, MAVs de Classe C (graus IV–V) devem ser:",
    options: opts(
      "Sempre operadas em todos os casos",
      "Sempre embolizadas em primeira linha",
      "Em geral seguidas; tratamento somente se déficit progressivo, sintomas de roubo ou aneurismas associados",
      "Tratadas exclusivamente com SRS volume-staged"
    ),
    correctAnswerId: "c",
    explanation:
      "Classe C (IV–V): seguimento; tratar somente se déficit progressivo, sintomas de roubo ou aneurismas. Classe A (I–II): cirurgia. Classe B (III): multimodal.",
    reference: "Greenberg, 90.2.8",
  },
  {
    id: "m9-q6",
    module: "09-spetzler-martin",
    topic: "Caso clínico — pontuação",
    difficulty: "dificil",
    question:
      "MAV pequena (< 3 cm) em polo occipital esquerdo (córtex visual) com drenagem venosa exclusivamente superficial. Qual o grau Spetzler-Martin?",
    options: opts("1", "2", "3", "4"),
    correctAnswerId: "b",
    explanation:
      "Tamanho < 3 cm = 1 pt; eloquente (córtex visual) = 1 pt; drenagem superficial = 0 pts. Total = 2.",
    reference: "Greenberg, 90.2.8",
  },

  // ============ MÓDULO 10 — LAWTON-YOUNG (3) ============
  {
    id: "m10-q1",
    module: "10-lawton-young",
    topic: "Variáveis",
    difficulty: "facil",
    question:
      "Quais são as três variáveis da escala suplementar de Lawton-Young?",
    options: opts(
      "Tamanho, eloquência, drenagem",
      "Idade, apresentação, padrão do nidus",
      "Volume, eloquência, hemorragia prévia",
      "Localização, dose, idade"
    ),
    correctAnswerId: "b",
    explanation:
      "Lawton-Young soma idade (1–3), apresentação rota/não-rota (0–1) e padrão do nidus compacto/difuso (0–1).",
    reference: "Greenberg, 90.2.8 (Suplementar)",
  },
  {
    id: "m10-q2",
    module: "10-lawton-young",
    topic: "Caso — pontuação",
    difficulty: "medio",
    question:
      "Paciente de 45 anos, MAV não-rota, nidus difuso. Qual o score de Lawton-Young?",
    options: opts("2", "3", "4", "5"),
    correctAnswerId: "d",
    explanation:
      "Idade > 40 anos = 3 pts; não-rota = 1 pt; nidus difuso = 1 pt. Total = 5.",
    reference: "Greenberg, 90.2.8",
  },
  {
    id: "m10-q3",
    module: "10-lawton-young",
    topic: "Aplicação prática",
    difficulty: "dificil",
    question:
      "Como uma MAV S-M III com Lawton-Young baixo deve se comportar em termos prognósticos pós-cirúrgicos?",
    options: opts(
      "Como S-M I",
      "Como S-M II",
      "Como S-M III alto risco",
      "Como S-M IV"
    ),
    correctAnswerId: "b",
    explanation:
      "MAV S-M III com baixo L-Y comporta-se como S-M II; com alto L-Y comporta-se como S-M IV. A combinação refina decisão em casos limítrofes.",
    reference: "Greenberg, 90.2.8",
  },

  // ============ MÓDULO 11 — MANEJO (4) ============
  {
    id: "m11-q1",
    module: "11-manejo",
    topic: "Hemorragia inicial",
    difficulty: "medio",
    question:
      "Em MAV grande/profunda com hemorragia recente, qual a conduta usual em relação à ressecção da MAV?",
    options: opts(
      "Ressecção imediata em todos os casos",
      "Adiar 2–6 semanas para reduzir edema e organizar o hematoma",
      "Adiar 3–6 meses",
      "Nunca ressecar essas MAVs"
    ),
    correctAnswerId: "b",
    explanation:
      "Em MAVs grandes/profundas com HIC, posterga-se a ressecção em 2–6 semanas para reduzir edema e organização do hematoma. MAVs pequenas e superficiais podem ser ressecadas na emergência.",
    reference: "Greenberg, 90.2.9",
  },
  {
    id: "m11-q2",
    module: "11-manejo",
    topic: "Estudo ARUBA",
    difficulty: "dificil",
    question:
      "Qual das seguintes afirmações é uma crítica VÁLIDA ao estudo ARUBA?",
    options: opts(
      "Foi um estudo apenas observacional, sem randomização",
      "Misturou diferentes modalidades de tratamento e foi fechado prematuramente",
      "Não incluiu MAVs não-rotas",
      "Avaliou apenas pacientes pediátricos"
    ),
    correctAnswerId: "b",
    explanation:
      "ARUBA é criticado por misturar modalidades de tratamento (cirurgia, embolização, SRS) num mesmo braço, fechamento prematuro e seguimento curto. Isso limita a generalização para MAVs específicas com indicação cirúrgica clara.",
    reference: "Greenberg, 90.2.9",
  },
  {
    id: "m11-q3",
    module: "11-manejo",
    topic: "Manejo agudo",
    difficulty: "facil",
    question:
      "No manejo da hemorragia intracraniana inicial associada a MAV, qual recomendação é correta?",
    options: opts(
      "Não controlar a pressão arterial",
      "Iniciar anticoagulação plena para evitar ressangramento",
      "Tratar conforme guidelines AHA 2015 (controle pressórico, crises, coagulopatia)",
      "Operar em todos os casos < 6 horas"
    ),
    correctAnswerId: "c",
    explanation:
      "O manejo agudo segue diretrizes para HIC (AHA 2015): controle pressórico, crises, correção de coagulopatia. Evacuação cirúrgica se indicada — independentemente da MAV.",
    reference: "Greenberg, 90.2.9",
  },
  {
    id: "m11-q4",
    module: "11-manejo",
    topic: "Indicação cirúrgica",
    difficulty: "medio",
    question:
      "Em MAV rota, qual cenário favorece indicação cirúrgica de ressecção?",
    options: opts(
      "S-M IV com Lawton-Young alto",
      "S-M I/II com Lawton-Young baixo",
      "S-M V em qualquer cenário",
      "Apenas S-M VI"
    ),
    correctAnswerId: "b",
    explanation:
      "MAVs rotas com S-M baixo e Lawton-Young baixo são candidatas excelentes à ressecção. Alguns S-M IV com baixo L-Y também são consideráveis.",
    reference: "Greenberg, 90.2.9",
  },

  // ============ MÓDULO 12 — CIRURGIA (5) ============
  {
    id: "m12-q1",
    module: "12-cirurgia",
    topic: "Princípio fundamental",
    difficulty: "facil",
    question:
      "Qual é o princípio fundamental da microcirurgia para MAV?",
    options: opts(
      "Ocluir as veias drenantes antes das artérias nutridoras",
      "Ocluir as artérias nutridoras antes das veias drenantes",
      "Ressecar apenas o nidus venoso",
      "Não se preocupar com a sequência vascular"
    ),
    correctAnswerId: "b",
    explanation:
      "Princípio cirúrgico clássico: identificar, isolar e ocluir as artérias nutridoras antes das veias drenantes — caso contrário, a MAV ingurgita e o risco de rotura aumenta.",
    reference: "Greenberg, 90.2.10",
  },
  {
    id: "m12-q2",
    module: "12-cirurgia",
    topic: "Pré-operatório",
    difficulty: "medio",
    question:
      "Qual medicação pré-operatória é tradicionalmente usada para minimizar o breakthrough de pressão de perfusão normal?",
    options: opts(
      "Hidralazina IV",
      "Propranolol 20 mg VO 6/6h por 3 dias",
      "Furosemida IV",
      "Manitol contínuo"
    ),
    correctAnswerId: "b",
    explanation:
      "Propranolol 20 mg VO 6/6h por 3 dias é uma das opções clássicas. Labetalol também é usado intra-operatoriamente (PAM 70–80 mmHg).",
    reference: "Greenberg, 90.2.10",
  },
  {
    id: "m12-q3",
    module: "12-cirurgia",
    topic: "Excisão",
    difficulty: "medio",
    question:
      "Apenas a oclusão das artérias nutridoras é suficiente para curar a MAV?",
    options: opts(
      "Sim, na maioria dos casos",
      "Não — é mandatória a excisão completa do nidus",
      "Sim, em MAVs S-M I",
      "Sim, se associada a embolização prévia"
    ),
    correctAnswerId: "b",
    explanation:
      "Oclusão das nutridoras isoladamente NÃO basta — a excisão completa do nidus é mandatória; nidus residual mantém risco de hemorragia.",
    reference: "Greenberg, 90.2.10",
  },
  {
    id: "m12-q4",
    module: "12-cirurgia",
    topic: "Indicação ideal",
    difficulty: "facil",
    question:
      "Qual é a indicação cirúrgica ideal segundo Spetzler-Martin?",
    options: opts(
      "Graus IV e V",
      "Graus I e II",
      "Apenas grau III",
      "Apenas grau VI"
    ),
    correctAnswerId: "b",
    explanation:
      "MAVs S-M I e II têm os melhores desfechos cirúrgicos (até 100% sem déficit em Grau 1) e são as candidatas ideais à ressecção.",
    reference: "Greenberg, 90.2.10",
  },
  {
    id: "m12-q5",
    module: "12-cirurgia",
    topic: "Deterioração pós-op",
    difficulty: "dificil",
    question:
      "Qual destes é mecanismo descrito de deterioração pós-operatória tardia em ressecção de MAV?",
    options: opts(
      "Breakthrough de pressão de perfusão normal",
      "Hipotensão arterial moderada",
      "Hiperpnea pós-anestésica",
      "Hipoglicemia transitória"
    ),
    correctAnswerId: "a",
    explanation:
      "Mecanismos de deterioração tardia: breakthrough de pressão de perfusão normal, hiperemia oclusiva, ressangramento de nidus residual e crises convulsivas.",
    reference: "Greenberg, 90.2.10",
  },

  // ============ MÓDULO 13 — SRS (5) ============
  {
    id: "m13-q1",
    module: "13-radiocirurgia",
    topic: "Mecanismo",
    difficulty: "medio",
    question:
      "Qual o mecanismo fisiopatológico predominante da SRS em MAVs?",
    options: opts(
      "Trombose venosa imediata",
      "Necrose vascular aguda",
      "Dano endotelial → proliferação muscular lisa → espessamento parietal → obliteração",
      "Apoptose direta dos eritrócitos"
    ),
    correctAnswerId: "c",
    explanation:
      "A SRS provoca dano endotelial seguido de proliferação muscular lisa e espessamento da parede vascular, levando à obliteração da luz em 1–3 anos (período de latência).",
    reference: "Greenberg, 115.6.5",
  },
  {
    id: "m13-q2",
    module: "13-radiocirurgia",
    topic: "Dose ótima",
    difficulty: "facil",
    question: "Qual a dose ótima usual para SRS em MAVs?",
    options: opts("12–14 Gy", "16–18 Gy", "23–25 Gy", "30–35 Gy"),
    correctAnswerId: "c",
    explanation:
      "A dose ótima é 23–25 Gy com platô em 25 Gy. Doses maiores aumentam complicações sem ganho de obliteração.",
    reference: "Greenberg, 115.6.5",
  },
  {
    id: "m13-q3",
    module: "13-radiocirurgia",
    topic: "VRAS",
    difficulty: "medio",
    question:
      "Em uma MAV de 1,5 cm³ não-eloquente, sem hemorragia prévia, qual a pontuação VRAS e o desfecho favorável esperado?",
    options: opts(
      "0 pontos — 83%",
      "1 ponto — 79%",
      "2 pontos — 70%",
      "3 pontos — 48%"
    ),
    correctAnswerId: "a",
    explanation:
      "Volume < 2 cm³ = 0; não-eloquente = 0; sem hemorragia = 0. Total = 0 → desfecho favorável de 83%.",
    reference: "Greenberg, 115.6.5",
  },
  {
    id: "m13-q4",
    module: "13-radiocirurgia",
    topic: "Risco durante latência",
    difficulty: "medio",
    question:
      "Durante o período de latência da SRS, qual o risco de hemorragia comparado à história natural?",
    options: opts(
      "Risco zero — proteção imediata",
      "Risco 10× maior",
      "Risco semelhante à história natural (~1–3%/ano)",
      "Risco 50% menor"
    ),
    correctAnswerId: "c",
    explanation:
      "Durante a latência (1–3 anos), o risco de hemorragia mantém-se em ~1–3%/ano, semelhante à história natural — a MAV ainda não está obliterada.",
    reference: "Greenberg, 115.6.5",
  },
  {
    id: "m13-q5",
    module: "13-radiocirurgia",
    topic: "Embolização pré-SRS",
    difficulty: "dificil",
    question:
      "Qual o impacto descrito da embolização pré-SRS sobre a taxa de obliteração?",
    options: opts(
      "Aumenta a taxa de obliteração de 70% para 90%",
      "Pode reduzir a taxa de obliteração (de ~70% para ~47%) em alguns estudos",
      "Não tem impacto algum",
      "Substitui completamente a SRS"
    ),
    correctAnswerId: "b",
    explanation:
      "Embolização pré-SRS é controversa: pode reduzir a obliteração de ~70% para ~47% (mascaramento do nidus residual). Por outro lado, em MAVs grandes pode reduzir o volume-alvo.",
    reference: "Greenberg, 115.6.5",
  },

  // ============ MÓDULO 14 — EMBOLIZAÇÃO (5) ============
  {
    id: "m14-q1",
    module: "14-embolizacao",
    topic: "Indicação mais comum",
    difficulty: "facil",
    question:
      "Qual é a indicação mais comum da embolização endovascular em MAVs cerebrais?",
    options: opts(
      "Cura definitiva isolada",
      "Embolização pré-operatória para facilitar a ressecção",
      "Embolização paliativa em todos os pacientes",
      "Substituir a SRS sempre"
    ),
    correctAnswerId: "b",
    explanation:
      "A embolização pré-operatória é a indicação mais comum: reduz o sangramento intra-operatório e facilita a ressecção microcirúrgica.",
    reference: "Greenberg, 116.9.3",
  },
  {
    id: "m14-q2",
    module: "14-embolizacao",
    topic: "Onyx",
    difficulty: "medio",
    question:
      "Qual a principal vantagem do Onyx™ em relação ao NBCA na embolização de MAVs?",
    options: opts(
      "Tempo de trabalho muito curto",
      "Maior adesão ao microcateter",
      "Comportamento ‘lava-like’ com melhor penetração do nidus",
      "Custo significativamente menor"
    ),
    correctAnswerId: "c",
    explanation:
      "O Onyx (EVOH em DMSO + tantálio) tem comportamento 'lava-like', melhor penetração do nidus e tempo de trabalho prolongado, com cura completa em 20–51% de casos selecionados.",
    reference: "Greenberg, 116.9.3",
  },
  {
    id: "m14-q3",
    module: "14-embolizacao",
    topic: "Coils",
    difficulty: "medio",
    question:
      "Qual a indicação principal de coils na embolização de MAV?",
    options: opts(
      "Obliterar isoladamente o nidus",
      "Fechar vaso nutridor, pouch venoso ou aneurisma associado",
      "Fechar veias drenantes profundas em primeiro tempo",
      "Substituir totalmente o uso de Onyx"
    ),
    correctAnswerId: "b",
    explanation:
      "Coils servem para fechar nutridoras específicas, pouches venosos e aneurismas associados — não obliteram o nidus isoladamente.",
    reference: "Greenberg, 116.9.3",
  },
  {
    id: "m14-q4",
    module: "14-embolizacao",
    topic: "Pós-procedimento",
    difficulty: "dificil",
    question:
      "Em relação à anticoagulação pós-embolização de MAV com Onyx, qual a recomendação tradicional?",
    options: opts(
      "Heparinização plena por 5 dias",
      "Sem heparinização pós-procedimento; eventos isquêmicos ocorrem na sala",
      "Aspirina + clopidogrel por 6 meses",
      "Varfarina por 12 meses"
    ),
    correctAnswerId: "b",
    explanation:
      "Tradicionalmente, NÃO se faz heparinização pós-procedimento — eventos isquêmicos ocorrem na sala, e o pós-op é manejado com hipotensão leve por 12–72h.",
    reference: "Greenberg, 116.9.3",
  },
  {
    id: "m14-q5",
    module: "14-embolizacao",
    topic: "Detalhe técnico do Onyx",
    difficulty: "dificil",
    question:
      "Qual orientação técnica é correta no preparo do Onyx-18?",
    options: opts(
      "Usar diretamente após abertura, sem agitação",
      "Agitar (shake) por aproximadamente 20 minutos para suspender o tantálio",
      "Não fazer prime do microcateter com DMSO",
      "Evitar refluxo apenas no microcateter venoso"
    ),
    correctAnswerId: "b",
    explanation:
      "Onyx exige shake de ~20 min para suspender o tantálio. Prime do microcateter com DMSO 0,3–0,8 mL é necessário, e o refluxo > 1 cm na ponta deve ser evitado para não aprisionar o cateter.",
    reference: "Greenberg, 116.9.3",
  },

  // ============ MÓDULO 15 — SEGUIMENTO (2) ============
  {
    id: "m15-q1",
    module: "15-seguimento",
    topic: "Pós-cirúrgico",
    difficulty: "medio",
    question:
      "Qual o método recomendado para confirmação de cura pós-cirurgia de MAV em médio/longo prazo?",
    options: opts(
      "TC sem contraste em 1 ano",
      "Apenas RM em 1 e 5 anos",
      "Angiografia por cateter em 1 e 5 anos",
      "Doppler transcraniano em 6 meses"
    ),
    correctAnswerId: "c",
    explanation:
      "A angiografia por cateter, em 1 e 5 anos, é o padrão para confirmação de cura pós-cirurgia. RM/TC isoladas têm sensibilidade insuficiente.",
    reference: "Greenberg, 90.2.11",
  },
  {
    id: "m15-q2",
    module: "15-seguimento",
    topic: "Pós-SRS",
    difficulty: "facil",
    question:
      "Como deve ser o seguimento de imagem após SRS no período de latência?",
    options: opts(
      "Apenas TC anual",
      "RM/Angio-RM a cada 6 meses; angiografia por cateter para confirmar obliteração",
      "Sem seguimento programado",
      "Angiografia por cateter mensal"
    ),
    correctAnswerId: "b",
    explanation:
      "Durante a latência (1–3 anos), faz-se RM/Angio-RM a cada 6 meses; quando a imagem sugerir obliteração, confirma-se com angiografia por cateter.",
    reference: "Greenberg, 90.2.11",
  },

];

export const questionsByModule: Record<string, Question[]> = questions.reduce(
  (acc, q) => {
    (acc[q.module] = acc[q.module] || []).push(q);
    return acc;
  },
  {} as Record<string, Question[]>
);

export const totalQuestions = questions.length;
