import { describe, it, expect } from 'vitest';
import { getWeatherInfo, getWeatherLabel, getWeatherIcon } from '../../src/lib/weatherCodes';

describe('weatherCodes', () => {
  it('mapeia códigos conhecidos', () => {
    expect(getWeatherLabel(0)).toBe('Céu limpo');
    expect(getWeatherIcon(95)).toBe('⛈️');
  });

  it('usa fallback para código desconhecido', () => {
    const info = getWeatherInfo(123456);
    expect(info.label).toBe('Condição desconhecida');
    expect(info.icon).toBeTruthy();
  });
});
