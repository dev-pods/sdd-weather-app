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
  temperature: number;
  weatherCode: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  precipitation: number;
  time: string;
}

/** Um dia da previsão. Temperaturas sempre em °C. */
export interface ForecastDay {
  date: string;
  min: number;
  max: number;
  weatherCode: number;
  precipitationProbability: number;
}

/** Agregado entregue à UI: cidade + clima atual + 5 dias de previsão. */
export interface WeatherData {
  city: City;
  current: CurrentWeather;
  forecast: ForecastDay[];
}
