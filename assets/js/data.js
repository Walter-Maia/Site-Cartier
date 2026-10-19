/* ============================================================
   MOTEL CARTIER — CONTEÚDO DO SITE
   Este arquivo concentra tudo que é "conteúdo": dados do negócio,
   categorias, suítes, cardápio, comodidades e dúvidas frequentes.
   A lógica do site fica em site.js e não precisa ser alterada
   para atualizar textos, preços ou fotos.
   Fonte dos dados: o site atual do motel (motelcartier.com.br).
============================================================ */
window.MB = window.MB || {};

/* ------------------------------------------------------------
   FOTOGRAFIAS E FILMES
   As suítes ainda estão sem fotos: o site mostra "Fotos em breve".
   Quando o material chegar, ele vai em assets/media/<id-da-suíte>/:
     01.webp, 02.webp …   fotos (1200 px de largura) — a 01 é a capa
     01-sm.webp …         as mesmas fotos em 600 px, para miniaturas
     filme.mp4            vídeo da suíte · filme.webp = capa do vídeo
   e as legendas entram no último argumento de mbSuite (veja SUÍTES).
   MB.img escolhe sozinha a versão menor quando a imagem aparece pequena.
------------------------------------------------------------ */
/* Onde ficam as mídias. Abrindo o index.html direto: assets/media/<suíte>/01.webp.
   No WordPress, o plugin "Cartier — Site" define window.MB_MEDIA: { base, flat, map }.
   Com flat, os arquivos estão na Biblioteca de Mídia com nomes planos (<suíte>-01.webp,
   <suíte>-01-sm.webp, <suíte>-filme.mp4 …) e o map traz o endereço exato de cada um. */
const MB_MEDIA = window.MB_MEDIA || {};
MB.mediaPath = MB_MEDIA.base || ((window.MB_BASE || "") + "assets/media/");
MB.mediaFile = function(id, file){
  if(!MB_MEDIA.flat) return MB.mediaPath + id + "/" + file;
  const name = id + "-" + file;
  return (MB_MEDIA.map && MB_MEDIA.map[name]) || MB.mediaPath + name;
};
MB.img = function(src, w){
  if(!src) return null;
  if(w && w <= 640 && /\.webp$/.test(src) && !/-sm\.webp$/.test(src)){
    if(MB_MEDIA.map){ const sm = src.split("/").pop().replace(/\.webp$/, "-sm.webp"); return MB_MEDIA.map[sm] || src; }
    if(src.startsWith(MB.mediaPath)) return src.replace(/\.webp$/, "-sm.webp");
  }
  return src;
};
MB.shot = function(id, n){ return MB.mediaFile(id, String(n).padStart(2,"0") + ".webp"); };

/* ------------------------------------------------------------
   DADOS DO NEGÓCIO
   whatsapp: somente números, com DDI e DDD. Enquanto vazio, o site
   esconde o botão e o balão do WhatsApp e mostra só o telefone.
------------------------------------------------------------ */
MB.config = {
  name: "Motel Cartier",
  city: "Coronel Fabriciano",
  address: "Av. Rubens Siqueira Maia, 1595 - Coronel Fabriciano - MG",
  addressLines: ["Av. Rubens Siqueira Maia, 1595", "Acesso pelo Bairro Amaro Lanari", "Coronel Fabriciano - MG"],
  whatsapp: "5531999371118",       /* (31) 9 9937-1118 — o mesmo número do telefone */
  phone: "(31) 9 9937-1118",
  open24Hours: true,
  slogan: "Uma revolução na arte de amar",
  legacySite: "http://www.motelcartier.com.br/"
};

MB.lodging = {
  extraHour: null,   /* valor da hora adicional, quando houver (ex.: 30) */
  rules: [
    "Entrada permitida somente para maiores de 18 anos.",
    "Preços sujeitos a alteração sem aviso prévio.",
    "Funcionamento 24 horas, todos os dias."
  ]
};

