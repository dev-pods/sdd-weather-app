import type { City, CurrentWeather, ForecastDay, WeatherData } from '../types/weather';

const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';
const REQUEST_TIMEOUT_MS = 10_000;

/** Erro tipado da camada de dados, com mensagem amigável ao usuário. */
export class WeatherServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'WeatherServiceError';
  }
}

/** Faz um fetch com timeout via AbortController. */
async function fetchWithTimeout(url: string): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    return await fetch(url, { signal: controller.signal });
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new WeatherServiceError('A requisição demorou demais. Tente novamente.');
    }
    throw new WeatherServiceError('Falha de rede. Verifique sua conexão.');
  } finally {
    clearTimeout(timeout);
  }
}

interface GeocodingResult {
  id: number;
  name: string;
  country?: string;
  admin1?: string;
  latitude: number;
  longitude: number;
}

/**
 * Busca cidades por nome (geocoding). Retorna lista vazia quando não há
 * resultados — o estado "vazio" é tratado pela camada de UI.
 */
export async function searchCities(name: string): Promise<City[]> {
  const query = name.trim();
  if (!query) return [];

  const url = `${GEOCODING_URL}?name=${encodeURIComponent(query)}&count=5&language=pt&format=json`;
  const res = await fetchWithTimeout(url);
  if (!res.ok) {
    throw new WeatherServiceError('Não foi possível buscar a cidade. Tente novamente.');
  }

  const data = (await res.json()) as { results?: GeocodingResult[] };
  if (!data.results) return [];

  return data.results.map((r) => ({
    id: r.id,
    name: r.name,
    country: r.country ?? '',
    admin1: r.admin1,
    latitude: r.latitude,
    longitude: r.longitude,
  }));
}

interface ForecastResponse {
  current?: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    surface_pressure: number;
    precipitation: number;
    weather_code: number;
  };
  daily?: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: (number | null)[];
  };
}

function mapCurrent(c: NonNullable<ForecastResponse['current']>): CurrentWeather {
  return {
    time: c.time,
    temperature: c.temperature_2m,
    humidity: c.relative_humidity_2m,
    windSpeed: c.wind_speed_10m,
    pressure: c.surface_pressure,
    precipitation: c.precipitation,
    weatherCode: c.weather_code,
  };
}

function mapForecast(d: NonNullable<ForecastResponse['daily']>): ForecastDay[] {
  return d.time.map((date, i) => ({
    date,
    weatherCode: d.weather_code[i],
    max: d.temperature_2m_max[i],
    min: d.temperature_2m_min[i],
    precipitationProbability: d.precipitation_probability_max[i] ?? 0,
  }));
}

/**
 * Busca o clima atual e a previsão de 5 dias para uma cidade.
 * Temperaturas retornam em Celsius (conversão fica na UI).
 */
export async function getWeather(city: City): Promise<WeatherData> {
  const params = new URLSearchParams({
    latitude: String(city.latitude),
    longitude: String(city.longitude),
    current:
      'temperature_2m,relative_humidity_2m,wind_speed_10m,surface_pressure,precipitation,weather_code',
    daily:
      'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max',
    forecast_days: '5',
    timezone: 'auto',
  });

  const res = await fetchWithTimeout(`${FORECAST_URL}?${params.toString()}`);
  if (!res.ok) {
    throw new WeatherServiceError('Não foi possível carregar o clima. Tente novamente.');
  }

  const data = (await res.json()) as ForecastResponse;
  if (!data.current || !data.daily) {
    throw new WeatherServiceError('Resposta de clima incompleta. Tente novamente.');
  }

  return {
    city,
    current: mapCurrent(data.current),
    forecast: mapForecast(data.daily),
  };
}
