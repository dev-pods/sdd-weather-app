import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, it, expect, vi } from 'vitest';
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
    expect(screen.getByRole('button', { name: /buscar/i })).toBeDisabled();
    resolveSearch([city]);

    expect(await screen.findByRole('heading', { name: 'Seattle' })).toBeInTheDocument();
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
