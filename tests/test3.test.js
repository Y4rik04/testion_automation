const { Builder, By, until } = require('selenium-webdriver');

describe('Login User with incorrect email and password', () => {
    let driver;

    beforeAll(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('https://automationexercise.com/');
    });

    afterAll(async () => {
        await driver.quit();
    });

    test('Перевірка логіну з некоректними даними', async () => {
        // пеерехід на сторінку авторизації
        await driver.findElement(By.linkText('Signup / Login')).click();

        // очікування завантаження сторінки
        await driver.wait(until.elementLocated(By.css('.login-form')), 10000);

        // перевірка наявності форми логіну
        const loginFormTitle = await driver.findElement(By.css('.login-form h2')).getText();
        expect(loginFormTitle).toBe('Login to your account');

        // введення некоректних даних
        await driver.findElement(By.css('input[data-qa="login-email"]')).sendKeys('invaliduser@example.com');
        await driver.findElement(By.css('input[data-qa="login-password"]')).sendKeys('wrongpassword');

        // натискання кнопки логіну
        await driver.findElement(By.css('button[data-qa="login-button"]')).click();

        // перевірка повідомлення про помилку
        const errorMessage = await driver.findElement(By.css('.login-form p')).getText();
        expect(errorMessage).toBe('Your email or password is incorrect!');
    });
});
