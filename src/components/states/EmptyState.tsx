interface EmptyStateProps {
  title: string;
  hint?: string;
}

/** Estado vazio (nenhuma busca feita ou nenhum resultado). */
export default function EmptyState({ title, hint }: EmptyStateProps) {
  return (
    <div role="status" className="flex flex-col items-center gap-2 break-words py-16 text-center">
      <span aria-hidden="true" className="text-4xl">
        🌍
      </span>
      <p className="text-white/80">{title}</p>
      {hint && <p className="text-sm text-white/70">{hint}</p>}
    </div>
  );
}
