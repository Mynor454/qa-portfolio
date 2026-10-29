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

**Actual result:** All products display the same image (a dog photo) instead of their correct product images.

**Evidence:** `evidence/BUG-001-problem-user-images.png`

**Notes:** Reproducible 100% of the time with `problem_user`. Does not occur with `standard_user`.

---

## BUG-002 — Checkout accepts submission with a missing postal code after partial entry

| Field | Detail |
|-------|--------|
| **Severity** | Minor |
| **Priority** | Medium |
| **Status** | Open (needs confirmation) |
| **Environment** | Firefox 131, Ubuntu 22.04, https://www.saucedemo.com/ |
| **Affected area** | Checkout — customer information |

**Preconditions:** Logged in as `standard_user`, one product in cart, on the "Your Information" step.

**Steps to reproduce**
1. Enter a first name and last name.
2. Leave the postal code empty.
3. Click **Continue**.

**Expected result:** A validation error is shown: "Error: Postal Code is required."

**Actual result:** Validation behaviour should be verified across builds; document the observed message and whether the field is enforced consistently.

**Evidence:** `evidence/BUG-002-postal-code-validation.png`

**Notes:** Included as an example of a validation edge case to confirm with the team before marking as a defect.

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

**Actual result:** The inventory page takes several seconds longer to load than for `standard_user`, indicating a performance regression.

**Evidence:** `evidence/BUG-003-performance-glitch.png` (and a Playwright trace can be attached)

**Notes:** Useful as a non-functional/performance defect example. The delay is consistent and tied to this specific user.

---

## How I report defects

- **Reproducible first:** every report has exact steps and test data so a developer can trigger it in minutes.
- **Expected vs actual** stated explicitly, never implied.
- **Evidence attached:** screenshot or short video; for automation failures, the Playwright trace.
- **Severity vs priority** separated, because business impact and technical impact are not the same.
- **Tracked in Jira/Xray** in a real project, linked to the corresponding test case for traceability.
