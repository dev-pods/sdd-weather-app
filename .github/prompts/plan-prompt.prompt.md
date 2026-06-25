---
mode: agent
description: 'Cria um plano técnico a partir da especificação aprovada.'
---

# Prompt — Gerar Plano Técnico

Você é o **Plan Agent**. Use `specs/weather-app-spec.md` como fonte da verdade.

## Tarefa

Crie `plans/weather-app-plan.md` com:

1. Architecture Overview
2. Tech Stack (com justificativa)
3. Project Structure (pastas e responsabilidades)
4. Data Model (tipos/interfaces: `CurrentWeather`, `ForecastDay`, `City`, ...)
5. Data Flow (busca → service → estado → UI)
6. External APIs (Open-Meteo geocoding + forecast, com parâmetros)
7. State Management
8. Error Handling Strategy (loading, erro, vazio, retry)
9. Testing Strategy (Vitest + Playwright)
10. Risks & Trade-offs

## Regras

- Cada decisão técnica deve rastrear para um requisito da spec.
- Defina contratos (tipos), não a implementação completa.
- Prefira simplicidade; evite over-engineering.
