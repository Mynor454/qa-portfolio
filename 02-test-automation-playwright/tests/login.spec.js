// @ts-check
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test.describe('SauceDemo - Authentication', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('TC-01 valid user can log in and lands on the inventory page', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('TC-02 locked-out user sees the correct error', async () => {
    await loginPage.login('locked_out_user', 'secret_sauce');
    expect(await loginPage.getErrorText()).toContain('Sorry, this user has been locked out');
  });

  test('TC-03 invalid password is rejected', async () => {
    await loginPage.login('standard_user', 'wrong_password');
    expect(await loginPage.getErrorText()).toContain('Username and password do not match');
  });

  test('TC-04 empty credentials show a required-field error', async () => {
    await loginPage.login('', '');
    expect(await loginPage.getErrorText()).toContain('Username is required');
  });
});
