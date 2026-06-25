# Solução de referência — (Hardening)

O app de referência já incorpora as práticas de hardening. Use como gabarito.

## Acessibilidade (a11y)

- **Busca:** `SearchBar` usa `<form>` com `label` associado e `aria-label` no
  input; o botão tem texto visível.
- **Toggle de unidade:** `UnitToggle` usa `role="group"` + `aria-pressed` nos
  botões — leitores anunciam qual unidade está ativa.
- **Estados:** `LoadingState` usa `role="status"`; `ErrorState` usa `role="alert"`
  → mudanças são anunciadas.
- **Teclado:** todos os interativos são nativos (`button`, `input`) — foco e
  ativação por teclado funcionam por padrão.
- Ver [`src/components/SearchBar.tsx`](../../src/components/SearchBar.tsx),
  [`src/components/UnitToggle.tsx`](../../src/components/UnitToggle.tsx),
  [`src/components/states/LoadingState.tsx`](../../src/components/states/LoadingState.tsx),
  [`src/components/states/ErrorState.tsx`](../../src/components/states/ErrorState.tsx).

## Resiliência

- **Timeout** de 10s via `AbortController` em
  [`src/services/weatherService.ts`](../../src/services/weatherService.ts).
- **Erros tipados** (`WeatherServiceError`) com mensagens prontas ao usuário.
- **Retry** em [`src/hooks/useWeather.ts`](../../src/hooks/useWeather.ts) refaz a
  última operação (buscar/cidade).
- Falha de rede vira estado `error` controlado — a UI nunca quebra.

## Respostas parciais

- `precipitation_probability_max[i] ?? 0` evita `null` na tela.
- Ausência de `current`/`daily` → erro de "resposta incompleta" em vez de crash.

## Edge cases cobertos por teste

- Input vazio não dispara busca (`SearchBar.test.tsx`).
- Geocoding sem `results` → estado vazio (`weatherService.test.ts` + E2E).
- Resposta não-ok e incompleta → erro (`weatherService.test.ts`).

## Verificação

```bash
pnpm lint && pnpm build && pnpm test && pnpm test:e2e
```

Tudo verde.
