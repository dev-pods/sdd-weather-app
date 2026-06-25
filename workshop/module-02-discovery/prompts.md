# Prompts — (Discovery)

> Dica: estes prompts funcionam bem no **Copilot Chat** (Ask). Para gerar o
> arquivo direto, use o **Agent Mode**.

---

## P2.1 — Análise inicial do briefing

```
Aja como um Business Analyst sênior. A partir do briefing abaixo, produza uma
análise de discovery estruturada com as seções: Contexto, Requisitos Funcionais,
Requisitos Não-Funcionais, Riscos, Perguntas em Aberto e Suposições.

Briefing:
"""
Sua empresa solicitou uma aplicação de previsão do tempo. Usuários devem poder:
buscar cidades, ver o clima atual, ver a previsão de 5 dias, alternar entre
Celsius e Fahrenheit e usar em dispositivos móveis.
"""

Salve o resultado em `specs/discovery.md`.
```

## P2.2 — Separar funcional de não-funcional

```
Revise minha lista de requisitos e me diga, item a item, se cada um é funcional
ou não-funcional. Aponte itens classificados incorretamente e sugira pelo menos
4 requisitos não-funcionais que provavelmente estão faltando para um web app
de clima (performance, acessibilidade, responsividade, disponibilidade).
```

## P2.3 — Caçar ambiguidades (PM cético)

```
Aja como um Product Manager cético fazendo discovery. Liste todas as
ambiguidades e lacunas deste briefing de Weather App. Para cada ponto, gere uma
"pergunta em aberto" e descreva o IMPACTO de seguir sem resposta.
```

## P2.4 — Mapa de riscos

```
Liste os principais riscos técnicos e de produto para este Weather App. Para
cada risco, forneça: probabilidade (baixa/média/alta), impacto e uma estratégia
de mitigação. Formate como tabela markdown.
```

## P2.5 — Personas e objetivos

```
Proponha 2 a 3 personas para este Weather App. Para cada persona, descreva o
objetivo principal, o contexto de uso (mobile/desktop) e a métrica de sucesso
do ponto de vista dela.
```

## P2.6 — Fechar decisões (trade-offs)

```
Vou fechar as seguintes decisões para destravar a especificação:
- Fonte de dados: Open-Meteo (sem API key)
- "5 dias" = hoje + 4 dias
- Unidade padrão: Celsius
- Sem autenticação e sem persistência de servidor
- Idioma da UI: pt-BR

Adicione uma seção "Decisões" ao `specs/discovery.md` registrando cada decisão
com uma breve justificativa e o que ela resolve das perguntas em aberto.
```

## P2.7 — Auto-crítica do discovery

```
Releia `specs/discovery.md` e critique como um arquiteto de soluções: o que
ainda está vago, o que pode gerar retrabalho e o que falta para começar a
especificação com segurança?
```

## P2.8 — Resumo executivo

```
Gere um resumo executivo de 5 linhas do discovery, adequado para apresentar a
stakeholders não-técnicos.
```
