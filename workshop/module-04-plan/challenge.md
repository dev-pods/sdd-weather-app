# Desafio — Criar o Plano Técnico

Tempo estimado: **~45 min**

---

## Desafio 4.1 — Gerar o plano com o Plan Agent

Use o **Plan Agent** (`.github/agents/plan.agent.md`) ou o prompt `plan-prompt`
para gerar `plans/weather-app-plan.md` a partir da spec.

**Sucesso:** plano criado com todas as seções obrigatórias.

> Veja `Prompts` → **P4.1**.

---

## Desafio 4.2 — Definir o modelo de dados (contratos)

Defina os tipos TypeScript principais que vão atravessar a aplicação:

- `City` (resultado de geocoding: nome, país, lat, lon…)
- `CurrentWeather` (temperatura, condição, umidade, vento, pressão, precip.)
- `ForecastDay` (data, min, max, condição, precipitação)
- `WeatherData` (agregando atual + previsão)
- `Unit` (`'celsius' | 'fahrenheit'`)

**Sucesso:** seção **Data Model** com interfaces/contratos claros.

> Veja `Prompts` → **P4.2**.

---

## Desafio 4.3 — Mapear os endpoints da Open-Meteo

Documente os dois endpoints e seus parâmetros:

- **Geocoding:** `https://geocoding-api.open-meteo.com/v1/search?name={cidade}&count=5&language=pt`
- **Forecast:** `https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=...&daily=...&timezone=auto`

**Sucesso:** seção **External APIs** com URLs, parâmetros e exemplo de resposta.

> Veja `Prompts` → **P4.3**.

---

## Desafio 4.4 — Definir a arquitetura e a estrutura de pastas

Proponha as camadas e onde cada responsabilidade vive:

```text
src/
├── components/   # UI (apresentação)
├── hooks/        # estado e orquestração
├── services/     # acesso a dados (Open-Meteo)
├── lib/          # funções puras (conversão, formatação, mapeamento)
├── types/        # contratos compartilhados
└── App.tsx
```

**Sucesso:** seções **Architecture** e **Project Structure** preenchidas, com
justificativa de separação de responsabilidades.

> Veja `Prompts` → **P4.4**.

---

## Desafio 4.5 — Estratégia de estado e de erros

Defina:

- Onde o estado vive (hook `useWeather` no topo, props para baixo).
- Estados explícitos: `idle | loading | success | error | empty`.
- Como a conversão C/F acontece **sem** novo request (derivar na renderização).

**Sucesso:** seções **State Management** e **Error Handling** completas.

> Veja `Prompts` → **P4.5**.

---

## Desafio 4.6 — Estratégia de testes e riscos técnicos

Defina o que será coberto por **Vitest** (funções puras, services com mock,
componentes) e por **Playwright** (fluxos E2E). Liste trade-offs técnicos.

**Sucesso:** seções **Testing Strategy** e **Risks & Trade-offs** completas.

> Veja `Prompts` → **P4.6**.

---

## Desafio 4.7 — Diagrama do fluxo de dados

Adicione um diagrama (mermaid) do fluxo: busca → service → hook/estado → UI.

**Sucesso:** diagrama presente na seção **Data Flow**.

> Veja `Prompts` → **P4.7**.

---

## Checklist do módulo

- [ ] Plano com todas as seções obrigatórias
- [ ] Modelo de dados (contratos TS) definido
- [ ] Endpoints Open-Meteo documentados
- [ ] Arquitetura + estrutura de pastas justificadas
- [ ] Estratégia de estado e de erros
- [ ] Estratégia de testes + trade-offs
- [ ] Diagrama de fluxo de dados
