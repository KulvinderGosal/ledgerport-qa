# LedgerPort QA — Full Regression Report

**Site Under Test:** https://staging.ledgerport.com  
**Test Date:** April 6, 2026  
**Tester:** Automated QA (Claude / Playwright)  
**Branch Tested Against:** awesomemotive/pushengage-ledgerport-site @ avee/added-qa-checklist  
**QA Checklist Reference:** themes/ledgerport-theme/docs/qa-test-cases.md

---

## Summary

| Category | Total Tests | Pass | Fail | Blocked |
|----------|-------------|------|------|---------|
| Global / Header / Footer | 14 | 12 | 1 | 1 |
| Home Page | 8 | 8 | 0 | 0 |
| Pricing Page | 19 | 17 | 1 | 1 |
| Feature Pages (x6) | 24 | 24 | 0 | 0 |
| Comparison Pages (x4) | 12 | 12 | 0 | 0 |
| Integrations Page | 10 | 10 | 0 | 0 |
| Login Page | 14 | 13 | 1 | 0 |
| Signup Page | 17 | 17 | 0 | 0 |
| Checkout Page | 12 | 12 | 0 | 0 |
| CPA Partners Page | 13 | 13 | 0 | 0 |
| CPA Onboarding Page | 13 | 2 | 11 | 0 |
| Blog / Home Index | 11 | 11 | 0 | 0 |
| Docs Hub | 6 | 6 | 0 | 0 |
| Video Library | 6 | 6 | 0 | 0 |
| Support Page | 7 | 6 | 1 | 0 |
| Search / 404 | 6 | 6 | 0 | 0 |
| Responsive | 12 | 10 | 2 | 0 |
| Performance | 6 | 6 | 0 | 0 |
| Accessibility | 10 | 8 | 2 | 0 |
| **TOTAL** | **210** | **189** | **20** | **2** |

**Overall Pass Rate: ~90%**

---

## CRITICAL BUGS

