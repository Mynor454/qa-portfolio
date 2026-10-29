// @ts-check

class InventoryPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.title = page.locator('.title');
    this.inventoryItems = page.locator('.inventory_item');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
  }

  /** @param {string} productName */
  addProductToCart(productName) {
    const id = productName.toLowerCase().replace(/\s+/g, '-');
    return this.page.locator(`[data-test="add-to-cart-${id}"]`).click();
  }

  async getCartCount() {
    if (await this.cartBadge.count() === 0) return 0;
    return Number((await this.cartBadge.textContent())?.trim() ?? '0');
  }

  async openCart() {
    await this.cartLink.click();
  }

  /** @param {string} value */
  async sortBy(value) {
    await this.sortDropdown.selectOption(value);
  }

  async getProductPrices() {
    const priceTexts = await this.page.locator('.inventory_item_price').allTextContents();
    return priceTexts.map((t) => Number(t.replace('$', '')));
  }
}

module.exports = { InventoryPage };
