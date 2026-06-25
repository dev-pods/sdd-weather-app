import { useState, type FormEvent } from 'react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  disabled?: boolean;
}

/** Barra de busca de cidade. Bloqueia submit com input vazio. */
export default function SearchBar({ onSearch, disabled }: SearchBarProps) {
  const [value, setValue] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onSearch(trimmed);
  }

  return (
    <form role="search" onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-md focus-within:border-accent-500">
        <span aria-hidden="true" className="text-white/50">
          🔍
        </span>
        <label htmlFor="city-search" className="sr-only">
          Buscar cidade
        </label>
        <input
          id="city-search"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Buscar cidade…"
          autoComplete="off"
          className="flex-1 bg-transparent text-white placeholder-white/40 outline-none"
        />
        <button
          type="submit"
          disabled={disabled || !value.trim()}
          className="rounded-lg bg-accent-500 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Buscar
        </button>
      </div>
    </form>
  );
}