/* ------------------------------------------------------------
   PERÍODOS — as colunas de preço do site, nesta ordem
   key = nome do campo em prices de cada categoria
------------------------------------------------------------ */
MB.periods = [
  { id:"2h", key:"twoHours", label:"2 horas" },
  { id:"3h", key:"threeHours", label:"3 horas" },
  { id:"pernoite", key:"overnight", label:"Pernoite" }
];

/* ------------------------------------------------------------
   CATEGORIAS — da mais completa para a de entrada.
   count = número de suítes da categoria (null quando não informado)
   prices: null num período = "não disponível" (—)
------------------------------------------------------------ */
MB.categories = {
  presidencial: {
    id: "presidencial", label: "Presidencial", title: "Suítes Presidenciais", count: 2,
    tagline: "Conheça o melhor do Motel Cartier: todo o conforto e a elegância à disposição do casal, com teto solar exclusivo e garagem para dois carros.",
    amenities: ['TV de 42"', "Teto solar exclusivo", "Banheira de hidromassagem", "Sauna", "Mini-boate", "Cadeira erótica", "Chuveiro privativo", "Ar-condicionado", "Sistema de som", "Frigobar", "Mesa com cadeiras", "Garagem privativa para 2 veículos"],
    prices: { twoHours: 120, threeHours: 130, overnight: null },
    tones: ["#0a1236", "#1b2f86", "#3a5ad0"]
  },
  vip: {
    id: "vip", label: "VIP", title: "Suítes VIP", count: 8,
    tagline: "Para a sua noite ser perfeita: o lado prático sem dispensar o conforto do casal, com sauna, mini-boate e hidromassagem.",
    amenities: ["2 TVs de LCD", "Banheira de hidromassagem", "Sauna", "Mini-boate", "Chuveiro privativo", "Ar-condicionado", "Sistema de som", "Frigobar", "Mesa com cadeiras", "Garagem privativa"],
    prices: { twoHours: 105, threeHours: 115, overnight: 180 },
    tones: ["#0a1030", "#1d2a72", "#5a6fd0"]
  },
  superluxo: {
    id: "superluxo", label: "Super Luxo", title: "Suítes Super Luxo", count: 6,
    tagline: "Sinta-se realizado: suítes que despertam no casal a criatividade no prazer, com banheira de hidromassagem.",
    amenities: ["TV de LCD", "Banheira de hidromassagem", "Chuveiro privativo", "Ar-condicionado", "Sistema de som", "Frigobar", "Mesa com cadeiras", "Garagem privativa"],
    prices: { twoHours: 98, threeHours: 108, overnight: 170 },
    tones: ["#0a1434", "#1e3684", "#4468d4"]
  },
  luxo: {
    id: "luxo", label: "Luxo", title: "Suítes Luxo", count: null,
    tagline: "Use sua criatividade: o essencial para o casal, com ar-condicionado, som, TV e frigobar.",
    amenities: ["TV", "Ar-condicionado", "Sistema de som", "Frigobar", "Mesa com cadeiras"],
    prices: { twoHours: 82, threeHours: 92, overnight: 160 },
    tones: ["#0a1232", "#1a2e78", "#3a58c0"]
  }
};

/* ------------------------------------------------------------
   SUÍTES — na ordem das categorias
   mbSuite(número, id, nome, categoria, descrição, tons, legendas, filme)
   número  = número da suíte, quando o motel informar (null: o site não mostra)
   legendas = as legendas das fotos, na ordem dos arquivos 01.webp, 02.webp …
              da pasta assets/media/<id>/ (a 01 é a capa). null enquanto a suíte
              não tiver fotos: o site mostra "Fotos em breve".
   filme   = false para a suíte com fotos mas sem vídeo.
   Ex.: mbSuite(null,"inglesa","Inglesa","presidencial","…", null, ["Cama","Hidromassagem"])
------------------------------------------------------------ */
function mbSuite(number, id, name, category, description, tones, shots, film){
  const cat = MB.categories[category];
  const views = shots || [];
  return {
    number, id, name, category,
    categoryLabel: cat.label,
    description,
    amenities: cat.amenities,
    prices: cat.prices,
    tones: tones || cat.tones,
    views,
    images: views.map((_, i) => MB.shot(id, i + 1)),
    film: views.length && film !== false ? { src: MB.mediaFile(id, "filme.mp4"), poster: MB.mediaFile(id, "filme.webp") } : null
  };
}

