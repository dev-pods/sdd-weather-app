# Prompts — (Tasks)

> Use o **Agent Mode** com o **Task Agent** (`.github/agents/task.agent.md`).

---

## P5.1 — Gerar o backlog

```
Use `plans/weather-app-plan.md` como entrada. Gere `tasks/weather-app-tasks.md`
com tarefas no formato T-NN. Para cada tarefa inclua: ID, título, descrição
curta, critérios de aceite, dependências, arquivos prováveis e tipo
(UI/Data/Test/Infra). Organize por entrega e ordene por dependência.
```

## P5.2 — Forçar granularidade

```
Revise as tarefas. Quais estão grandes demais (mais de 1-2 arquivos relevantes
ou misturando UI + dados + testes)? Quebre cada uma dessas em subtarefas menores
e testáveis, mantendo o formato T-NN.
```

## P5.3 — Critérios de aceite

```
Para cada tarefa, garanta critérios de aceite objetivos e verificáveis,
rastreáveis aos requisitos da spec quando possível.
```

## P5.4 — Dependências e ordem

```
Adicione as dependências entre as tarefas e reordene o backlog para respeitar a
ordem de implementação: tipos → funções puras → services → hook → componentes →
integração → testes → hardening.
```

## P5.5 — Tarefas de teste explícitas

```
Garanta tarefas dedicadas a: testes unitários da conversão de unidade, testes do
service com mock de fetch, testes de componentes nos estados loading/erro/vazio,
e testes E2E do fluxo principal (incluindo viewport mobile).
```

## P5.6 — Rastreabilidade

```
Crie uma tabela ligando cada requisito funcional da spec às tarefas que o
implementam. Aponte qualquer requisito que ainda não tenha tarefa correspondente.
```

## P5.7 — Estimar e priorizar

```
Classifique as tarefas por prioridade (P0/P1/P2) e por tamanho relativo
(P/M/G). Sugira uma sequência de entrega em "fatias verticais" que produza algo
visível o quanto antes.
```

## P5.8 — Preparar delegação ao Coding Agent

```
Escolha a tarefa T-01 e gere um prompt de implementação completo e
autocontido (contexto + critérios de aceite + arquivos) pronto para entregar ao
Coding Agent no próximo módulo.
```
