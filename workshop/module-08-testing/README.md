# Testando

## Objetivo

Entrar na fase de **Testing**: criar uma suíte de testes significativa derivada
dos **critérios de aceite** da spec — testes unitários com **Vitest** e testes
ponta a ponta com **Playwright**.

```text
Thinking → Planning → Decomposing → Building → Testing → Reviewing → Shipping
                                                ▲ você está aqui
```

---

## Por que isso importa

Testes derivados da spec transformam critérios de aceite em uma rede de
segurança executável. O Copilot é excelente para **gerar, otimizar e manter**
suítes de teste — perfeito para QA, devs e SRE.

> Princípio: **teste comportamento, não implementação.** Use queries acessíveis e
> nunca chame a API real.

---

## Entrada

- `specs/weather-app-spec.md` (Acceptance Criteria + Edge Cases)
- Código em `src/`
- Tarefas T-14, T-15, T-16

## Saída

- `tests/unit/` — funções puras, service (mock), componentes
- `tests/e2e/` — fluxos de usuário (incl. mobile)