MB.suites = [
  /* Presidenciais */
  mbSuite(null,"inglesa","Inglesa","presidencial","A elegância britânica na categoria mais completa da casa: teto solar exclusivo, sauna, banheira de hidromassagem, mini-boate e garagem para dois carros.",["#0a1236","#1b2f86","#3a5ad0"],null),
  mbSuite(null,"africana","Africana","presidencial","O calor da África numa suíte Presidencial, com teto solar exclusivo, sauna, banheira de hidromassagem, mini-boate e cadeira erótica.",["#0b1430","#22306e","#4a5fae"],null),
  /* VIP */
  mbSuite(null,"art-deco","Art Déco","vip","O glamour geométrico dos anos 1920 com a estrutura VIP completa: sauna, mini-boate, banheira de hidromassagem e duas TVs de LCD.",["#0a1030","#1d2a72","#5a6fd0"],null),
  mbSuite(null,"baiana","Baiana","vip","A alegria da Bahia numa suíte VIP com sauna, mini-boate, banheira de hidromassagem e chuveiro privativo.",["#081a33","#14407a","#2f74c0"],null),
  mbSuite(null,"nautica","Náutica","vip","Clima de alto-mar e a estrutura VIP completa: sauna, mini-boate, banheira de hidromassagem e duas TVs de LCD.",["#06182e","#0f3a6e","#2d6ab4"],null),
  mbSuite(null,"grega","Grega","vip","Inspiração mediterrânea para uma noite de deuses, com sauna, mini-boate e banheira de hidromassagem.",["#0a1636","#1a3b8a","#4f7de0"],null),
  mbSuite(null,"marroquina","Marroquina","vip","A inspiração do Marrocos com a praticidade VIP: sauna, mini-boate, banheira de hidromassagem e garagem privativa.",["#0d1234","#28307e","#5660c2"],null),
  mbSuite(null,"chinesa","Chinesa","vip","A inspiração do Oriente com a estrutura VIP completa: sauna, mini-boate, banheira de hidromassagem e duas TVs de LCD.",["#0a0f2e","#1c2470","#3e4cc4"],null),
  mbSuite(null,"gls","GLS","vip","Livre para todos os amores, com sauna, mini-boate, banheira de hidromassagem e chuveiro privativo.",["#0c1034","#2a2a86","#6a5ad8"],null),
  mbSuite(null,"egipcia","Egípcia","vip","O mistério dos faraós com sauna, mini-boate, banheira de hidromassagem e duas TVs de LCD.",["#0a1430","#1c3478","#3d64bc"],null),
  /* Super Luxo */
  mbSuite(null,"romana","Romana","superluxo","A Roma antiga em versão íntima: banheira de hidromassagem, chuveiro privativo e garagem privativa.",["#0a1434","#1e3684","#4468d4"],null),
  mbSuite(null,"anos-dourados","Anos Dourados","superluxo","A nostalgia das décadas de ouro com o conforto Super Luxo e banheira de hidromassagem.",["#0b1232","#232f7a","#4b5bc6"],null),
  mbSuite(null,"japonesa","Japonesa","superluxo","A calma do Japão com banheira de hidromassagem, TV de LCD e garagem privativa.",["#081530","#163a7c","#3368c8"],null),
  mbSuite(null,"country","Country","superluxo","O aconchego do campo com a estrutura Super Luxo: banheira de hidromassagem, som e garagem privativa.",["#0b1430","#1d3370","#41609e"],null),
  mbSuite(null,"arabe","Árabe","superluxo","Uma noite das mil e uma noites, com banheira de hidromassagem e chuveiro privativo.",["#0c1032","#25297a","#5257c0"],null),
  mbSuite(null,"tropical","Tropical","superluxo","Clima de verão o ano inteiro, com banheira de hidromassagem e garagem privativa.",["#061a30","#0f4478","#2b7cc0"],null),
  /* Luxo */
  mbSuite(null,"luxo","Luxo","luxo","As suítes Luxo despertam no casal a criatividade no prazer: ar-condicionado, TV, sistema de som, frigobar e mesa com cadeiras.",["#0a1232","#1a2e78","#3a58c0"],null)
];

