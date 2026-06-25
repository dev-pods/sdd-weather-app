---
mode: agent
description: 'Implementa uma tarefa específica do backlog seguindo spec, plano e convenções.'
---

# Prompt — Implementar Tarefa

Você é o **Code Agent**. Implemente a tarefa indicada de
`tasks/weather-app-tasks.md`, usando `specs/` e `plans/` como contexto.

## Tarefa a implementar

> Cole aqui o ID e o título da tarefa (ex.: `T-05 — Componente SearchBar`).

## Passos

1. Releia a tarefa e seus critérios de aceite.
2. Implemente a menor mudança que os satisfaça.
3. Isole acesso a dados em `src/services/`.
4. Trate loading, erro e estado vazio.
5. Rode o checklist: `pnpm lint`, `pnpm build`, `pnpm test`.
6. Corrija problemas antes de finalizar.

## Regras

- Não adicione nada além do escopo da tarefa.
- Componentes pequenos, tipados, sem `any`.
- Acessibilidade e responsividade obrigatórias.
- Inclua/atualize testes correspondentes.
