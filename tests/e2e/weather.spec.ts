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

test('busca com caracteres especiais apresenta o resultado correto', async ({ page }) => {
  await page.route('**/geocoding-api.open-meteo.com/**', (route) =>
    route.fulfill({ json: { results: [{ ...geocoding.results[0], name: 'São Paulo & região' }] } }),
  );
  await page.route('**/api.open-meteo.com/**', (route) => route.fulfill({ json: forecast }));
  await page.goto('/');

  const geocodingRequest = page.waitForRequest('**/geocoding-api.open-meteo.com/**');
  await page.getByLabel(/buscar cidade/i).fill(' São Paulo & região ');
  await page.getByRole('button', { name: /buscar/i }).click();
  const request = await geocodingRequest;
  expect(new URL(request.url()).searchParams.get('name')).toBe('São Paulo & região');
  await expect(page.getByRole('heading', { name: 'São Paulo & região' })).toBeVisible();
});

test('forecast parcial exibe fallbacks sem valores inválidos', async ({ page }) => {
  await page.route('**/geocoding-api.open-meteo.com/**', (route) =>
    route.fulfill({ json: geocoding }),
  );
  await page.route('**/api.open-meteo.com/**', (route) =>
    route.fulfill({
      json: {
        current: { temperature_2m: null, weather_code: null, wind_speed_10m: 0 },
        daily: { time: ['2026-06-16'], temperature_2m_max: [null] },
      },
    }),
  );
  await page.goto('/');

  await page.getByLabel(/buscar cidade/i).fill('Seattle');
  await page.getByRole('button', { name: /buscar/i }).click();
  const currentWeather = page.getByRole('region', { name: /clima atual/i });
  const forecastRegion = page.getByRole('region', { name: /previsão de 5 dias/i });
  await expect(currentWeather.getByRole('heading', { name: 'Seattle' })).toBeVisible();
  await expect(currentWeather).toContainText('—');
  await expect(currentWeather).toContainText('Condição desconhecida');
  await expect(forecastRegion.getByRole('listitem')).toHaveCount(5);
  await expect(forecastRegion.getByRole('listitem').first()).toContainText('—');
  await page.getByRole('button', { name: '°F' }).click();
  await expect(currentWeather).not.toContainText(/NaN|undefined|null|32°/);
  await expect(forecastRegion).not.toContainText(/NaN|undefined|null/);
});

test('viewport mobile renderiza o fluxo principal', async ({ page }) => {
  await mockApis(page);
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');

  await page.getByLabel(/buscar cidade/i).fill('Seattle');
  await page.getByRole('button', { name: /buscar/i }).click();
  const currentWeather = page.getByRole('region', { name: /clima atual/i });
  await expect(currentWeather.getByRole('heading', { name: 'Seattle' })).toBeVisible();
  await expect(currentWeather.getByText('0°', { exact: true })).toBeVisible();
  await expect(currentWeather.getByText('Nublado', { exact: true })).toBeVisible();
  await expect(currentWeather.getByText('80%', { exact: true })).toBeVisible();
  const forecastRegion = page.getByRole('region', { name: /previsão de 5 dias/i });
  await expect(forecastRegion.getByRole('listitem')).toHaveCount(5);
});

for (const width of [320, 375, 1024]) {
  test(`layout sem transbordamento horizontal em ${width}px`, async ({ page }) => {
    await mockApis(page);
    await page.setViewportSize({ width, height: 812 });
    await page.goto('/');
    await page.getByLabel(/buscar cidade/i).fill('Seattle');
    await page.getByRole('button', { name: /buscar/i }).click();
    await expect(page.getByRole('heading', { name: 'Seattle' })).toBeVisible();

    const hasOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(hasOverflow).toBe(false);
  });
}
