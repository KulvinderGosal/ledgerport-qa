# LedgerPort QA — Playwright Test Suite

Automated end-to-end QA test suite for [LedgerPort Staging](https://staging.ledgerport.com), covering all 18 sections from the QA checklist in [`themes/ledgerport-theme/docs/qa-test-cases.md`](https://github.com/awesomemotive/pushengage-ledgerport-site/blob/avee/added-qa-checklist/themes/ledgerport-theme/docs/qa-test-cases.md).

---

## Repository Structure

```
ledgerport-qa/
├── tests/
│   ├── 01-global.spec.ts              # Header, footer, breadcrumbs
│   ├── 02-pricing.spec.ts             # Pricing page (toggle, plans, FAQ)
│   ├── 03-login-signup.spec.ts        # Login & Signup forms
│   ├── 04-cpa-onboarding.spec.ts      # CPA Partners + CPA Onboarding (BUG-001)
│   ├── 05-features-comparisons.spec.ts # All 6 feature + 4 comparison pages
│   ├── 06-checkout-blog-docs-videos-support-404.spec.ts  # Remaining pages
│   └── 07-accessibility-responsive.spec.ts  # A11y + responsive checks
├── playwright.config.ts               # Playwright config (6 browser projects)
├── package.json                       # Scripts + deps
├── tsconfig.json                      # TypeScript config
├── test-cases.csv                     # Excel-compatible test matrix with pass/fail results
└── REGRESSION-REPORT.md               # Full regression report with bugs found
```

---

## Quick Start

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Run all tests (chromium by default)
npm test

# Run with visible browser
npm run test:headed

# Run in Playwright UI mode
npm run test:ui

# Run specific browser
npm run test:chrome
npm run test:firefox
npm run test:safari
npm run test:mobile

# View HTML report after run
npm run test:report
```

---

## Test Coverage

| Section | Tests | File |
|---------|-------|------|
| 1. Global (Header + Footer) | 22 | 01-global.spec.ts |
| 3. Pricing Page | 15 | 02-pricing.spec.ts |
| 7. Login Page | 12 | 03-login-signup.spec.ts |
| 8. Signup Page | 11 | 03-login-signup.spec.ts |
| 10. CPA Partners Page | 6 | 04-cpa-onboarding.spec.ts |
| 11. CPA Onboarding Page | 8 | 04-cpa-onboarding.spec.ts |
| 4. Feature Pages (x6) | 20 | 05-features-comparisons.spec.ts |
| 5. Comparison Pages (x4) | 12 | 05-features-comparisons.spec.ts |
| 6. Integrations | 2 | 06-checkout-blog-docs... |
| 9. Checkout | 6 | 06-checkout-blog-docs... |
| 12. Blog | 3 | 06-checkout-blog-docs... |
| 13. Docs Hub | 3 | 06-checkout-blog-docs... |
| 14. Video Library | 3 | 06-checkout-blog-docs... |
| 15. Support | 3 | 06-checkout-blog-docs... |
| 16. 404 Page | 4 | 06-checkout-blog-docs... |
| 17. Responsive | 6 | 07-accessibility-responsive.spec.ts |
| 18. Performance | 3 | 07-accessibility-responsive.spec.ts |
| 18. Accessibility | 6 | 07-accessibility-responsive.spec.ts |
| **Total** | **145+** | |

---

## Bugs Found in Regression

| Bug ID | Severity | Page | Description |
|--------|----------|------|-------------|
| BUG-001 | **P0 Critical** | /cpa-onboarding/ | WPForms form completely missing — no form fields at all |
| BUG-002 | P1 High | /pricing/ | Free plan ($0) missing from pricing page |
| BUG-003 | P1 High | /support/ | LedgerBot chat widget header renders as blank blue banner |
| BUG-004 | P2 Medium | /login/ | "Shopify Store" SSO button not in QA spec |
| BUG-005 | P2 Medium | /for-cpas/ | URL /for-cpas/ returns 404 (actual page is /cpas/) |
| BUG-006 | P2 Medium | /pricing/ | Feature comparison table appears blank/white in scroll states |
| A-001 | P3 Low | Login/Signup | Password toggle button missing aria-label |
| A-002 | P3 Low | All | Skip-to-content link not visible on keyboard focus |
| A-003 | P3 Low | All | Footer social media icon links have no text label |
| A-004 | P3 Low | Blog/Docs/Videos | Search inputs have no associated label element |

See [REGRESSION-REPORT.md](./REGRESSION-REPORT.md) for full details.

---

## Test Matrix (Excel)

Download [test-cases.csv](./test-cases.csv) — open in Excel or Google Sheets for a full pass/fail matrix with all 130+ test cases, severity, and notes.

---

## Re-running After Bug Fixes

When a bug is fixed, remove the `[EXPECTED FAIL]` prefix from the test name and the `{ timeout: 5000 }` override in `04-cpa-onboarding.spec.ts` to turn it back into a live assertion.

---

## Configuration

Edit `playwright.config.ts` to change:
- `baseURL` — point to a different environment (staging → production)
- - `projects` — enable/disable browsers
  - - `retries` — set retry count for flaky tests
    - - `reporter` — add/remove report formats
      - 
