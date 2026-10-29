// @ts-check

class CheckoutPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.firstName = page.locator('[data-test="firstName"]');
    this.lastName = page.locator('[data-test="lastName"]');
    this.postalCode = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.summaryTotal = page.locator('.summary_total_label');
    this.completeHeader = page.locator('.complete-header');
  }

  async startCheckout() {
    await this.checkoutButton.click();
  }

  /**
   * @param {string} first
   * @param {string} last
   * @param {string} zip
   */
  async fillCustomerInfo(first, last, zip) {
    await this.firstName.fill(first);
    await this.lastName.fill(last);
    await this.postalCode.fill(zip);
    await this.continueButton.click();
  }

  async finish() {
    await this.finishButton.click();
  }

  async getErrorText() {
    return (await this.errorMessage.textContent())?.trim() ?? '';
  }

  async getConfirmationText() {
    return (await this.completeHeader.textContent())?.trim() ?? '';
  }
}

module.exports = { CheckoutPage };
