const { spec } = require('pactum');

describe('Exchange API Tests', () => {

  test('Перевірка списку доступних валют', async () => {
    await spec()
      .get('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json')
      .expectStatus(200)
      .expectJsonLike({ 
        "usd": expect.any(Object), 
        "eur": expect.any(Object),
        "btc": expect.any(Object), 
      });
  });

  test('Курс євро до інших валют', async () => {
    await spec()
      .get('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json')
      .expectStatus(200)
      .expectJsonLike({
        "rates": {
          "usd": expect.any(Number), 
          "gbp": expect.any(Number),
          "jpy": expect.any(Number), 
        }
      });
  });

  test('Курс євро до долара', async () => {
    await spec()
      .get('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json')
      .expectStatus(200)
      .expectJsonLike({
        "rates": {
          "usd": expect.any(Number) 
        }
      });
  });

  test('Запит на неіснуючу валюту', async () => {
    await spec()
      .get('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/invalidcurrency.json')
      .expectStatus(404) 
      .expectJsonLike({
        "error": "Currency not found" 
      });
  });

});
