# Criando o Plano Técnico

## Objetivo

Converter a especificação em um **plano técnico** acionável: arquitetura, stack,
estrutura de pastas, modelo de dados, fluxo de dados, integração com APIs,
estratégia de estado, tratamento de erros e estratégia de testes.

Você vai produzir `plans/weather-app-plan.md`.

---

## Por que isso importa

A spec diz **o quê**. O plano diz **como**. Pular o plano leva a decisões
improvisadas no meio da implementação — exatamente o tipo de retrabalho que o
SDD evita.

```text
Thinking → Planning → Decomposing → Building → Testing → Reviewing → Shipping
                ▲ você está aqui
```

Aqui o Copilot atua como um **arquiteto de software**: você descreve restrições e
ele propõe contratos (tipos/interfaces) e decisões — que **você revisa**.

---

## Entrada

- `specs/weather-app-spec.md`

## Saída

```text
plans/weather-app-plan.md
```

## Seções obrigatórias

- Architecture (Overview)
- Tech Stack
- Project Structure
- Data Model
- Data Flow
- External APIs
- State Management
- Error Handling
- Testing Strategy
- Risks & Trade-offs

> `validate-plan.yml` exige que a spec exista antes do plano e checa seções.
