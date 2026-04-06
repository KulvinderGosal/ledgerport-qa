import { test, expect } from '@playwright/test';

/**
 * Section 10 & 11: CPA Partners Page and CPA Onboarding Page
 * URLs: /cpas/, /cpa-onboarding/
 *
 * KNOWN BUG: CPA Onboarding page is missing the WPForms form entirely.
 * Tests 11.3-11.12 are expected to FAIL until the bug is fixed.
 */

test.describe('10. CPA Partners Page', () => {
    test.beforeEach(async ({ page }) => {
          await page.goto('/cpas/');
    });

                test('10.1 CPA hero: White-glove e-commerce accounting for your firm.', async ({ page }) => {
                      await expect(page.getByText(/White-glove e-commerce accounting for your firm/i)).toBeVisible();
                });

                test('10.2 CTA buttons in hero section', async ({ page }) => {
                      const cta = page.getByRole('link', { name: /Book|Setup Call/i }).first();
                      await expect(cta).toBeVisible();
                });

                test('10.3 ROI metric: 12+ hours per client per month', async ({ page }) => {
                      await expect(page.getByText(/12\+ hours/i)).toBeVisible();
                });

                test('10.4 Trusted firms logos section visible', async ({ page }) => {
                      await expect(page.getByText(/TRUSTED BY MODERN ACCOUNTING FIRMS/i)).toBeVisible();
                });

                test('10.10 CPA FAQ accordion — items expand/collapse', async ({ page }) => {
                      const faqItem = page.locator('details').first();
                      if (await faqItem.isVisible()) {
                              await faqItem.click();
                              await expect(page.locator('details[open]').first()).toBeVisible();
                      }
                });

                test('10.12 Onboarding CTA links to /cpa-onboarding/', async ({ page }) => {
                      const onboardingLinks = page.getByRole('link', { name: /Book|Onboarding|Setup Call/i });
                      const hrefs = await onboardingLinks.evaluateAll(els => els.map(el => el.getAttribute('href')));
                      const hasCPALink = hrefs.some(h => h && h.includes('cpa-onboarding'));
                      expect(hasCPALink).toBe(true);
                });
});

test.describe('11. CPA Onboarding Page', () => {
    test.beforeEach(async ({ page }) => {
          await page.goto('/cpa-onboarding/');
    });

                test('11.1 Two-column layout renders', async ({ page }) => {
                      // Left dark sidebar and right form area should be visible
                         await expect(page.getByText(/Let's build your custom firm setup/i)).toBeVisible();
                      await expect(page.getByText(/Request an Onboarding Call/i)).toBeVisible();
                });

                test('11.2 Partner info sidebar: Custom Wholesale Billing, Hierarchical Account Setup', async ({ page }) => {
                      await expect(page.getByText(/Custom Wholesale Billing/i)).toBeVisible();
                      await expect(page.getByText(/Hierarchical Account Setup/i)).toBeVisible();
                      await expect(page.getByText(/Dedicated Account Manager/i)).toBeVisible();
                });

                // ===== CRITICAL BUG: WPForms form is missing from the page =====
                // The following tests are expected to FAIL until the form is added

                test('BUG-11.1 [EXPECTED FAIL] WPForms form element present on page', async ({ page }) => {
                      // KNOWN BUG: Form is completely missing - no .wpforms-form element found
                         const wpform = page.locator('.wpforms-form, [id^="wpforms"], form.wpforms-validate');
                      await expect(wpform.first()).toBeVisible({ timeout: 5000 });
                });

                test('BUG-11.2 [EXPECTED FAIL] Form field: First Name', async ({ page }) => {
                      await expect(page.getByLabel(/First Name/i)).toBeVisible({ timeout: 5000 });
                });

                test('BUG-11.3 [EXPECTED FAIL] Form field: Last Name', async ({ page }) => {
                      await expect(page.getByLabel(/Last Name/i)).toBeVisible({ timeout: 5000 });
                });

                test('BUG-11.4 [EXPECTED FAIL] Form field: Email', async ({ page }) => {
                      const emailField = page.locator('.wpforms-form').getByLabel(/Email/i);
                      await expect(emailField).toBeVisible({ timeout: 5000 });
                });

                test('BUG-11.5 [EXPECTED FAIL] Client Count dropdown present', async ({ page }) => {
                      const select = page.locator('select').first();
                      await expect(select).toBeVisible({ timeout: 5000 });
                });

                test('BUG-11.6 [EXPECTED FAIL] Form submit button present', async ({ page }) => {
                      const submitBtn = page.getByRole('button', { name: /Submit|Request|Send/i });
                      await expect(submitBtn).toBeVisible({ timeout: 5000 });
                });

                test('11.13 Mobile: single column layout', async ({ page }) => {
                      await page.setViewportSize({ width: 375, height: 812 });
                      await page.goto('/cpa-onboarding/');
                      await expect(page.getByText(/Let's build your custom firm setup/i)).toBeVisible();
                });
});
