const { Builder, By, Key } = require('selenium-webdriver');

describe('Keyboard Navigation Tests', () => {
    let driver;

    beforeAll(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('https://concert.ua');
    });

    afterAll(async () => {
        await driver.quit();
    });

    it('should navigate through menu using Tab and Enter', async () => {
        // Переміщаємось через елементи меню за допомогою Tab
        const firstMenuItem = await driver.findElement(By.css('nav a'));
        await firstMenuItem.sendKeys(Key.TAB);

        // Перевіряємо, що фокус знаходиться на елементі
        const activeElement = await driver.switchTo().activeElement();
        const isFocused = await activeElement.getCssValue('outline') !== 'none';
        expect(isFocused).toBe(true);

        // Тепер натискаємо Enter, щоб активувати елемент
        await activeElement.sendKeys(Key.ENTER);
        // Додаємо перевірку для перевірки результату
    });
});
