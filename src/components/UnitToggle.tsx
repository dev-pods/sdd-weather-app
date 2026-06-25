import type { Unit } from '../types/weather';

interface UnitToggleProps {
  unit: Unit;
  onChange: (unit: Unit) => void;
}

/** Alternador de unidade Celsius/Fahrenheit, acessível por teclado. */
export default function UnitToggle({ unit, onChange }: UnitToggleProps) {
  return (
    <div
      role="group"
      aria-label="Unidade de temperatura"
      className="inline-flex rounded-lg border border-white/10 bg-white/5 p-1 backdrop-blur-md"
    >
      <button
        type="button"
        aria-pressed={unit === 'celsius'}
        onClick={() => onChange('celsius')}
        className={`rounded-md px-3 py-1 text-sm font-semibold transition ${
          unit === 'celsius' ? 'bg-accent-500 text-white' : 'text-white/60 hover:text-white'
        }`}
      >
        °C
      </button>
      <button
        type="button"
        aria-pressed={unit === 'fahrenheit'}
        onClick={() => onChange('fahrenheit')}
        className={`rounded-md px-3 py-1 text-sm font-semibold transition ${
          unit === 'fahrenheit' ? 'bg-accent-500 text-white' : 'text-white/60 hover:text-white'
        }`}
      >
        °F
      </button>
    </div>
  );
}
