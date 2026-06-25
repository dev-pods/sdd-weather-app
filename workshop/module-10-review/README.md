# Pull Request Review

## Objetivo

Entrar na fase de **Reviewing**: abrir um Pull Request, usar o **Copilot Code
Review** e o **Review Agent** com regras customizadas, e responder ao feedback —
fechando o ciclo de qualidade antes do ship.

```text
Thinking → Planning → Decomposing → Building → Testing → Reviewing → Shipping
                                                          ▲ você está aqui
```

---

## Por que isso importa

Revisão é onde a engenharia vira colaboração. O Copilot acelera revisões
identificando bugs, problemas de segurança e desvios da spec — mas o **julgamento
humano** decide o que entra. Aqui você aprende a usar a IA como **co-revisor**.

---

## Entrada

- App completo, testado e endurecido (Modules 05–08)
- `.github/agents/review.agent.md` + prompt `review-prompt`
- Workflows `validate-spec/plan/tasks` e `pr-feedback`

## Saída

- Um Pull Request aberto
- Revisão automatizada (Copilot + Review Agent) executada
- Comentários endereçados / ajustes commitados
- Validações de SDD (Spec→Plan→Tasks) verdes
