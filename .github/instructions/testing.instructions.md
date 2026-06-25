---
applyTo: 'tests/**/*.{ts,tsx}'
---

# Instruções — Testes (Vitest + Playwright)

## Unitários (Vitest + Testing Library)

- Arquivos em `tests/unit/`, nomeados `*.test.ts(x)`.
- Teste comportamento observável, não detalhes de implementação.
- Use queries acessíveis (`getByRole`, `getByLabelText`) em vez de seletores
  por classe.
- Faça `mock` da camada de rede (`src/services/`), nunca chame a API real.
- Cubra: caminho feliz, estado de erro, estado vazio e conversão de unidades.

## E2E (Playwright)

- Arquivos em `tests/e2e/`, nomeados `*.spec.ts`.
- Intercepte chamadas de rede com `page.route` para tornar os testes
  determinísticos.
- Teste fluxos de usuário ponta a ponta: buscar cidade → ver clima → trocar
  unidade → ver previsão.
- Inclua ao menos um teste no viewport mobile.
