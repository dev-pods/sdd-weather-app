# Desafio — Testes (Vitest + Playwright)

Tempo estimado: **~55 min**

> Use o **Test Agent** (`.github/agents/test.agent.md`) e o prompt `test-prompt`.

---

## Desafio 8.1 — Testes da conversão de unidade (T-14)

Cubra `lib/temperature.ts`: 0→32, 100→212, -40→-40, arredondamento e símbolo.

**Sucesso:** testes da conversão passam.

> Veja `Prompts` → **P8.1**.

---

## Desafio 8.2 — Testes de `weatherCodes` e `format`

Cubra o mapeamento de códigos (com fallback) e os rótulos de data
(Hoje/Amanhã/dia).

**Sucesso:** testes de libs passam.

> Veja `Prompts` → **P8.2**.

---

## Desafio 8.3 — Testes do service com mock de `fetch` (T-14)

Faça `mock` de `fetch` (sucesso e falha). Cubra: input vazio (não chama rede),
mapeamento de geocoding, vazio, resposta não-ok e resposta de forecast
incompleta.

**Sucesso:** o service é testado sem rede real, incluindo caminhos de erro.

> Veja `Prompts` → **P8.3**.

---

## Desafio 8.4 — Testes de componentes (T-15)

Cubra `SearchBar` (vazio não dispara; termo dispara) e a conversão de unidade no
`CurrentWeather` via `UnitToggle` (0° → 32° ao trocar para °F).

**Sucesso:** testes de componentes passam usando queries acessíveis.

> Veja `Prompts` → **P8.4**.

---

## Desafio 8.5 — Testes E2E do fluxo principal (T-16)

Com `page.route`, intercepte geocoding e forecast. Teste: buscar → ver clima →
ver previsão → trocar unidade. Inclua um teste em **viewport mobile** e um de
**estado vazio**.

**Sucesso:** `pnpm test:e2e` passa de forma determinística.

> Veja `Prompts` → **P8.5** e **P8.6**.

---

## Desafio 8.6 — Cobertura e edge cases

Rode a cobertura e identifique lacunas. Garanta que os **edge cases** da spec
têm teste.

```bash
pnpm test:coverage
```

**Sucesso:** edge cases principais cobertos; sem regressões.

> Veja `Prompts` → **P8.7**.

---

## Checklist do módulo

- [ ] Conversão de unidade testada
- [ ] Libs (codes/format) testadas
- [ ] Service testado com mock (sucesso + erro)
- [ ] Componentes testados (incl. conversão na UI)
- [ ] E2E do fluxo principal + mobile + vazio
- [ ] Edge cases cobertos