/* Suítes exibidas em destaque na Home (a primeira ocupa o quadro maior) */
MB.featured = ["inglesa", "egipcia", "japonesa"];

/* ------------------------------------------------------------
   CARDÁPIO — o livro, página por página (o mesmo do site atual do motel)
   Cada página: { chapter, sections:[ … ] }. Cada seção:
     title, sub (linha fina sob o título), note (observação no pé),
     items:[…]  e/ou  groups:[{ title, cols:2, items:[…] }]
   Item: { name, desc, side, origin, price }
     desc   = descrição em itálico · side = acompanhamentos
     origin = país (vinhos)        · price = valor em reais
   Sem price, o item aparece sem valor; price: null mostra "Consulte".
   Capa, abertura, sumário e contracapa são montados pelo site.js. O sumário,
   os atalhos por capítulo e a lista corrida saem daqui automaticamente.
   Para uma seção de duas páginas ficar lado a lado no livro aberto, a primeira
   página dela deve ser ímpar (3, 5, 7…) — os comentários abaixo marcam os pares.
------------------------------------------------------------ */
const MB_TWO = "Prato para 2 pessoas · preparado na hora";
const MB_SAUTE = "Salteado com cebola, tomate, pimentão e batata frita.";

/* "Bom saber" — página de abertura do cardápio, logo depois da capa */
MB.menuInfo = [
  "Pratos da cozinha nacional, sempre preparados na hora em que são pedidos.",
  "Produtos criteriosamente selecionados garantem a qualidade dos pratos.",
  "Valores no cardápio da suíte ou pelo telefone (31) 9 9937-1118.",
  "Preços sujeitos a alteração sem aviso prévio."
];

