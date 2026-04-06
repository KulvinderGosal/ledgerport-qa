import { test, expect } from '@playwright/test';

/**
 * Sections 4 & 5: Feature Pages and Comparison Pages
 */

const FEATURE_PAGES = [
  { slug: 'sync', label: 'Automatic Sync' },
  { slug: 'multi-store', label: 'Multi-Store' },
  { slug: 'mapping', label: 'Smart Account Mapping' },
  { slug: 'refunds', label: 'Refunds' },
  { slug: 'reconciliation', label: 'Reconciliation' },
  { slug: 'currency', label: 'Multi-Currency' },
  ];

const COMPARISON_PAGES = [
  { slug: 'ledgerport-vs-myworks', competitor: 'MyWorks' },
  { slug: 'ledgerport-vs-a2x', competitor: 'A2X' },
  { slug: 'ledgerport-vs-webgility', competitor: 'Webgility' },
  { slug: 'ledgerport-vs-synder', competitor: 'Synder' },
  ];

test.describe('4. Feature Pages', () => {
    test('4.11 All 6 feature pages return 200 status', async ({ page }) => {
          for (const feature of FEATURE_PAGES) {
                  const response = await page.goto(`/features/${feature.slug}/`);
                  expect(response?.status(), `${feature.slug} should return 200`).toBeLessThan(400);
          }
    });

                for (const feature of FEATURE_PAGES) {
                      test(`4.1 ${feature.slug} — hero heading renders`, async ({ page }) => {
                              await page.goto(`/features/${feature.slug}/`);
                              await expect(page.locator('h1').first()).toBeVisible();
                              const h1Text = await page.locator('h1').first().textContent();
                              expect(h1Text?.trim().length).toBeGreaterThan(5);
                      });

      test(`4.3 ${feature.slug} — stats/metrics visible`, async ({ page }) => {
              await page.goto(`/features/${feature.slug}/`);
              const bodyText = await page.textContent('body');
              expect(bodyText).toMatch(/\d+[MK%+,]/);
      });

      test(`4.10 ${feature.slug} — final CTA section visible`, async ({ page }) => {
              await page.goto(`/features/${feature.slug}/`);
              await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
              const cta = page.getByRole('link', { name: /Get Started|Start Free|See Pricing/i }).last();
              await expect(cta).toBeVisible();
      });
                }
});

test.describe('5. Comparison Pages', () => {
    test('5.9 All 4 comparison pages return 200 status', async ({ page }) => {
          for (const comp of COMPARISON_PAGES) {
                  const response = await page.goto(`/${comp.slug}/`);
                  expect(response?.status(), `${comp.slug} should return 200`).toBeLessThan(400);
          }
    });

                for (const comp of COMPARISON_PAGES) {
                      test(`5.1 vs ${comp.competitor} — hero renders with both names`, async ({ page }) => {
                              await page.goto(`/${comp.slug}/`);
                              await expect(page.getByText(/LedgerPort/i).first()).toBeVisible();
                              await expect(page.getByText(new RegExp(comp.competitor, 'i')).first()).toBeVisible();
                      });

      test(`5.3 vs ${comp.competitor} — comparison table present`, async ({ page }) => {
              await page.goto(`/${comp.slug}/`);
              const table = page.locator('table, [class*="comparison"], [class*="feature-table"]');
              await expect(table.first()).toBeVisible();
      });

      test(`5.8 vs ${comp.competitor} — final CTA section visible`, async ({ page }) => {
              await page.goto(`/${comp.slug}/`);
              await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
              await expect(page.getByRole('link', { name: /Start [Ff]ree|Get [Ss]tarted/i }).last()).toBeVisible();
      });
                }
});
