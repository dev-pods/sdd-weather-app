# Entendendo o problema (Discovery)

## Objetivo

Transformar um briefing de negócio **vago** em uma análise estruturada que
separa claramente:

- **Requisitos funcionais**
- **Requisitos não-funcionais**
- **Riscos**
- **Perguntas em aberto (open questions)**

Você vai produzir o artefato `specs/discovery.md`.

---

## Por que isso importa

> A maioria dos projetos não falha por código ruim, mas por **requisitos mal
> entendidos**.

A fase de **Thinking / Discovery** é onde o Copilot mostra um valor que muita
gente ignora: ele é excelente para **interrogar requisitos**, expor ambiguidades
e listar o que ainda precisa ser decidido — antes de qualquer linha de código.

Este é o primeiro passo do fluxo:

```text
Thinking → Planning → Decomposing → Building → Testing → Reviewing → Shipping
   ▲ você está aqui
```

---

## Entrada — o briefing de negócio

> Sua empresa solicitou uma aplicação de previsão do tempo.
>
> Os usuários devem poder:
>
> - Buscar cidades
> - Ver o clima atual
> - Ver a previsão de 5 dias
> - Alternar entre Celsius e Fahrenheit
> - Usar em dispositivos móveis
>
> **Analise os requisitos de negócio e identifique:**
> requisitos funcionais, requisitos não-funcionais, riscos e perguntas em aberto.

---

## Saída

```text
specs/discovery.md
```

---

## Regras

- **Não comece pelo código.**
- Não invente respostas para o que está ambíguo — registre como *open question*.
- Use o Copilot para **questionar**, não só para gerar texto.
