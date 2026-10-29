# Test Case Design — SauceDemo

Sample test case suite for the authentication and checkout features of [SauceDemo](https://www.saucedemo.com/). Written to show how I design and document manual test cases: clear preconditions, atomic steps, explicit expected results and traceability.

- **Application under test:** SauceDemo (public demo e-commerce site)
- **Author:** Mynor Estrada
- **Scope:** Login, cart and checkout
- **Technique:** equivalence partitioning, boundary and negative testing

---

## Module: Authentication

### TC-01 — Login with valid standard user
| Field | Detail |
|-------|--------|
| **Priority** | High |
| **Type** | Positive / Functional |
| **Precondition** | User is on `https://www.saucedemo.com/` and logged out |
| **Test data** | username: `standard_user`, password: `secret_sauce` |

**Steps**
1. Enter `standard_user` in the username field.
2. Enter `secret_sauce` in the password field.
3. Click **Login**.

**Expected result:** User is redirected to `/inventory.html` and the page title shows "Products".

---

### TC-02 — Login with locked-out user
| Field | Detail |
|-------|--------|
| **Priority** | High |
| **Type** | Negative / Functional |
| **Precondition** | User is on the login page, logged out |
| **Test data** | username: `locked_out_user`, password: `secret_sauce` |

**Steps**
1. Enter `locked_out_user`.
2. Enter `secret_sauce`.
3. Click **Login**.

**Expected result:** Login is blocked and an error is shown: "Epic sadface: Sorry, this user has been locked out."

---

### TC-03 — Login with invalid password
| Field | Detail |
|-------|--------|
| **Priority** | Medium |
| **Type** | Negative |
| **Precondition** | Logged out |
| **Test data** | username: `standard_user`, password: `wrong_password` |

**Steps**
1. Enter `standard_user`.
2. Enter `wrong_password`.
3. Click **Login**.

**Expected result:** Error shown: "Epic sadface: Username and password do not match any user in this service."

---

### TC-04 — Login with empty credentials
| Field | Detail |
|-------|--------|
| **Priority** | Medium |
| **Type** | Negative / Boundary |
| **Precondition** | Logged out |
| **Test data** | username: *(empty)*, password: *(empty)* |

**Steps**
1. Leave both fields empty.
2. Click **Login**.

**Expected result:** Error shown: "Epic sadface: Username is required."

---

## Module: Cart and Checkout

### TC-05 — Add multiple products to cart
| Field | Detail |
|-------|--------|
| **Priority** | High |
| **Type** | Positive / Functional |
| **Precondition** | Logged in as `standard_user` on the inventory page |

**Steps**
1. Click **Add to cart** on "Sauce Labs Backpack".
2. Click **Add to cart** on "Sauce Labs Bike Light".

**Expected result:** The cart badge shows "2".

---

### TC-06 — Complete a purchase end to end
| Field | Detail |
|-------|--------|
| **Priority** | Critical |
| **Type** | Positive / End-to-end |
| **Precondition** | Logged in as `standard_user` |
| **Test data** | First: `Mynor`, Last: `Estrada`, Zip: `01001` |

**Steps**
1. Add "Sauce Labs Backpack" to cart.
2. Open the cart and click **Checkout**.
3. Fill first name, last name and postal code, then click **Continue**.
4. Click **Finish**.

**Expected result:** User reaches `/checkout-complete.html` and sees "Thank you for your order!".

---

### TC-07 — Checkout requires customer information
| Field | Detail |
|-------|--------|
| **Priority** | High |
| **Type** | Negative / Validation |
| **Precondition** | Logged in, at least one product in cart, on the checkout info step |

**Steps**
1. Leave first name, last name and postal code empty.
2. Click **Continue**.

**Expected result:** Error shown: "Error: First Name is required."

---

### TC-08 — Sort products by price (low to high)
| Field | Detail |
|-------|--------|
| **Priority** | Medium |
| **Type** | Functional / Data validation |
| **Precondition** | Logged in on the inventory page |

**Steps**
1. Open the sort dropdown.
2. Select "Price (low to high)".

**Expected result:** Products are displayed in ascending price order.

---

### TC-09 — Sort products by price (high to low)
| Field | Detail |
|-------|--------|
| **Priority** | Medium |
| **Type** | Functional / Data validation |
| **Precondition** | Logged in on the inventory page |

**Steps**
1. Open the sort dropdown.
2. Select "Price (high to low)".

**Expected result:** Products are displayed in descending price order.

---

## Traceability

Every test case above is automated in the Playwright suite under `../02-test-automation-playwright/tests/`, keeping manual design and automated execution in sync (TC-01…TC-09).