MB.menu = [
  /* páginas 3–4 */
  { chapter:"Cozinha", sections:[{ title:"Refeições", sub:MB_TWO, groups:[
    { title:"Carnes", items:[
      {name:"Filé à Cartier", desc:"A receita da casa."},
      {name:"Filé à parmegiana"},
      {name:"Filé ao gorgonzola"},
      {name:"Carne aos quatro queijos"},
      {name:"Picanha na chapa"},
      {name:"Tornedor ao vinho"},
      {name:"Tornedor ao molho madeira"}
    ]}
  ]}]},
  { chapter:"Cozinha", sections:[{ title:"Refeições", sub:MB_TWO, groups:[
    { title:"Aves", items:[
      {name:"Filé Surprise"},
      {name:"Filé de frango à parmegiana"},
      {name:"Strogonoff de frango"}
    ]},
    { title:"Peixes", items:[
      {name:"Salmão à Peixe e Cia"},
      {name:"Torta de bacalhau à Peixe e Cia"}
    ]}
  ]}]},
  /* páginas 5–6 */
  { chapter:"Cozinha", sections:[{ title:"Porções", sub:"Preparadas na hora", items:[
    {name:"Batata frita a palito"},
    {name:"Nuggets"},
    {name:"Mini quibe"},
    {name:"Calabresa", desc:MB_SAUTE},
    {name:"Frango a passarinho", desc:MB_SAUTE},
    {name:"Filé mignon", desc:MB_SAUTE},
    {name:"Lombo", desc:MB_SAUTE},
    {name:"Picanha", desc:MB_SAUTE}
  ], groups:[
    { title:"Acompanhamentos", cols:2, items:[ {name:"Arroz"},{name:"Misto quente"} ] }
  ]}]},
  { chapter:"Cozinha", sections:[
    { title:"Massas", items:[
      {name:"Lasanha quatro queijos"},
      {name:"Lasanha à bolonhesa"},
      {name:"Torta de frango", desc:"Com catupiry, palmito e milho."}
    ]},
    { title:"Pizzas", items:[
      {name:"Frango com catupiry e muçarela"},
      {name:"Quatro queijos"},
      {name:"Calabresa"}
    ]},
    { title:"Café da Manhã", items:[
      {name:"Completo", desc:"Café, leite, suco, pão de queijo, ovos mexidos com queijo, misto quente e frutas."}
    ]}
  ]},
  /* páginas 7–8 */
  { chapter:"Bebidas", sections:[{ title:"Bebidas", groups:[
    { title:"Cervejas", items:[
      {name:"Skol"},{name:"Therezópolis"},{name:"Erdinger Tradicional"},{name:"Erdinger Pikantus"}
    ]},
    { title:"Sem álcool", cols:2, items:[
      {name:"Refrigerante"},{name:"Água mineral com ou sem gás"},{name:"Água H2OH!"},{name:"Toddynho"},
      {name:"Vitamina"},{name:"Suco Mais"},{name:"Gatorade"},{name:"Energético"},{name:"Suco de uva Casa de Madeira"}
    ]},
    { title:"Prontos para beber", items:[ {name:"Smirnoff Ice ou Orloff Ice"} ] }
  ]}]},
  { chapter:"Bebidas", sections:[
    { title:"Doses", items:[
      {name:"Martini"},{name:"Dreher"},{name:"Campari"},{name:"Bacardi"},{name:"Vodka Smirnoff ou Orloff"},{name:"Vodka Absolut"}
    ]},
    { title:"Licor", items:[ {name:"Amarula"} ] },
    { title:"Whisky", items:[
      {name:"White Horse"},
      {name:"Johnnie Walker Red Label", desc:"8 anos"},
      {name:"Johnnie Walker Black Label", desc:"12 anos"}
    ]}
  ]},
  /* páginas 9–10 */
  { chapter:"Bebidas", sections:[{ title:"Vinhos", groups:[
    { title:"Brancos nacionais", items:[
      {name:"Marcus James", origin:"Brasil"},{name:"Bartolo Suave", origin:"Brasil"}
    ]},
    { title:"Tintos nacionais e importados", items:[
      {name:"Marcus James Cabernet", origin:"Brasil"},
      {name:"Bartolo Suave", origin:"Brasil"},
      {name:"Trivento Malbec-Cabernet", origin:"Argentina"},
      {name:"Latitud 33° Malbec", origin:"Argentina"},
      {name:"Terrazas de Los Andes Malbec", origin:"Argentina"},
      {name:"Santa Helena Reservado Cabernet", origin:"Chile"},
      {name:"Santa Digna Carménère", origin:"Chile"},
      {name:"Periquita", origin:"Portugal"}
    ]}
  ]}]},
  { chapter:"Bebidas", sections:[{ title:"Espumantes", items:[
    {name:"Garibaldi Premium Brut", origin:"Brasil"},
    {name:"Chandon Brut Réserve", origin:"Brasil"},
    {name:"Veuve Clicquot", origin:"França"}
  ]}]},
  /* páginas 11–12 */
  { chapter:"Frigobar", sections:[{ title:"Frigobar", sub:"Na sua suíte", groups:[
    { title:"Petiscos e doces", cols:2, items:[
      {name:"Batata Elma Chips"},{name:"Biscoito aperitivo"},{name:"Castanha"},{name:"Amendoim"},
      {name:"Chocolate"},{name:"Halls"},{name:"Chiclete"},{name:"Mini leite condensado"}
    ]},
    { title:"Bebidas geladas", cols:2, items:[
      {name:"Água mineral com ou sem gás"},{name:"Refrigerante"},{name:"Água H2OH!"},{name:"Keep Cooler"},
      {name:"Cerveja Skol"},{name:"Cerveja Therezópolis"},{name:"Cerveja Erdinger"},{name:"Smirnoff Ice ou Orloff Ice"},
      {name:"Toddynho"},{name:"Suco Mais"},{name:"Gatorade"},{name:"Energético"}
    ]}
  ]}]},
  { chapter:"Diversos", sections:[{ title:"Diversos", groups:[
    { title:"Íntimos", cols:2, items:[ {name:"Preservativo Jontex"},{name:"Lubrificante"},{name:"Prótese peniana"},{name:"Banho de espuma"} ] },
    { title:"Higiene e cuidados", cols:2, items:[
      {name:"Kit escova de dentes"},{name:"Prestobarba"},{name:"Shampoo"},{name:"Condicionador"},
      {name:"Touca de banho"},{name:"Pente"},{name:"Absorvente"},{name:"Comprimidos"}
    ]},
    { title:"Tabacaria e utilidades", cols:2, items:[
      {name:"Cigarro Carlton"},{name:"Cigarro Free Box"},{name:"Fósforo"},{name:"Isqueiro"},
      {name:"Copo"},{name:"Cinzeiro"},{name:"Prato"},{name:"Toalha"},{name:"Lençóis"}
    ]}
  ]}]}
];

