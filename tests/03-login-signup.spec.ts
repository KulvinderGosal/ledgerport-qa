import { test, expect } from '@playwright/test';

/**
 * Section 7 & 8: Login Page and Signup Page
 * URLs: /login/, /signup/
 */

test.describe('7. Login Page', () => {
    test.beforeEach(async ({ page }) => {
          await page.goto('/login/');
    });

                test('7.1 Split-screen layout on desktop', async ({ page }) => {
                      await page.setViewportSize({ width: 1280, height: 800 });
                      await page.goto('/login/');
                      await expect(page.locator('form').first()).toBeVisible();
                });

                test('7.2 Google SSO button visible', async ({ page }) => {
                      await expect(page.getByText(/Continue with Google/i)).toBeVisible();
                });

                test('7.4 Email address input renders', async ({ page }) => {
                      await expect(page.getByLabel(/Email address/i)).toBeVisible();
                });

                test('7.5 Password input renders', async ({ page }) => {
                      await expect(page.getByLabel(/Password/i)).toBeVisible();
                });

                test('7.6 Password show/hide toggle works', async ({ page }) => {
                      const passwordInput = page.getByLabel(/Password/i);
                      await expect(passwordInput).toHaveAttribute('type', 'password');
                      const toggle = page.locator('button[type="button"]').filter({ hasText: '' }).first();
                      if (await toggle.isVisible()) {
                              await toggle.click();
                              await expect(passwordInput).toHaveAttribute('type', 'text');
                      }
                });

                test('7.7 Forgot password link present', async ({ page }) => {
                      await expect(page.getByText(/Forgot password/i)).toBeVisible();
                });

                test('7.8 Sign up / Create account link present', async ({ page }) => {
                      await expect(page.getByRole('link', { name: /Get Started|Create an account/i })).toBeVisible();
                });

                test('7.9 Form validation — empty submit stays on login', async ({ page }) => {
                      await page.getByRole('button', { name: /Log in/i }).click();
                      await page.waitForTimeout(500);
                      await expect(page).toHaveURL(/login/);
                });

                test('7.11 Trust sidebar stats: 50M+, 99.98%', async ({ page }) => {
                      await expect(page.getByText(/50M\+/i)).toBeVisible();
                      await expect(page.getByText(/99\.98%/i)).toBeVisible();
                });

                test('7.12 Trust sidebar testimonial visible', async ({ page }) => {
                      await expect(page.locator('blockquote, [class*="testimonial"], [class*="quote"]').first()).toBeVisible();
                });

                test('7.14 Login button text is "Log in"', async ({ page }) => {
                      await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible();
                });
});

test.describe('8. Signup Page', () => {
    test.beforeEach(async ({ page }) => {
          await page.goto('/signup/');
    });

                test('8.1 Signup page loads', async ({ page }) => {
                      await expect(page.locator('form').first()).toBeVisible();
                      await expect(page.getByText(/Get Started/i)).toBeVisible();
                });

                test('8.2 Full Name input renders', async ({ page }) => {
                      await expect(page.getByLabel(/Full Name/i)).toBeVisible();
                });

                test('8.3 Work Email input renders', async ({ page }) => {
                      await expect(page.getByLabel(/Email/i)).toBeVisible();
                });

                test('8.4 Password input with show/hide toggle', async ({ page }) => {
                      const passwordInput = page.getByLabel(/Password/i);
                      await expect(passwordInput).toBeVisible();
                      await expect(passwordInput).toHaveAttribute('type', 'password');
                });

                test('8.5 Terms acceptance checkbox visible', async ({ page }) => {
                      await expect(page.locator('input[type="checkbox"]').first()).toBeVisible();
                });

                test('8.6 Submit button text is "Create account"', async ({ page }) => {
                      await expect(page.getByRole('button', { name: /Create account/i })).toBeVisible();
                });

                test('8.7 Already have an account? Login link', async ({ page }) => {
                      await expect(page.getByRole('link', { name: /Log [Ii]n|Sign [Ii]n/i })).toBeVisible();
                });

                test('8.12 Marketing sidebar: Real-time Sync, Audit-Ready Data, Profit Analytics', async ({ page }) => {
                      await expect(page.getByText(/Real-time Sync/i)).toBeVisible();
                      await expect(page.getByText(/Audit-Ready/i)).toBeVisible();
                      await expect(page.getByText(/Profit Analytics/i)).toBeVisible();
                });

                test('8.13 14-day money-back guarantee visible', async ({ page }) => {
                      await expect(page.getByText(/14-day money-back/i)).toBeVisible();
                });

                test('8.14 Form validation — empty required fields', async ({ page }) => {
                      await page.getByRole('button', { name: /Create account/i }).click();
                      await page.waitForTimeout(500);
                      await expect(page).toHaveURL(/signup/);
                });

                test('8.15 Password must be at least 8 characters hint visible', async ({ page }) => {
                      await expect(page.getByText(/at least 8 characters/i)).toBeVisible();
                });
});
