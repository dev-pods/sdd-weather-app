/**
 * Funções puras de formatação de datas para a previsão.
 */

const WEEKDAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const MONTHS = [
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dez',
];

/** Faz parse de uma data ISO (YYYY-MM-DD) como data local, sem fuso. */
function parseLocalDate(iso: string): Date {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, (month ?? 1) - 1, day ?? 1);
}

/**
 * Rótulo do dia relativo a "hoje":
 * - índice 0 → "Hoje"
 * - índice 1 → "Amanhã"
 * - demais → dia da semana abreviado
 */
export function getDayLabel(iso: string, index: number): string {
  if (index === 0) return 'Hoje';
  if (index === 1) return 'Amanhã';
  const date = parseLocalDate(iso);
  return WEEKDAYS[date.getDay()];
}

/** Formata a data como "12 Jun". */
export function getShortDate(iso: string): string {
  const date = parseLocalDate(iso);
  return `${date.getDate()} ${MONTHS[date.getMonth()]}`;
}
