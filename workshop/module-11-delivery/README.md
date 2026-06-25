# Delivery (GitHub Pages)

## Objetivo

Entrar na fase de **Shipping**: publicar o app e o site do workshop no **GitHub
Pages** via GitHub Actions, fechando o ciclo SDD de ponta a ponta.

```text
Thinking → Planning → Decomposing → Building → Testing → Reviewing → Shipping
                                                                     ▲ você está aqui
```

---

## Por que isso importa

Software só gera valor quando chega ao usuário. Automatizar o deploy garante
entregas **repetíveis e seguras**. Aqui você publica de verdade — e entende como
o `base` do Vite muda em produção.

---

## Entrada

- App aprovado no PR (Modules 05–09)
- Workflow [`.github/workflows/pages.yml`](../../.github/workflows/pages.yml)
- `vite.config.ts` com `base` configurável via `VITE_BASE`

## Saída

- GitHub Pages habilitado (Source: GitHub Actions)
- Site do workshop publicado na raiz
- App publicado em `/<repo>/app/`
- URL pública funcionando
