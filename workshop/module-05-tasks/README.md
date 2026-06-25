# Decompondo Tarefas

## Objetivo

Decompor o plano técnico em um **backlog granular** de tarefas pequenas,
independentes e testáveis — prontas para serem delegadas a você ou a um
**Coding Agent**.

Você vai produzir `tasks/weather-app-tasks.md`.

---

## Por que isso importa

Tarefas grandes e vagas geram PRs gigantes e difíceis de revisar. Tarefas
pequenas e bem definidas:

- São fáceis de implementar e testar isoladamente
- Permitem delegar com segurança ao **Agent Mode / Coding Agent**
- Tornam o progresso visível

```text
Thinking → Planning → Decomposing → Building → Testing → Reviewing → Shipping
                          ▲ você está aqui
```

> **Regra de ouro:** uma tarefa = uma unidade testável. Se não couber, divida.

---

## Entrada

- `plans/weather-app-plan.md`

## Saída

```text
tasks/weather-app-tasks.md
```

## Formato de cada tarefa

- **ID** (`T-01`, `T-02`, …)
- **Título** acionável
- **Descrição** curta
- **Critérios de aceite** verificáveis
- **Dependências** (IDs)
- **Arquivos** prováveis
- **Tipo** (UI / Data / Test / Infra)

> `validate-tasks.yml` exige spec + plano antes das tasks e ao menos 6 tarefas
> no formato `T-NN`.
