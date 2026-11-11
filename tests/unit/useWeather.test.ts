import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useWeather } from '../../src/hooks/useWeather';
import { getWeather, searchCities, WeatherServiceError } from '../../src/services/weatherService';
import type { City, WeatherData } from '../../src/types/weather';

vi.mock('../../src/services/weatherService', async (importOriginal) => ({
  ...(await importOriginal<typeof import('../../src/services/weatherService')>()),
  getWeather: vi.fn(),
  searchCities: vi.fn(),
}));

const city: City = {
  id: 1,
  name: 'Seattle',
  country: 'Estados Unidos',
  latitude: 47.6,
  longitude: -122.33,
};

const weather: WeatherData = {
  city,
  current: {
    time: '2026-06-16T12:00',
    temperature: 18,
    weatherCode: 3,
    humidity: 80,
    windSpeed: 10,
    pressure: 1015,
    precipitation: 0,
  },
  forecast: [],
};

describe('useWeather', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('busca cidades e carrega o clima da primeira', async () => {
    let resolveSearch: (cities: City[]) => void = () => {};
    const pendingSearch = new Promise<City[]>((resolve) => {
      resolveSearch = resolve;
    });
    vi.mocked(searchCities).mockReturnValue(pendingSearch);
    vi.mocked(getWeather).mockResolvedValue(weather);
    const { result } = renderHook(() => useWeather());

    expect(result.current.status).toBe('idle');
    let search: Promise<void> = Promise.resolve();
    act(() => {
      search = result.current.search(' Seattle ');
    });
    expect(result.current.status).toBe('loading');
    await act(async () => {
      resolveSearch([city]);
      await search;
    });

    expect(searchCities).toHaveBeenCalledWith('Seattle');
    expect(getWeather).toHaveBeenCalledWith(city);
    expect(result.current).toMatchObject({
      status: 'success',
      query: 'Seattle',
      cities: [city],
      data: weather,
      error: null,
    });
  });

  it('exibe estado vazio quando não encontra cidades', async () => {
    vi.mocked(searchCities).mockResolvedValue([]);
    const { result } = renderHook(() => useWeather());

    await act(async () => result.current.search('Lisboa'));
    expect(result.current.status).toBe('empty');
    expect(result.current.cities).toEqual([]);
    expect(getWeather).not.toHaveBeenCalled();
  });

  it('repete o carregamento da cidade selecionada após erro', async () => {
    vi.mocked(getWeather)
      .mockRejectedValueOnce(new WeatherServiceError('Falha de rede.'))
      .mockResolvedValueOnce(weather);
    const { result } = renderHook(() => useWeather());

    await act(async () => result.current.selectCity(city));
    expect(result.current.status).toBe('error');
    expect(result.current.error).toBe('Falha de rede.');
    await act(async () => result.current.retry());
    expect(getWeather).toHaveBeenCalledTimes(2);
    expect(getWeather).toHaveBeenLastCalledWith(city);
    expect(result.current.status).toBe('success');
    expect(result.current.data).toEqual(weather);
    expect(result.current.error).toBeNull();
  });

  it('repete a busca mais recente quando o geocoding falha após uma busca anterior', async () => {
    vi.mocked(searchCities)
      .mockResolvedValueOnce([city])
      .mockRejectedValueOnce(new WeatherServiceError('Falha de rede.'))
      .mockResolvedValueOnce([]);
    vi.mocked(getWeather).mockResolvedValue(weather);
    const { result } = renderHook(() => useWeather());

    await act(async () => result.current.search('Seattle'));
    await act(async () => result.current.search('Lisboa'));
    expect(result.current.status).toBe('error');

    await act(async () => result.current.retry());
    expect(searchCities).toHaveBeenLastCalledWith('Lisboa');
    expect(searchCities).toHaveBeenCalledTimes(3);
    expect(getWeather).toHaveBeenCalledTimes(1);
    expect(result.current.status).toBe('empty');
  });

  it('ignora falha de busca antiga após uma busca mais recente', async () => {
    let rejectOldSearch: (error: Error) => void = () => {};
    vi.mocked(searchCities)
      .mockReturnValueOnce(
        new Promise((_resolve, reject) => {
          rejectOldSearch = reject;
        }),
      )
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([]);
    const { result } = renderHook(() => useWeather());
    let oldSearch: Promise<void> = Promise.resolve();

    act(() => {
      oldSearch = result.current.search('Seattle');
    });
    await act(async () => result.current.search('Lisboa'));
    await act(async () => {
      rejectOldSearch(new WeatherServiceError('Falha de rede.'));
      await oldSearch;
    });

    expect(result.current.status).toBe('empty');
    expect(result.current.error).toBeNull();
    await act(async () => result.current.retry());
    expect(searchCities).toHaveBeenLastCalledWith('Lisboa');
  });

  it('ignora falha de forecast antiga e repete a cidade mais recente', async () => {
    const newCity: City = { ...city, id: 2, name: 'Lisboa', country: 'Portugal' };
    const newWeather: WeatherData = { ...weather, city: newCity };
    let rejectOldForecast: (error: Error) => void = () => {};
    vi.mocked(getWeather)
      .mockReturnValueOnce(
        new Promise((_resolve, reject) => {
          rejectOldForecast = reject;
        }),
      )
      .mockResolvedValueOnce(newWeather)
      .mockResolvedValueOnce(newWeather);
    const { result } = renderHook(() => useWeather());
    let oldSelection: Promise<void> = Promise.resolve();

    act(() => {
      oldSelection = result.current.selectCity(city);
    });
    await act(async () => result.current.selectCity(newCity));
    await act(async () => {
      rejectOldForecast(new WeatherServiceError('Falha de rede.'));
      await oldSelection;
    });

    expect(result.current.status).toBe('success');
    expect(result.current.data).toEqual(newWeather);
    expect(result.current.error).toBeNull();
    await act(async () => result.current.retry());
    expect(getWeather).toHaveBeenLastCalledWith(newCity);
  });
});
