# Desafio — Preparar o Ambiente

Tempo estimado: **~30 min**

Conclua os desafios abaixo na ordem. Cada um tem um critério de sucesso claro.

---

## Desafio 1.1 — Obter o repositório

Escolha **uma** das opções:

### Opção A — Codespaces (recomendado, zero setup)

1. No GitHub, abra o repositório do treinamento.
2. Clique em **Code → Codespaces → Create codespace on main**.
3. Aguarde o devcontainer subir (Node 22, GitHub CLI e extensões já vêm prontos).

### Opção B — Local

1. Clone o repositório:
   ```bash
   git clone <url-do-repo> sdd-weather-app
   cd sdd-weather-app
   ```
2. Abra no VS Code: `code .`
3. Aceite instalar as **extensões recomendadas** (notificação no canto inferior).

**Sucesso:** o projeto está aberto no VS Code com as extensões instaladas.

---

## Desafio 1.2 — Instalar dependências e rodar o app

```bash
pnpm install
pnpm dev
```

Abra a URL exibida (geralmente `http://localhost:5173`).

**Sucesso:** você vê a tela inicial "SDD Weather App" no navegador.

> Esta é a **solução de referência** (o app pronto em `src/`). Use-a agora apenas
> para confirmar que o ambiente funciona. No Desafio 1.6 você vai apagá-la para
> reconstruir tudo do zero a partir do Module 05.

> No Codespaces, a porta 5173 é encaminhada automaticamente e abre um preview.

---

## Desafio 1.3 — Validar o Copilot (Chat + Agent Mode)

1. Abra o painel de **Chat** do Copilot (`Ctrl/Cmd + Alt + I`).
2. Pergunte algo simples sobre o projeto para validar o contexto.
3. Troque o modo do chat para **Agent** no seletor de modo.

**Sucesso:** o Copilot Chat responde e você consegue selecionar o modo **Agent**.

---

## Desafio 1.4 — Conhecer as customizações do repositório

Este repositório já vem com **context engineering** pronto:

1. Abra `.github/copilot-instructions.md` e leia as convenções do projeto.
2. Explore `.github/agents/` — há 6 agentes (Spec, Plan, Task, Code, Test, Review).
3. Explore `.github/prompts/` — prompts reutilizáveis para cada etapa do fluxo.

**Sucesso:** você sabe onde ficam os agentes, prompts e instruções.

> Pergunte ao Copilot: *"Explique o papel de cada agente em `.github/agents/`."*

---

## Desafio 1.5 — Rodar o checklist de qualidade

```bash
pnpm lint
pnpm build
pnpm test
```

**Sucesso:** os três comandos terminam sem erros (a solução de referência já passa).

---

## Desafio 1.6 — Limpar o código para reconstruir do zero

Agora que o ambiente está validado, **remova a solução de referência** para
começar a construção com as mãos livres:

```bash
rm -rf src tests
```

A partir do Module 05 você vai recriar `src/` e `tests/` seguindo o fluxo SDD.
Os arquivos de configuração (Vite, Tailwind, TypeScript, etc.) permanecem.

**Sucesso:** `src/` e `tests/` não existem mais; o restante do repositório está
intacto.

> A referência continua disponível a qualquer momento, sem precisar do `pnpm dev`:
> - Ver um arquivo: `git show origin/main:src/App.tsx`
> - Restaurar um arquivo pontual: `git checkout origin/main -- src/lib/format.ts`
> - Cada módulo também traz o código de referência em seu `solution.md`.
>
> Consulte só **depois de tentar** — o aprendizado está em construir.

---

## Desafio 1.7 — Habilitar o GitHub Pages (para o Module 10)

> Faça isto no **seu fork/cópia** do repositório.

1. No GitHub, vá em **Settings → Pages**.
2. Em **Build and deployment**, selecione **GitHub Actions**.

**Sucesso:** o Pages está configurado para publicar via Actions. A entrega
final (Module 10) vai usar isto.

---

## Checklist do módulo

- [ ] Repositório aberto (Codespaces ou local)
- [ ] `pnpm dev` rodando
- [ ] Copilot Chat e Agent Mode funcionando
- [ ] Agentes e prompts localizados
- [ ] `lint`, `build` e `test` passando
- [ ] `src/` e `tests/` removidos para reconstrução
- [ ] GitHub Pages habilitado
