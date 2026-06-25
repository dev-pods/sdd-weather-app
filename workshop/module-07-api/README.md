# Integração de APIs

## Objetivo

Substituir os dados mock por dados reais da **Open-Meteo**, isolando todo o
acesso à rede em uma camada de **services** e conectando a UI por meio de um hook
de estado (`useWeather`).

```text
Thinking → Planning → Decomposing → Building → Testing → Reviewing → Shipping
                                      ▲ ainda em Building (dados reais)
```

---

## Por que isolar a camada de dados

- **Testabilidade:** o service pode ser mockado nos testes (sem rede real).
- **Resiliência:** erros, timeouts e respostas parciais são tratados em um só
  lugar.
- **Troca de fonte:** se a API mudar, só o service muda.

---

## Entrada

- `plans/weather-app-plan.md` (seção External APIs)
- Tarefas T-05, T-06, T-07

## Saída

- `src/services/weatherService.ts` (`searchCities`, `getWeather`)
- `src/hooks/useWeather.ts`
- `App` consumindo dados reais

## Endpoints (Open-Meteo, sem API key)

**Geocoding**
```
https://geocoding-api.open-meteo.com/v1/search?name={cidade}&count=5&language=pt&format=json
```

**Forecast**
```
https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}
  &current=temperature_2m,relative_humidity_2m,wind_speed_10m,surface_pressure,precipitation,weather_code
  &daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max
  &forecast_days=5&timezone=auto
```
