import { test } from '@playwright/test';
import LoginPage from '../../pageobjects/onbording/Login.js';

test('test', async ({ page }) => {

  const  Login = new LoginPage(page)
   await page.goto('https://app.taggbox.com/login');
  await Login.login()

});