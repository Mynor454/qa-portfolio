# Bug Reports — SauceDemo

Sample defect reports written against [SauceDemo](https://www.saucedemo.com/). The site intentionally ships with several broken user profiles for QA practice, which makes it a good target for demonstrating clear, reproducible bug documentation.

Each report follows the format I use day to day: unique ID, severity/priority, environment, exact reproduction steps, expected vs actual result, and a note on where the evidence (screenshot/video) belongs.

---

## BUG-001 — `problem_user` shows the same image for every product

| Field | Detail |
|-------|--------|
| **Severity** | Major |
| **Priority** | High |
| **Status** | Open |
| **Environment** | Chrome 129, Windows 11, https://www.saucedemo.com/ |
| **Affected area** | Inventory page |

**Preconditions:** Logged in as `problem_user` / `secret_sauce`.

**Steps to reproduce**
1. Go to the login page.
2. Log in as `problem_user`.
3. Observe the product thumbnails on the inventory page.

**Expected result:** Each product displays its own distinct image.

**Actual result:** All 6 products display the same image (a dog photo) instead of their correct product images. The automated check confirmed 6 products resolve to a single unique image URL.

**Evidence:** `evidence/BUG-001-problem-user-images.png`

**Notes:** Reproducible 100% of the time with `problem_user`. Does not occur with `standard_user`.

---

## BUG-002 — `error_user` cannot remove a product from the cart

| Field | Detail |
|-------|--------|
| **Severity** | Major |
| **Priority** | High |
| **Status** | Open |
| **Environment** | Chromium (Playwright), Linux, https://www.saucedemo.com/ |
| **Affected area** | Inventory / cart |

**Preconditions:** Logged in as `error_user` / `secret_sauce`.

**Steps to reproduce**
1. Log in as `error_user`.
2. Click **Add to cart** on "Sauce Labs Backpack" (the cart badge shows 1).
3. Click **Remove** on the same product.

**Expected result:** The product is removed and the cart badge returns to 0.

**Actual result:** The **Remove** action does not work — the item stays in the cart and the badge still shows 1.

**Evidence:** `evidence/BUG-002-error-user-remove.png`

**Notes:** Reproduced via automated script. Specific to `error_user`; `standard_user` can remove items normally.

---

## BUG-003 — `performance_glitch_user` has a noticeably slow login

| Field | Detail |
|-------|--------|
| **Severity** | Major |
| **Priority** | Medium |
| **Status** | Open |
| **Environment** | Chrome 129, Windows 11, https://www.saucedemo.com/ |
| **Affected area** | Authentication / performance |

**Preconditions:** On the login page, logged out.

**Steps to reproduce**
1. Log in as `performance_glitch_user` / `secret_sauce`.
2. Measure the time until the inventory page renders.

**Expected result:** The inventory page loads within an acceptable threshold (e.g. under 2 seconds), comparable to `standard_user`.

**Actual result:** The inventory page takes significantly longer to load. Measured with the automated capture script:
- `performance_glitch_user`: **5704 ms**
- `standard_user` (baseline): **651 ms**
- Delta: **~5 seconds**

**Evidence:** `evidence/BUG-003-performance-glitch.png`

**Notes:** The delay is consistent and tied to this specific user. Measurements come from `scripts/capture-evidence.js` in the automation suite.

---

## How I report defects

- **Reproducible first:** every report has exact steps and test data so a developer can trigger it in minutes.
- **Expected vs actual** stated explicitly, never implied.
- **Evidence attached:** screenshot or short video; for automation failures, the Playwright trace.
- **Severity vs priority** separated, because business impact and technical impact are not the same.
- **Tracked in Jira/Xray** in a real project, linked to the corresponding test case for traceability.
