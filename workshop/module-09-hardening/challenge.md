# Desafio — Hardening

Tempo estimado: **~50 min**

---

## Desafio 9.1 — Auditoria de acessibilidade (T-17)

Peça ao Copilot uma auditoria de a11y e corrija:

- Navegação completa por teclado (tab/enter)
- Foco visível em elementos interativos
- `roles`/`labels` semânticos (busca, grupo de unidade, status, alert)
- Contraste adequado

**Sucesso:** é possível usar o app inteiro só com teclado; leitores de tela
anunciam estados (loading/erro).

> Veja `Prompts` → **P9.1**.

---

## Desafio 9.2 — Resiliência a falhas (T-18)

Garanta:

- Timeout de rede com mensagem clara
- Botão "tentar novamente" funcional
- Falha de uma chamada não trava a UI

**Sucesso:** em modo offline, o app mostra erro com retry e se recupera ao
voltar a conexão.

> Veja `Prompts` → **P9.2**.

---

## Desafio 9.3 — Respostas parciais e dados ausentes

Trate campos ausentes/`null` (ex.: probabilidade de precipitação) exibindo "—"
ou `0`, sem quebrar o layout.

**Sucesso:** resposta parcial não gera `NaN`/`undefined` na tela.

> Veja `Prompts` → **P9.3**.

---

## Desafio 9.4 — Edge cases da spec → testes

Para cada edge case da spec sem teste, adicione um. Ex.: caracteres especiais na
busca, input só com espaços, geocoding vazio.

**Sucesso:** edge cases principais têm teste e passam.

> Veja `Prompts` → **P9.4**.

---

## Desafio 9.5 — Performance e UX

Pequenos ganhos: evitar re-render desnecessário, `aria-busy` durante loading,
estados de hover/disabled coerentes, foco no resultado após a busca.

**Sucesso:** percepção de fluidez; sem travamentos visíveis.

> Veja `Prompts` → **P9.5**.

---

## Desafio 9.6 — Checklist final de qualidade

```bash
pnpm lint
pnpm build
pnpm test
pnpm test:e2e
```

**Sucesso:** tudo verde.

---

## Checklist do módulo

- [ ] A11y: teclado, foco, roles/labels, contraste
- [ ] Resiliência: timeout, retry, sem travar
- [ ] Respostas parciais tratadas
- [ ] Edge cases com teste
- [ ] Melhorias de performance/UX
- [ ] Checklist completo verde
