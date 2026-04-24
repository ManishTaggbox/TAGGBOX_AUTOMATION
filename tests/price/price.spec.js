import { test51 as test, expect } from '../taggboxfixture.js';
import Price from '../../pageobjects/price/Price.js';

// Constants
const PRICE_URL = 'https://app.taggbox.com/transactions';

// Helper function for common setup
async function setupPricePage(page, token) {
    await test.step("Setup: Set authentication token and navigate to price page", async () => {
        await page.addInitScript(t => localStorage.setItem('token', t), token);
        await page.goto(PRICE_URL);
    });


}
            
test('@VerifyPrice - Verify user price details are displayed correctly', async ({ page, token }) => {
        await setupPricePage(page, token);
        
        const verify = new Price(page);
        await verify.priceCheck();
    });