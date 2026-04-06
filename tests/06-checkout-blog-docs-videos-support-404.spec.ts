import { test, expect } from '@playwright/test';

/** Sections 9, 12-16: Checkout, Blog, Docs, Videos, Support, 404 */

test.describe('9. Checkout Page', () => {
    test('9.1 Loads with plan from URL param (growth)', async ({ page }) => {
          await page.goto('/checkout/?plan=growth');
          await expect(page.getByText(/Growth/i).first()).toBeVisible();
    });

                test('9.3 Annual/Monthly toggle renders', async ({ page }) => {
                      await page.goto('/checkout/');
                      await expect(page.getByText(/Monthly|Annually/i).first()).toBeVisible();
                });

                test('9.4 Form fields: Full Name, Work Email, Password', async ({ page }) => {
                      await page.goto('/checkout/');
                      await expect(page.getByLabel(/Full Name|Name/i)).toBeVisible();
                      await expect(page.getByLabel(/Email/i)).toBeVisible();
                      await expect(page.getByLabel(/Password/i)).toBeVisible();
                });

                test('9.5 Terms checkbox present', async ({ page }) => {
                      await page.goto('/checkout/');
                      await expect(page.locator('input[type="checkbox"]').first()).toBeVisible();
                });

                test('9.6 Security badges: Secured by Stripe, 14-day guarantee', async ({ page }) => {
                      await page.goto('/checkout/');
                      await expect(page.getByText(/Secured by Stripe/i)).toBeVisible();
                      await expect(page.getByText(/14-day guarantee/i)).toBeVisible();
                });

                test('9.12 Checkout without plan param handles gracefully', async ({ page }) => {
                      const response = await page.goto('/checkout/');
                      expect(response?.status()).toBeLessThan(400);
                      await expect(page.locator('form').first()).toBeVisible();
                });
});

test.describe('12. Blog (Home/Index)', () => {
    test.beforeEach(async ({ page }) => {
          await page.goto('/blog/');
    });

                test('12.1 Blog page loads with heading', async ({ page }) => {
                      await expect(page.getByText(/LedgerPort Blog/i)).toBeVisible();
                });

                test('12.2 Popular resources grid renders', async ({ page }) => {
                      await expect(page.getByText(/Popular Resources/i)).toBeVisible();
                });

                test('12.3 Blog post grid shows articles', async ({ page }) => {
                      const articles = page.locator('article, [class*="post-card"], [class*="blog-card"]');
                      const count = await articles.count();
                      expect(count).toBeGreaterThan(0);
                });
});

test.describe('13. Documentation Hub', () => {
    test.beforeEach(async ({ page }) => {
          await page.goto('/docs/');
    });

                test('13.1.1 Docs hero with search bar visible', async ({ page }) => {
                      await expect(page.locator('h1').first()).toBeVisible();
                      const searchInput = page.locator('input[type="search"], input[placeholder*="Search"], [role="searchbox"]').first();
                      await expect(searchInput).toBeVisible();
                });

                test('13.1.3 Docs topic grid renders', async ({ page }) => {
                      const cards = page.locator('[class*="card"], article, [class*="topic"]');
                      const count = await cards.count();
                      expect(count).toBeGreaterThan(0);
                });

                test('13.1.2 Docs search integration picker renders', async ({ page }) => {
                      await expect(page.getByText(/Select your integration/i)).toBeVisible();
                      await expect(page.locator('select').first()).toBeVisible();
                });
});

test.describe('14. Video Library', () => {
    test.beforeEach(async ({ page }) => {
          await page.goto('/videos/');
    });

                test('14.1.1 Video Library hero renders', async ({ page }) => {
                      await expect(page.getByText(/Video Library/i)).toBeVisible();
                });

                test('14.1.1 Video Library search input visible', async ({ page }) => {
                      const search = page.locator('input[placeholder*="Search"]').first();
                      await expect(search).toBeVisible();
                });

                test('14.1.4 Video/playlist grid renders', async ({ page }) => {
                      const cards = page.locator('[class*="card"], article').first();
                      await expect(cards).toBeVisible();
                });
});

test.describe('15. Support Page', () => {
    test.beforeEach(async ({ page }) => {
          await page.goto('/support/');
    });

                test('15.1 Support hero renders: "Get Support"', async ({ page }) => {
                      await expect(page.getByText(/Get Support/i)).toBeVisible();
                });

                test('15.2 Quick links: Browse documentation, Email support', async ({ page }) => {
                      await expect(page.getByText(/Browse documentation/i)).toBeVisible();
                      await expect(page.getByText(/Email support/i)).toBeVisible();
                });

                test('15.3 LedgerBot chat embed visible', async ({ page }) => {
                      const chatWidget = page.locator('[class*="chat"], [class*="LedgerBot"], iframe, [class*="wpforms"]').first();
                      await expect(chatWidget).toBeVisible();
                });
});

test.describe('16. 404 Page', () => {
    test.beforeEach(async ({ page }) => {
          await page.goto('/this-page-does-not-exist-404-test/');
    });

                test('16.2.1 404 graphic/icon displays', async ({ page }) => {
                      await expect(page.getByText(/404 Error/i)).toBeVisible();
                });

                test('16.2.2 "Page not found" headline', async ({ page }) => {
                      await expect(page.getByText(/Page not found/i)).toBeVisible();
                });

                test('16.2.4 Search form available on 404 page', async ({ page }) => {
                      await expect(page.locator('input[type="search"], input[placeholder*="Search"]').first()).toBeVisible();
                });

                test('16.2.5 Navigation grid: Home Page, Pricing, Our Blog, Get Support', async ({ page }) => {
                      await expect(page.getByText(/Home Page/i)).toBeVisible();
                      await expect(page.getByText(/Pricing/i).first()).toBeVisible();
                      await expect(page.getByText(/Our Blog/i)).toBeVisible();
                      await expect(page.getByText(/Get Support/i)).toBeVisible();
                });
});

test.describe('6. Integrations Page', () => {
    test('6.1 Integrations hero renders', async ({ page }) => {
          await page.goto('/integrations/');
          await expect(page.locator('h1').first()).toBeVisible();
    });

                test('6.7 Platform mentions: Shopify, WooCommerce, QuickBooks', async ({ page }) => {
                      await page.goto('/integrations/');
                      const bodyText = await page.textContent('body');
                      expect(bodyText).toMatch(/Shopify/i);
                      expect(bodyText).toMatch(/WooCommerce/i);
                      expect(bodyText).toMatch(/QuickBooks/i);
                });
});
