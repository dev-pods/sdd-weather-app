# Desafio — Delivery (GitHub Pages)

Tempo estimado: **~30 min**

---

## Desafio 11.1 — Entender o `base` do Vite

No GitHub Pages, o app não roda na raiz do domínio, e sim em `/<repo>/app/`. Por
isso o build usa `VITE_BASE`.

**Sucesso:** você explica por que o `base` precisa mudar em produção e como o
workflow define `VITE_BASE`.

> Veja `Prompts` → **P11.1**.

---

## Desafio 11.2 — Validar o build de produção localmente

```bash
VITE_BASE=/sdd-weather-app/app/ pnpm build
pnpm preview
```

**Sucesso:** o preview do build de produção carrega sem erros de caminho de
assets.

> Veja `Prompts` → **P11.2**.

---

## Desafio 11.3 — Habilitar o GitHub Pages

No repositório: **Settings → Pages → Build and deployment → Source: GitHub
Actions**.

**Sucesso:** Pages configurado para deploy via Actions.

---

## Desafio 11.4 — Disparar o deploy

Faça merge do PR (ou push na `main`). O workflow
[`pages.yml`](../../.github/workflows/pages.yml) vai:

1. buildar o app com `VITE_BASE=/<repo>/app/`,
2. montar `_site` (site na raiz + app em `/app/` + markdown em `/workshop/`),
3. publicar no Pages.

**Sucesso:** o workflow conclui verde e gera a URL de deploy.

> Veja `Prompts` → **P11.3**.

---

## Desafio 11.5 — Verificar a publicação

Acesse:

- **Site do workshop:** `https://<user>.github.io/<repo>/`
- **App:** `https://<user>.github.io/<repo>/app/`

**Sucesso:** ambos carregam e o app funciona (busca, clima, unidade).

> Veja `Prompts` → **P11.4**.

---

## Checklist do módulo

- [ ] Entendi o papel do `VITE_BASE`
- [ ] Build de produção validado localmente
- [ ] Pages habilitado (Source: GitHub Actions)
- [ ] Deploy disparado e verde
- [ ] Site e app acessíveis na URL pública

🎉 **Parabéns!** Você percorreu o ciclo completo de SDD:
**Brief → Spec → Plan → Tasks → Code → Test → Review → Ship.**
