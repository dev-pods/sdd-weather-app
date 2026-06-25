import type { Unit } from '../types/weather';

/** Converte uma temperatura em Celsius para Fahrenheit. */
export function toFahrenheit(celsius: number): number {
  return celsius * (9 / 5) + 32;
}

/**
 * Converte um valor em Celsius para a unidade desejada, sem arredondar.
 * Mantém a função pura e testável.
 */
export function convertTemperature(celsius: number, unit: Unit): number {
  return unit === 'fahrenheit' ? toFahrenheit(celsius) : celsius;
}

/**
 * Formata uma temperatura (armazenada em Celsius) para exibição na unidade
 * escolhida, arredondando para inteiro e adicionando o símbolo de grau.
 */
export function formatTemperature(celsius: number, unit: Unit): string {
  const value = Math.round(convertTemperature(celsius, unit));
  return `${value}°`;
}

/** Rótulo curto da unidade atual (°C / °F). */
export function unitLabel(unit: Unit): string {
  return unit === 'fahrenheit' ? '°F' : '°C';
}
