# Prompts — (Integrating APIs)

> Use o **Code Agent** + `implementation-prompt`. Uma tarefa por vez.

---

## P7.1 — Service de geocoding

```
Implemente `searchCities(name: string): Promise<City[]>` em
`src/services/weatherService.ts` usando o endpoint de geocoding da Open-Meteo.
Regras: retornar [] para input vazio sem chamar a rede; mapear results para City[];
lançar WeatherServiceError em resposta não-ok. Use encodeURIComponent no nome.
```

## P7.2 — Service de forecast

```
Implemente `getWeather(city: City): Promise<WeatherData>` chamando o endpoint de
forecast com current e daily. Mapeie a resposta (arrays paralelos de daily) para
ForecastDay[] de 5 itens e current para CurrentWeather. Lance WeatherServiceError
se current ou daily estiverem ausentes (resposta incompleta).
```

## P7.3 — Timeout e erros

```
Adicione um helper fetchWithTimeout usando AbortController (10s). Converta
AbortError em "A requisição demorou demais." e falhas de rede em "Falha de rede."
Ambas como WeatherServiceError. Garanta clearTimeout no finally.
```

## P7.4 — Hook useWeather

```
Implemente `src/hooks/useWeather.ts`. Exponha: status
('idle'|'loading'|'success'|'error'|'empty'), data, cities, error, query e as
ações search(name), selectCity(city) e retry(). search deve buscar cidades e,
havendo resultado, carregar o clima da primeira; sem resultado, status 'empty'.
retry refaz a última operação.
```

## P7.5 — Conectar o App

```
Substitua o mock no App pelo hook useWeather. Renderize o estado correto
(idle/loading/empty/error/success). Mantenha unit como estado de UI e passe para
os componentes de apresentação. ErrorState deve chamar retry.
```

## P7.6 — Diagnóstico de integração

```
Estou recebendo <descreva o comportamento/erro> ao integrar a Open-Meteo.
Verifique o mapeamento da resposta, os parâmetros da URL e o tratamento de erro.
Aponte a causa provável e a correção.
```

## P7.7 — Revisão da camada de dados

```
Revise `src/services/weatherService.ts` e `src/hooks/useWeather.ts`: o acesso a
dados está realmente isolado? Os erros são tratados de forma consistente? Há
algum estado duplicado entre o hook e os componentes?
```
