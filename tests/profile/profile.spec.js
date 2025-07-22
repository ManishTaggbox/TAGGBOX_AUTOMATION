import { test, expect } from '../fixtures.js';
import VerifyExistingDetails from '../../pageobjects/profile/verifyExistingDetails.js';
import EditDetails from '../../pageobjects/profile/editDetails.js';
import ResetPassword from '../../pageobjects/profile/resetPassword.js';


test('@VerifyExistingDetails', async ({ page, token }) => {
    await page.addInitScript(t => localStorage.setItem('token', t), token);
    await page.goto('https://app.taggbox.com/profile');
    const verify = new VerifyExistingDetails(page);
    await verify.verifyDetails();
});

test('@EditDetails', async ({ page, token }) => {
    await page.addInitScript(t => localStorage.setItem('token', t), token);
    await page.goto('https://app.taggbox.com/profile');
    const edit = new EditDetails(page);
    await edit.editDetails();
});


test('@ResetPassword', async ({ page, token }) => {
    await page.addInitScript(t => localStorage.setItem('token', t), token);
    await page.goto('https://app.taggbox.com/profile');
    const reset = new ResetPassword(page);
    await reset.passwordReset();
});

