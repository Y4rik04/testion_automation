const { Builder, By, Key, until } = require('selenium-webdriver');

describe('Test Case 1: Register User', () => {
    let driver;

    beforeAll(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('https://automationexercise.com/');
    });

    afterAll(async () => {
        await driver.quit();
    });

    test('Реєстрація нового користувача', async () => {
        // перевірка видимості головної сторінки
        await driver.wait(until.elementLocated(By.css('.logo')), 10000);

        // натискання на кнопку "Signup / Login"
        const signupLoginBtn = await driver.findElement(By.linkText('Signup / Login'));
        await signupLoginBtn.click();

        // перевірка наявності тексту "New User Signup!"
        await driver.wait(until.elementLocated(By.xpath("//h2[text()='New User Signup!']")), 5000);

        // Введення імені та email
        await driver.findElement(By.name('name')).sendKeys('Test User');
        await driver.findElement(By.css('input[data-qa="signup-email"]')).sendKeys(`testuser${Date.now()}@example.com`);

        // натискання на кнопку "Signup"
        const signupButton = await driver.findElement(By.css('button[data-qa="signup-button"]'));
        await signupButton.click();

        // превірка наявності тексту "ENTER ACCOUNT INFORMATION"
        await driver.wait(until.elementLocated(By.xpath("//b[text()='Enter Account Information']")), 5000);

        // заповнення полів для реєстрації
        await driver.findElement(By.id('id_gender1')).click(); // Title (Mr)
        await driver.findElement(By.id('password')).sendKeys('TestPassword123');
        await driver.findElement(By.id('days')).sendKeys('10');
        await driver.findElement(By.id('months')).sendKeys('May');
        await driver.findElement(By.id('years')).sendKeys('1995');

        // чекбокси підписок
        await driver.findElement(By.id('newsletter')).click();
        await driver.findElement(By.id('optin')).click();

        // заповнення додаткових даних
        await driver.findElement(By.id('first_name')).sendKeys('Test');
        await driver.findElement(By.id('last_name')).sendKeys('User');
        await driver.findElement(By.id('address1')).sendKeys('Test Street 123');
        await driver.findElement(By.id('state')).sendKeys('Test State');
        await driver.findElement(By.id('city')).sendKeys('Test City');
        await driver.findElement(By.id('zipcode')).sendKeys('123456');
        await driver.findElement(By.id('mobile_number')).sendKeys('+380123456789');

        // натискання на кнопку "Create Account"
        const createAccountBtn = await driver.findElement(By.css('button[data-qa="create-account"]'));
        await createAccountBtn.click();

        // перевірка наявності тексту "ACCOUNT CREATED!"
        await driver.wait(until.elementLocated(By.xpath("//b[text()='Account Created!']")), 5000);

        // натискання на кнопку "Continue"
        const continueButton = await driver.findElement(By.css('a[data-qa="continue-button"]'));
        await continueButton.click();

        // перевірка, що користувач успішно авторизований
        await driver.wait(until.elementLocated(By.xpath("//b[contains(text(),'Logged in as')]")), 5000);

        // видалення акаунта
        await driver.findElement(By.linkText('Delete Account')).click();
        await driver.wait(until.elementLocated(By.xpath("//b[text()='Account Deleted!']")), 5000);
    }, 60000); 
});
