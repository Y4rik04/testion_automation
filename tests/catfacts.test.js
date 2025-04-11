const { spec } = require('pactum');

describe('Cat Facts API', () => {
  test('Перевірка структури для /breed', async () => {
    await spec()
      .get('https://catfact.ninja/breeds')
      .expectStatus(200)
      .expectJsonLike({ data: expect.any(Array) }); 
  });

  test('Перевірка структури для /fact', async () => {
    const res = await spec().get('https://catfact.ninja/fact').returns('');
    expect(typeof res.fact).toBe('string');
    expect(typeof res.length).toBe('number');
  });

  test('limit та max_length у /facts', async () => {
    const res = await spec().get('https://catfact.ninja/facts?limit=2&max_length=100').returns('data');
    expect(res.length).toBe(2);
    res.forEach(f => expect(f.length).toBeLessThanOrEqual(100));
  });

  test('Перевірка заголовків', async () => {
    await spec()
      .get('https://catfact.ninja/fact')
      .expectHeader('server')
      .expectHeader('cache-control')
      .expectHeader('date');
  });

  test('Типи даних у /fact', async () => {
    const res = await spec().get('https://catfact.ninja/fact').returns('');
    expect(typeof res.fact).toBe('string');
    expect(typeof res.length).toBe('number');
  });
});
