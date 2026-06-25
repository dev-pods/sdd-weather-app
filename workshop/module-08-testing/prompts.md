# Prompts — (Testing)

> Use o **Test Agent** (`.github/agents/test.agent.md`) + `test-prompt`.

---

## P8.1 — Testes de conversão

```
Gere testes Vitest para `src/lib/temperature.ts` em
`tests/unit/temperature.test.ts`. Cubra: 0°C→32°F, 100°C→212°F, -40°C→-40°F,
convertTemperature por unidade, formatTemperature (arredondamento + símbolo) e
unitLabel.
```

## P8.2 — Testes de libs

```
Gere testes para `src/lib/weatherCodes.ts` (código conhecido + fallback de
desconhecido) e `src/lib/format.ts` (índice 0 → "Hoje", 1 → "Amanhã", demais →
dia da semana; getShortDate).
```

## P8.3 — Testes do service (mock de fetch)

```
Gere testes para `src/services/weatherService.ts` usando vi.stubGlobal('fetch',
...). Cubra: searchCities com input vazio (não chama fetch), mapeamento de
results, results ausente (vazio) e resposta não-ok (erro). Para getWeather:
mapeamento de current+daily para 5 dias, precipitação null → 0, e resposta
incompleta (current/daily ausentes) lançando WeatherServiceError.
```

## P8.4 — Testes de componentes

```
Gere testes com Testing Library para SearchBar (input vazio não dispara onSearch;
termo dispara com o valor) e para a conversão de unidade: ao renderizar
UnitToggle + CurrentWeather com temperatura 0°C, clicar em °F deve exibir 32°.
Use queries acessíveis (getByRole, getByLabelText).
```

## P8.5 — E2E do fluxo principal

```
Gere um teste Playwright em `tests/e2e/weather.spec.ts`. Use page.route para
mockar geocoding e forecast com respostas determinísticas. Fluxo: preencher a
busca, clicar em Buscar, ver o nome da cidade, ver a região "Previsão de 5 dias"
e, ao clicar em °F, ver a temperatura convertida.
```

## P8.6 — E2E de estado vazio e mobile

```
Adicione dois testes E2E: (1) quando o geocoding retorna {} (sem results), a UI
mostra "Nenhuma cidade encontrada"; (2) em viewport mobile (375x812), o fluxo
principal de busca renimage o clima corretamente.
```

## P8.7 — Cobertura e lacunas

```
Rode mentalmente os edge cases da spec contra a suíte atual. Quais casos ainda
não têm teste? Gere os testes faltantes priorizando os de maior risco (conversão
incorreta, falha de API, resposta parcial).
```

## P8.8 — Estabilidade dos testes

```
Revise os testes E2E quanto a flakiness: há esperas implícitas frágeis ou
seletores não-acessíveis? Sugira melhorias para torná-los determinísticos.
```
