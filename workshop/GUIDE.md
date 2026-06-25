# Guia do Workshop — SDD com GitHub Copilot

Bem-vindo(a)! Este é um treinamento **hands-on de 8 horas** sobre
**Spec-Driven Development (SDD)** com GitHub Copilot. Você vai construir, do zero
ao deploy, um **Weather App** seguindo o fluxo:

> **Brief → Spec → Plan → Tasks → Code → Test → Review → Ship**

## Princípio central

> **NÃO COMECE PELO CÓDIGO.** Sempre: Spec → Plan → Tasks → Code.

A maior parte do valor do SDD está em **pensar antes de codar**. O código é a
consequência de uma boa especificação, não o ponto de partida.

## Trilha de módulos (~8h)

| # | Módulo | Fase | Duração |
| --- | --- | --- | --- |
| 01 | [Setup](module-01-setup/README.md) | Preparação | 30 min |
| 02 | [Understanding the Problem](module-02-discovery/README.md) | Discovery | 45 min |
| 03 | [Writing the Specification](module-03-spec/README.md) | Spec | 50 min |
| 04 | [Creating the Technical Plan](module-04-plan/README.md) | Plan | 45 min |
| 05 | [Breaking Down Tasks](module-05-tasks/README.md) | Tasks | 40 min |
| 06 | [Building the UI](module-06-ui/README.md) | Code | 60 min |
| 07 | [Integrating APIs](module-07-api/README.md) | Code | 60 min |
| 08 | [Testing](module-08-testing/README.md) | Test | 55 min |
| 09 | [Hardening](module-09-hardening/README.md) | Test | 50 min |
| 10 | [Pull Request Review](module-10-review/README.md) | Review | 45 min |
| 11 | [Delivery (GitHub Pages)](module-11-delivery/README.md) | Ship | 30 min |

Total estimado: **~8 horas** (incluindo pausas e discussão).

## Estrutura de cada módulo

Cada pasta `module-XX-*/` contém:

- **README.md** — objetivo, contexto e onde você está no fluxo.
- **challenge.md** — desafios guiados com critérios de sucesso.
- **prompts.md** — prompts cuidadosamente preparados para o Copilot.
- **solution.md** — solução de referência para comparar **depois** de tentar.

## Stack

- **TypeScript (strict)** + **React** + **Vite**
- **Tailwind CSS** (tema dark glassmorphism)
- **Vitest** + **Testing Library** (unit) e **Playwright** (E2E)
- **Open-Meteo** (geocoding + forecast, sem API key)

## Checklist antes de concluir cada tarefa

```bash
pnpm lint
pnpm build
pnpm test
```

## Como usar o Copilot aqui

- Trate os arquivos `.github/agents/*.agent.md` como **personas** especializadas
  (Spec, Plan, Task, Code, Test, Review).
- Use os prompts de cada módulo como ponto de partida — **adapte ao seu
  contexto**.
- Sempre **revise criticamente** a saída da IA. Você é o(a) engenheiro(a)
  responsável.

Comece pelo [Module 01 — Setup](module-01-setup/README.md). Bom workshop!
