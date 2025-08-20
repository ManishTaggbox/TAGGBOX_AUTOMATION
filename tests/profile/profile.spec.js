import { test, expect } from '../fixtures.js';
import VerifyExistingDetails from '../../pageobjects/profile/VerifyExistingDetails.js';
import EditDetails from '../../pageobjects/profile/EditDetails.js';
import ResetPassword from '../../pageobjects/profile/ResetPassword.js';

// Constants
const PROFILE_URL = 'https://app.taggbox.com/profile';

// Helper function for common setup
async function setupProfilePage(page, token) {
    await test.step("Setup: Set authentication token and navigate to profile", async () => {
        await page.addInitScript(t => localStorage.setItem('token', t), token);
        await page.goto(PROFILE_URL);
    });
}

// Serial block to enforce order: 1 -> 2 -> 3
test.describe.serial('Profile Management Tests (Ordered by Priority)', () => {

// test.describe('Profile Management Tests', () => {
    
    test('@VerifyExistingDetails - Verify user profile details are displayed correctly', async ({ page, token }) => {
        await setupProfilePage(page, token);
        
        const verify = new VerifyExistingDetails(page);
        await verify.verifyExistingDetails();
    });

    test('@EditDetails - Edit and update user profile details', async ({ page, token }) => {
        await setupProfilePage(page, token);
        
        const edit = new EditDetails(page);
        await edit.editDetails();
    });

    test('@ResetPassword - Reset user password with validation', async ({ page, token }) => {
        await setupProfilePage(page, token);
        
        const reset = new ResetPassword(page);
        await reset.resetPassword();
    });
});

