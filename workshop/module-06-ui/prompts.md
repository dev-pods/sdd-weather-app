# Prompts — (Building the UI)

> Use o **Agent Mode** com o **Code Agent** (`.github/agents/code.agent.md`) e
> o prompt `implementation-prompt`. Implemente **uma tarefa por vez**.

---

## P6.1 — Tipos + fixture

```
Implemente os tipos em `src/types/weather.ts` conforme o plano (Unit, City,
CurrentWeather, ForecastDay, WeatherData). Em seguida, crie um objeto mock de
WeatherData (cidade de exemplo, clima atual e 5 dias) que eu possa usar para
desenvolver a UI sem a API.
```

## P6.2 — SearchBar

```
Implemente o componente `src/components/SearchBar.tsx`. Requisitos:
- input com label acessível e role="search"
- não dispara busca com input vazio (trim)
- prop onSearch(city: string) e prop disabled
- estilo Tailwind glassmorphism conforme as instruções do projeto
```

## P6.3 — UnitToggle

```
Implemente `src/components/UnitToggle.tsx` com dois botões (°C/°F). Use
aria-pressed para indicar o ativo, role="group" com aria-label, e navegação por
teclado. Props: unit e onChange.
```

## P6.4 — CurrentWeather

```
Implemente `src/components/CurrentWeather.tsx`: hero com temperatura grande,
ícone do clima (de lib/weatherCodes), condição e métricas (umidade, vento,
precipitação, pressão). Use lib/temperature para exibir na unidade atual.
Props: city, current, unit.
```

## P6.5 — ForecastList + ForecastCard

```
Implemente `src/components/ForecastList.tsx` e `ForecastCard.tsx`. Grid
responsivo grid-cols-2 sm:grid-cols-3 lg:grid-cols-5. Cada card: rótulo do dia
(de lib/format), ícone, máx/mín (na unidade atual) e probabilidade de chuva.
```

## P6.6 — Estados

```
Implemente `src/components/states/LoadingState.tsx`, `ErrorState.tsx` e
`EmptyState.tsx`. Loading com role="status"; Error com mensagem e botão "tentar
novamente" (prop onRetry); Empty com título e dica.
```

## P6.7 — Integrar no App

```
Monte o layout completo em `src/App.tsx` usando o mock de WeatherData. Header
com marca + SearchBar + UnitToggle. Conteúdo alternando entre os estados
(idle/loading/empty/error/success). Mantenha unit como estado de UI e converta
as temperaturas na renderização.
```

## P6.8 — Revisão de UI e acessibilidade

```
Revise os componentes criados quanto a acessibilidade (roles, labels, foco,
contraste) e responsividade (320px a desktop). Liste melhorias concretas e
aplique as mais importantes.
```
