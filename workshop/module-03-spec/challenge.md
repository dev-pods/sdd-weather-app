# Desafio — Criar a Especificação do Produto

Tempo estimado: **~50 min**

---

## Desafio 3.1 — Gerar a primeira versão com o Spec Agent

Use o **Spec Agent** (`.github/agents/spec.agent.md`) ou o prompt
`spec-prompt` para gerar `specs/weather-app-spec.md` a partir do discovery.

A spec deve conter todas as seções obrigatórias (veja `README.md`).

**Sucesso:** `specs/weather-app-spec.md` criado com todas as seções.

> Veja `Prompts` → **P3.1**.

---

## Desafio 3.2 — Escrever User Stories com valor

Cada story deve seguir o formato:

```text
Como [persona], quero [ação] para [valor/benefício].
```

**Sucesso:** ao menos **5 user stories**, cada uma ligada a uma persona do
discovery.

> Veja `Prompts` → **P3.2**.

---

## Desafio 3.3 — Critérios de aceite verificáveis

Para **cada** requisito funcional, escreva critérios de aceite no estilo
**Given / When / Then** (Dado / Quando / Então).

**Sucesso:** todo requisito funcional tem ao menos um critério verificável.

> Veja `Prompts` → **P3.3**.

---

## Desafio 3.4 — Edge cases

Liste casos de borda concretos: cidade inexistente, string vazia, caracteres
especiais, falha de API, timeout, sem resultados de geocoding, resposta parcial.

**Sucesso:** ao menos **6 edge cases**, cada um com o comportamento esperado.

> Veja `Prompts` → **P3.4**.

---

## Desafio 3.5 — Revisão crítica (não aceite a 1ª resposta)

Peça ao Copilot para **revisar a própria spec** e apontar requisitos faltantes,
ambiguidades e inconsistências. Aplique as correções.

**Sucesso:** ao menos 3 melhorias incorporadas após a revisão crítica.

> Veja `Prompts` → **P3.5** e **P3.6**.

---

## Desafio 3.6 — Validar prontidão para desenvolvimento

Pergunte explicitamente: *"esta spec é suficiente para desenvolver sem novas
perguntas?"*. Se não for, ajuste até ficar.

**Sucesso:** o Copilot confirma que a spec é "development-ready" e a seção
**Out of Scope** está preenchida.

> Veja `Prompts` → **P3.7**.

---

## Desafio 3.7 — Rodar a validação local (opcional, mas recomendado)

A spec será validada por `validate-spec.yml`. Você pode antecipar conferindo se
todas as seções obrigatórias estão presentes.

**Sucesso:** todas as seções obrigatórias presentes (Overview, Functional
Requirements, User Stories, Acceptance Criteria, Non-Functional Requirements,
Edge Cases, Assumptions, Risks).

---

## Checklist do módulo

- [ ] `specs/weather-app-spec.md` com todas as seções obrigatórias
- [ ] ≥ 5 user stories com valor
- [ ] Critérios de aceite verificáveis por requisito funcional
- [ ] ≥ 6 edge cases com comportamento esperado
- [ ] Revisão crítica aplicada
- [ ] Out of Scope preenchido
