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
      <p className="font-semibold">{getDayLabel(day.date, index)}</p>
      <p className="text-xs text-white/50">{getShortDate(day.date)}</p>
      <span aria-hidden="true" className="text-3xl" title={getWeatherLabel(day.weatherCode)}>
        {getWeatherIcon(day.weatherCode)}
      </span>
      <p className="text-sm">
        <span className="font-semibold">{formatTemperature(day.max, unit)}</span>{' '}
        <span className="text-white/50">{formatTemperature(day.min, unit)}</span>
      </p>
      <p className="text-xs text-accent-400">💧 {day.precipitationProbability}%</p>
    </li>
  );
}
