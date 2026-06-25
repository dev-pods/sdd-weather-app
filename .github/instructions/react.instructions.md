---
applyTo: 'src/**/*.{ts,tsx}'
---

# Instruções — React + TypeScript

- Use componentes funcionais com hooks. Sem class components.
- Tipagem explícita nas props (`interface` ou `type`). Evite `any`.
- Prefira composição a props booleanas excessivas.
- Mantenha componentes pequenos e focados; extraia subcomponentes quando um
  arquivo passar de ~150 linhas.
- Efeitos colaterais (fetch, timers) ficam em hooks ou services, nunca inline no
  corpo do render.
- Derive estado sempre que possível em vez de duplicá-lo.
- Use `key` estável em listas (nunca o índice quando a ordem pode mudar).
- Exporte um componente por arquivo como `export default`.
