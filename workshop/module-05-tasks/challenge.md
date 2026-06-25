# Desafio — Quebrar em Tarefas

Tempo estimado: **~40 min**

---

## Desafio 5.1 — Gerar o backlog com o Task Agent

Use o **Task Agent** (`.github/agents/task.agent.md`) ou o prompt `task-prompt`
para gerar `tasks/weather-app-tasks.md` a partir do plano.

**Sucesso:** backlog criado com pelo menos **10 tarefas** no formato `T-NN`.

> Veja `Prompts` → **P5.1**.

---

## Desafio 5.2 — Garantir granularidade

Revise cada tarefa. Se uma tarefa precisar de mais de ~1–2 arquivos novos
relevantes ou misturar UI + dados + testes, **divida**.

**Sucesso:** nenhuma tarefa é "grande demais"; cada uma é testável isoladamente.

> Veja `Prompts` → **P5.2**.

---

## Desafio 5.3 — Critérios de aceite por tarefa

Cada tarefa precisa de critérios verificáveis (idealmente rastreáveis à spec).

**Sucesso:** toda tarefa tem critérios de aceite objetivos.

> Veja `Prompts` → **P5.3**.

---

## Desafio 5.4 — Mapear dependências e ordem

Defina dependências entre tarefas e ordene o backlog respeitando-as (ex.: tipos
antes de services; service antes do hook; hook antes da UI que o consome).

**Sucesso:** dependências explícitas e ordem coerente.

> Veja `Prompts` → **P5.4**.

---

## Desafio 5.5 — Incluir tarefas de teste

As tarefas de teste devem ser **explícitas**, não implícitas.

**Sucesso:** há tarefas dedicadas a testes unitários e E2E.

> Veja `Prompts` → **P5.5**.

---

## Desafio 5.6 — Rastreabilidade spec → tarefa

Garanta que cada requisito funcional da spec é coberto por ao menos uma tarefa.

**Sucesso:** tabela de rastreabilidade requisito → tarefa(s).

> Veja `Prompts` → **P5.6**.

---

## Checklist do módulo

- [ ] `tasks/weather-app-tasks.md` com ≥ 10 tarefas `T-NN`
- [ ] Tarefas granulares e testáveis
- [ ] Critérios de aceite por tarefa
- [ ] Dependências e ordem definidas
- [ ] Tarefas de teste explícitas
- [ ] Rastreabilidade spec → tarefa
