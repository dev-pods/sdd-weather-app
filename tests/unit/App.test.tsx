import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest';
import App from '../../src/App';
import ForecastList from '../../src/components/ForecastList';
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
    temperature: 0,
    weatherCode: 3,
    humidity: 80,
    windSpeed: 10,
    pressure: 1015,
    precipitation: 0,
  },
  forecast: [
    { date: '2026-06-16', min: 10, max: 20, weatherCode: 61, precipitationProbability: 75 },
  ],
};

describe('App', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renderiza a marca e o estado inicial vazio', () => {
    render(<App />);
    expect(screen.getByText('WeatherView')).toBeInTheDocument();
    expect(screen.getByText(/busque uma cidade para começar/i)).toBeInTheDocument();
  });

  it('mostra a barra de busca e o alternador de unidade', () => {
    render(<App />);
    expect(screen.getByLabelText(/buscar cidade/i)).toBeInTheDocument();
    expect(screen.getByRole('group', { name: /unidade de temperatura/i })).toBeInTheDocument();
  });

  it('mostra carregamento e resultado, convertendo as temperaturas sem nova busca', async () => {
    let resolveSearch: (cities: City[]) => void = () => {};
    vi.mocked(searchCities).mockReturnValue(
      new Promise((resolve) => {
        resolveSearch = resolve;
      }),
    );
    vi.mocked(getWeather).mockResolvedValue(weather);
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText(/buscar cidade/i), 'Seattle');
    await user.click(screen.getByRole('button', { name: /buscar/i }));
    expect(screen.getByText(/carregando o clima/i)).toBeInTheDocument();
    expect(screen.getByRole('main')).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByText('Buscando previsão do tempo.')).toHaveAttribute('role', 'status');
    expect(screen.getByRole('button', { name: /buscar/i })).toBeDisabled();
    resolveSearch([city]);

    expect(await screen.findByRole('heading', { name: 'Seattle' })).toBeInTheDocument();
    expect(screen.getByRole('main')).toHaveAttribute('aria-busy', 'false');
    expect(screen.getByText('Previsão de Seattle carregada.')).toHaveAttribute('role', 'status');
    expect(screen.getByText('0°')).toBeInTheDocument();
    expect(screen.getByText(/Máxima:/).parentElement).toHaveTextContent('20°');
    expect(screen.getByText(/Mínima:/).parentElement).toHaveTextContent('10°');
    await user.click(screen.getByRole('button', { name: '°F' }));
    expect(screen.getByText('32°')).toBeInTheDocument();
    expect(screen.getByText(/Máxima:/).parentElement).toHaveTextContent('68°');
    expect(screen.getByText(/Mínima:/).parentElement).toHaveTextContent('50°');
    await user.click(screen.getByRole('button', { name: '°C' }));
    expect(screen.getByText('0°')).toBeInTheDocument();
    expect(screen.getByText(/Máxima:/).parentElement).toHaveTextContent('20°');
    expect(screen.getByText(/Mínima:/).parentElement).toHaveTextContent('10°');
    expect(searchCities).toHaveBeenCalledTimes(1);
    expect(getWeather).toHaveBeenCalledTimes(1);
  });

  it('mostra erro e repete a busca ao tentar novamente', async () => {
    vi.mocked(searchCities)
      .mockRejectedValueOnce(new WeatherServiceError('Falha de rede.'))
      .mockResolvedValueOnce([]);
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText(/buscar cidade/i), 'Lisboa');
    await user.click(screen.getByRole('button', { name: /buscar/i }));
    expect(await screen.findByRole('alert')).toHaveTextContent('Falha de rede.');
    await user.click(screen.getByRole('button', { name: /tentar novamente/i }));
    expect(await screen.findByText('Nenhuma cidade encontrada para "Lisboa"')).toBeInTheDocument();
    expect(searchCities).toHaveBeenCalledTimes(2);
    expect(searchCities).toHaveBeenLastCalledWith('Lisboa');
  });

  it('mantém o foco no controle escolhido enquanto os resultados carregam', async () => {
    let resolveSearch: (cities: City[]) => void = () => {};
    vi.mocked(searchCities).mockReturnValue(
      new Promise((resolve) => {
        resolveSearch = resolve;
      }),
    );
    vi.mocked(getWeather).mockResolvedValue(weather);
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText(/buscar cidade/i), 'Seattle');
    await user.click(screen.getByRole('button', { name: /buscar/i }));
    const fahrenheit = screen.getByRole('button', { name: '°F' });
    await user.click(fahrenheit);
    expect(fahrenheit).toHaveFocus();
    resolveSearch([city]);

    expect(await screen.findByRole('heading', { name: 'Seattle' })).toBeInTheDocument();
    expect(fahrenheit).toHaveFocus();
    expect(screen.getByText('32°')).toBeInTheDocument();
  });

  it('permite recuperar após falha do forecast sem repetir o geocoding', async () => {
    vi.mocked(searchCities).mockResolvedValue([city]);
    vi.mocked(getWeather)
      .mockRejectedValueOnce(new WeatherServiceError('Não foi possível carregar o clima.'))
      .mockResolvedValueOnce(weather);
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText(/buscar cidade/i), 'Seattle');
    await user.click(screen.getByRole('button', { name: /buscar/i }));
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Não foi possível carregar o clima.',
    );
    await user.click(screen.getByRole('button', { name: /tentar novamente/i }));
    expect(await screen.findByRole('heading', { name: 'Seattle' })).toBeInTheDocument();
    expect(searchCities).toHaveBeenCalledTimes(1);
    expect(getWeather).toHaveBeenCalledTimes(2);
  });

  it('mostra erro recuperável quando a requisição expira', async () => {
    vi.mocked(searchCities).mockRejectedValue(
      new WeatherServiceError('A requisição demorou demais.'),
    );
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText(/buscar cidade/i), 'Seattle');
    await user.click(screen.getByRole('button', { name: /buscar/i }));
    expect(await screen.findByRole('alert')).toHaveTextContent('A requisição demorou demais.');
    expect(screen.getByRole('button', { name: /tentar novamente/i })).toBeEnabled();
    expect(screen.queryByText(/carregando o clima/i)).not.toBeInTheDocument();
  });

  it('exibe fallbacks para campos ausentes sem converter temperaturas nulas', async () => {
    vi.mocked(searchCities).mockResolvedValue([city]);
    vi.mocked(getWeather).mockResolvedValue({
      city,
      current: {
        time: null,
        temperature: null,
        humidity: null,
        windSpeed: null,
        pressure: null,
        precipitation: null,
        weatherCode: null,
      },
      forecast: [
        { date: null, min: null, max: null, weatherCode: null, precipitationProbability: 0 },
      ],
    });
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText(/buscar cidade/i), 'Seattle');
    await user.click(screen.getByRole('button', { name: /buscar/i }));
    const currentRegion = await screen.findByRole('region', { name: /clima atual/i });
    const forecastRegion = screen.getByRole('region', { name: /previsão de 5 dias/i });
    expect(within(currentRegion).getAllByText('—')).toHaveLength(5);
    expect(within(currentRegion).getByText('Condição desconhecida')).toBeInTheDocument();
    expect(within(forecastRegion).getAllByText('—')).toHaveLength(4);
    expect(forecastRegion).toHaveTextContent('0%');
    await user.click(screen.getByRole('button', { name: '°F' }));
    expect(within(currentRegion).getAllByText('—')).toHaveLength(5);
    expect(currentRegion).not.toHaveTextContent(/NaN|undefined|null|32°/);
    expect(forecastRegion).not.toHaveTextContent(/NaN|undefined|null/);
  });

  it('integra busca com caracteres especiais e forecast parcial sem valores inválidos', async () => {
    const service = await vi.importActual<typeof import('../../src/services/weatherService')>(
      '../../src/services/weatherService',
    );
    vi.mocked(searchCities).mockImplementation(service.searchCities);
    vi.mocked(getWeather).mockImplementation(service.getWeather);
    const fetchSpy = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ results: [{ ...city, name: 'São Paulo & região' }] }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          current: { temperature_2m: null, weather_code: null },
          daily: { time: ['2026-06-16'], temperature_2m_max: [null] },
        }),
      });
    vi.stubGlobal('fetch', fetchSpy);
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText(/buscar cidade/i), ' São Paulo & região ');
    await user.click(screen.getByRole('button', { name: /buscar/i }));
    expect(await screen.findByRole('heading', { name: 'São Paulo & região' })).toBeInTheDocument();
    expect(new URL(fetchSpy.mock.calls[0][0] as string).searchParams.get('name')).toBe(
      'São Paulo & região',
    );
    const currentRegion = screen.getByRole('region', { name: /clima atual/i });
    const forecastRegion = screen.getByRole('region', { name: /previsão de 5 dias/i });
    expect(within(currentRegion).getAllByText('—')).toHaveLength(5);
    expect(within(forecastRegion).getAllByRole('listitem')).toHaveLength(5);
    await user.click(screen.getByRole('button', { name: '°F' }));
    expect(currentRegion).not.toHaveTextContent(/NaN|undefined|null|32°/);
    expect(forecastRegion).not.toHaveTextContent(/NaN|undefined|null/);
    expect(fetchSpy).toHaveBeenCalledTimes(2);
  });
});

describe('ForecastList', () => {
  it('identifica a condição, as temperaturas e a probabilidade de chuva', () => {
    render(
      <ForecastList
        forecast={[
          { date: '2026-06-16', min: 10, max: 20, weatherCode: 61, precipitationProbability: 75 },
        ]}
        unit="fahrenheit"
      />,
    );

    expect(screen.getByRole('img', { name: 'Chuva fraca' })).toBeInTheDocument();
    expect(screen.getByText(/Máxima:/).parentElement).toHaveTextContent('68°');
    expect(screen.getByText(/Mínima:/).parentElement).toHaveTextContent('50°');
    expect(screen.getByText(/Probabilidade de chuva:/).parentElement).toHaveTextContent('75%');
  });
});
