# Solução de referência — (`specs/weather-app-spec.md`)

> Referência para comparação. Sua spec pode (e deve) ter variações.

---

## Overview

Aplicação web (SPA) de previsão do tempo que permite buscar uma cidade e
visualizar o clima atual e a previsão de 5 dias, com alternância entre Celsius e
Fahrenheit. Mobile-first, tema dark glassmorphism, sem necessidade de login ou
chave de API. Dados fornecidos pela Open-Meteo.

## Functional Requirements

- **RF1 — Busca de cidade:** o usuário digita um nome e seleciona uma cidade
  dentre sugestões (com país/estado para desambiguar).
- **RF2 — Clima atual:** exibir temperatura, condição, umidade, vento, pressão e
  precipitação da cidade selecionada.
- **RF3 — Previsão de 5 dias:** exibir, por dia, mín/máx, condição e precipitação.
- **RF4 — Unidade de temperatura:** alternar C/F atualizando todos os valores
  exibidos instantaneamente.
- **RF5 — Estados de UI:** loading, erro e vazio claramente comunicados.

## User Stories

- **US1** — Como decisor do dia a dia, quero buscar minha cidade para ver o clima
  atual rapidamente.
- **US2** — Como viajante planejador, quero ver a previsão de 5 dias para
  organizar a semana.
- **US3** — Como usuário internacional, quero alternar entre °C e °F para
  entender a temperatura na unidade que conheço.
- **US4** — Como usuário mobile, quero uma interface responsiva para usar no
  celular com conforto.
- **US5** — Como usuário em rede instável, quero mensagens de erro claras para
  saber o que fazer quando algo falha.

## Acceptance Criteria

**RF1 / US1**
- Dado um nome válido, Quando eu busco, Então vejo uma lista de cidades
  correspondentes com país/estado.
- Dado um nome sem resultados, Quando eu busco, Então vejo um estado vazio
  informativo.

**RF2**
- Dada uma cidade selecionada, Quando os dados carregam, Então vejo temperatura,
  condição, umidade, vento, pressão e precipitação.

**RF3 / US2**
- Dada uma cidade selecionada, Quando os dados carregam, Então vejo exatamente 5
  dias (hoje + 4), cada um com mín/máx e condição.

**RF4 / US3**
- Dado o app exibindo °C, Quando eu alterno para °F, Então todas as temperaturas
  (atual e previsão) são convertidas corretamente sem novo request.

**RF5 / US5**
- Dada uma falha de API, Quando a requisição retorna erro, Então vejo uma
  mensagem de erro com ação de "tentar novamente".
- Durante o carregamento, Então vejo um indicador de loading.

## Non-Functional Requirements

- **Performance:** carga inicial < 2s; conversão de unidade sem novo request.
- **Responsividade:** mobile-first, de 320px a desktop.
- **Acessibilidade:** navegação por teclado, roles/labels, foco visível,
  contraste WCAG AA básico.
- **Resiliência:** degradação graciosa em falhas de rede/API.
- **Sem API key:** Open-Meteo; deploy 100% estático (GitHub Pages).
- **Qualidade:** lint + build + testes passando no CI.

## Edge Cases

| Caso                              | Comportamento esperado                              |
| --------------------------------- | --------------------------------------------------- |
| Cidade inexistente                | Estado vazio: "Nenhuma cidade encontrada".          |
| Input vazio                       | Não dispara busca; orienta o usuário.               |
| Caracteres especiais/acentos      | Busca normaliza e ainda retorna resultados.         |
| Falha da API de forecast          | Estado de erro com "tentar novamente".              |
| Timeout de rede                   | Estado de erro; não trava a UI.                     |
| Geocoding sem resultados          | Estado vazio claro.                                 |
| Resposta parcial (campo ausente)  | Exibir "—" no campo, sem quebrar o layout.          |

## Assumptions

- Conexão com a internet disponível na maior parte do tempo.
- Navegadores modernos (evergreen).
- Uso individual, sem login.

## Risks

- Rate limiting/indisponibilidade da Open-Meteo → tratar erros e mensagens claras.
- Cidades homônimas → exibir país/estado nas sugestões.
- Conversão de unidade incorreta → função pura coberta por testes.
- Inconsistência mobile/desktop → testes E2E em viewport mobile.

## Out of Scope (v1)

- Autenticação e contas de usuário.
- Favoritos/histórico persistente.
- Geolocalização automática.
- Internacionalização além de pt-BR.
- Notificações push e alertas meteorológicos.

## Open Questions

- Nenhuma bloqueante. (As decisões foram fechadas no discovery.)

## Rastreabilidade (resumo)

| Story | Requisito | Critérios |
| ----- | --------- | --------- |
| US1   | RF1, RF2  | busca, clima atual |
| US2   | RF3       | previsão 5 dias |
| US3   | RF4       | conversão C/F |
| US4   | RNF resp. | responsividade |
| US5   | RF5       | erro/loading |
