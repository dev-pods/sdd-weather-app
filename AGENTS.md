# Agents — SDD Weather App

Este projeto usa **agentes especializados** do GitHub Copilot, um para cada fase
do fluxo SDD. Cada agente é uma **persona** com responsabilidade, contexto e
formato de saída próprios, definidos em `.github/agents/`.

> Use o agente certo para a fase certa. Cada etapa **consome o artefato anterior**
> e **produz o próximo**.

## Pipeline

```text
Spec → Plan → Tasks → Code → Test → Review
```

## Agentes

| Agente        | Arquivo                                                            | Responsabilidade                                                                                        | Entrada → Saída                         |
| ------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| **Spec**   | [`.github/agents/spec.agent.md`](.github/agents/spec.agent.md)     | Transformar o problema em uma especificação clara (escopo, requisitos, critérios de aceite, edge cases) | Discovery → `specs/weather-app-spec.md` |
| **Plan**   | [`.github/agents/plan.agent.md`](.github/agents/plan.agent.md)     | Traduzir a spec em um plano técnico (arquitetura, stack, contratos, decisões)                           | Spec → `plans/weather-app-plan.md`      |
| **Task**   | [`.github/agents/task.agent.md`](.github/agents/task.agent.md)     | Quebrar o plano em tarefas pequenas, ordenadas e verificáveis                                           | Plan → `tasks/weather-app-tasks.md`     |
| **Code**   | [`.github/agents/code.agent.md`](.github/agents/code.agent.md)     | Implementar cada tarefa seguindo as convenções do projeto                                               | Tasks → código em `src/`                |
| **Test**   | [`.github/agents/test.agent.md`](.github/agents/test.agent.md)     | Derivar testes dos critérios de aceite (unit + E2E)                                                     | Spec + código → `tests/`                |
| **Review** | [`.github/agents/review.agent.md`](.github/agents/review.agent.md) | Revisar mudanças: corretude, segurança, a11y, aderência à spec                                          | PR → feedback acionável                 |

## Prompts associados

Cada agente tem prompts de produção em `.github/prompts/`:

- [`spec-prompt.prompt.md`](.github/prompts/spec-prompt.prompt.md)
- [`plan-prompt.prompt.md`](.github/prompts/plan-prompt.prompt.md)
- [`task-prompt.prompt.md`](.github/prompts/task-prompt.prompt.md)
- [`implementation-prompt.prompt.md`](.github/prompts/implementation-prompt.prompt.md)
- [`test-prompt.prompt.md`](.github/prompts/test-prompt.prompt.md)
- [`review-prompt.prompt.md`](.github/prompts/review-prompt.prompt.md)

## Convenções aplicadas automaticamente

As instruções em `.github/instructions/` são aplicadas pelo Copilot conforme o
arquivo editado:

- [`react.instructions.md`](.github/instructions/react.instructions.md)
- [`tailwind.instructions.md`](.github/instructions/tailwind.instructions.md)
- [`testing.instructions.md`](.github/instructions/testing.instructions.md)

> Os agentes aceleram, mas **você** é o(a) engenheiro(a) responsável. Sempre
> revise criticamente a saída antes de aceitar.
