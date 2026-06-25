import type { ForecastDay, Unit } from '../types/weather';
import ForecastCard from './ForecastCard';

interface ForecastListProps {
  forecast: ForecastDay[];
  unit: Unit;
}

/** Grid responsivo com a previsão de 5 dias. */
export default function ForecastList({ forecast, unit }: ForecastListProps) {
  return (
    <section aria-label="Previsão de 5 dias">
      <h2 className="mb-4 text-xl font-bold">Previsão de 5 dias</h2>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {forecast.map((day, index) => (
          <ForecastCard key={day.date} day={day} index={index} unit={unit} />
        ))}
      </ul>
    </section>
  );
}
