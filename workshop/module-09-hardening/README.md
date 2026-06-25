# Hardening

## Objetivo

Fortalecer a aplicação para produção: **acessibilidade**, **resiliência a
falhas**, **edge cases**, **performance** e polimento de UX. É a transição entre
"funciona" e "está pronto para entregar".

```text
Thinking → Planning → Decomposing → Building → Testing → Reviewing → Shipping
                                                ▲ fim de Testing / hardening
```

---

## Por que isso importa

A diferença entre um protótipo e um produto está nos detalhes: o que acontece
quando a rede cai, quando um campo vem vazio, quando o usuário só usa teclado,
quando a tela tem 320px. Aqui o Copilot ajuda a **antecipar e cobrir** esses
casos.

---

## Entrada

- App funcional (Modules 06–07)
- Suíte de testes (Module 08)
- Tarefas T-17, T-18
- Edge cases da spec

## Saída

- Acessibilidade revisada (teclado, foco, roles/labels, contraste)
- Resiliência (timeout, retry, resposta parcial → "—")
- Edge cases cobertos e testados
- Pequenas melhorias de performance/UX
