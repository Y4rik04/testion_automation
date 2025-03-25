const { Builder, By, until } = require('selenium-webdriver');

describe('Перевірка головної сторінки', () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://automationexercise.com/');
  });

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  test('Перевірка присутності верхнього меню', async () => {
    const navMenu = await driver.wait(
      until.elementLocated(By.css('.header .nav-menu')),
      10000
    );
    expect(await navMenu.isDisplayed()).toBe(true);
  });

  test('Перевірка наявності банера або логотипу', async () => {
    const logo = await driver.findElement(By.css('img[alt="Website for automation practice"]'));
    expect(await logo.isDisplayed()).toBe(true);
  });

  test('Перевірка кнопки "Signup / Login"', async () => {
    const signupButton = await driver.findElement(By.linkText('Signup / Login'));
    expect(await signupButton.isDisplayed()).toBe(true);
  });
});
