# Solução de referência

Este módulo é de setup; não há entregável de código. A "solução" é o ambiente
funcionando e o entendimento da estrutura.

---

## Estrutura esperada do repositório

```text
sdd-weather-app/
├── workshop/              # Conteúdo do treinamento (este material)
├── docs/                  # Site do workshop (GitHub Pages)
├── specs/                 # Spec (Modules 01–02)
├── plans/                 # Plano técnico (Module 04)
├── tasks/                 # Backlog (Module 05)
├── src/                   # App React/TS (Modules 05–08)
├── tests/                 # Vitest (unit) + Playwright (e2e)
├── .github/
│   ├── agents/            # Spec, Plan, Task, Code, Test, Review
│   ├── prompts/           # Prompts reutilizáveis
│   ├── instructions/      # Instruções por domínio
│   └── workflows/         # CI, Pages e validações SDD
└── .devcontainer/         # Ambiente pronto para Codespaces
```

## Comandos validados

| Comando             | O que faz                                  |
| ------------------- | ------------------------------------------ |
| `pnpm dev`          | Sobe o servidor de desenvolvimento (Vite)  |
| `pnpm build`        | Type-check + build de produção             |
| `pnpm lint`         | Biome (lint)                               |
| `pnpm test`         | Testes unitários (Vitest)                  |
| `pnpm test:e2e`     | Testes E2E (Playwright)                    |

## Ordem de uso dos agentes (SDD)

1. **Spec Agent** → especificação (`specs/`)
2. **Plan Agent** → plano técnico (`plans/`)
3. **Task Agent** → backlog (`tasks/`)
4. **Code Agent** → implementação (`src/`)
5. **Test Agent** → testes (`tests/`)
6. **Review Agent** → revisão (PR)

## Sinais de sucesso

- `pnpm dev` exibe a tela inicial no navegador.
- Copilot Chat responde e o **Agent Mode** está disponível.
- `lint`, `build` e `test` passam.
- `src/` e `tests/` removidos após validar o ambiente (serão reconstruídos).
- GitHub Pages configurado para **GitHub Actions**.

> A solução de referência continua acessível via git (`git show origin/main:<arquivo>`)
> e nos `solution.md` de cada módulo.
