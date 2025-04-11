const { spec } = require('pactum');

describe('UK Bank Holidays API', () => {
  const URL = 'https://www.gov.uk/bank-holidays.json';

  test('Кількість святкових днів в Англії та Уельсі', async () => {
    const res = await spec().get(URL).returns('england-and-wales.events');
    expect(res.length).toBeGreaterThan(5); 
  });

  test('Дата Пасхи', async () => {
    const res = await spec().get(URL).returns('england-and-wales.events');
    const easter = res.find(ev => ev.title.toLowerCase().includes('easter'));
    expect(easter).toBeDefined();
    expect(easter.date).toMatch(/\d{4}-\d{2}-\d{2}/);
  });
});
