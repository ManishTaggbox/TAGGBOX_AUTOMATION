// tests/onboarding/SignIn.spec.js
import { test, expect } from '../fixtures.js';

test('@Google Place the order', async ({ page, token }) => {
  await page.addInitScript(t => localStorage.setItem('token', t), token);
  await page.goto('https://app.taggbox.com/content/addfeed/2187896/18');
});
