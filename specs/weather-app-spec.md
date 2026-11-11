# Weather App — Especificação

## Overview

Aplicação web de previsão do tempo para buscar uma cidade e consultar as
condições atuais e a previsão de cinco dias. A interface é responsiva, em pt-BR,
e usa a Open-Meteo sem exigir login ou chave de API.

## Functional Requirements

- **RF1 — Busca:** aceitar nomes de cidades, incluindo acentos, e apresentar
  correspondências com país e região para permitir a escolha entre homônimos.
- **RF2 — Clima atual:** exibir temperatura, condição, umidade, vento, pressão e
  precipitação da cidade selecionada.
- **RF3 — Previsão:** exibir cinco dias, com data, condição, temperaturas máxima
  e mínima e probabilidade de chuva.
- **RF4 — Unidades:** alternar entre Celsius e Fahrenheit para todas as
  temperaturas, sem nova requisição.
- **RF5 — Estados:** comunicar os estados inicial, carregando, vazio, erro e
  sucesso; oferecer nova tentativa em caso de falha.

## User Stories

- Como usuário, quero buscar uma cidade e identificar a localidade correta.
- Como usuário, quero consultar o clima atual e os próximos cinco dias.
- Como usuário, quero alternar a unidade de temperatura instantaneamente.
- Como usuário em rede instável, quero entender a falha e tentar novamente.
- Como usuário em dispositivo móvel, quero consultar os dados com conforto.

## Acceptance Criteria

- Uma busca não vazia apresenta as cidades correspondentes com país e região e
  permite selecionar a desejada; uma busca sem resultados apresenta estado vazio.
- Após selecionar uma cidade, a interface apresenta as seis métricas de RF2 e
  cinco cartões de previsão com os dados de RF3.
- Alternar °C/°F atualiza temperatura atual, mínimas e máximas sem nova chamada
  à API.
- Durante a busca, um estado de carregamento é comunicado; falhas exibem uma
  mensagem e uma ação para repetir a operação que falhou.
- A busca e os controles de unidade e retry são utilizáveis por teclado, com
  rótulos semânticos e foco visível.

## Non-Functional Requirements

- Interface mobile-first, de 320 px a desktop, com contraste adequado e suporte
  a teclado e tecnologias assistivas.
- Dados e apresentação separados; temperaturas armazenadas em Celsius e
  convertidas apenas para exibição.
- Requisições externas com timeout e tratamento de erros; lint, build e testes
  devem passar antes da entrega.
- Meta de carregamento inicial inferior a 2 segundos em condições adequadas;
  essa meta exige medição no ambiente de entrega.

## Edge Cases

- Busca vazia ou contendo apenas espaços não dispara requisição.
- Caracteres especiais e acentos são codificados na busca sem alterar o nome.
- Geocoding sem resultados apresenta mensagem de cidade não encontrada.
- Falha de rede, resposta HTTP inválida ou timeout apresenta erro recuperável.
- Campos climáticos ausentes ou nulos são apresentados como “—”; condição
  desconhecida recebe rótulo apropriado. Por compatibilidade com o contrato
  existente, probabilidade de chuva nula ou ausente é apresentada como 0%.
- Ausência completa de `current` ou `daily` produz erro recuperável, em vez de
  apresentar uma resposta como completa.
- Respostas antigas não devem substituir resultados de uma busca mais recente.

## Assumptions

- A Open-Meteo fornece geocoding e previsão em navegadores modernos, sem chave.
- É necessária conectividade para consultas; a aplicação não fornece modo offline.
- O produto é de uso individual e não requer autenticação ou favoritos.

## Risks

- Cidades homônimas podem levar à localidade errada sem uma etapa de escolha.
- Indisponibilidade, limite de uso ou resposta parcial da API afeta os dados.
- Converter chuva desconhecida para 0% pode sugerir ausência de chuva; a decisão
  de produto deve ser reavaliada antes de mudar o contrato de fallback.
- Contraste, leitores de tela e a meta de desempenho exigem validação no ambiente
  de entrega, além dos testes automatizados.

## Known Gaps

- A implementação atual seleciona automaticamente a primeira cidade encontrada;
  a lista e a escolha entre homônimos descritas em RF1 ainda estão pendentes.
- A meta de carregamento inicial e a validação com leitores de tela não foram
  comprovadas pelos testes existentes.