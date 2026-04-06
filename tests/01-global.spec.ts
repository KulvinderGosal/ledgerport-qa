import { test, expect } from '@playwright/test';

/**
 * Section 1: Global / Shared Elements
 * Tests header navigation, footer, and breadcrumbs across the site.
 */
test.describe('1. Global / Shared Elements', () => {

                test.describe('1.1 Header Navigation', () => {
                      test.beforeEach(async ({ page }) => {
                              await page.goto('/');
                      });

                                  test('1.1.1 Logo links to home', async ({ page }) => {
                                          const logo = page.locator('header a').first();
                                          await logo.click();
                                          await expect(page).toHaveURL(/staging\.ledgerport\.com\/?$/);
                                  });

                                  test('1.1.2 All top-level nav links render', async ({ page }) => {
                                          const nav = page.locator('header nav, header [role="navigation"]').first();
                                          await expect(nav.getByText('Features')).toBeVisible();
                                          await expect(nav.getByText('Integrations')).toBeVisible();
                                          await expect(nav.getByText('Resources')).toBeVisible();
                                          await expect(nav.getByText('Pricing')).toBeVisible();
                                          await expect(nav.getByText('For CPAs')).toBeVisible();
                                  });

                                  test('1.1.3 Features mega menu opens on hover', async ({ page }) => {
                                          await page.getByRole('navigation').getByText('Features').hover();
                                          await page.waitForTimeout(300);
                                          await expect(page.getByText('Automatic Sync').first()).toBeVisible();
                                          await expect(page.getByText('Multi-Store').first()).toBeVisible();
                                          await expect(page.getByText('Smart Account Mapping').first()).toBeVisible();
                                  });

                                  test('1.1.4 Resources mega menu opens', async ({ page }) => {
                                          await page.getByRole('navigation').getByText('Resources').hover();
                                          await page.waitForTimeout(300);
                                          await expect(page.getByText('Blog').first()).toBeVisible();
                                          await expect(page.getByText('Video Library').first()).toBeVisible();
                                          await expect(page.getByText('Support').first()).toBeVisible();
                                          await expect(page.getByText('Help Docs').first()).toBeVisible();
                                  });

                                  test('1.1.7 Log In and Get Started CTAs visible', async ({ page }) => {
                                          await expect(page.getByRole('link', { name: 'Log In' })).toBeVisible();
                                          await expect(page.getByRole('link', { name: /Get [Ss]tarted/i }).first()).toBeVisible();
                                  });

                                  test('1.1.8 Get Started links to signup', async ({ page }) => {
                                          const btn = page.getByRole('link', { name: /Get [Ss]tarted/i }).first();
                                          const href = await btn.getAttribute('href');
                                          expect(href).toContain('/signup');
                                  });

                                  test('1.1.9 Log In links to login page', async ({ page }) => {
                                          const href = await page.getByRole('link', { name: 'Log In' }).getAttribute('href');
                                          expect(href).toContain('/login');
                                  });

                                  test('1.1.13 Sticky bar appears on scroll', async ({ page }) => {
                                          await page.evaluate(() => window.scrollBy(0, 1200));
                                          await page.waitForTimeout(600);
                                          const sticky = page.locator('[class*="sticky"], [class*="fixed"], [data-sticky]').first();
                                          await expect(sticky).toBeVisible();
                                  });
                });

                test.describe('1.2 Footer', () => {
                      test.beforeEach(async ({ page }) => {
                              await page.goto('/');
                              await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
                      });

                                  test('1.2.1 Footer brand description present', async ({ page }) => {
                                          await expect(page.locator('footer').getByText(/Automate E-commerce Accounting/i)).toBeVisible();
                                  });

                                  test('1.2.2 Newsletter form renders', async ({ page }) => {
                                          const newsletter = page.locator('footer').getByRole('textbox').first();
                                          await expect(newsletter).toBeVisible();
                                  });

                                  test('1.2.3 Newsletter form accepts valid email', async ({ page }) => {
                                          const emailInput = page.locator('footer').getByRole('textbox').first();
                                          await emailInput.fill('test@example.com');
                                          const submitBtn = page.locator('footer').getByRole('button').first();
                                          await submitBtn.click();
                                          await page.waitForTimeout(1000);
                                          // Should show success or remain on page without errors
                                             await expect(page).not.toHaveURL(/error/i);
                                  });

                                  test('1.2.5 Social media links present', async ({ page }) => {
                                          const footer = page.locator('footer');
                                          const socialLink = footer.locator('a[href*="twitter"], a[href*="facebook"], a[href*="linkedin"], a[href*="youtube"]').first();
                                          await expect(socialLink).toBeVisible();
                                  });

                                  test('1.2.6 Footer Product column links work', async ({ page }) => {
                                          await expect(page.getByRole('link', { name: /Pricing/i }).last()).toBeVisible();
                                  });

                                  test('1.2.10 Legal links present', async ({ page }) => {
                                          await expect(page.getByRole('link', { name: /Privacy Policy/i })).toBeVisible();
                                          await expect(page.getByRole('link', { name: /Terms of Service/i })).toBeVisible();
                                          await expect(page.getByRole('link', { name: /Cookie Policy/i })).toBeVisible();
                                  });

                                  test('1.2.11 Copyright text correct', async ({ page }) => {
                                          await expect(page.locator('footer').getByText(/LedgerPort\. All rights reserved\./i)).toBeVisible();
                                  });

                                  test('1.2.12 Family of brands section', async ({ page }) => {
                                          const brands = page.locator('footer').getByText(/WPForms|OptinMonster|MonsterInsights/i).first();
                                          await expect(brands).toBeVisible();
                                  });
                });
});
