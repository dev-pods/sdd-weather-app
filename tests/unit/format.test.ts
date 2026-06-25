import { describe, it, expect } from 'vitest';
import { getDayLabel, getShortDate } from '../../src/lib/format';

describe('format', () => {
  it('rotula o primeiro e o segundo dia', () => {
    expect(getDayLabel('2026-06-16', 0)).toBe('Hoje');
    expect(getDayLabel('2026-06-17', 1)).toBe('Amanhã');
  });

  it('usa dia da semana para os demais', () => {
    // 2026-06-18 é uma quinta-feira.
    expect(getDayLabel('2026-06-18', 2)).toBe('Qui');
  });

  it('formata data curta', () => {
    expect(getShortDate('2026-06-16')).toBe('16 Jun');
  });
});
