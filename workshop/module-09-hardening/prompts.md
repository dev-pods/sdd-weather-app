# Prompts — (Hardening)

---

## P9.1 — Auditoria de acessibilidade

```
Faça uma auditoria de acessibilidade do app (src/). Verifique navegação por
teclado, foco visível, roles/labels semânticos (busca, grupo de unidade, status,
alert de erro) e contraste. Liste problemas em ordem de severidade e proponha
correções mínimas e idiomáticas em React + Tailwind.
```

## P9.2 — Resiliência a falhas

```
Revise o tratamento de falhas em src/services/weatherService.ts e
src/hooks/useWeather.ts. Garanta timeout claro, mensagens amigáveis e um botão de
retry que refaz a última operação. Sugira testes que simulem rede offline.
```

## P9.3 — Respostas parciais

```
Identifique todos os campos da resposta da Open-Meteo que podem vir null/ausentes
e garanta fallback seguro na UI (ex.: "—" ou 0), sem NaN/undefined visível.
Mostre os ajustes em mapeamento e componentes.
```

## P9.4 — Edge cases → testes

```
Liste os edge cases da spec (specs/weather-app-spec.md) que ainda não têm teste e
gere testes Vitest/Playwright para eles: busca vazia, só espaços, caracteres
especiais, geocoding sem resultados e forecast incompleto.
```

## P9.5 — Performance e UX

```
Sugira melhorias de performance/UX de baixo risco: memoização onde fizer
sentido, aria-busy durante loading, foco no resultado após busca, estados
hover/disabled coerentes. Aplique as que forem claramente benéficas.
```

## P9.6 — Revisão final de qualidade

```
Rode lint, build, testes unitários e E2E. Se algo falhar, diagnostique e corrija.
Confirme que todos os critérios de aceite da spec estão atendidos.
```
