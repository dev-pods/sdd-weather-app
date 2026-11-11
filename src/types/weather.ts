/**
 * Contratos de domínio compartilhados do Weather App.
 *
 * Decisão de arquitetura: as temperaturas são sempre armazenadas em Celsius
 * internamente e convertidas apenas na camada de apresentação. Assim, a troca
 * de unidade (C/F) nunca dispara um novo request.
 */

export type Unit = 'celsius' | 'fahrenheit';

/** Resultado da API de geocoding (uma cidade). */
export interface City {
  id: number;
  name: string;
  country: string;
  /** Estado/região, quando disponível (ajuda a desambiguar homônimos). */
  admin1?: string;
  latitude: number;
  longitude: number;
}

/** Condições atuais. Temperatura sempre em °C. */
export interface CurrentWeather {
  temperature: number | null;
  weatherCode: number | null;
  humidity: number | null;
  windSpeed: number | null;
  pressure: number | null;
  precipitation: number | null;
  time: string | null;
}

/** Um dia da previsão. Temperaturas sempre em °C. */
export interface ForecastDay {
  date: string | null;
  min: number | null;
  max: number | null;
  weatherCode: number | null;
  precipitationProbability: number;
}

/** Agregado entregue à UI: cidade + clima atual + 5 dias de previsão. */
export interface WeatherData {
  city: City;
  current: CurrentWeather;
  forecast: ForecastDay[];
}
