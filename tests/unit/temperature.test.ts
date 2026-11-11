import { describe, it, expect } from 'vitest';
import {
  toFahrenheit,
  convertTemperature,
  formatTemperature,
  unitLabel,
} from '../../src/lib/temperature';

describe('temperature', () => {
  it('converte Celsius para Fahrenheit corretamente', () => {
    expect(toFahrenheit(0)).toBe(32);
    expect(toFahrenheit(100)).toBe(212);
    expect(toFahrenheit(-40)).toBe(-40);
  });

  it('convertTemperature respeita a unidade', () => {
    expect(convertTemperature(20, 'celsius')).toBe(20);
    expect(convertTemperature(0, 'fahrenheit')).toBe(32);
    expect(convertTemperature(20.5, 'celsius')).toBe(20.5);
    expect(convertTemperature(20.5, 'fahrenheit')).toBeCloseTo(68.9);
  });

  it('formata com símbolo de grau e arredondamento', () => {
    expect(formatTemperature(20.4, 'celsius')).toBe('20°');
    expect(formatTemperature(20.6, 'celsius')).toBe('21°');
    expect(formatTemperature(0, 'fahrenheit')).toBe('32°');
    expect(formatTemperature(20.5, 'fahrenheit')).toBe('69°');
  });

  it('retorna o rótulo da unidade', () => {
    expect(unitLabel('celsius')).toBe('°C');
    expect(unitLabel('fahrenheit')).toBe('°F');
  });
});
