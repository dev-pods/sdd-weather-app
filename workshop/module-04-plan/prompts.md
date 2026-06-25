# Prompts — (Technical Plan)

> Use o **Agent Mode** com o **Plan Agent** (`.github/agents/plan.agent.md`).

---

## P4.1 — Gerar o plano técnico

```
Use `specs/weather-app-spec.md` como fonte da verdade. Gere
`plans/weather-app-plan.md` com as seções: Architecture, Tech Stack, Project
Structure, Data Model, Data Flow, External APIs, State Management, Error
Handling, Testing Strategy e Risks & Trade-offs.

Não gere o código final — defina decisões e contratos (tipos/interfaces).
Prefira simplicidade; evite over-engineering.
```

## P4.2 — Modelo de dados (contratos TypeScript)

```
Proponha as interfaces TypeScript principais para este Weather App: City,
CurrentWeather, ForecastDay, WeatherData e o tipo Unit ('celsius' | 'fahrenheit').
Baseie os campos nos dados disponíveis na Open-Meteo. Inclua comentários curtos
explicando cada campo.
```

## P4.3 — Endpoints da Open-Meteo

```
Documente os endpoints de geocoding e de forecast da Open-Meteo necessários para
atender a spec. Para cada um: URL, parâmetros relevantes (current, daily,
timezone), e um exemplo resumido de resposta JSON. Indique como mapear a resposta
para os tipos do modelo de dados.
```

## P4.4 — Arquitetura e estrutura

```
Proponha a arquitetura em camadas e a estrutura de pastas de `src/` para separar
apresentação (components), orquestração/estado (hooks), acesso a dados (services)
e funções puras (lib). Justifique a separação de responsabilidades e como isso
facilita os testes.
```

## P4.5 — Estado e tratamento de erros

```
Defina a estratégia de estado: onde o estado vive, quais estados explícitos
existem (idle, loading, success, error, empty) e como a conversão Celsius/
Fahrenheit é feita derivando na renderização (sem novo request). Em seguida,
defina a estratégia de tratamento de erros (rede, API, timeout, resposta parcial).
```

## P4.6 — Estratégia de testes e trade-offs

```
Defina a Testing Strategy: o que cobrir com Vitest (funções puras de conversão,
services com mock de fetch, componentes nos estados loading/erro/vazio/sucesso) e
o que cobrir com Playwright (fluxos E2E + viewport mobile). Liste os principais
trade-offs técnicos do plano e alternativas consideradas.
```

## P4.7 — Diagrama de fluxo (mermaid)

```
Gere um diagrama mermaid representando o fluxo de dados: input de busca →
service de geocoding → seleção de cidade → service de forecast → hook de estado →
componentes de UI. Inclua os caminhos de erro e vazio.
```

## P4.8 — Revisão do plano

```
Revise `plans/weather-app-plan.md`: o plano cobre todos os requisitos da spec?
Há decisões faltando, over-engineering ou contradições com as instruções do
projeto em `.github/copilot-instructions.md`?
```
