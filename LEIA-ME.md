# Motel Cartier — site

Site estático, sem build e sem dependências. Basta abrir `index.html` no navegador
ou enviar a pasta inteira para qualquer hospedagem (Hostinger, cPanel, Netlify, GitHub Pages…).
Feito a partir do site do Motel Montblack, com a identidade do Cartier: azul royal, noite azul-marinho,
branco frio e o vermelho só na marca.

## Estrutura

```
index.html              → marca (SVG), abertura (intro) e todas as páginas (Home, Suítes, Suíte, Estrutura, Cardápio, Sobre, Contato)
assets/css/site.css     → sistema visual (inclui o roteiro da abertura)
assets/js/data.js       → CONTEÚDO editável (dados do motel, categorias, suítes, preços, cardápio, dúvidas)
assets/js/site.js       → lógica (navegação, livro do cardápio, galeria, disponibilidade) — não precisa mexer
assets/img/             → favicon, ícones, logotipo em PNG e a imagem de compartilhamento (og-cartier.jpg)
assets/media/<suíte>/   → fotos e filmes das suítes (vazias por enquanto; veja assets/media/LEIA-ME.md)
assets/site.webmanifest → nome e ícones para "adicionar à tela inicial"
robots.txt, sitemap.xml → para o Google
wordpress/              → plugin "Cartier — Site", para publicar no WordPress
```

## De onde vieram as informações

Endereço, telefone, categorias, suítes, comodidades, preços e cardápio foram copiados do site atual
do motel (motelcartier.com.br, verificado em 19/10/2026). **Antes de publicar, confirme com o motel:**

- os **preços** (Presidencial 120/130, VIP 105/115/180, Super Luxo 98/108/170, Luxo 82/92/160): o site antigo é
  antigo e eles podem estar desatualizados. Ficam em `MB.categories` e na pergunta "Quanto custa" de `MB.faq`.
- se o **(31) 9 9937-1118 atende no WhatsApp**: o site usa o número para o botão "Enviar pelo WhatsApp" e o balão
  do canto. Se não atender, deixe `MB.config.whatsapp` vazio (`""`) e o site mostra só o telefone.
- o **número de suítes Luxo** (o site antigo lista os temas das outras categorias, mas não os das Luxo; por isso
  elas aparecem como uma entrada só) e se há **Instagram** ou e-mail para incluir.
- o **CEP**, que o site antigo não informa (entra em `addressLines` e no JSON-LD do `<head>`).

O cardápio do site antigo não tem preços: os itens aparecem sem valor e o livro avisa
"Valores no cardápio da suíte ou pelo telefone". Para mostrar um preço, acrescente `price: 25` no item.

## Logotipo

A marca é uma reconstrução do logotipo atual (o oval branco, "Cartier" e MOTEL em vermelho, a onda azul):
o "Cartier" vem da fonte Italianno, o MOTEL da Jost e a onda foi desenhada à mão. Ela fica num único
`<symbol id="cartier-mark">` no começo do `index.html`, usado no cabeçalho, no menu, no rodapé, na capa do
cardápio e na abertura. **Quando o motel enviar o vetor oficial (SVG, AI ou PDF), troque os caminhos desse
símbolo e os da abertura** (prancheta 360 × 170) e gere de novo as imagens de `assets/img/`.

## Abertura (intro)

"A onda e o oval", derivada do logotipo: duas ondas entrelaçadas atravessam a tela, se acalmam numa linha,
a linha se fecha e vira o oval branco, o "Cartier" se escreve em vermelho, a onda azul se desenha e o MOTEL
sobe letra a letra. Na saída o oval vira uma janela (íris) que se abre até cobrir a tela, com a página por
dentro. Cerca de 3,6 s. Esc, Enter, Tab, rolagem, toque ou clique pulam na hora.

- **Quando toca** — uma vez por sessão do navegador. Não toca com rota na URL (`#/suites`…), com a página já
  rolada, em aba de segundo plano, com "reduzir movimento" ligado no sistema ou com `?fx=0` no endereço.
  Para ver de novo, abra o site numa aba anônima ou nova sessão.
- **Onde fica** — a linha de decisão no `<head>` do `index.html`, o bloco `<!-- ABERTURA -->` no começo do
  `<body>` (desenho e controle) e a seção `ABERTURA (INTRO)` do `assets/css/site.css` (roteiro e tempos).
- **Tempos** — ao mudar a duração no CSS, ajuste `LIT` e `TOTAL` no script do bloco.
- **Tocar a cada acesso** — no script de decisão do `<head>`, apague `sessionStorage.getItem("ct-intro")||`.
- **Desligar** — apague o `<script>` de decisão do `<head>` (marcado com o comentário "Abertura").

## SEO

