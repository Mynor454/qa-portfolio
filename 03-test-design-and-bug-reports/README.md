# Test Design & Bug Reporting

Documentation samples that show how I design test cases and report defects — the written side of QA that complements the automation.

## Contents

| File | What it shows |
|------|----------------|
| [`test-cases.md`](./test-cases.md) | 9 manual test cases for SauceDemo login and checkout, with preconditions, steps, test data and expected results |
| [`bug-reports.md`](./bug-reports.md) | 3 reproducible defect reports with severity/priority, environment and evidence references |
| [`evidence/`](./evidence/) | Where screenshots/videos for the bug reports live |

## Why this matters

Clients hire QA not only to find bugs but to communicate them so they can be fixed fast. These documents demonstrate:

- Structured, atomic test cases that anyone on the team can execute.
- Clear separation of **severity** (impact) and **priority** (urgency).
- Reproducible bug reports with expected vs actual and attached evidence.
- **Traceability** — each test case maps to an automated test in the Playwright suite.

---
Author: Mynor Estrada
