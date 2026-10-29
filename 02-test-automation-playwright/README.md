# Test Automation with Playwright — SauceDemo

End-to-end UI test automation for [SauceDemo](https://www.saucedemo.com/), a public demo e-commerce site built for practising automation.

This sample shows how I structure a maintainable automation suite: the **Page Object Model**, data-driven login scenarios, a full purchase flow, and cross-browser execution with HTML reporting, traces, screenshots and video on failure.

## Test coverage

| ID | Area | Scenario |
|----|------|----------|
| TC-01 | Auth | Valid user logs in and reaches the products page |
| TC-02 | Auth | Locked-out user sees the correct error |
| TC-03 | Auth | Invalid password is rejected |
| TC-04 | Auth | Empty credentials show a required-field error |
| TC-05 | Cart | Adding products updates the cart badge |
| TC-06 | Checkout | Complete purchase end to end |
| TC-07 | Checkout | Checkout validation requires customer info |
| TC-08 | Sorting | Price low → high is ordered ascending |
| TC-09 | Sorting | Price high → low is ordered descending |

## Project structure

```
02-test-automation-playwright/
├── pages/                 # Page Objects (locators + actions)
│   ├── LoginPage.js
│   ├── InventoryPage.js
│   └── CheckoutPage.js
├── tests/                 # Test specs
│   ├── login.spec.js
│   ├── checkout.spec.js
│   └── sorting.spec.js
├── playwright.config.js   # Cross-browser config, reporter, traces
└── package.json
```

## Techniques shown

- **Page Object Model** — locators and actions isolated from test logic for maintainability.
- **Positive and negative testing** — valid login vs locked-out, invalid and empty credentials.
- **End-to-end flow** — login → add to cart → checkout → order confirmation.
- **Data validation** — sorting assertions compare the UI order against a computed expected order.
- **Cross-browser** — runs on Chromium and Firefox.
- **Debuggability** — screenshots, video and Playwright traces captured on failure.

## How to run

```bash
npm install
npm run install:browsers   # one-time: download browser binaries
npm test                   # run the full suite (headless)
npm run test:headed        # watch it run in a browser
npm run test:report        # open the HTML report
```

## Notes

- SauceDemo credentials (`standard_user` / `secret_sauce`, `locked_out_user`, etc.) are the public demo accounts documented on the login page. No private data is used.

---
Author: Mynor Estrada
