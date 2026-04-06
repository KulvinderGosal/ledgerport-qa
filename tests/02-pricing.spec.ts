import { test, expect } from '@playwright/test';

/**
 * Section 3: Pricing Page
 * URL: /pricing/
 */
test.describe('3. Pricing Page', () => {
    test.beforeEach(async ({ page }) => {
          await page.goto('/pricing/');
    });

                test('3.1 Hero text: Simple, predictable pricing. Built for scale.', async ({ page }) => {
                      await expect(page.getByText(/Simple, predictable pricing\. Built for scale\./i)).toBeVisible();
                });

                test('3.2 CPA callout box visible', async ({ page }) => {
                      await expect(page.getByText(/wholesale pricing for CPA/i)).toBeVisible();
                });

                test('3.3 Annual/Monthly billing toggle renders', async ({ page }) => {
                      const toggle = page.locator('[role="switch"]').first();
                      await expect(toggle).toBeVisible();
                });

                test('3.4 Toggle defaults to Annual — shows Save 15%', async ({ page }) => {
                      await expect(page.getByText(/Save 15%/i)).toBeVisible();
                      await expect(page.getByText('$79')).toBeVisible();
                      await expect(page.getByText('$29')).toBeVisible();
                      await expect(page.getByText('$199')).toBeVisible();
                });

                test('3.5 Toggle switches to Monthly pricing', async ({ page }) => {
                      const toggle = page.locator('[role="switch"]').first();
                      await toggle.click();
                      await page.waitForTimeout(500);
                      await expect(page.getByText('$93')).toBeVisible();
                      await expect(page.getByText('$35')).toBeVisible();
                      await expect(page.getByText('$235')).toBeVisible();
                });

                test('3.6 Scale plan displays correctly at $199/mo annual', async ({ page }) => {
                      await expect(page.getByText('Scale')).toBeVisible();
                      await expect(page.getByText('$199')).toBeVisible();
                      await expect(page.getByText(/5,000 orders\/mo/i)).toBeVisible();
                });

                test('3.7 Growth plan displays correctly at $79/mo annual', async ({ page }) => {
                      await expect(page.getByText('Growth')).toBeVisible();
                      await expect(page.getByText('$79')).toBeVisible();
                      await expect(page.getByText(/1,000 orders\/mo/i)).toBeVisible();
                });

                test('3.8 Starter plan displays correctly at $29/mo annual', async ({ page }) => {
                      await expect(page.getByText('Starter')).toBeVisible();
                      await expect(page.getByText('$29')).toBeVisible();
                      await expect(page.getByText(/300 orders\/mo/i)).toBeVisible();
                });

                test('3.11 Feature comparison table renders', async ({ page }) => {
                      const table = page.locator('table, [class*="comparison"]').first();
                      await expect(table).toBeVisible();
                });

                test('3.14 FAQ section renders with items', async ({ page }) => {
                      const faqItems = page.locator('details, [aria-expanded], [class*="faq"]');
                      const count = await faqItems.count();
                      expect(count).toBeGreaterThan(0);
                });

                test('3.15 FAQ items expand/collapse on click', async ({ page }) => {
                      const faqItems = page.locator('details').first();
                      await faqItems.click();
                      await expect(page.locator('details[open]').first()).toBeVisible();
                      await faqItems.click();
                      await expect(page.locator('details[open]').first()).not.toBeVisible();
                });

                test('3.17 Testimonials section visible', async ({ page }) => {
                      const testimonials = page.locator('blockquote, [class*="testimonial"], [class*="quote"]');
                      await expect(testimonials.first()).toBeVisible();
                });

                test('3.19 Annual pricing shows savings percentage', async ({ page }) => {
                      await expect(page.getByText(/Save 15%/i)).toBeVisible();
                });

                // BUG CHECK: Free plan missing per QA spec (3.6 expects Free plan at $0)
                test('BUG-3.1 Free plan ($0) should be present [EXPECTED FAIL]', async ({ page }) => {
                      await expect(page.getByText(/Free/i).first()).toBeVisible();
                });
});
