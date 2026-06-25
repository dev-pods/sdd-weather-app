# Solução de referência — (APIs)

A implementação está no repositório. Use após sua tentativa.

## Arquivos de referência

- [`src/services/weatherService.ts`](../../src/services/weatherService.ts)
- [`src/hooks/useWeather.ts`](../../src/hooks/useWeather.ts)
- [`src/App.tsx`](../../src/App.tsx)

## Pontos-chave

- **Isolamento total da rede:** todo `fetch` vive em `weatherService.ts`. Os
  componentes e o hook não conhecem URLs nem formato da resposta da Open-Meteo.
- **Erro tipado:** `WeatherServiceError` carrega mensagens prontas para o
  usuário; o hook apenas as repassa ao `ErrorState`.
- **Timeout:** `fetchWithTimeout` usa `AbortController` (10s) e normaliza
  `AbortError` e falhas de rede.
- **Mapeamento defensivo:** `precipitation_probability_max` pode ser `null` →
  vira `0`; ausência de `current`/`daily` vira erro de "resposta incompleta".
- **Máquina de estados:** `useWeather` expõe `idle | loading | success | error |
  empty` e `retry`, que refaz a última operação (carregar cidade ou re-buscar).
- **Sem estado duplicado:** a `unit` é estado de UI no `App`; o clima é estado de
  dados no hook. A conversão é derivada na renderização.

## Trecho central (mapeamento de forecast)

```ts
function mapForecast(d) {
  return d.time.map((date, i) => ({
    date,
    weatherCode: d.weather_code[i],
    max: d.temperature_2m_max[i],
    min: d.temperature_2m_min[i],
    precipitationProbability: d.precipitation_probability_max[i] ?? 0,
  }));
}
```
