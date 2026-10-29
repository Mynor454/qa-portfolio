// @ts-check
// Reproduces the documented SauceDemo defects and saves screenshot evidence.
// Usage: node scripts/capture-evidence.js
const { chromium } = require('@playwright/test');
const path = require('path');

const EVIDENCE_DIR = path.resolve(__dirname, '../../03-test-design-and-bug-reports/evidence');
const BASE_URL = 'https://www.saucedemo.com';

async function login(page, username) {
  await page.goto(BASE_URL + '/');
  await page.fill('[data-test="username"]', username);
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('[data-test="login-button"]');
}

(async () => {
  const browser = await chromium.launch();
  const results = [];

  // BUG-001: problem_user shows the same image for every product
  {
    const page = await browser.newPage();
    await login(page, 'problem_user');
    await page.waitForSelector('.inventory_item');
    const srcs = await page.locator('.inventory_item img.inventory_item_img').evaluateAll(
      (imgs) => imgs.map((i) => i.getAttribute('src'))
    );
    const unique = [...new Set(srcs)];
    await page.screenshot({ path: path.join(EVIDENCE_DIR, 'BUG-001-problem-user-images.png'), fullPage: true });
    results.push(`BUG-001: ${srcs.length} products, ${unique.length} unique image(s) -> ${unique.length === 1 ? 'DEFECT CONFIRMED' : 'not reproduced'}`);
    await page.close();
  }

  // BUG-003: performance_glitch_user has a slow login
  {
    const page = await browser.newPage();
    const start = Date.now();
    await login(page, 'performance_glitch_user');
    await page.waitForURL(/inventory\.html/);
    await page.waitForSelector('.inventory_item');
    const glitchMs = Date.now() - start;
    await page.screenshot({ path: path.join(EVIDENCE_DIR, 'BUG-003-performance-glitch.png'), fullPage: true });
    await page.close();

    // Baseline with standard_user for comparison
    const page2 = await browser.newPage();
    const start2 = Date.now();
    await login(page2, 'standard_user');
    await page2.waitForURL(/inventory\.html/);
    await page2.waitForSelector('.inventory_item');
    const baselineMs = Date.now() - start2;
    await page2.close();

    results.push(`BUG-003: performance_glitch_user=${glitchMs}ms vs standard_user=${baselineMs}ms (delta ${glitchMs - baselineMs}ms)`);
  }

  // BUG-002 (replacement): error_user cannot remove an item from the cart
  {
    const page = await browser.newPage();
    await login(page, 'error_user');
    await page.waitForSelector('.inventory_item');
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    const removeBtn = page.locator('[data-test="remove-sauce-labs-backpack"]');
    let removeWorks = true;
    try {
      await removeBtn.click({ timeout: 4000 });
      // if badge still shows 1, remove failed
      const badge = page.locator('.shopping_cart_badge');
      const count = (await badge.count()) ? await badge.textContent() : '0';
      removeWorks = count === '0' || count === null;
    } catch (e) {
      removeWorks = false;
    }
    await page.screenshot({ path: path.join(EVIDENCE_DIR, 'BUG-002-error-user-remove.png'), fullPage: true });
    results.push(`BUG-002: remove from cart with error_user -> ${removeWorks ? 'worked (not reproduced)' : 'DEFECT CONFIRMED (remove did not work)'}`);
    await page.close();
  }

  await browser.close();
  console.log('\n=== Evidence capture results ===');
  results.forEach((r) => console.log(' - ' + r));
  console.log('\nScreenshots saved to:', EVIDENCE_DIR);
})();
