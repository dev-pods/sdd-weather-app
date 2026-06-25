---
applyTo: '**'
---

# SDD Weather App — Instruções do Projeto

Este repositório é um treinamento de **Spec-Driven Development (SDD) com GitHub
Copilot**. O objetivo é construir um **Weather App** seguindo o fluxo:

`Brief → Spec → Plan → Tasks → Code → Test → Review → Ship`

## Princípio fundamental

> **NÃO COMECE PELO CÓDIGO.**
> Sempre: Spec → Plan → Tasks → Code.

Antes de implementar qualquer feature, confirme que existe especificação
(`specs/`), plano (`plans/`) e tarefas (`tasks/`) correspondentes.

## Stack

- **Linguagem:** TypeScript (strict)
- **UI:** React + Vite
- **Estilo:** Tailwind CSS (tema dark glassmorphism)
- **Testes unitários:** Vitest + Testing Library
- **Testes E2E:** Playwright
- **API de dados:** Open-Meteo (geocoding + forecast, sem API key)
- **Gerenciador de pacotes:** pnpm
- **Lint + formatação:** Biome

## Convenções de código

- Componentes React em `src/components/`, um componente por arquivo.
- Lógica de acesso a dados isolada em `src/services/`.
- Hooks reutilizáveis em `src/hooks/`.
- Tipos compartilhados em `src/types/`.
- Funções puras e testáveis; evite efeitos colaterais escondidos.
- Trate sempre os estados de **loading**, **erro** e **vazio**.
- Acessibilidade: use roles/labels semânticos e suporte a teclado.

## Checklist de desenvolvimento (rodar antes de concluir uma tarefa)

- [ ] `pnpm lint`
- [ ] `pnpm build`
- [ ] `pnpm test`

## Idioma

- Narrativa, comentários explicativos e documentação: **pt-BR**.
- Identificadores de código, nomes de arquivos e termos técnicos: **en-US**.
