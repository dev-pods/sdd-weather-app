# Solução de referência — (UI)

A implementação completa dos componentes está no repositório, em `src/`. Use-os
como referência **após** sua tentativa.

## Arquivos de referência

- [`src/components/SearchBar.tsx`](../../src/components/SearchBar.tsx)
- [`src/components/UnitToggle.tsx`](../../src/components/UnitToggle.tsx)
- [`src/components/CurrentWeather.tsx`](../../src/components/CurrentWeather.tsx)
- [`src/components/ForecastList.tsx`](../../src/components/ForecastList.tsx)
- [`src/components/ForecastCard.tsx`](../../src/components/ForecastCard.tsx)
- [`src/components/states/LoadingState.tsx`](../../src/components/states/LoadingState.tsx)
- [`src/components/states/ErrorState.tsx`](../../src/components/states/ErrorState.tsx)
- [`src/components/states/EmptyState.tsx`](../../src/components/states/EmptyState.tsx)
- [`src/App.tsx`](../../src/App.tsx)

## Pontos-chave da solução

- **Separação de responsabilidades:** componentes só apresentam; conversão e
  rótulos vêm de funções puras em `src/lib/`.
- **Conversão derivada:** a unidade é estado de UI no `App`; cada componente
  recebe `unit` e formata na renderização com `formatTemperature` — sem
  duplicar estado nem refazer requests.
- **Acessibilidade:** `role="search"`, `label` no input, `aria-pressed` no
  toggle, `role="status"` no loading, `role="alert"` no erro.
- **Responsividade:** grid `grid-cols-2 sm:grid-cols-3 lg:grid-cols-5`; header
  empilha no mobile (`flex-col sm:flex-row`).
- **Glassmorphism:** `bg-white/5 backdrop-blur-md border border-white/10`.

## Mock para desenvolvimento (exemplo)

```ts
import type { WeatherData } from './types/weather';

export const MOCK_WEATHER: WeatherData = {
  city: { id: 1, name: 'Seattle', country: 'Estados Unidos', admin1: 'Washington', latitude: 47.6, longitude: -122.33 },
  current: { time: '2026-06-16T12:00', temperature: 18, humidity: 80, windSpeed: 10, pressure: 1015, precipitation: 0, weatherCode: 3 },
  forecast: [
    { date: '2026-06-16', min: 12, max: 20, weatherCode: 3, precipitationProbability: 20 },
    { date: '2026-06-17', min: 11, max: 19, weatherCode: 61, precipitationProbability: 90 },
    { date: '2026-06-18', min: 13, max: 22, weatherCode: 80, precipitationProbability: 70 },
    { date: '2026-06-19', min: 14, max: 24, weatherCode: 1, precipitationProbability: 10 },
    { date: '2026-06-20', min: 15, max: 25, weatherCode: 0, precipitationProbability: 0 },
  ],
};
```
