import { test, expect } from '../fixtures.js';
import VerifyExistingDetails from '../../pageobjects/profile/verifyExistingDetails.js';
import EditDetails from '../../pageobjects/profile/editDetails.js';
import ResetPassword from '../../pageobjects/profile/resetPassword.js';

// Constants
const PROFILE_URL = 'https://app.taggbox.com/profile';

// Helper function for common setup
async function setupProfilePage(page, token) {
    await test.step("Setup: Set authentication token and navigate to profile", async () => {
        await page.addInitScript(t => localStorage.setItem('token', t), token);
        await page.goto(PROFILE_URL);
    });
}

test.describe('Profile Management Tests', () => {
    
    test('@VerifyExistingDetails - Verify user profile details are displayed correctly', async ({ page, token }) => {
        await setupProfilePage(page, token);
        
        const verify = new VerifyExistingDetails(page);
        await verify.verifyDetails();
    });

    test('@EditDetails - Edit and update user profile details', async ({ page, token }) => {
        await setupProfilePage(page, token);
        
        const edit = new EditDetails(page);
        await edit.editDetails();
    });

    test('@ResetPassword - Reset user password with validation', async ({ page, token }) => {
        await setupProfilePage(page, token);
        
        const reset = new ResetPassword(page);
        await reset.passwordReset();
    });

});

