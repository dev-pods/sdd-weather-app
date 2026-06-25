# Prompts — (Review)

> Use o **Review Agent** (`.github/agents/review.agent.md`) + `review-prompt`.

---

## P10.1 — Auto-revisão geral

```
Revise as mudanças desta branch como um revisor sênior. Foque em: corretude,
aderência à spec (specs/weather-app-spec.md), segurança, acessibilidade,
tratamento de erros e clareza. Liste achados por severidade com sugestão de
correção.
```

## P10.2 — Revisão focada em segurança

```
Faça uma revisão de segurança do código de acesso a dados (src/services). Há
risco de injeção, vazamento de dados, uso inseguro de URLs ou ausência de
timeout? Aplique o OWASP Top 10 ao que for relevante para um app front-end.
```

## P10.3 — Triagem do Copilot Code Review

```
Para cada comentário do Copilot Code Review abaixo, diga se devo aceitar,
discutir ou recusar — com justificativa curta baseada na spec e nas convenções
do projeto:
[cole os comentários]
```

## P10.4 — Verificar validações SDD

```
Explique o que cada workflow .github/workflows/validate-spec.yml,
validate-plan.yml e validate-tasks.yml verifica e o que eu preciso garantir para
que passem neste PR.
```

## P10.5 — Descrição do PR

```
Escreva a descrição deste Pull Request seguindo o template do repositório:
resumo do que foi feito, por quê, links para specs/plans/tasks, como testar e
checklist de qualidade.
```

## P10.6 — Resposta a um comentário

```
Escreva uma resposta profissional e concisa ao comentário de revisão abaixo,
indicando o que mudei (ou por que mantive a decisão):
[cole o comentário]
```
