# Evidence

Screenshots captured for the bug reports in [`../bug-reports.md`](../bug-reports.md):

- `BUG-001-problem-user-images.png` — all products share the same image under `problem_user`
- `BUG-002-error-user-remove.png` — remove-from-cart fails under `error_user`
- `BUG-003-performance-glitch.png` — slow inventory load under `performance_glitch_user`

These were generated automatically by reproducing each defect with Playwright. See [`../../02-test-automation-playwright/scripts/capture-evidence.js`](../../02-test-automation-playwright/scripts/capture-evidence.js).

To regenerate:

```bash
cd ../../02-test-automation-playwright
npm install
node scripts/capture-evidence.js
```