- `<title>`, descrição, `canonical`, Open Graph e Twitter com a imagem `assets/img/og-cartier.jpg` (1200 × 630).
- Dados estruturados (JSON-LD) do tipo `Motel` com endereço, telefone, horário 24 h, faixa de preço, número de
  suítes e comodidades; e `FAQPage` montado a partir de `MB.faq` (site.js). Cada página interna troca o título da aba.
- `robots.txt`, `sitemap.xml`, favicon, ícones e manifest. Sem JavaScript, todas as páginas aparecem em sequência.
- **Domínio**: o site considera `https://www.motelcartier.com.br/`. Se o endereço final for outro (sem www, ou
  outra hospedagem), troque em `index.html` (canonical, `og:*`, `twitter:image` e JSON-LD), `robots.txt` e `sitemap.xml`.
- Depois de publicar, cadastre o site no Google Search Console (envie o `sitemap.xml`) e confira o perfil do motel
  no Google Maps / Perfil da Empresa com o mesmo nome, endereço e telefone do site.

## Navegação

| Área        | Endereço                          |
|-------------|-----------------------------------|
| Home        | `index.html#/`                    |
| Suítes      | `index.html#/suites`              |
| Suítes VIP  | `index.html#/suites?cat=vip`      |
| Uma suíte   | `index.html#/suites/inglesa`      |
| Estrutura   | `index.html#/experiencia`         |
| Cardápio    | `index.html#/cardapio`            |
| Sobre       | `index.html#/sobre`               |
| Dúvidas     | `index.html#/sobre?to=duvidas`    |
| Contato     | `index.html#/contato`             |

Os nomes das páginas do site antigo também funcionam como âncora (`#estrutura`, `#localizacao`, `#promocoes`…).

## O que editar em `assets/js/data.js`

- **Contato** — `MB.config`: `phone` (texto mostrado), `whatsapp` (somente números, com 55 e DDD) e endereço.
- **Períodos** — `MB.periods` (2 horas, 3 horas, pernoite): são as colunas da tabela, dos cartões e da consulta.
- **Categorias e preços** — `MB.categories`: nome, número de suítes (`count`, `null` quando não informado),
  frase, comodidades e `prices`. `null` num período mostra "—" (a Presidencial não tem pernoite no site antigo).
- **Suítes** — `MB.suites`, com `mbSuite(número, id, nome, categoria, descrição, tons, legendas)`. O número fica
  `null` enquanto o motel não informar (o site não mostra número). Os tons são os azuis do quadro sem foto.
- **Fotos** — veja `assets/media/LEIA-ME.md`. Sem foto, a suíte aparece com o quadro azul e "Fotos em breve".
- **Destaques da Home** — `MB.featured` (ids das três suítes; a primeira ocupa o quadro maior).
- **Estrutura** — `MB.experiences`: cada comodidade tem um desenho de linha animado escolhido por `icon`
  (`hidro`, `sauna`, `boate`, `teto`, `ar`, `tv`, `frigobar`, `garagem`, `privacidade`, `temas`; desenhos em `EXP_ICONS`, no site.js).
- **Cardápio** — `MB.menu`, página por página (capítulos Cozinha, Bebidas, Frigobar, Diversos). Para uma seção de
  duas páginas ficar lado a lado no livro aberto, ela deve começar numa página ímpar.
- **Dúvidas** — `MB.faq` (`home: true` faz a pergunta aparecer também na Home). As mesmas perguntas vão para o Google.

## Tipografia

Títulos e números em **Bodoni Moda**, textos e rótulos em **Jost** (Google Fonts, no `<head>` do `index.html`;
papéis nas variáveis `--font-head`, `--font-body` e `--font-display` do `site.css`). O "Cartier" da marca é desenho
(Italianno convertida em contorno), então não depende de fonte carregada.

## Cores

Os tokens ficam no começo do `site.css`: `--royal` (#1F43BF, botões e destaques), `--hero-bg` (royal profundo dos
heros), `--night` (noite azul-marinho das áreas escuras), `--ice` (azul-gelo, destaques sobre o escuro), `--snow`
e `--surface` (fundos claros) e `--red` (#C8102E, só na marca).

## Publicação no WordPress

O plugin `wordpress/cartier-site.php` serve o site como página inicial (o tema continua instalado). Para montar o
zip: copie `index.html` (renomeado para `site.html`), `wordpress/cartier-site.php` e a pasta `assets/` (sem
`assets/media`, se as fotos forem para a Biblioteca de Mídia) para `dist/_plugin/cartier-site/` e rode
`tar -a -c -f dist/cartier-site.zip -C dist/_plugin cartier-site`. Envie em Plugins › Adicionar novo › Enviar plugin.
Na Biblioteca de Mídia as fotos usam nomes planos: `inglesa-01.webp`, `inglesa-01-sm.webp`, `inglesa-filme.mp4`.
