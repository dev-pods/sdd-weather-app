# Prompts — (Delivery)

---

## P11.1 — Entender o base do Vite

```
Explique por que o `base` do Vite precisa ser /<repo>/app/ ao publicar no GitHub
Pages e como vite.config.ts lê isso de VITE_BASE. O que aconteceria com os assets
se o base ficasse "/"?
```

## P11.2 — Validar build de produção

```
Quero validar localmente o build que será publicado no Pages. Gere os comandos
para buildar com VITE_BASE=/sdd-weather-app/app/ e servir o preview, e explique o
que verificar (caminhos de assets, ausência de 404).
```

## P11.3 — Entender o workflow de Pages

```
Explique passo a passo o que .github/workflows/pages.yml faz: build, montagem do
_site (site na raiz, app em /app/, workshop em /workshop/) e publicação. Que
permissões e configurações de repositório são necessárias?
```

## P11.4 — Troubleshooting do deploy

```
O site publicou mas o app em /app/ mostra tela branca / assets 404. Liste as
causas mais prováveis (base incorreto, VITE_BASE não aplicado, cache) e como
corrigir.
```

## P11.5 — Anúncio de entrega

```
Escreva uma mensagem curta de release anunciando o Weather App publicado:
principais features, link do app e link do workshop. Tom profissional, pt-BR.
```
