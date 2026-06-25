# Prompts — (Specification)

> Para gerar/editar arquivos diretamente, use o **Agent Mode** com o
> **Spec Agent** (`.github/agents/spec.agent.md`).

---

## P3.1 — Gerar a especificação

```
Use `specs/discovery.md` como entrada. Gere uma especificação de produto
completa em `specs/weather-app-spec.md` com as seções: Overview, Functional
Requirements, User Stories, Acceptance Criteria, Non-Functional Requirements,
Edge Cases, Assumptions, Risks, Out of Scope e Open Questions.

Não escreva código. Cada requisito funcional deve ter pelo menos um critério de
aceite verificável.
```

## P3.2 — User stories com valor

```
Reescreva as User Stories no formato "Como [persona], quero [ação] para
[valor]". Use as personas definidas no discovery. Garanta pelo menos 5 stories,
cada uma claramente conectada a um requisito funcional.
```

## P3.3 — Critérios de aceite (Given/When/Then)

```
Para cada requisito funcional da spec, escreva critérios de aceite no formato
Given/When/Then. Os critérios devem ser objetivos e testáveis (servirão de base
para os testes automatizados nos módulos seguintes).
```

## P3.4 — Edge cases

```
Liste os edge cases que esta especificação ainda não cobre para um Weather App:
cidade inexistente, input vazio, caracteres especiais, falha de API, timeout,
geocoding sem resultados e resposta parcial. Para cada um, descreva o
comportamento esperado da aplicação.
```

## P3.5 — Revisão crítica

```
Revise `specs/weather-app-spec.md` e identifique:
- Requisitos faltantes
- Ambiguidades
- Inconsistências
- Critérios de aceite fracos ou não verificáveis
Liste cada problema com uma sugestão de correção.
```

## P3.6 — Aprofundar e tornar production-ready

```
Torne esta especificação mais detalhada e pronta para produção, sem inflar com
texto desnecessário. Foque em precisão e testabilidade.
```

## P3.7 — Validar prontidão

```
Esta especificação é suficiente para desenvolver a aplicação sem novas perguntas?
Se não, liste exatamente o que falta. Se sim, confirme e garanta que a seção
"Out of Scope" está completa.
```

## P3.8 — Rastreabilidade

```
Crie uma tabela de rastreabilidade ligando cada User Story aos seus Acceptance
Criteria e aos requisitos não-funcionais relevantes. Isso vai facilitar a
quebra de tarefas e os testes.
```
