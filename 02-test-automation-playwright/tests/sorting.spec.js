// @ts-check
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');

test.describe('SauceDemo - Product sorting', () => {
  let inventoryPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('TC-08 sort price low to high orders products ascending', async () => {
    await inventoryPage.sortBy('lohi');
    const prices = await inventoryPage.getProductPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  test('TC-09 sort price high to low orders products descending', async () => {
    await inventoryPage.sortBy('hilo');
    const prices = await inventoryPage.getProductPrices();
    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
  });
});
