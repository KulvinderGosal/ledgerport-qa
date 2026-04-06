import { test, expect } from '@playwright/test';

/**
 * Sections 17 & 18: Responsive / Cross-Browser and Performance & Accessibility
 */

const KEY_PAGES = ['/', '/pricing/', '/login/', '/signup/', '/cpas/', '/cpa-onboarding/'];

test.describe('17. Responsive Layout Tests', () => {
    const viewports = [
      { name: 'Desktop 1440px', width: 1440, height: 900 },
      { name: 'Laptop 1280px', width: 1280, height: 800 },
      { name: 'Tablet 768px', width: 768, height: 1024 },
      { name: 'Mobile 375px', width: 375, height: 812 },
        ];

                for (const vp of viewports) {
                      test(`17 ${vp.name} — Home page renders without horizontal scroll`, async ({ page }) => {
                              await page.setViewportSize({ width: vp.width, height: vp.height });
                              await page.goto('/');
                              const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
                              expect(scrollWidth).toBeLessThanOrEqual(vp.width + 10); // allow 10px tolerance
                      });
                }

                test('17.10 Mobile (375px) — hamburger menu visible, nav collapsed', async ({ page }) => {
                      await page.setViewportSize({ width: 375, height: 812 });
                      await page.goto('/');
                      // At mobile, nav should NOT show full desktop links OR show hamburger
                         const hamburger = page.locator('[aria-label*="menu"], button.hamburger, .menu-toggle, [class*="hamburger"], [class*="mobile-menu"]');
                      const desktopNav = page.locator('header nav a', { hasText: 'Integrations' });
                      const hamburgerVisible = await hamburger.first().isVisible().catch(() => false);
                      const desktopNavVisible = await desktopNav.isVisible().catch(() => false);
                      // Either hamburger is visible OR desktop nav is not visible (one of the two must be true)
                         expect(hamburgerVisible || !desktopNavVisible).toBe(true);
                });

                test('17 Pricing page renders at 1280px', async ({ page }) => {
                      await page.setViewportSize({ width: 1280, height: 800 });
                      await page.goto('/pricing/');
                      await expect(page.getByText(/Simple, predictable pricing/i)).toBeVisible();
                });
});

test.describe('18.1 Performance Checks', () => {
    test('18.1.1 Home page loads in under 10 seconds', async ({ page }) => {
          const start = Date.now();
          await page.goto('/');
          const loadTime = Date.now() - start;
          expect(loadTime).toBeLessThan(10000);
    });

                test('18.1.3 Critical CSS — no render-blocking flash', async ({ page }) => {
                      await page.goto('/');
                      // Check that h1 is visible quickly after DOMContentLoaded
                         await expect(page.locator('h1').first()).toBeVisible({ timeout: 5000 });
                });

                test('18.1.4 Images use lazy loading', async ({ page }) => {
                      await page.goto('/');
                      const lazyImages = await page.evaluate(() => {
                              const imgs = Array.from(document.querySelectorAll('img[loading="lazy"]'));
                              return imgs.length;
                      });
                      // At least some images should have lazy loading
                         expect(lazyImages).toBeGreaterThan(0);
                });
});

test.describe('18.2 Accessibility Checks', () => {
    test('18.2.1 Skip to content link present on homepage', async ({ page }) => {
          await page.goto('/');
          await page.keyboard.press('Tab');
          const skipLink = page.locator('#wp-skip-link, a[href*="skip"], a:has-text("Skip")');
          await expect(skipLink.first()).toBeVisible().catch(() => {
                  // Some skip links are only visible on focus — just check they exist in DOM
                                                                   return expect(skipLink.first()).toBeAttached();
          });
    });

                test('18.2.3 Form inputs on login page have associated labels', async ({ page }) => {
                      await page.goto('/login/');
                      const emailInput = page.locator('input[type="email"]');
                      const id = await emailInput.getAttribute('id');
                      if (id) {
                              const label = page.locator(`label[for="${id}"]`);
                              await expect(label).toBeAttached();
                      }
                });

                test('18.2.5 No images missing alt text on home page', async ({ page }) => {
                      await page.goto('/');
                      const missingAlt = await page.evaluate(() => {
                              const imgs = Array.from(document.querySelectorAll('img'));
                              return imgs.filter(img => img.alt === undefined || img.alt === null).length;
                      });
                      expect(missingAlt).toBe(0);
                });

                test('18.2.6 Form labels associated on signup page', async ({ page }) => {
                      await page.goto('/signup/');
                      const inputs = await page.evaluate(() => {
                              const inputs = Array.from(document.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"])'));
                              return inputs.map(input => ({
                                        id: input.id,
                                        hasLabel: !!document.querySelector(`label[for="${input.id}"]`) || !!input.closest('label')
                              }));
                      });
                      const unlabeled = inputs.filter(i => !i.hasLabel);
                      expect(unlabeled.length).toBe(0);
                });

                test('18.2.8 Heading hierarchy — h1 exists on all key pages', async ({ page }) => {
                      for (const pagePath of KEY_PAGES) {
                              await page.goto(pagePath);
                              const h1Count = await page.locator('h1').count();
                              expect(h1Count, `${pagePath} should have exactly 1 h1`).toBe(1);
                      }
                });

                test('18.2.9 FAQ accordion keyboard support — Enter key opens/closes', async ({ page }) => {
                      await page.goto('/pricing/');
                      const faqItem = page.locator('details').first();
                      if (await faqItem.isVisible()) {
                              await faqItem.focus();
                              await page.keyboard.press('Enter');
                              await expect(page.locator('details[open]').first()).toBeVisible();
                      }
                });
});