/* ------------------------------------------------------------
   COMODIDADES (PÁGINA EXPERIÊNCIA) — icon: desenho de linha animado (EXP_ICONS no site.js):
   hidro, sauna, boate, teto, ar, tv, frigobar, garagem, privacidade, temas
------------------------------------------------------------ */
MB.experiences = [
  {t:"Banheira de hidromassagem", d:"Água quente e tempo só de vocês, nas suítes Presidenciais, VIP e Super Luxo.", icon:"hidro"},
  {t:"Sauna", d:"Vapor e calor para relaxar a dois, nas suítes Presidenciais e VIP.", icon:"sauna"},
  {t:"Mini-boate", d:"Uma pista particular, com clima de balada só para o casal, nas Presidenciais e VIP.", icon:"boate"},
  {t:"Teto solar", d:"Exclusivo das suítes Presidenciais: o céu de Coronel Fabriciano dentro do quarto.", icon:"teto"},
  {t:"Ar-condicionado e som", d:"Clima e trilha sonora do jeito de vocês, em todas as suítes.", icon:"ar"},
  {t:"TV de LCD", d:'Até 42" nas Presidenciais e duas TVs nas suítes VIP.', icon:"tv"},
  {t:"Frigobar e cardápio", d:"Bebidas geladas no quarto e uma cozinha com pratos preparados na hora.", icon:"frigobar"},
  {t:"Garagem privativa", d:"Portão eletrônico e garagem privativa, para a sua segurança e discrição.", icon:"garagem"},
  {t:"Suítes temáticas", d:"Mais de 20 temas, da Inglesa à Japonesa, da Grega à Tropical.", icon:"temas"}
];