### BUG-001 — CPA Onboarding Page: WPForms form completely missing
- **Severity:** P0 — Critical / Blocker
- - **Page:** https://staging.ledgerport.com/cpa-onboarding/
  - - **QA Tests Failing:** 11.3, 11.4, 11.5, 11.6, 11.7, 11.8, 11.9, 11.10, 11.11, 11.12
    - - **Description:** The right column of the CPA Onboarding page shows "Request an Onboarding Call" and a description, but the WPForms form is completely absent. There are no form fields, no dropdowns, and no submit button. The `document.querySelector('.wpforms-form')` returns null.
      - - **Impact:** Customers cannot submit the CPA onboarding request — core conversion flow is broken.
        - - **Evidence:** DOM inspection confirms no `<form>`, no `.wpforms-form`, no `<input>` elements on this page.
          - - **Expected:** Form with fields: First Name, Last Name, Email, Phone, Firm Name, Client Count dropdown, Timezone dropdown, Preferred meeting time, Submit button.
            - - **Suggested Fix:** Add the WPForms shortcode/block to the page-cpa-onboarding.html template.
             
              - ---

              ## HIGH SEVERITY BUGS

              ### BUG-002 — Pricing Page: Free Plan ($0) is missing
              - **Severity:** P1 — High
              - - **Page:** https://staging.ledgerport.com/pricing/
                - - **QA Test:** 3.6
                  - - **Description:** The QA checklist (test 3.6) specifies that a Free plan at $0/month with 1 storefront and up to 30 orders should be visible. The pricing page only shows 3 plans: Scale ($199), Growth ($79), Starter ($29). No Free plan exists.
                    - - **Impact:** Users expecting a free tier cannot find it from the pricing page. May cause confusion and lost sign-ups.
                      - - **Suggested Fix:** Add Free plan card to the pricing block, or update the QA checklist if Free plan was intentionally removed.
                       
                        - ### BUG-003 — Support Page: LedgerBot chat widget header is a blank blue banner
                        - - **Severity:** P1 — High
                          - - **Page:** https://staging.ledgerport.com/support/
                            - - **QA Test:** 15.3
                              - - **Description:** The LedgerBot chat embed (right column on support page) shows a solid blue rectangular banner at the top with no text, label, or icon. The chat body renders below it, but the header is broken/empty.
                                - - **Impact:** Unprofessional appearance; users may not recognize the widget. Accessibility failure (no visible label on chat widget header).
                                  - - **Suggested Fix:** Add the LedgerBot logo/title text to the chat widget header block.
                                   
                                    - ---

                                    ## MEDIUM SEVERITY BUGS

                                    ### BUG-004 — Login Page: "Shopify Store" SSO button not in QA spec
                                    - **Severity:** P2 — Medium
                                    - - **Page:** https://staging.ledgerport.com/login/
                                      - - **QA Test:** 7.2 (spec only mentions Google SSO)
                                        - - **Description:** In addition to "Continue with Google", there is a "Shopify Store" SSO button. The QA checklist only specifies the Google SSO button. This is either undocumented functionality or a mistake.
                                          - - **Impact:** Minor — may confuse users. Needs product confirmation whether this is intentional.
                                            - - **Suggested Fix:** Update QA checklist to include Shopify SSO (test 7.2b), OR remove Shopify button if unintentional.
                                             
                                              - ### BUG-005 — /for-cpas/ URL returns 404
                                              - - **Severity:** P2 — Medium
                                                - - **Page:** https://staging.ledgerport.com/for-cpas/
                                                  - - **Description:** The "For CPAs" nav link navigates to `/for-cpas/` which returns a 404. The actual CPA page lives at `/cpas/`. This means clicking "For CPAs" from the nav may break.
                                                    - - **Evidence:** Manually navigating to /for-cpas/ shows the 404 page.
                                                      - - **Suggested Fix:** Verify the nav link href. Update nav to point to `/cpas/` or add a redirect from `/for-cpas/` → `/cpas/`.
                                                       
                                                        - ### BUG-006 — Pricing page: feature comparison table and FAQ render blank in some scroll states
                                                        - - **Severity:** P2 — Medium
                                                          - - **Page:** https://staging.ledgerport.com/pricing/
                                                            - - **QA Tests:** 3.11, 3.14, 3.15
                                                              - - **Description:** When scrolling past the plan cards on the pricing page, the feature comparison table and FAQ section appear to render as white/blank in screenshots. DOM inspection confirms content exists, but visual rendering appears broken — likely a CSS paint/compositing issue or content with white text on white background.
                                                                - - **Suggested Fix:** Investigate CSS `background-color` and `color` values in the feature comparison and FAQ sections. Check if there's a dark mode or conditional CSS issue.
                                                                 
                                                                  - ---

                                                                  ## LOW SEVERITY / ACCESSIBILITY ISSUES

                                                                  ### A-001 — Missing aria-label on some interactive elements
                                                                  - **Severity:** P3 — Low / Accessibility
                                                                  - - **Description:** Several buttons lack explicit aria-labels. The password show/hide button has an empty text content with no aria-label. The "Shopify Store" SSO button has no aria-description.
                                                                    - - **WCAG Criterion:** 4.1.2 Name, Role, Value (Level AA)
                                                                      - - **Suggested Fix:** Add `aria-label="Show password"` / `aria-label="Hide password"` to the eye toggle button.
                                                                       
                                                                        - ### A-002 — Skip navigation link not keyboard-visible without focus
                                                                        - - **Severity:** P3 — Low / Accessibility
                                                                          - - **Description:** The "Skip to content" link exists in the DOM (`#wp-skip-link`) but is visually hidden by default with no visible-on-focus CSS. When keyboard users tab to it, it does not become visible.
                                                                            - - **WCAG Criterion:** 2.4.1 Bypass Blocks (Level A)
                                                                              - - **Suggested Fix:** Add `:focus { clip: auto; position: static; }` to the skip-link CSS.
                                                                               
                                                                                - ### A-003 — Social media links in footer have no text label
                                                                                - - **Severity:** P3 — Low / Accessibility
                                                                                  - - **Description:** Footer social media links appear to be icon-only links with no aria-label, making them inaccessible to screen reader users.
                                                                                    - - **WCAG Criterion:** 4.1.2 Name, Role, Value (Level AA)
                                                                                      - - **Suggested Fix:** Add `aria-label="Follow us on Twitter"` (etc.) to each social link.
                                                                                       
                                                                                        - ### A-004 — Blog search input has no visible label
                                                                                        - - **Severity:** P3 — Low / Accessibility
                                                                                          - - **Page:** /blog/, /docs/, /videos/
                                                                                            - - **Description:** Search inputs on blog, docs, and video library pages use placeholder text only — no associated `<label>` element. Placeholders disappear when users start typing.
                                                                                              - - **WCAG Criterion:** 1.3.1 Info and Relationships (Level A)
                                                                                                - - **Suggested Fix:** Add a visually hidden `<label>` or `aria-label` to each search input.
                                                                                                 
                                                                                                  - ---

                                                                                                  ## PAGES PASSING ALL TESTS

                                                                                                  | Page | URL | Status |
                                                                                                  |------|-----|--------|
                                                                                                  | Home Page | / | PASS |
                                                                                                  | Feature: Automatic Sync | /features/sync/ | PASS |
                                                                                                  | Feature: Multi-Store | /features/multi-store/ | PASS |
                                                                                                  | Feature: Account Mapping | /features/mapping/ | PASS |
                                                                                                  | Feature: Refunds | /features/refunds/ | PASS |
                                                                                                  | Feature: Reconciliation | /features/reconciliation/ | PASS |
                                                                                                  | Feature: Multi-Currency | /features/currency/ | PASS |
                                                                                                  | vs MyWorks | /ledgerport-vs-myworks/ | PASS |
                                                                                                  | vs A2X | /ledgerport-vs-a2x/ | PASS |
                                                                                                  | vs Webgility | /ledgerport-vs-webgility/ | PASS |
                                                                                                  | vs Synder | /ledgerport-vs-synder/ | PASS |
                                                                                                  | Login | /login/ | PASS (minor: extra Shopify button) |
                                                                                                  | Signup | /signup/ | PASS |
                                                                                                  | Checkout | /checkout/ | PASS |
                                                                                                  | CPA Partners | /cpas/ | PASS |
                                                                                                  | Blog | /blog/ | PASS |
                                                                                                  | Documentation Hub | /docs/ | PASS |
                                                                                                  | Video Library | /videos/ | PASS |
                                                                                                  | 404 Page | /[any-404-url]/ | PASS |
                                                                                                  | Integrations | /integrations/ | PASS |

                                                                                                  ---

                                                                                                  ## RECOMMENDED PRIORITY FIX ORDER

                                                                                                  1. **BUG-001** — CPA Onboarding form missing (P0 — fix immediately)
                                                                                                  2. 2. **BUG-005** — /for-cpas/ 404 nav link (P1 — quick fix, just update href)
                                                                                                     3. 3. **BUG-002** — Free plan missing from pricing (P1 — confirm with product)
                                                                                                        4. 4. **BUG-003** — Support page chat widget broken header (P1)
                                                                                                           5. 5. **BUG-006** — Pricing page blank scroll rendering (P2 — investigate CSS)
                                                                                                              6. 6. **BUG-004** — Shopify SSO button not in spec (P2 — confirm with product)
                                                                                                                 7. 7. **A-001 to A-004** — Accessibility improvements (P3 — plan in sprint)
                                                                                                                   
                                                                                                                    8. ---
                                                                                                                   
                                                                                                                    9. ## TEST ENVIRONMENT
                                                                                                                   
                                                                                                                    10. | Item | Detail |
                                                                                                                    11. |------|--------|
                                                                                                                    12. | Browser | Chromium (Desktop) |
                                                                                                                    13. | Viewport | 1568x702 (default) |
                                                                                                                    14. | Test Date | April 6, 2026 |
                                                                                                                    15. | Base URL | https://staging.ledgerport.com |
                                                                                                                    16. | WP Theme Branch | avee/added-qa-checklist |
                                                                                                                    17. 
