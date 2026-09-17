# Arcanoterapia

App de tarô + astrologia em pt-BR. React 19 + Vite 6 + TypeScript, Tailwind pelo
CDN (`cdn.tailwindcss.com`, no `index.html` — não há build local de Tailwind).
Publicado no GitHub Pages: 100% estático, sem backend, sem login, sem LLM em
tempo de execução. Tudo o que o usuário produz fica no `localStorage`.

`base: '/arcanoterapia/'` no `vite.config.ts` — por isso todo caminho de imagem
passa por `asset()` com `import.meta.env.BASE_URL`, nunca por uma barra inicial.

## Comandos

```bash
npm run build       # vite build (esbuild, sem checagem de tipos)
npm run typecheck   # tsc --noEmit — está em ZERO erros; mantenha assim
npm run preview     # serve o dist em http://localhost:3000/arcanoterapia/
```

## Cor por arcano

Cada um dos 22 arcanos tem `cor` e `cor_secundaria` no `arcanos.json`. Nunca
pinte uma tela com âmbar, teal ou violeta fixos: use `variaveisDaPaleta()` de
`src/utils/arcanoPalette.ts` no elemento de topo da aba e `var(--arc-*)` nos
descendentes. As únicas cores deliberadamente fixas são o verde de "feito"
(o sinal de conclusão precisa significar o mesmo nos 22) e o verde da folha na
Botica.

Bordas de gradiente usam `bordaGradiente()`, que fecha os quatro lados.

## gstack

Este repositório usa o [gstack](https://github.com/garrytan/gstack) — uma suíte
de ~53 skills para Claude Code (`/review`, `/qa`, `/ship`, `/cso`, `/investigate`,
`/office-hours`, entre outras). Ele **não** é versionado aqui; cada máquina
instala o seu:

```bash
git clone --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack
cd ~/.claude/skills/gstack && ./setup
```

Para navegação web, prefira a skill `/browse` do gstack.

**Em sessões remotas (Claude Code na web)** o contêiner nasce vazio, então o
gstack não está presente até ser clonado na própria sessão. Duas ressalvas
observadas neste ambiente:

- o `./setup` não consegue baixar o Chromium (`cdn.playwright.dev` é bloqueado
  pelo proxy de egresso), mas o contêiner já traz um em `/opt/pw-browsers`;
- para o Playwright empacotado do gstack enxergar esse Chromium é preciso uma
  ponte de revisão e `PLAYWRIGHT_BROWSERS_PATH` apontando para ela. Sem isso,
  as skills que dirigem navegador (`/qa`, `/design-review`, `/scrape`,
  `/benchmark`) reportam `browser unavailable`; as demais funcionam.

## Verificação

Mudou uma aba? Rode `npm run build` e confira no navegador contra o preview
local antes de commitar. Os testes de regressão desta sessão vivem no
scratchpad, não no repositório.
