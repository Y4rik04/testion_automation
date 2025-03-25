describe('Test Case 14: Place Order - Register while Checkout', () => {
    let driver;

    beforeAll(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('https://automationexercise.com/');
    });

    afterAll(async () => {
        await driver.quit();
    });

    test('Оформлення замовлення з реєстрацією під час оформлення', async () => {
        const productsButton = await driver.findElement(By.xpath("//a[contains(text(),'Products')]"));
        await productsButton.click();

        const firstAddToCart = await driver.findElement(By.css('.features_items .productinfo .btn'));
        await firstAddToCart.click();

        const continueShoppingButton = await driver.findElement(By.css('.btn-success'));
        await continueShoppingButton.click();

        const cartButton = await driver.findElement(By.xpath("//a[contains(text(),'Cart')]"));
        await cartButton.click();

        const checkoutButton = await driver.findElement(By.xpath("//a[contains(text(),'Proceed To Checkout')]"));
        await checkoutButton.click();

        const registerLoginButton = await driver.findElement(By.xpath("//u[contains(text(),'Register / Login')]"));
        await registerLoginButton.click();

        const nameInput = await driver.findElement(By.name('name'));
        await nameInput.sendKeys('Test User');

        const emailInput = await driver.findElement(By.name('email'));
        await emailInput.sendKeys(`testuser${Date.now()}@example.com`);

        const signupButton = await driver.findElement(By.css('button[data-qa="signup-button"]'));
        await signupButton.click();

        await driver.wait(until.elementLocated(By.css('h2[data-qa="account-created"]')), 10000);
        const accountCreatedText = await driver.findElement(By.css('h2[data-qa="account-created"]')).getText();

        expect(accountCreatedText).toBe('ACCOUNT CREATED!');
    });
});
