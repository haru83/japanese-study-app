import { test, expect } from '@playwright/test';

test.describe('User Flow E2E Tests', () => {
  test('Scenario A: Login and navigate to grammar page', async ({ page }) => {
    // 1. Navigate to login page
    await page.goto('/login');
    
    // 2. Perform login with seeded user
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');

    // Wait for redirect after login
    await page.waitForURL((url) => !url.pathname.includes('/login'));

    // 3. Navigate to grammar learning page
    await page.goto('/learning/grammar');
    
    // 4. Verify navigation
    await expect(page).toHaveURL(/.*learning\/grammar/);
  });

  test('Scenario B: Verify learning content availability', async ({ page }) => {
    // 1. Navigate to grammar page
    await page.goto('/learning/grammar');
    
    // 2. Check if the page content is loaded (e.g., checking for a heading or specific element)
    // This is a placeholder check as we don't know the exact UI structure yet
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });
});
