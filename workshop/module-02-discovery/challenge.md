# Desafio — Discovery dos Requisitos

Tempo estimado: **~45 min**

---

## Desafio 2.1 — Análise inicial do briefing

Use o **Copilot Chat** (modo Ask) para analisar o briefing e classificar os
requisitos.

Crie o arquivo `specs/discovery.md` com as seções:

- **Contexto**
- **Requisitos Funcionais**
- **Requisitos Não-Funcionais**
- **Riscos**
- **Perguntas em Aberto (Open Questions)**
- **Suposições (Assumptions)**

**Sucesso:** o arquivo existe com as 6 seções preenchidas a partir do briefing.

> Veja `Prompts` → **P2.1**.

---

## Desafio 2.2 — Separar funcional de não-funcional

Revise sua lista. É comum misturar as duas coisas. Garanta que:

- **Funcional** = o que o sistema *faz* (buscar cidade, exibir clima…).
- **Não-funcional** = *como* ele se comporta (performance, acessibilidade,
  responsividade, disponibilidade, i18n…).

**Sucesso:** nenhum item está na categoria errada. Há ao menos **4 requisitos
não-funcionais** explícitos.

> Veja `Prompts` → **P2.2**.

---

## Desafio 2.3 — Caçar ambiguidades

Peça ao Copilot para agir como um **Product Manager cético** e listar tudo que
está ambíguo ou faltando no briefing.

Exemplos do que costuma faltar neste domínio:

- Qual fonte de dados/clima? Tem custo? Precisa de chave?
- "5 dias" inclui hoje? Quantas horas por dia?
- Geolocalização automática é esperada?
- Idiomas? Unidade padrão (C ou F)?
- Offline / cache?

**Sucesso:** pelo menos **6 perguntas em aberto** registradas, cada uma com o
**impacto** caso fique sem resposta.

> Veja `Prompts` → **P2.3**.

---

## Desafio 2.4 — Mapear riscos

Para cada risco, registre **probabilidade**, **impacto** e **mitigação**.

Riscos típicos: rate limiting da API, dados de localização incorretos,
inconsistência de UI entre dispositivos, falha de rede, latência.

**Sucesso:** tabela de riscos com ao menos **4 riscos** e mitigação para cada.

> Veja `Prompts` → **P2.4**.

---

## Desafio 2.5 — Definir personas e objetivos

Liste 2–3 **personas** e o objetivo principal de cada uma (ex.: viajante que
planeja a semana, pessoa decidindo a roupa do dia).

**Sucesso:** personas documentadas — isso vai alimentar as user stories da spec.

> Veja `Prompts` → **P2.5**.

---

## Desafio 2.6 — Decidir as open questions (trade-offs)

Para o treinamento, vamos **fechar** as principais decisões para destravar a
spec. Registre as decisões tomadas (e a justificativa):

- Fonte de dados: **Open-Meteo** (sem API key)
- "5 dias" = **hoje + 4 dias seguintes**
- Unidade padrão: **Celsius**
- Sem autenticação, sem persistência de servidor
- Idioma da UI: pt-BR

**Sucesso:** seção **Decisões** adicionada ao `discovery.md`.

> Veja `Prompts` → **P2.6**.

---

## Checklist do módulo

- [ ] `specs/discovery.md` criado
- [ ] Funcional vs não-funcional separados corretamente
- [ ] ≥ 6 perguntas em aberto com impacto
- [ ] Tabela de riscos com mitigação
- [ ] Personas definidas
- [ ] Decisões registradas
