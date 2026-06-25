# Setup

## Objetivo

Preparar o ambiente de desenvolvimento e o GitHub Copilot para que você consiga
focar 100% no fluxo **Spec-Driven Development (SDD)** nos próximos módulos.

Ao final deste módulo você terá:

- O repositório rodando localmente ou em um Codespace
- GitHub Copilot ativo (Chat + Agent Mode)
- O ambiente validado com a solução de referência
- `src/` e `tests/` limpos, prontos para você reconstruir do zero
- GitHub Pages habilitado para a entrega final (Module 10)

> **Como este repositório funciona:** ele já inclui o Weather App **pronto em
> `src/` e `tests/`** — essa é a **solução de referência**. Você vai usá-la só
> para validar o ambiente neste módulo e, em seguida, **apagar `src/` e `tests/`
> para reconstruir tudo do zero** seguindo o fluxo SDD (Spec → Plan → Tasks →
> Code) nos próximos módulos. A referência continua acessível a qualquer momento
> via git (`origin/main`) e nos `solution.md` de cada módulo — consulte-a apenas
> como gabarito, depois de tentar. Os artefatos de SDD (`specs/`, `plans/`,
> `tasks/`) **não** vêm prontos: você os cria nos Modules 01–04.

---

## Por que isso importa

Um ambiente mal configurado consome tempo e energia que deveriam ir para o
raciocínio de produto e engenharia. Em treinamentos de IA assistida, o atrito de
setup é a causa nº 1 de desistência. Vamos eliminá-lo logo no início.

> **Princípio do treinamento:** o Copilot não é só um gerador de código. Ele é um
> parceiro de **planejamento, implementação e revisão**. Para isso, ele precisa
> de **contexto** — e o contexto começa por um repositório bem estruturado.

---

## O que você vai construir ao longo do treinamento

Um **Weather App** com:

- Busca de cidades
- Clima atual
- Previsão de 5 dias
- Alternância Celsius/Fahrenheit
- UI responsiva (mobile-first), tema dark glassmorphism

Stack: **React + TypeScript + Vite + Tailwind**, testes com **Vitest** e
**Playwright**, dados da **Open-Meteo** (sem API key).

---

## Pré-requisitos

- Conta no GitHub com **GitHub Copilot** habilitado
- **VS Code** com as extensões GitHub Copilot e Copilot Chat
- **Node.js** (ou usar Codespaces, que já vem pronto)
- Git instalado

## Como iniciar

1. Crie um repositório a partir deste template.

   [![Use this template](https://img.shields.io/badge/Use%20this%20template-2ea44f?style=for-the-badge&logo=github&logoColor=white)](https://github.com/new?template_owner=dev-pods&template_name=sdd-weather-app&owner=%40me&name=sdd-weather-app&description=Treinamento:+Spec-Driven+Development+com+GitHub+Copilot&visibility=public)

2. Abra o projeto em um GitHub Codespace (ambiente já configurado com Node.js e as extensões do GitHub Copilot).

   [![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/{{full_repo_name}}?quickstart=1)