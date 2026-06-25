# Desafio — Integrar a Open-Meteo

Tempo estimado: **~60 min**

---

## Desafio 7.1 — Service de geocoding (T-05)

Implemente `searchCities(name)` em `src/services/weatherService.ts`. Deve:

- Retornar `City[]`
- Retornar `[]` para input vazio (sem chamar a rede)
- Tratar resposta não-ok com erro tipado (`WeatherServiceError`)

**Sucesso:** ao buscar "Seattle", retorna ao menos uma cidade.

> Veja `Prompts` → **P7.1**.

---

## Desafio 7.2 — Service de forecast (T-06)

Implemente `getWeather(city)` mapeando `current` + `daily` para `WeatherData`.
Deve retornar exatamente 5 dias e tratar resposta incompleta.

**Sucesso:** retorna `WeatherData` válido com 5 dias.

> Veja `Prompts` → **P7.2**.

---

## Desafio 7.3 — Timeout e erros de rede

Adicione `AbortController` com timeout. Converta `AbortError` e falhas de rede em
`WeatherServiceError` com mensagens amigáveis.

**Sucesso:** timeout e falha de rede produzem mensagens claras, sem travar a UI.

> Veja `Prompts` → **P7.3**.

---

## Desafio 7.4 — Hook `useWeather` (T-07)

Implemente o hook que orquestra busca → seleção → forecast, expondo a máquina de
estados `idle | loading | success | error | empty`, além de `retry`.

**Sucesso:** o hook centraliza estado e erros; `retry` refaz a última ação.

> Veja `Prompts` → **P7.4**.

---

## Desafio 7.5 — Conectar o `App` aos dados reais

Substitua o mock pelo `useWeather`. Mantenha o `unit` como estado de UI.

**Sucesso:** buscar uma cidade real exibe clima atual + previsão; trocar a
unidade converte sem novo request.

> Veja `Prompts` → **P7.5**.

---

## Desafio 7.6 — Testar manualmente os caminhos

Teste no navegador: cidade válida, cidade inexistente (estado vazio) e modo
offline/erro (DevTools → Network → Offline).

**Sucesso:** os três caminhos se comportam conforme a spec.

```bash
pnpm lint
pnpm build
pnpm test
```

---

## Checklist do módulo

- [ ] `searchCities` e `getWeather` implementados
- [ ] Timeout + erros de rede tratados
- [ ] `useWeather` com máquina de estados + retry
- [ ] `App` consumindo dados reais
- [ ] Caminhos válido/vazio/erro verificados
- [ ] `lint`, `build`, `test` OK
