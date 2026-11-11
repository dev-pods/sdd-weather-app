# Weather App — Plano técnico

## Architecture

SPA React com camadas de apresentação (`src/components/`), orquestração
(`src/hooks/`), acesso a dados (`src/services/`), funções puras (`src/lib/`) e
contratos compartilhados (`src/types/`). `App` compõe os estados e mantém a
unidade de exibição; componentes não acessam a rede diretamente.

## Tech Stack

- TypeScript em modo strict, React e Vite.
- Tailwind CSS para a interface responsiva em tema dark glassmorphism.
- Open-Meteo para geocoding e previsão, sem chave de API.
- Vitest e Testing Library para testes unitários; Playwright para E2E.
- pnpm para dependências e Biome para lint e formatação.

## Data Model

- `Unit`: `celsius` ou `fahrenheit`.
- `City`: identificador, nome, país, região opcional, latitude e longitude.
- `CurrentWeather`: horário, temperatura, código climático, umidade, vento,
  pressão e precipitação; campos climáticos ausentes podem ser `null`.
- `ForecastDay`: data, máxima, mínima e código climático podem ser `null`;
  probabilidade de chuva é numérica e usa 0 quando a API não fornece valor.
- `WeatherData`: cidade, clima atual e cinco posições de previsão.

Temperaturas válidas permanecem em Celsius no domínio e são convertidas na
renderização. Valores ausentes não são convertidos.

## Data Flow

1. A busca válida chama `searchCities` com o nome codificado para geocoding.
2. O hook recebe as cidades e, na implementação atual, carrega a primeira.
   A seleção explícita entre resultados de RF1 permanece pendente.
3. `getWeather` consulta o forecast pelas coordenadas e mapeia `current` e
   arrays paralelos de `daily` para o domínio.
4. `useWeather` expõe `idle`, `loading`, `empty`, `error` e `success`, além de
   `search`, `selectCity` e `retry`; respostas antigas são ignoradas.
5. Os componentes apresentam os dados e derivam as temperaturas na unidade
   escolhida sem fazer requisições adicionais.

## API Contracts

- Geocoding: `https://geocoding-api.open-meteo.com/v1/search`, com `name`,
  `count=5`, `language=pt` e `format=json`.
- Forecast: `https://api.open-meteo.com/v1/forecast`, com latitude, longitude,
  campos atuais e diários, `forecast_days=5` e `timezone=auto`.
- Identificador e coordenadas inválidos não são usados para consultar clima;
  nomes ausentes recebem fallback e país/região podem ficar vazios.

## Error Handling

- `fetchWithTimeout` usa `AbortController` por 10 segundos, incluindo a leitura
  do JSON, e limpa o temporizador; erros são convertidos em `WeatherServiceError`.
- Respostas sem `current` ou `daily` geram erro recuperável. Campos individuais
  ausentes ou inválidos geram fallbacks; probabilidade de chuva usa 0 por
  compatibilidade com o contrato atual.
- O hook ignora respostas de operações anteriores e o retry repete a última
  busca ou o carregamento da cidade que falhou.

## Testing Strategy

- Vitest cobre conversão, mapeamento, dados parciais, timeout, falha de rede,
  estados do hook e interação com componentes; rede é simulada.
- Playwright intercepta as APIs e cobre busca, vazio, conversão, dados parciais
  e layouts de 320 px, 375 px e desktop em Chromium e WebKit.
- Gates de código: `pnpm lint`, `pnpm build`, `pnpm test` e, para fluxos de
  interface, `pnpm test:e2e` com dependências de navegador instaladas.
- Validar manualmente leitor de tela, foco e desempenho no ambiente de entrega.

## Risks and Decisions

- A lista de cidades da spec ainda não está exposta na interface; não confundir
  a primeira correspondência automática com escolha pelo usuário.
- Sem cache persistente, uma nova busca pode gerar novas requisições.
- A probabilidade nula exibida como 0% é uma decisão de compatibilidade e não
  representa certeza de ausência de chuva; deve ser reavaliada com o produto.