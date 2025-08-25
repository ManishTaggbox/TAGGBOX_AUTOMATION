import { test, expect } from '../moderationfixtures.js';
import { FEED_PATH } from '../../utils/constants.js';
import NullFields from '../../pageobjects/login/NullField.js';
import InvalidCredentials from '../../pageobjects/login/InvalidCredentials.js';
import ValidCredentials from '../../pageobjects/login/ValidCredentials.js';
import EmailCaseSensitivity from '../../pageobjects/login/EmailCaseSensitivity.js';
import LoginPageLinks from '../../pageobjects/login/LoginPageLinks.js';
import PasswordMasking from '../../pageobjects/login/PasswordMasking.js';

const LOGIN_URL = 'https://app.taggbox.com/accounts/login';

async function setupPage(page, token, url = LOGIN_URL) 
{
    await page.goto(url);
}

test.describe('Login Tests', () =>
{
    test('@NullField - Login with empty fields', async ({ page, token }) =>
    {
        await setupPage(page, token);
        const nullField = new NullFields(page);
        await nullField.nullField();
    });

    test('@InvalidData - Login with invalid credentials', async ({ page, token }) =>
    {
        await setupPage(page, token);
        const invalidData = new InvalidCredentials(page);
        await invalidData.invalidCredentials();
    });

    test('@ValidData - Login with valid credentials', async ({ page, token }) =>
    {
        await setupPage(page, token);
        const validData = new ValidCredentials(page);
        await validData.validCredentials();
    });

    test('@EmailCaseSensitivity - Login with email in uppercase', async ({ page, token }) =>
    {
        await setupPage(page, token);
        const caseSensitivity = new EmailCaseSensitivity(page);
        await caseSensitivity.emailCaseSensitivity();
    });

    test('@LoginPageLinks - Validate the URL present on login page', async ({ page, token }) =>
    {
        await setupPage(page, token);
        const pageLinks = new LoginPageLinks(page);
        await pageLinks.loginPageLinks();
    });

    test('@CheckPasswordMasking - Validate password masking handled properly', async ({ page, token }) =>
    {
        await setupPage(page, token);
        const masking = new PasswordMasking(page);
        await masking.passwordMasking();
    });
});