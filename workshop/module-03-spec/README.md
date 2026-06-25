# Escrevendo a Especificação

## Objetivo

Transformar o discovery em uma **especificação de produto** completa, que sirva
como fonte única da verdade para todo o restante do desenvolvimento.

Você vai produzir `specs/weather-app-spec.md`.

Este é **o passo mais importante** do Spec-Driven Development.

---

## Por que isso importa

Uma boa especificação:

- Reduz ambiguidade
- Alinha expectativas
- **Habilita um uso muito melhor da IA** — quanto mais clara a spec, melhor o
  Copilot planeja, implementa, testa e revisa

> Lembre-se do princípio: **não comece pelo código**. A spec é o contrato.

```text
Thinking → Planning → Decomposing → Building → Testing → Reviewing → Shipping
            ▲ você está aqui (Spec é a base de tudo)
```

---

## Entrada

- `specs/discovery.md` (Module 02)
- O briefing de negócio original

---

## Saída

```text
specs/weather-app-spec.md
```

---

## Seções obrigatórias

A especificação **deve** conter:

- Overview
- Functional Requirements
- User Stories
- Acceptance Criteria
- Non-Functional Requirements
- Edge Cases
- Assumptions
- Risks
- Out of Scope
- Open Questions (se restar alguma)

> A validação automática (`validate-spec.yml`) reprova o PR se faltar uma
> seção obrigatória.

---

## Regras

- Não comece a codar.
- Não pule seções.
- Seja explícito e detalhado.
- **Não aceite a primeira resposta da IA cegamente** — revise e refine.
