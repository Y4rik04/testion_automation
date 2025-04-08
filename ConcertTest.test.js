const { Builder, By, until } = require('selenium-webdriver');

describe('Testing of Concert UA website', () => {
    let driver;

    beforeAll(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('https://concert.ua/');
    });

    afterAll(async () => {
        await driver.quit();
    });

    it('should check main menu links', async () => {
        
        const menuItems = await driver.findElements(By.css('.menu-item')); 
        for (let item of menuItems) {
            const url = await item.getAttribute('href');
            await driver.get(url);
            const currentUrl = await driver.getCurrentUrl();
            expect(currentUrl).toBe(url); 
        }
    });

    it('should open main modal menu', async () => {
       
        const modalButton = await driver.findElement(By.css('.modal-menu-button')); 
        await modalButton.click();
    
        
        const modalMenu = await driver.wait(until.elementIsVisible(driver.findElement(By.css('.modal-menu'))), 5000); 
        const isDisplayed = await modalMenu.isDisplayed();
        expect(isDisplayed).toBe(true); 
    });
    
    it('should change theme', async () => {
       
        const bodyElement = await driver.findElement(By.tagName('body'));
        const initialColor = await bodyElement.getCssValue('background-color');
    
      
        const themeButton = await driver.findElement(By.css('.theme-button')); 
        await driver.executeScript('arguments[0].click();', themeButton);
    
        const newColor = await bodyElement.getCssValue('background-color');
        expect(newColor).not.toBe(initialColor); 
    });
    
});
