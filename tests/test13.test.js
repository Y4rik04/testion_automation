describe('Test Case 13: Verify Product Quantity in Cart', () => {
    let driver;

    beforeAll(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('https://automationexercise.com/');
    });

    afterAll(async () => {
        await driver.quit();
    });

    test('Перевірка кількості товару в кошику', async () => {
        const firstProduct = await driver.findElement(By.css('.features_items .col-sm-4:nth-child(1) .choose a'));
        await firstProduct.click();

        const quantityInput = await driver.findElement(By.id('quantity'));
        await quantityInput.clear();
        await quantityInput.sendKeys('4');

        const addToCartButton = await driver.findElement(By.css('.btn.btn-default.cart'));
        await addToCartButton.click();

        const viewCartButton = await driver.findElement(By.css('.modal-content .btn.btn-success'));
        await viewCartButton.click();

        const cartQuantity = await driver.findElement(By.css('.cart_quantity_input'));
        expect(await cartQuantity.getAttribute('value')).toBe('4');
    });
});
