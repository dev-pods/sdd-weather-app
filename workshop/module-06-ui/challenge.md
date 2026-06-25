# Desafio — Construir a UI (com dados mock)

Tempo estimado: **~60 min**

> Trabalhe com o **Code Agent** e o prompt `implementation-prompt`. Use um objeto
> `WeatherData` mock enquanto a API não está integrada.

---

## Desafio 6.1 — Tipos e fixture de dados (T-01)

Implemente `src/types/weather.ts` (se ainda não existir) e crie um objeto mock
de `WeatherData` para desenvolver a UI.

**Sucesso:** tipos compilam; existe um mock de uma cidade com clima atual + 5 dias.

> Veja `Prompts` → **P6.1**.

---

## Desafio 6.2 — `SearchBar` (T-08)

Componente de busca acessível: `label`, `role="search"`, bloqueia submit vazio.

**Sucesso:** ao digitar e enviar, dispara o callback `onSearch`; vazio não dispara.

> Veja `Prompts` → **P6.2**.

---

## Desafio 6.3 — `UnitToggle` (T-12)

Alternador °C/°F com `aria-pressed`, navegável por teclado.

**Sucesso:** o botão ativo expõe `aria-pressed="true"`.

> Veja `Prompts` → **P6.3**.

---

## Desafio 6.4 — `CurrentWeather` (T-10)

Hero com temperatura grande, ícone do clima, condição e 4 métricas. Use a função
pura de conversão de temperatura.

**Sucesso:** com o mock, exibe os dados; trocar a unidade converte os valores.

> Veja `Prompts` → **P6.4**.

---

## Desafio 6.5 — `ForecastList` + `ForecastCard` (T-11)

Grid responsivo de 5 dias: `grid-cols-2 sm:grid-cols-3 lg:grid-cols-5`. Cada card
mostra dia, ícone, máx/mín e probabilidade de precipitação.

**Sucesso:** 5 cards renderizam; layout se adapta do mobile ao desktop.

> Veja `Prompts` → **P6.5**.

---

## Desafio 6.6 — Estados Loading / Error / Empty (T-09)

Crie os três componentes de estado. `Error` tem ação "tentar novamente";
`Loading` usa `role="status"`.

**Sucesso:** os três estados existem e são acessíveis.

> Veja `Prompts` → **P6.6**.

---

## Desafio 6.7 — Integrar no `App` com mock (T-13)

Monte o layout completo no `App`, controlando qual estado exibir por uma variável
temporária (ex.: `status`). Mantenha o `unit` como estado de UI.

**Sucesso:** o app exibe o layout completo com o mock; `pnpm dev` mostra a
tela parecida com a referência visual.

> Veja `Prompts` → **P6.7**.

---

## Desafio 6.8 — Conferir responsividade e checklist

Abra o devtools, teste em 375px e desktop. Rode o checklist.

```bash
pnpm lint
pnpm build
pnpm test
```

**Sucesso:** layout responsivo OK; checklist passando.

---

## Checklist do módulo

- [ ] Tipos + fixture mock
- [ ] SearchBar, UnitToggle, CurrentWeather, ForecastList/Card, estados
- [ ] App integrando tudo com mock
- [ ] Conversão C/F funcionando na UI
- [ ] Responsivo (mobile → desktop)
- [ ] `lint`, `build`, `test` OK
