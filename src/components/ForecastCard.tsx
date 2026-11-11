import type { ForecastDay, Unit } from '../types/weather';
import { formatTemperature } from '../lib/temperature';
import { getWeatherIcon, getWeatherLabel } from '../lib/weatherCodes';
import { getDayLabel, getShortDate } from '../lib/format';

interface ForecastCardProps {
  day: ForecastDay;
  index: number;
  unit: Unit;
}

/** Card de um dia da previsão. */
export default function ForecastCard({ day, index, unit }: ForecastCardProps) {
  return (
    <li className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-md">
      <p className="font-semibold">{day.date ? getDayLabel(day.date, index) : '—'}</p>
      <p className="text-xs text-white/70">{day.date ? getShortDate(day.date) : '—'}</p>
      <span role="img" aria-label={getWeatherLabel(day.weatherCode)} className="text-3xl">
        {getWeatherIcon(day.weatherCode)}
      </span>
      <p className="text-sm">
        <span className="font-semibold">
          <span className="sr-only">Máxima: </span>
          {formatTemperature(day.max, unit)}
        </span>{' '}
        <span className="text-white/70">
          <span className="sr-only">Mínima: </span>
          {formatTemperature(day.min, unit)}
        </span>
      </p>
      <p className="text-xs text-accent-400">
        <span aria-hidden="true">💧 </span>
        <span className="sr-only">Probabilidade de chuva: </span>
        {typeof day.precipitationProbability === 'number' &&
        Number.isFinite(day.precipitationProbability)
          ? `${day.precipitationProbability}%`
          : '—'}
      </p>
    </li>
  );
}
