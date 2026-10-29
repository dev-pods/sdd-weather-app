import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { searchCities, getWeather, WeatherServiceError } from '../../src/services/weatherService';
import type { City } from '../../src/types/weather';

const CITY: City = {
  id: 1,
  name: 'Seattle',
  country: 'Estados Unidos',
  admin1: 'Washington',
  latitude: 47.6,
  longitude: -122.33,
};

function mockFetchOnce(body: unknown, ok = true) {
  return vi.fn().mockResolvedValue({
    ok,
    json: async () => body,
  } as Response);
}

describe('weatherService', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  describe('fetchWithTimeout', () => {
    it('cancela a requisição após 10 segundos e limpa o temporizador', async () => {
      vi.useFakeTimers();
      let signal: AbortSignal | undefined;
      vi.stubGlobal(
        'fetch',
        vi.fn((_url: string, options: RequestInit) => {
          signal = options.signal ?? undefined;
          return new Promise((_resolve, reject) => {
            signal?.addEventListener('abort', () =>
              reject(new DOMException('Aborted', 'AbortError')),
            );
          });
        }),
      );

      const request = searchCities('Seattle');
      const assertion = expect(request).rejects.toMatchObject({
        name: 'WeatherServiceError',
        message: 'A requisição demorou demais.',
      });
      await vi.advanceTimersByTimeAsync(9_999);
      expect(signal?.aborted).toBe(false);
      await vi.advanceTimersByTimeAsync(1);
      expect(signal?.aborted).toBe(true);
      await assertion;
      await expect(request).rejects.toBeInstanceOf(WeatherServiceError);
      expect(vi.getTimerCount()).toBe(0);
    });

    it.each([
      {
        error: Object.assign(new Error('aborted'), { name: 'AbortError' }),
        message: 'A requisição demorou demais.',
      },
      { error: new TypeError('network'), message: 'Falha de rede.' },
    ])('converte erros e limpa o temporizador', async ({ error, message }) => {
      vi.useFakeTimers();
      vi.stubGlobal('fetch', vi.fn().mockRejectedValue(error));

      const request = searchCities('Seattle');
      await expect(request).rejects.toBeInstanceOf(WeatherServiceError);
      await expect(request).rejects.toMatchObject({ name: 'WeatherServiceError', message });
      expect(vi.getTimerCount()).toBe(0);
    });

    it('limpa o temporizador após uma resposta bem-sucedida', async () => {
      vi.useFakeTimers();
      vi.stubGlobal('fetch', mockFetchOnce({ results: [] }));

      await expect(searchCities('Seattle')).resolves.toEqual([]);
      expect(vi.getTimerCount()).toBe(0);
    });
  });

  describe('searchCities', () => {
    it('retorna lista vazia para input vazio sem chamar a rede', async () => {
      const fetchSpy = vi.fn();
      vi.stubGlobal('fetch', fetchSpy);
      const result = await searchCities('   ');
      expect(result).toEqual([]);
      expect(fetchSpy).not.toHaveBeenCalled();
    });

    it('mapeia resultados de geocoding', async () => {
      vi.stubGlobal(
        'fetch',
        mockFetchOnce({
          results: [
            {
              id: 1,
              name: 'Seattle',
              country: 'Estados Unidos',
              admin1: 'Washington',
              latitude: 47.6,
              longitude: -122.33,
            },
          ],
        }),
      );
      const result = await searchCities('Seattle');
      expect(result).toEqual([CITY]);
    });

    it('codifica o nome ao montar a URL de geocoding', async () => {
      const fetchSpy = mockFetchOnce({ results: [] });
      vi.stubGlobal('fetch', fetchSpy);

      await searchCities(' São Paulo & região ');

      expect(fetchSpy).toHaveBeenCalledWith(
        'https://geocoding-api.open-meteo.com/v1/search?name=S%C3%A3o%20Paulo%20%26%20regi%C3%A3o&count=5&language=pt&format=json',
        expect.objectContaining({ signal: expect.any(AbortSignal) }),
      );
    });

    it('retorna vazio quando não há results', async () => {
      vi.stubGlobal('fetch', mockFetchOnce({}));
      expect(await searchCities('xyzxyz')).toEqual([]);
    });

    it('lança erro tipado em resposta não-ok', async () => {
      vi.stubGlobal('fetch', mockFetchOnce({}, false));
      await expect(searchCities('Seattle')).rejects.toBeInstanceOf(WeatherServiceError);
    });
  });

  describe('getWeather', () => {
    it('lança erro tipado quando a API de forecast responde com erro', async () => {
      vi.stubGlobal('fetch', mockFetchOnce({}, false));
      await expect(getWeather(CITY)).rejects.toBeInstanceOf(WeatherServiceError);
    });

    it('mapeia current e daily para WeatherData', async () => {
      vi.stubGlobal(
        'fetch',
        mockFetchOnce({
          current: {
            time: '2026-06-16T12:00',
            temperature_2m: 18,
            relative_humidity_2m: 80,
            wind_speed_10m: 10,
            surface_pressure: 1015,
            precipitation: 0,
            weather_code: 3,
          },
          daily: {
            time: [
              '2026-06-16',
              '2026-06-17',
              '2026-06-18',
              '2026-06-19',
              '2026-06-20',
              '2026-06-21',
            ],
            weather_code: [3, 61, 80, 1, 0, 3],
            temperature_2m_max: [20, 19, 22, 24, 25, 26],
            temperature_2m_min: [12, 11, 13, 14, 15, 16],
            precipitation_probability_max: [20, 90, 70, 10, null, 30],
          },
        }),
      );

      const data = await getWeather(CITY);
      expect(data.city).toEqual(CITY);
      expect(data.current).toEqual({
        time: '2026-06-16T12:00',
        temperature: 18,
        humidity: 80,
        windSpeed: 10,
        pressure: 1015,
        precipitation: 0,
        weatherCode: 3,
      });
      expect(data.forecast).toEqual([
        { date: '2026-06-16', weatherCode: 3, max: 20, min: 12, precipitationProbability: 20 },
        { date: '2026-06-17', weatherCode: 61, max: 19, min: 11, precipitationProbability: 90 },
        { date: '2026-06-18', weatherCode: 80, max: 22, min: 13, precipitationProbability: 70 },
        { date: '2026-06-19', weatherCode: 1, max: 24, min: 14, precipitationProbability: 10 },
        { date: '2026-06-20', weatherCode: 0, max: 25, min: 15, precipitationProbability: 0 },
      ]);
    });

    it.each([
      { daily: {} },
      { current: {} },
      { current: null, daily: {} },
      { current: {}, daily: null },
      {
        current: {},
        daily: {
          time: ['2026-06-16', '2026-06-17', '2026-06-18', '2026-06-19', '2026-06-20'],
          weather_code: [3, 61, 80, 1, 0],
          temperature_2m_min: [12, 11, 13, 14, 15],
          precipitation_probability_max: [20, 90, 70, 10, 0],
        },
      },
      {
        current: {},
        daily: {
          time: ['2026-06-16'],
          weather_code: [3],
          temperature_2m_max: [20],
          temperature_2m_min: [12],
          precipitation_probability_max: [20],
        },
      },
      {
        current: {},
        daily: {
          time: ['2026-06-16', '2026-06-17', '2026-06-18', '2026-06-19', '2026-06-20'],
          weather_code: [3, 61, 80, 1, 0],
          temperature_2m_max: [20, 19, 22, 24],
          temperature_2m_min: [12, 11, 13, 14, 15],
          precipitation_probability_max: [20, 90, 70, 10, 0],
        },
      },
    ])('lança erro quando a resposta está incompleta', async (response) => {
      vi.stubGlobal('fetch', mockFetchOnce(response));
      await expect(getWeather(CITY)).rejects.toBeInstanceOf(WeatherServiceError);
    });
  });
});
