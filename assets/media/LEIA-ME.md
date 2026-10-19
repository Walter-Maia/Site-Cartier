# Fotos e filmes das suítes

As pastas estão vazias de propósito: o site mostra cada suíte com o quadro azul e "Fotos em breve"
até o material chegar. Uma pasta por suíte, com o mesmo id usado em `assets/js/data.js`:

| Categoria    | Pastas |
|--------------|--------|
| Presidencial | `inglesa`, `africana` |
| VIP          | `art-deco`, `baiana`, `nautica`, `grega`, `marroquina`, `chinesa`, `gls`, `egipcia` |
| Super Luxo   | `romana`, `anos-dourados`, `japonesa`, `country`, `arabe`, `tropical` |
| Luxo         | `luxo` |

## Arquivos de cada pasta

```
01.webp, 02.webp …        fotos com 1200 px de largura, de preferência em retrato (3:4); a 01 é a capa
01-sm.webp, 02-sm.webp …  as mesmas fotos com 600 px, para miniaturas
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

No `assets/js/data.js`, troque o `null` do fim da linha da suíte pelas legendas das fotos, na ordem dos arquivos:

```js
mbSuite(null,"inglesa","Inglesa","presidencial","…",["#0a1236","#1b2f86","#3a5ad0"],
  ["Ambiente principal","Hidromassagem","Teto solar"])          // 01.webp, 02.webp, 03.webp
```

Sem vídeo, acrescente `false` depois das legendas: `mbSuite(…, ["Cama","Sauna"], false)`.
Assim que uma suíte tiver foto, ela entra sozinha no baralho e nos destaques da Home, na galeria e no índice.
