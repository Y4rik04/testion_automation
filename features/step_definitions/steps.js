const { Given, When, Then, After } = require('@cucumber/cucumber');
const { Builder, By } = require('selenium-webdriver');
const assert = require('assert');

let driver;

Given('I open the browser and go to {string}', async function (url) {
  driver = await new Builder().forBrowser('chrome').build();
  await driver.get(url);
});

When('I click on {string}', async function (buttonText) {
  const button = await driver.findElement(By.xpath(`//*[text()='${buttonText}']`));
  await button.click();
});

Then('I should see {string}', async function (expectedText) {
  const body = await driver.findElement(By.tagName('body'));
  const text = await body.getText();
  assert.ok(text.includes(expectedText), `Expected to see: ${expectedText}`);
});

Then('I should see partial text {string}', async function (partialText) {
    const body = await driver.findElement(By.tagName('body'));
    const text = await body.getText();
    assert.ok(text.includes(partialText), `Expected to include: ${partialText}`);
  });
  
When('I enter valid email and password', async function () {
  await driver.findElement(By.name('email')).sendKeys('test@example.com');
  await driver.findElement(By.name('password')).sendKeys('123456');
});

When('I enter incorrect email and password', async function () {
  await driver.findElement(By.name('email')).sendKeys('wrong@example.com');
  await driver.findElement(By.name('password')).sendKeys('wrongpass');
});

When('I enter name and already registered email', async function () {
  await driver.findElement(By.name('name')).sendKeys('Test User');
  await driver.findElement(By.xpath("//input[@data-qa='signup-email']")).sendKeys('test@example.com');
});

When('I click on {string} button', async function (buttonText) {
  const button = await driver.findElement(By.xpath(`//button[text()='${buttonText}']`));
  await button.click();
});

After(async function () {
  try {
    if (driver) {
      await driver.quit();
    }
  } catch (err) {
    console.warn('Browser already closed.');
  }
});
