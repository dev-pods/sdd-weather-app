import { useCallback, useState } from 'react';
import type { City, WeatherData } from '../types/weather';
import { getWeather, searchCities, WeatherServiceError } from '../services/weatherService';

export type WeatherStatus = 'idle' | 'loading' | 'success' | 'error' | 'empty';

interface UseWeatherResult {
  status: WeatherStatus;
  data: WeatherData | null;
  cities: City[];
  error: string | null;
  query: string;
  search: (name: string) => Promise<void>;
  selectCity: (city: City) => Promise<void>;
  retry: () => Promise<void>;
}

/**
 * Hook de orquestração: busca cidades, seleciona uma e carrega o clima.
 * Expõe uma máquina de estados simples (idle/loading/success/error/empty).
 */
export function useWeather(): UseWeatherResult {
  const [status, setStatus] = useState<WeatherStatus>('idle');
  const [data, setData] = useState<WeatherData | null>(null);
  const [cities, setCities] = useState<City[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [lastCity, setLastCity] = useState<City | null>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: search inicia o fluxo na montagem; loadWeather é estável
  const search = useCallback(async (name: string) => {
    const trimmed = name.trim();
    setQuery(trimmed);
    if (!trimmed) return;

    setStatus('loading');
    setError(null);
    setCities([]);
    try {
      const results = await searchCities(trimmed);
      if (results.length === 0) {
        setStatus('empty');
        return;
      }
      // Seleciona automaticamente a primeira correspondência, mas mantém a
      // lista para o usuário trocar.
      setCities(results);
      await loadWeather(results[0]);
    } catch (err) {
      setStatus('error');
      setError(toMessage(err));
    }
  }, []);

  const loadWeather = useCallback(async (city: City) => {
    setStatus('loading');
    setError(null);
    setLastCity(city);
    try {
      const weather = await getWeather(city);
      setData(weather);
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError(toMessage(err));
    }
  }, []);

  const selectCity = useCallback(
    async (city: City) => {
      await loadWeather(city);
    },
    [loadWeather],
  );

  const retry = useCallback(async () => {
    if (lastCity) {
      await loadWeather(lastCity);
    } else if (query) {
      await search(query);
    }
  }, [lastCity, query, loadWeather, search]);

  return { status, data, cities, error, query, search, selectCity, retry };
}

function toMessage(err: unknown): string {
  if (err instanceof WeatherServiceError) return err.message;
  return 'Algo deu errado. Tente novamente.';
}
