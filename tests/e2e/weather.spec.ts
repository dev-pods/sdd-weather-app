import { test, expect, type Page } from '@playwright/test';

const geocoding = {
  results: [
    {
      id: 1,
      name: 'Seattle',
      country: 'Estados Unidos',
      admin1: 'Washington',
      latitude: 47.6,
      longitude: -122.33,
    },
  ],
};

const forecast = {
  current: {
    time: '2026-06-16T12:00',
    temperature_2m: 0,
    relative_humidity_2m: 80,
    wind_speed_10m: 10,
    surface_pressure: 1015,
    precipitation: 0,
    weather_code: 3,
  },
  daily: {
    time: ['2026-06-16', '2026-06-17', '2026-06-18', '2026-06-19', '2026-06-20'],
    weather_code: [3, 61, 80, 1, 0],
    temperature_2m_max: [20, 19, 22, 24, 25],
    temperature_2m_min: [12, 11, 13, 14, 15],
    precipitation_probability_max: [20, 90, 70, 10, 0],
  },
};

async function mockApis(page: Page) {
  await page.route('**/geocoding-api.open-meteo.com/**', (route) =>
    route.fulfill({ json: geocoding }),
  );
  await page.route('**/api.open-meteo.com/**', (route) => route.fulfill({ json: forecast }));
}

test('fluxo completo: buscar → clima atual → previsão → trocar unidade', async ({ page }) => {
  await mockApis(page);
  await page.goto('/');

  await page.getByLabel(/buscar cidade/i).fill('Seattle');
  await page.getByRole('button', { name: /buscar/i }).click();

  await expect(page.getByRole('heading', { name: 'Seattle' })).toBeVisible();
  await expect(page.getByRole('region', { name: /previsão de 5 dias/i })).toBeVisible();

  // 0°C exibido; após trocar para °F deve virar 32°.
  await expect(page.getByText('0°').first()).toBeVisible();
  await page.getByRole('button', { name: '°F' }).click();
  await expect(page.getByText('32°').first()).toBeVisible();
});

test('estado vazio quando a cidade não existe', async ({ page }) => {
  await page.route('**/geocoding-api.open-meteo.com/**', (route) => route.fulfill({ json: {} }));
  await page.goto('/');

  await page.getByLabel(/buscar cidade/i).fill('xyzxyz');
  await page.getByRole('button', { name: /buscar/i }).click();

  await expect(page.getByText(/nenhuma cidade encontrada/i)).toBeVisible();
});

test('viewport mobile renderiza o fluxo principal', async ({ page }) => {
  await mockApis(page);
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');

  await page.getByLabel(/buscar cidade/i).fill('Seattle');
  await page.getByRole('button', { name: /buscar/i }).click();
  await expect(page.getByRole('heading', { name: 'Seattle' })).toBeVisible();
});
