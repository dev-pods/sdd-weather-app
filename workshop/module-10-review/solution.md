# Solução de referência — (Review)

Não há "código" a entregar aqui — a entrega é o **processo de revisão**. Use este
gabarito para avaliar o seu.

## Fluxo esperado

1. **Branch + commit + push** seguindo Conventional Commits (`feat:`, `fix:`…).
2. **PR aberto** com a descrição do template preenchida: o quê, por quê, links
   para `specs/`, `plans/`, `tasks/`, como testar.
3. **Auto-revisão** com o Review Agent antes de envolver humanos.
4. **Copilot Code Review** solicitado no PR; cada comentário **triado**
   conscientemente.
5. **Checks verdes:** `ci.yml` (lint/build/test/e2e) e os `validate-*` (ordem
   SDD).

## O que uma boa revisão verifica

| Dimensão | Pergunta-chave |
| --- | --- |
| Corretude | Faz o que a spec pede? |
| Spec | Algum critério de aceite não atendido? |
| Segurança | Timeout, URLs, dados — OWASP onde aplicável? |
| A11y | Teclado, roles/labels, contraste? |
| Erros | Loading/erro/vazio tratados? |
| Testes | Mudança tem teste? |
| Clareza | Nomes, camadas, sem código morto? |

## Boas práticas de triagem

- **Aceitar** correções objetivas (bug, segurança, a11y).
- **Discutir** quando há trade-off de design.
- **Recusar com justificativa** quando contraria a spec/escopo — e registrar o
  motivo no PR.

## Arquivos relevantes

- [`.github/pull_request_template.md`](../../.github/pull_request_template.md)
- [`.github/agents/review.agent.md`](../../.github/agents/review.agent.md)
- [`.github/workflows/ci.yml`](../../.github/workflows/ci.yml)
- [`.github/workflows/validate-spec.yml`](../../.github/workflows/validate-spec.yml)
