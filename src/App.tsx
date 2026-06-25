import { useState } from 'react';
import type { Unit } from './types/weather';
import { useWeather } from './hooks/useWeather';
import SearchBar from './components/SearchBar';
import UnitToggle from './components/UnitToggle';
import CurrentWeather from './components/CurrentWeather';
import ForecastList from './components/ForecastList';
import LoadingState from './components/states/LoadingState';
import ErrorState from './components/states/ErrorState';
import EmptyState from './components/states/EmptyState';

/**
 * WeatherView — aplicação completa de previsão do tempo.
 *
 * Construída ao longo do treinamento de Spec-Driven Development com GitHub
 * Copilot, do briefing à entrega.
 */
export default function App() {
  const { status, data, error, query, search, retry } = useWeather();
  const [unit, setUnit] = useState<Unit>('celsius');

  return (
    <div className="min-h-screen text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span aria-hidden="true" className="text-2xl text-sun">
              ☀️
            </span>
            <span className="text-lg font-bold">WeatherView</span>
          </div>
          <div className="flex items-center gap-3">
            <SearchBar onSearch={search} disabled={status === 'loading'} />
            <UnitToggle unit={unit} onChange={setUnit} />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-8 px-4 py-8">
        {status === 'idle' && (
          <EmptyState
            title="Busque uma cidade para começar"
            hint="Ex.: Seattle, Lisboa, São Paulo…"
          />
        )}

        {status === 'loading' && <LoadingState />}

        {status === 'empty' && (
          <EmptyState
            title={`Nenhuma cidade encontrada para "${query}"`}
            hint="Verifique a grafia e tente novamente."
          />
        )}

        {status === 'error' && error && <ErrorState message={error} onRetry={retry} />}

        {status === 'success' && data && (
          <>
            <CurrentWeather city={data.city} current={data.current} unit={unit} />
            <ForecastList forecast={data.forecast} unit={unit} />
          </>
        )}
      </main>

      <footer className="py-8 text-center text-sm text-white/40">
        Dados por{' '}
        <a
          href="https://open-meteo.com/"
          target="_blank"
          rel="noreferrer"
          className="text-accent-400 hover:underline"
        >
          Open-Meteo
        </a>
      </footer>
    </div>
  );
}
