---
applyTo: 'src/**/*.{ts,tsx,css}'
---

# Instruções — Tailwind CSS (tema dark glassmorphism)

- Use utilitários do Tailwind; evite CSS inline e arquivos `.css` por componente.
- Paleta base do tema (definida em `tailwind.config.js`):
  - Fundo: `bg-night-900` / `bg-night-800`
  - Cartões "glass": fundo translúcido + `backdrop-blur` + borda sutil
    (`bg-white/5 backdrop-blur-md border border-white/10`)
  - Destaque: `accent-500` / `accent-400`
  - Sol/quente: `text-sun`
- Tipografia: fonte `Inter`, hierarquia clara (hero grande para temperatura).
- Layout responsivo mobile-first: use breakpoints `sm:`, `md:`, `lg:`.
- A previsão de 5 dias deve usar grid responsivo
  (`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5`).
- Garanta contraste suficiente para acessibilidade (texto claro sobre fundo
  escuro, estados de foco visíveis).
