# Solução de referência — (`specs/discovery.md`)

> Use como referência **após** sua própria tentativa. O valor está no processo de
> questionar os requisitos, não em copiar o resultado.

---

## Contexto

Aplicação web de previsão do tempo voltada a uso pessoal rápido. O usuário busca
uma cidade e visualiza o clima atual e a previsão de 5 dias, com possibilidade de
alternar entre Celsius e Fahrenheit. Prioridade para experiência mobile.

## Requisitos Funcionais

- **RF1** — Buscar cidade por nome (com sugestões/desambiguação).
- **RF2** — Exibir clima atual (temperatura, condição, umidade, vento, pressão,
  precipitação).
- **RF3** — Exibir previsão de 5 dias (mín/máx, condição, precipitação, vento).
- **RF4** — Alternar unidade Celsius/Fahrenheit, atualizando todos os valores.
- **RF5** — Indicar estados de carregamento, erro e vazio.

## Requisitos Não-Funcionais

- **RNF1 — Performance:** carga inicial < 2s em conexão típica; resposta de busca
  percebida como instantânea.
- **RNF2 — Responsividade:** mobile-first; funcional de 320px a desktop.
- **RNF3 — Acessibilidade:** navegação por teclado, roles/labels semânticos,
  contraste adequado (WCAG AA básico).
- **RNF4 — Resiliência:** degradação graciosa em falha de rede/API.
- **RNF5 — Sem chave de API:** usar fonte pública (Open-Meteo) para simplificar
  deploy estático.
- **RNF6 — Observabilidade básica:** mensagens de erro claras ao usuário.

## Riscos

| Risco                                   | Prob. | Impacto | Mitigação                                            |
| --------------------------------------- | ----- | ------- | ---------------------------------------------------- |
| Rate limiting / indisponibilidade da API| Média | Alto    | Tratar erros, mensagem clara, possível cache leve    |
| Cidade ambígua (homônimos)              | Alta  | Médio   | Mostrar país/estado nas sugestões de geocoding       |
| Inconsistência de UI entre dispositivos | Média | Médio   | Design mobile-first + testes E2E em viewport mobile  |
| Falha de rede do usuário                | Média | Médio   | Estado de erro com ação de "tentar novamente"        |
| Conversão de unidade incorreta          | Baixa | Alto    | Função pura testada unitariamente                    |

## Perguntas em Aberto

1. Qual fonte de dados? *(Impacto: define API, custo e chave)*
2. "5 dias" inclui hoje? *(Impacto: layout e índice de datas)*
3. Geolocalização automática é esperada? *(Impacto: permissões e UX)*
4. Unidade padrão inicial? *(Impacto: primeira renderização)*
5. Suporte offline/cache? *(Impacto: complexidade)*
6. Idiomas suportados? *(Impacto: i18n)*
7. Precisa de histórico/favoritos? *(Impacto: persistência)*

## Suposições

- Há conexão com a internet na maior parte do tempo.
- Uso individual, sem necessidade de login.
- Navegadores modernos (evergreen).

## Decisões (fechadas para o treinamento)

- **Fonte de dados:** Open-Meteo (geocoding + forecast), **sem API key**.
- **"5 dias" = hoje + 4 dias** seguintes.
- **Unidade padrão:** Celsius.
- **Sem autenticação** e **sem persistência de servidor**.
- **Idioma da UI:** pt-BR.
- **Sem geolocalização automática** na v1 (pode ser melhoria futura).

## Personas

- **Viajante planejador** — quer a previsão de 5 dias para organizar a semana
  (uso desktop e mobile).
- **Decisor do dia a dia** — quer saber rapidamente o clima atual para decidir
  roupa/guarda-chuva (uso majoritariamente mobile).
