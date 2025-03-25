const { Builder, By, until } = require('selenium-webdriver');

describe('Login User with correct email and password', () => {
    let driver;

    beforeAll(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('https://automationexercise.com/');
    });

    afterAll(async () => {
        await driver.quit();
    });

    test('Перевірка успішного логіну з коректними даними', async () => {
        // перехід на сторінку авторизації
        await driver.findElement(By.linkText('Signup / Login')).click();

        // очікування завантаження сторінки
        await driver.wait(until.elementLocated(By.css('.login-form')), 10000);

        // перевірка наявності форми логіну
        const loginFormTitle = await driver.findElement(By.css('.login-form h2')).getText();
        expect(loginFormTitle).toBe('Login to your account');

        // введення коректних даних
        await driver.findElement(By.css('input[data-qa="login-email"]')).sendKeys('testuser@example.com');
        await driver.findElement(By.css('input[data-qa="login-password"]')).sendKeys('password123');

        // Натискання кнопки логіну
        await driver.findElement(By.css('button[data-qa="login-button"]')).click();

        // перевірка успішного логіну
        await driver.wait(until.elementLocated(By.xpath("//*[contains(text(), 'Logged in as')]")), 10000);
        const loggedInText = await driver.findElement(By.xpath("//*[contains(text(), 'Logged in as')]")).getText();
        expect(loggedInText).toContain('Logged in as testuser');

        // видалення акаунта
        await driver.findElement(By.linkText('Delete Account')).click();
        await driver.wait(until.elementLocated(By.css('.title.text-center')), 10000);
        const deleteText = await driver.findElement(By.css('.title.text-center')).getText();
        expect(deleteText).toBe('ACCOUNT DELETED!');
    });
});
