import type { City, CurrentWeather, ForecastDay, WeatherData } from '../types/weather';

const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';
const REQUEST_TIMEOUT_MS = 10_000;
const FORECAST_DAYS = 5;

/** Erro tipado da camada de dados, com mensagem amigável ao usuário. */
export class WeatherServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'WeatherServiceError';
  }
}

/** Faz um fetch com timeout via AbortController. */
async function fetchWithTimeout<T>(url: string, errorMessage: string): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new WeatherServiceError(errorMessage);
    }
    return (await response.json()) as T;
  } catch (err) {
    if (err instanceof WeatherServiceError) {
      throw err;
    }
    if (err !== null && typeof err === 'object' && 'name' in err && err.name === 'AbortError') {
      throw new WeatherServiceError('A requisição demorou demais.');
    }
    if (err instanceof SyntaxError) {
      throw new WeatherServiceError('Resposta inválida. Tente novamente.');
    }
    throw new WeatherServiceError('Falha de rede.');
  } finally {
    clearTimeout(timeout);
  }
}

interface GeocodingResult {
  id?: number | null;
  name?: string | null;
  country?: string | null;
  admin1?: string | null;
  latitude?: number | null;
  longitude?: number | null;
}

/**
 * Busca cidades por nome (geocoding). Retorna lista vazia quando não há
 * resultados — o estado "vazio" é tratado pela camada de UI.
 */
export async function searchCities(name: string): Promise<City[]> {
  const query = name.trim();
  if (!query) return [];

  const url = `${GEOCODING_URL}?name=${encodeURIComponent(query)}&count=5&language=pt&format=json`;
  const data = await fetchWithTimeout<{ results?: (GeocodingResult | null)[] | null } | null>(
    url,
    'Não foi possível buscar a cidade. Tente novamente.',
  );
  if (!data || (data.results != null && !Array.isArray(data.results))) {
    throw new WeatherServiceError('Resposta de localização inválida. Tente novamente.');
  }
  if (!data.results?.length) return [];

  const cities = data.results.flatMap((result) => {
    const id = finiteNumber(result?.id);
    const latitude = finiteNumber(result?.latitude);
    const longitude = finiteNumber(result?.longitude);
    if (
      id === null ||
      latitude === null ||
      longitude === null ||
      Math.abs(latitude) > 90 ||
      Math.abs(longitude) > 180
    )
      return [];
    return [
      {
        id,
        name:
          typeof result?.name === 'string' && result.name.trim()
            ? result.name
            : 'Local desconhecido',
        country: typeof result?.country === 'string' ? result.country : '',
        admin1: typeof result?.admin1 === 'string' ? result.admin1 : undefined,
        latitude,
        longitude,
      },
    ];
  });
  if (!cities.length) {
    throw new WeatherServiceError('Resposta de localização incompleta. Tente novamente.');
  }
  return cities;
}

interface ForecastResponse {
  current?: {
    time?: string | null;
    temperature_2m?: number | null;
    relative_humidity_2m?: number | null;
    wind_speed_10m?: number | null;
    surface_pressure?: number | null;
    precipitation?: number | null;
    weather_code?: number | null;
  } | null;
  daily?: {
    time?: (string | null)[] | null;
    weather_code?: (number | null)[] | null;
    temperature_2m_max?: (number | null)[] | null;
    temperature_2m_min?: (number | null)[] | null;
    precipitation_probability_max?: (number | null)[] | null;
  } | null;
}

function finiteNumber(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function mapCurrent(c: NonNullable<ForecastResponse['current']>): CurrentWeather {
  return {
    time: typeof c.time === 'string' ? c.time : null,
    temperature: finiteNumber(c.temperature_2m),
    humidity: finiteNumber(c.relative_humidity_2m),
    windSpeed: finiteNumber(c.wind_speed_10m),
    pressure: finiteNumber(c.surface_pressure),
    precipitation: finiteNumber(c.precipitation),
    weatherCode: finiteNumber(c.weather_code),
  };
}

function mapForecast(d: NonNullable<ForecastResponse['daily']>): ForecastDay[] {
  return Array.from({ length: FORECAST_DAYS }, (_, index) => {
    const date = d.time?.[index];
    return {
      date:
        typeof date === 'string' &&
        /^\d{4}-\d{2}-\d{2}$/.test(date) &&
        !Number.isNaN(Date.parse(`${date}T00:00:00Z`))
          ? date
          : null,
      weatherCode: finiteNumber(d.weather_code?.[index]),
      max: finiteNumber(d.temperature_2m_max?.[index]),
      min: finiteNumber(d.temperature_2m_min?.[index]),
      precipitationProbability: finiteNumber(d.precipitation_probability_max?.[index]) ?? 0,
    };
  });
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
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max',
    forecast_days: String(FORECAST_DAYS),
    timezone: 'auto',
  });

  const data = await fetchWithTimeout<ForecastResponse>(
    `${FORECAST_URL}?${params.toString()}`,
    'Não foi possível carregar o clima. Tente novamente.',
  );
  if (!data?.current || !data.daily) {
    throw new WeatherServiceError('Resposta de clima incompleta. Tente novamente.');
  }

  return {
    city,
    current: mapCurrent(data.current),
    forecast: mapForecast(data.daily),
  };
}
