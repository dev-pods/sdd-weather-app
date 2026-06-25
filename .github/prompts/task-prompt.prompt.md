---
mode: agent
description: 'Decompõe o plano técnico em um backlog de tarefas granulares e testáveis.'
---

# Prompt — Quebrar em Tarefas

Você é o **Task Agent**. Use `plans/weather-app-plan.md` como entrada.

## Tarefa

Crie `tasks/weather-app-tasks.md`. Para cada tarefa, inclua:

- **ID** (ex.: `T-01`)
- **Título** acionável
- **Descrição** curta
- **Critérios de aceite** verificáveis
- **Dependências** (IDs de outras tarefas)
- **Arquivos** prováveis a criar/editar
- **Tipo** (UI / Data / Test / Infra)

Organize por entrega e ordene por dependência.

## Regras

- Cada tarefa deve ser pequena, independente e testável.
- Inclua tarefas de teste explícitas.
- Toda tarefa mapeia para pelo menos um requisito da spec.
