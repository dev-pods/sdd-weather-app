# Construindo a Interface do Usuário

## Objetivo

Começar a fase de **Building**: construir os componentes de interface do Weather
App com React + Tailwind, no tema dark glassmorphism, **mobile-first** — ainda
com dados estáticos (mock). A integração real com a API vem no Module 06.

```text
Thinking → Planning → Decomposing → Building → Testing → Reviewing → Shipping
                                      ▲ você está aqui
```

---

## Por que construir a UI antes da API

Separar **apresentação** de **dados** deixa cada parte testável e permite
iterar no visual rapidamente, sem depender de respostas de rede. Você usa dados
de exemplo (fixtures) para validar layout, responsividade e acessibilidade.

> Esta é a abordagem **design-first**: a IA itera na UI enquanto você guia a
> visão de produto.

---

## Entrada

- `tasks/weather-app-tasks.md` (tarefas T-08 a T-13)
- `specs/` e `plans/` como contexto

## Saída

Componentes em `src/components/`:

- `SearchBar`
- `UnitToggle`
- `CurrentWeather`
- `ForecastList` + `ForecastCard`
- `states/` (Loading, Error, Empty)
- `App` integrando tudo com dados mock

## Referência visual

- Header com marca + busca + toggle °C/°F
- Hero com temperatura grande, ícone, condição e métricas (umidade, vento,
  precipitação, pressão)
- Grid de 5 cards de previsão (2 cols no mobile, 3 no tablet, 5 no desktop)
- Tema dark glassmorphism (cartões translúcidos com `backdrop-blur`)