/* ------------------------------------------------------------
   DÚVIDAS FREQUENTES — apenas informações confirmadas do negócio.
   `home: true` marca as perguntas que aparecem resumidas na Home.
   As perguntas também vão para os dados estruturados (FAQPage) do Google.
------------------------------------------------------------ */
MB.faq = [
  { id:"horario", home:true, q:"Qual é o horário de funcionamento?",
    a:"O Motel Cartier funciona 24 horas por dia, todos os dias da semana. Você pode chegar a qualquer hora do dia ou da noite." },
  { id:"valores", home:true, q:"Quanto custa uma suíte?",
    a:"Presidencial: 2 horas R$ 120,00 · 3 horas R$ 130,00. VIP: 2 horas R$ 105,00 · 3 horas R$ 115,00 · pernoite R$ 180,00. Super Luxo: 2 horas R$ 98,00 · 3 horas R$ 108,00 · pernoite R$ 170,00. Luxo: 2 horas R$ 82,00 · 3 horas R$ 92,00 · pernoite R$ 160,00. Preços sujeitos a alteração sem aviso prévio.",
    link:{label:"Ver tabela completa", href:"#/suites?to=valores"} },
  { id:"promocao", home:true, q:"Tem promoção?",
    a:"Tem, e muda todo mês. Ligue para (31) 9 9937-1118 e informe-se sobre a promoção do mês." },
  { id:"categorias", q:"Qual é a diferença entre Presidencial, VIP, Super Luxo e Luxo?",
    a:"As Presidenciais são as mais completas: TV de 42\", teto solar exclusivo, sauna, banheira de hidromassagem, mini-boate, cadeira erótica e garagem para dois carros. As VIP têm sauna, mini-boate, banheira de hidromassagem e duas TVs de LCD. As Super Luxo têm banheira de hidromassagem e TV de LCD. As Luxo têm ar-condicionado, TV, som e frigobar. Todas têm frigobar, ar-condicionado e sistema de som.",
    link:{label:"Comparar categorias", href:"#/suites"} },
  { id:"reserva", home:true, q:"Como consultar disponibilidade ou reservar?",
    a:"Pelo site você escolhe a categoria, a suíte e o período e envia a consulta pelo WhatsApp; a confirmação é feita diretamente com o Motel Cartier. Se preferir, ligue para (31) 9 9937-1118.",
    link:{label:"Consultar disponibilidade", action:"availability"} },
  { id:"garagem", q:"As suítes têm garagem privativa?",
    a:"Sim. As suítes Presidenciais, VIP e Super Luxo têm garagem privativa (nas Presidenciais, para dois veículos), e a entrada tem portão eletrônico." },
  { id:"idade", q:"Existe idade mínima para entrar?",
    a:"Sim. A entrada é permitida somente para maiores de 18 anos." },
  { id:"cardapio", q:"É possível pedir comida e bebida na suíte?",
    a:"Sim. A cozinha do Motel Cartier tem refeições para duas pessoas, porções, massas, pizzas e café da manhã, sempre preparados na hora, além de vinhos, espumantes, cervejas, doses e whisky. O frigobar tem doces, chocolates, refrigerantes e lanches.",
    link:{label:"Folhear o cardápio", href:"#/cardapio"} },
  { id:"onde", q:"Onde fica o Motel Cartier?",
    a:"Na Av. Rubens Siqueira Maia, 1595, em Coronel Fabriciano - MG, com acesso pelo Bairro Amaro Lanari. Vindo pelo Centro de Coronel Fabriciano, basta seguir em frente após a rodoviária.",
    link:{label:"Ver no mapa", href:"#/contato"} }
];

/* ------------------------------------------------------------
   "O QUE VOCÊ PROCURA?" — índice de navegação da Home
------------------------------------------------------------ */
MB.intents = [
  { n:"01", t:"Conhecer as suítes", d:"Presidencial, VIP, Super Luxo e Luxo: mais de 20 temas.", href:"#/suites" },
  { n:"02", t:"Ver valores e períodos", d:"2 horas, 3 horas ou pernoite — tabela completa por categoria.", href:"#/suites?to=valores" },
  { n:"03", t:"O que tem em cada suíte", d:"Hidromassagem, sauna, mini-boate, teto solar e mais.", href:"#/experiencia" },
  { n:"04", t:"Folhear o cardápio", d:"Refeições para dois, porções, massas, pizzas, vinhos e frigobar.", href:"#/cardapio" },
  { n:"05", t:"Onde fica e como chegar", d:"Av. Rubens Siqueira Maia, 1595 — Coronel Fabriciano.", href:"#/contato" },
  { n:"06", t:"Tirar dúvidas", d:"Horários, valores, promoções e como reservar.", href:"#/sobre?to=duvidas" }
];
