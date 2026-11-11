# Weather App — Backlog

As tarefas concluídas descrevem o comportamento já presente; itens abertos
registram requisitos ou validações ainda não demonstrados.

## Fundações e dados

- [x] **T-01 — Contratos de domínio.** Definir unidades, cidade, clima atual e
  previsão tipados, com temperaturas e campos parciais coerentes.
- [x] **T-02 — Conversão de temperatura.** Converter Celsius/Fahrenheit e
  testar 0, 100 e -40 °C, arredondamento e valores ausentes.
- [x] **T-03 — Apresentação de códigos e datas.** Mapear condições conhecidas,
  condição desconhecida e rótulos de dias da previsão.
- [x] **T-04 — Geocoding.** Codificar o nome, tratar busca vazia e mapear
  resultados válidos com mensagens de erro tipadas.
- [x] **T-05 — Forecast.** Mapear clima atual e cinco posições diárias; tratar
  campos ausentes, respostas incompletas e ausência de probabilidade como 0%.
- [x] **T-06 — Resiliência.** Aplicar timeout de 10 segundos e tratar falhas de
  rede, HTTP e JSON sem expor exceções brutas à interface.
- [x] **T-07 — Orquestração.** Expor estados e ações no hook, descartar respostas
  antigas e repetir a última operação quando necessário.

## Interface e integração

- [x] **T-08 — Busca e unidade.** Impedir busca vazia ou durante carregamento;
  oferecer alternador de unidade rotulado e navegável por teclado.
- [x] **T-09 — Estados e clima atual.** Exibir loading, vazio, erro recuperável e
  clima atual com suas métricas e fallbacks.
- [x] **T-10 — Previsão responsiva.** Exibir cinco cartões, com grid de 2, 3 ou
  5 colunas conforme o viewport e conversão de temperatura na apresentação.
- [ ] **T-11 — Seleção de cidade.** Apresentar correspondências com país/região
  e permitir escolher uma cidade por teclado e apontador antes de carregar clima.
  Depende de T-04, T-07 e T-08; atende RF1 e deve cobrir homônimos.

## Verificação e hardening

- [x] **T-12 — Testes unitários e de componentes.** Cobrir conversão, serviço,
  dados parciais, concorrência, retry e estados da interface com rede simulada.
- [x] **T-13 — Testes E2E.** Cobrir busca, estado vazio, unidade, dados parciais
  e viewports mobile/desktop com respostas de API determinísticas.
- [ ] **T-14 — Acessibilidade manual.** Validar foco durante busca e retry,
  anúncios com leitor de tela e contraste; corrigir problemas comprovados.
- [ ] **T-15 — Desempenho de entrega.** Medir carregamento inicial no ambiente
  de publicação e verificar a meta de 2 segundos.
- [ ] **T-16 — Política de precipitação ausente.** Decidir se o fallback 0% deve
  ser substituído por “—”; atualizar contrato e testes se a decisão mudar.
- [ ] **T-17 — Segurança das dependências.** Revisar os alertas de ferramentas
  de desenvolvimento, atualizar versões compatíveis e executar os gates.

## Rastreabilidade

- RF1: T-04, T-08, T-11.
- RF2 e RF3: T-01, T-03, T-05, T-09, T-10.
- RF4: T-02, T-08, T-12.
- RF5: T-06, T-07, T-09, T-12, T-13.