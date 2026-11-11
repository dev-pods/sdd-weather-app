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
    it('mantém o timeout durante a leitura da resposta', async () => {
      vi.useFakeTimers();
      vi.stubGlobal(
        'fetch',
        vi.fn(async (_url: string, options: RequestInit) => ({
          ok: true,
          json: () =>
            new Promise((_resolve, reject) => {
              options.signal?.addEventListener('abort', () =>
                reject(new DOMException('Aborted', 'AbortError')),
              );
            }),
        })),
      );

      const request = searchCities('Seattle');
      const assertion = expect(request).rejects.toMatchObject({
        name: 'WeatherServiceError',
        message: 'A requisição demorou demais.',
      });
      await vi.advanceTimersByTimeAsync(0);
      expect(vi.getTimerCount()).toBe(1);
      await vi.advanceTimersByTimeAsync(10_000);
      await assertion;
      expect(vi.getTimerCount()).toBe(0);
    });

    it.each([
      { name: 'geocoding', operation: () => searchCities('Seattle') },
      { name: 'forecast', operation: () => getWeather(CITY) },
    ])('informa falha de rede offline em $name', async ({ operation }) => {
      vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')));
      const request = operation();
      await expect(request).rejects.toBeInstanceOf(WeatherServiceError);
      await expect(request).rejects.toMatchObject({ message: 'Falha de rede.' });
    });

    it('retorna erro amigável quando a resposta não contém JSON válido', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({ ok: true, json: vi.fn().mockRejectedValue(new SyntaxError()) }),
      );
      await expect(searchCities('Seattle')).rejects.toMatchObject({
        name: 'WeatherServiceError',
        message: 'Resposta inválida. Tente novamente.',
      });
    });

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
    it.each([
      '',
      '   ',
    ])('retorna lista vazia para input vazio sem chamar a rede', async (query) => {
      const fetchSpy = vi.fn();
      vi.stubGlobal('fetch', fetchSpy);
      const result = await searchCities(query);
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

    it('retorna resultados ao buscar nome com acentos e caracteres especiais', async () => {
      const fetchSpy = mockFetchOnce({ results: [{ ...CITY, name: 'São Paulo & região' }] });
      vi.stubGlobal('fetch', fetchSpy);

      expect(await searchCities(' São Paulo & região ')).toEqual([
        { ...CITY, name: 'São Paulo & região' },
      ]);
      const requestUrl = new URL(fetchSpy.mock.calls[0][0] as string);
      expect(requestUrl.searchParams.get('name')).toBe('São Paulo & região');
    });

    it('retorna vazio quando não há results', async () => {
      vi.stubGlobal('fetch', mockFetchOnce({}));
      expect(await searchCities('xyzxyz')).toEqual([]);
    });

    it('usa fallback para localização sem nome ou região e preserva coordenadas zero', async () => {
      vi.stubGlobal(
        'fetch',
        mockFetchOnce({
          results: [{ id: 0, name: null, country: null, admin1: null, latitude: 0, longitude: 0 }],
        }),
      );
      expect(await searchCities('local')).toEqual([
        {
          id: 0,
          name: 'Local desconhecido',
          country: '',
          admin1: undefined,
          latitude: 0,
          longitude: 0,
        },
      ]);
    });

    it.each([
      null,
      { results: [null] },
      { results: [{ id: 1, name: 'Seattle', latitude: null, longitude: -122.33 }] },
      { results: [{ id: null, name: 'Seattle', latitude: 47.6, longitude: -122.33 }] },
    ])('lança erro tipado quando a localização não é utilizável', async (response) => {
      vi.stubGlobal('fetch', mockFetchOnce(response));
      await expect(searchCities('Seattle')).rejects.toBeInstanceOf(WeatherServiceError);
    });

    it('lança erro tipado em resposta não-ok', async () => {
      vi.stubGlobal('fetch', mockFetchOnce({}, false));
      await expect(searchCities('Seattle')).rejects.toBeInstanceOf(WeatherServiceError);
    });
  });

  describe('getWeather', () => {
    it('preserva zeros e normaliza campos ausentes ou nulos em respostas parciais', async () => {
      vi.stubGlobal(
        'fetch',
        mockFetchOnce({
          current: { temperature_2m: 0, weather_code: null, relative_humidity_2m: null },
          daily: {
            time: ['2026-06-16', '2026-06-17', '2026-06-18', '2026-06-19', '2026-06-20'],
            weather_code: [null, 0],
            temperature_2m_min: [null, 0],
            precipitation_probability_max: [null, 0],
          },
        }),
      );

      const data = await getWeather(CITY);
      expect(data.current).toEqual({
        time: null,
        temperature: 0,
        humidity: null,
        windSpeed: null,
        pressure: null,
        precipitation: null,
        weatherCode: null,
      });
      expect(data.forecast).toHaveLength(5);
      expect(data.forecast[0]).toEqual({
        date: '2026-06-16',
        weatherCode: null,
        max: null,
        min: null,
        precipitationProbability: 0,
      });
      expect(data.forecast[1]).toEqual({
        date: '2026-06-17',
        weatherCode: 0,
        max: null,
        min: 0,
        precipitationProbability: 0,
      });
    });

    it('produz cinco fallbacks quando os arrays diários estão ausentes', async () => {
      vi.stubGlobal('fetch', mockFetchOnce({ current: {}, daily: {} }));
      const data = await getWeather(CITY);
      expect(data.forecast).toEqual(
        Array.from({ length: 5 }, () => ({
          date: null,
          weatherCode: null,
          max: null,
          min: null,
          precipitationProbability: 0,
        })),
      );
    });

    it('normaliza datas inválidas e números não finitos', async () => {
      vi.stubGlobal(
        'fetch',
        mockFetchOnce({
          current: { temperature_2m: NaN, wind_speed_10m: Infinity },
          daily: {
            time: [null, '2026-99-99'],
            weather_code: [NaN],
            temperature_2m_max: [Infinity],
            temperature_2m_min: [NaN],
            precipitation_probability_max: [NaN],
          },
        }),
      );
      const data = await getWeather(CITY);
      expect(data.current.temperature).toBeNull();
      expect(data.current.windSpeed).toBeNull();
      expect(data.forecast[0]).toEqual({
        date: null,
        weatherCode: null,
        max: null,
        min: null,
        precipitationProbability: 0,
      });
      expect(data.forecast[1].date).toBeNull();
    });

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
      null,
    ])('lança erro quando a resposta está incompleta', async (response) => {
      vi.stubGlobal('fetch', mockFetchOnce(response));
      await expect(getWeather(CITY)).rejects.toBeInstanceOf(WeatherServiceError);
    });
  });
});
