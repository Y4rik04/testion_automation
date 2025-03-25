describe('Test Case 11: Verify Subscription in Cart Page', () => {
    let driver;

    beforeAll(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('https://automationexercise.com/');
    });

    afterAll(async () => {
        await driver.quit();
    });

    test('Перевірка підписки на сторінці "Cart"', async () => {
        const cartButton = await driver.findElement(By.xpath("//a[contains(text(),'Cart')]"));
        await cartButton.click();

        await driver.executeScript('window.scrollTo(0, document.body.scrollHeight);');

        const subscriptionText = await driver.findElement(By.css('.single-widget h2'));
        expect(await subscriptionText.getText()).toBe('SUBSCRIPTION');

        const emailInput = await driver.findElement(By.id('susbscribe_email'));
        await emailInput.sendKeys('test@example.com');

        const subscribeButton = await driver.findElement(By.id('subscribe'));
        await subscribeButton.click();

        const successMessage = await driver.wait(
            until.elementLocated(By.css('.alert-success')),
            10000
        );
        expect(await successMessage.getText()).toContain('You have been successfully subscribed!');
    });
});
