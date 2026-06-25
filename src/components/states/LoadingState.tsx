/** Indicador de carregamento acessível. */
export default function LoadingState() {
  return (
    <div role="status" aria-live="polite" className="flex flex-col items-center gap-3 py-16">
      <span
        aria-hidden="true"
        className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-accent-500"
      />
      <p className="text-white/60">Carregando o clima…</p>
    </div>
  );
}
