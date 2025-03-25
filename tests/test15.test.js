describe('Test Case 15: Place Order - Register before Checkout', () => {
    let driver;

    beforeAll(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('https://automationexercise.com/');
    });

    afterAll(async () => {
        await driver.quit();
    });

    test('Оформлення замовлення з реєстрацією до оформлення', async () => {
        const signupLoginButton = await driver.findElement(By.xpath("//a[contains(text(),'Signup / Login')]"));
        await signupLoginButton.click();

        const nameInput = await driver.findElement(By.name('name'));
        await nameInput.sendKeys('Test User');

        const emailInput = await driver.findElement(By.name('email'));
        await emailInput.sendKeys(`testuser${Date.now()}@example.com`);

        const signupButton = await driver.findElement(By.css('button[data-qa="signup-button"]'));
        await signupButton.click();

        await driver.wait(until.elementLocated(By.css('h2[data-qa="account-created"]')), 10000);
        const accountCreatedText = await driver.findElement(By.css('h2[data-qa="account-created"]')).getText();

        expect(accountCreatedText).toBe('ACCOUNT CREATED!');

        const continueButton = await driver.findElement(By.css('a[data-qa="continue-button"]'));
        await continueButton.click();

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

        const placeOrderButton = await driver.findElement(By.xpath("//a[contains(text(),'Place Order')]"));
        await placeOrderButton.click();

        const cardNameInput = await driver.findElement(By.name('name_on_card'));
        await cardNameInput.sendKeys('Test User');

        const cardNumberInput = await driver.findElement(By.name('card_number'));
        await cardNumberInput.sendKeys('4111111111111111');

        const cvcInput = await driver.findElement(By.name('cvc'));
        await cvcInput.sendKeys('123');

        const expiryInput = await driver.findElement(By.name('expiry_date'));
        await expiryInput.sendKeys('12/29');

        const confirmOrderButton = await driver.findElement(By.id('submit'));
        await confirmOrderButton.click();

        const successMessage = await driver.wait(
            until.elementLocated(By.css('.alert-success')),
            10000
        );

        expect(await successMessage.getText()).toContain('Your order has been placed successfully!');
    });
});
