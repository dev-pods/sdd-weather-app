# Solução de referência — (Testing)

A suíte completa está no repositório. **21 testes unitários** + **3 testes E2E**
(rodando em chromium e mobile) passam.

## Arquivos de referência

- [`tests/unit/temperature.test.ts`](../../tests/unit/temperature.test.ts)
- [`tests/unit/weatherCodes.test.ts`](../../tests/unit/weatherCodes.test.ts)
- [`tests/unit/format.test.ts`](../../tests/unit/format.test.ts)
- [`tests/unit/weatherService.test.ts`](../../tests/unit/weatherService.test.ts)
- [`tests/unit/SearchBar.test.tsx`](../../tests/unit/SearchBar.test.tsx)
- [`tests/unit/UnitToggle.test.tsx`](../../tests/unit/UnitToggle.test.tsx)
- [`tests/unit/App.test.tsx`](../../tests/unit/App.test.tsx)
- [`tests/e2e/weather.spec.ts`](../../tests/e2e/weather.spec.ts)

## Padrões aplicados

- **Mock de rede com `vi.stubGlobal('fetch', ...)`** nos testes do service —
  nenhum teste toca a API real.
- **Queries acessíveis** (`getByRole`, `getByLabelText`) em vez de seletores por
  classe — os testes validam a experiência, não a implementação.
- **Determinismo no E2E** via `page.route('**/geocoding-api.open-meteo.com/**')`
  e `'**/api.open-meteo.com/**'` retornando fixtures.
- **Conversão verificável:** temperatura mock de 0°C facilita assertar 32°F.
- **Cobertura de edge cases:** input vazio, sem resultados, resposta não-ok e
  resposta incompleta.

## Comandos

```bash
pnpm test            # unitários (Vitest)
pnpm test:coverage   # cobertura
pnpm test:e2e        # E2E (Playwright)
```

## Resultado esperado

```text
Test Files  7 passed (7)
     Tests  21 passed (21)

3 passed   (Playwright: fluxo, vazio, mobile)
```
