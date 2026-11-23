# Fotos e filmes das suítes

Uma pasta por suíte, com o mesmo id usado em `assets/js/data.js`. As fotos vieram das pastas numeradas
enviadas pelo motel ("Suíte 01" … "Suíte 23"); o número da pasta é o número da suíte no site, e o tema
foi conferido pela decoração de cada uma:

| Categoria    | Suíte → pasta |
|--------------|---------------|
| Presidencial | 22 `africana` · 23 `inglesa` |
| VIP          | 14 `grega` · 15 `egipcia` · 16 `art-deco` · 17 `baiana` · 18 `nautica` · 19 `gls` · 20 `chinesa` · 21 `marroquina` |
| Super Luxo   | 01 `arabe` · 02 `romana` · 03 `country` · 04 `japonesa` · 05 `rock` · 06 `tropical` · 07 `anos-dourados` |
| Luxo         | `luxo` (pasta "Suíte Padrão") · `motoqueiro` (pasta "Suíte De Motoqueiro"), sem número |

Uma suíte sem fotos (pasta vazia e `null` no lugar das legendas) aparece com o quadro azul e "Fotos em breve".

## Arquivos de cada pasta

```
01.webp, 02.webp …        fotos com 1200 px de largura, de preferência em retrato (3:4); a 01 é a capa
01-sm.webp, 02-sm.webp …  as mesmas fotos com 600 px: miniaturas e todo quadro que caiba nelas (o site escolhe pelo tamanho na tela)
filme.mp4                 vídeo vertical 720 × 1280, H.264, sem áudio (opcional)
filme.webp                capa do vídeo (o primeiro quadro)
```

Conversão com ffmpeg (exemplo):

```
ffmpeg -i original.jpg -vf scale=1200:-2 -quality 82 01.webp
ffmpeg -i original.jpg -vf scale=600:-2  -quality 80 01-sm.webp
ffmpeg -i video.mov -vf "scale=720:-2,fps=30,format=yuv420p" -c:v libx264 -crf 27 -an -movflags +faststart filme.mp4
```

## Depois de copiar as fotos

No `assets/js/data.js`, as legendas das fotos ficam no fim da linha da suíte, na ordem dos arquivos:

```js
mbSuite("23","inglesa","Inglesa","presidencial","…",["#0a1236","#1b2f86","#3a5ad0"],
  ["Ambiente principal","Cama e espelho no teto","Cabeceira capitonê"], false)   // 01.webp, 02.webp, 03.webp
```

O `false` depois das legendas diz que a suíte não tem vídeo (hoje nenhuma tem). Quando houver `filme.mp4`
e `filme.webp` na pasta, apague o `, false`. Para trocar a capa, renomeie os arquivos (a 01 é a capa) e
acompanhe a ordem das legendas.
Assim que uma suíte tiver foto, ela entra sozinha no baralho e nos destaques da Home, na galeria e no índice.
