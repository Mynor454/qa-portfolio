// @ts-check
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CheckoutPage } = require('../pages/CheckoutPage');

test.describe('SauceDemo - Cart and checkout flow', () => {
  let loginPage;
  let inventoryPage;
  let checkoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    checkoutPage = new CheckoutPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('TC-05 adding products updates the cart badge', async () => {
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.addProductToCart('Sauce Labs Bike Light');
    expect(await inventoryPage.getCartCount()).toBe(2);
  });

  test('TC-06 complete purchase end to end', async ({ page }) => {
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.openCart();
    await checkoutPage.startCheckout();
    await checkoutPage.fillCustomerInfo('Mynor', 'Estrada', '01001');
    await checkoutPage.finish();
    await expect(page).toHaveURL(/checkout-complete\.html/);
    expect(await checkoutPage.getConfirmationText()).toContain('Thank you for your order');
  });

  test('TC-07 checkout requires customer information', async () => {
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.openCart();
    await checkoutPage.startCheckout();
    await checkoutPage.fillCustomerInfo('', '', '');
    expect(await checkoutPage.getErrorText()).toContain('First Name is required');
  });
});
