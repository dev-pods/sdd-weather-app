# Desafio — Pull Request Review

Tempo estimado: **~45 min**

> Use o **Review Agent** (`.github/agents/review.agent.md`) e o `review-prompt`.

---

## Desafio 10.1 — Preparar e abrir o PR

Crie uma branch, commit das mudanças e abra um Pull Request usando o template do
repositório (`.github/pull_request_template.md`).

```bash
git checkout -b feat/weather-app
git add .
git commit -m "feat: weather app (SDD)"
git push -u origin feat/weather-app
```

Abra o PR pela interface do GitHub ou pela extensão.

**Sucesso:** PR aberto com descrição preenchida (o que/por quê + link para
spec/plan/tasks).

---

## Desafio 10.2 — Revisão local com o Review Agent

Antes de pedir revisão humana, peça uma auto-revisão.

**Sucesso:** Review Agent retorna achados acionáveis (bugs, segurança, desvio
da spec, a11y).

> Veja `Prompts` → **P10.1** e **P10.2**.

---

## Desafio 10.3 — Copilot Code Review no PR

No PR, solicite o **Copilot Code Review**. Leia os comentários e classifique:
**aceitar**, **discutir** ou **recusar com justificativa**.

**Sucesso:** cada comentário tem uma decisão consciente — você não aceita tudo
cegamente.

> Veja `Prompts` → **P10.3**.

---

## Desafio 10.4 — Validações de SDD

Confirme que os workflows `validate-spec`, `validate-plan` e `validate-tasks`
passam — eles garantem que a ordem **Spec → Plan → Tasks** foi respeitada.

**Sucesso:** checks verdes no PR.

> Veja `Prompts` → **P10.4**.

---

## Desafio 10.5 — Endereçar feedback

Aplique os ajustes aceitos, responda aos comentários e faça novo commit. Garanta
que CI (lint/build/test/e2e) continua verde.

**Sucesso:** comentários resolvidos; CI verde.

> Veja `Prompts` → **P10.5**.

---

## Checklist do módulo

- [ ] PR aberto com descrição completa
- [ ] Auto-revisão com Review Agent
- [ ] Copilot Code Review solicitado e triado
- [ ] Validações SDD verdes
- [ ] Feedback endereçado + CI verde
