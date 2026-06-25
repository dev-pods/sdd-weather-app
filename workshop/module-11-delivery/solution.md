# Solução de referência — (Delivery)

A automação de deploy já está pronta no repositório.

## Como funciona

O workflow [`.github/workflows/pages.yml`](../../.github/workflows/pages.yml)
dispara em push para `main`:

1. **Build do app** com `VITE_BASE=/${{ github.event.repository.name }}/app/` —
   garante que os assets apontem para o subcaminho correto do Pages.
2. **Montagem do `_site`:**
   - `docs/*` → raiz (site do workshop),
   - `dist/*` → `/app/` (app buildado),
   - `workshop/*` → `/workshop/` (markdown que o site renderiza).
3. **Publicação** via `actions/upload-pages-artifact` + `actions/deploy-pages`.

## O `base` configurável

Em [`vite.config.ts`](../../vite.config.ts):

```ts
base: process.env.VITE_BASE ?? '/',
```

- **Local/dev:** `base = '/'`.
- **Pages:** `base = '/<repo>/app/'` (injetado pelo workflow).

Sem isso, os assets seriam buscados na raiz do domínio e dariam 404.

## Validação local

```bash
VITE_BASE=/sdd-weather-app/app/ pnpm build
pnpm preview
```

## Configuração do repositório (uma vez)

- **Settings → Pages → Source: GitHub Actions.**
- Permissões já declaradas no workflow (`pages: write`, `id-token: write`).

## URLs finais

- Workshop: `https://<user>.github.io/<repo>/`
- App: `https://<user>.github.io/<repo>/app/`

Ciclo SDD completo: **Brief → Spec → Plan → Tasks → Code → Test → Review →
Ship**. O Weather App está no ar.
