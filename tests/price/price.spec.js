import { test51 as test, expect } from '../taggboxfixture.js';
import Price from '../../pageobjects/price/Price.js';
import StarterPlan from '../../pageobjects/price/StarterPlan.js';
import GrowthPlan from '../../pageobjects/price/GrowthPlan.js';
import { FEED_PATH } from '../../utils/constants.js';   

// Constants
const PRICE_URL = FEED_PATH.PRICE_URL;

// Helper function for common setup
async function setupPricePage(page, token) {
    await test.step("Setup: Set authentication token and navigate to price page", async () => {
        await page.addInitScript(t => localStorage.setItem('token', t), token);
        await page.goto(PRICE_URL);
    });
}
           
test.describe('Price Page Tests', () => {

    test('@VerifyPrice - Verify user price details are displayed correctly', async ({ page, token }) => {
        await setupPricePage(page, token);
        
        const verify = new Price(page);
        await verify.priceCheck();
    });

    test('@VerifyStarterPlanPrice - Validate Starter Plan monthly vs yearly price consistency', async ({ page, token }) => {
        await setupPricePage(page, token);
        
        const starterPlan = new StarterPlan(page);
        await starterPlan.verifyStarterPlanPrice();
    });

    test('@VerifyGrowthPlanPrice - Validate Growth Plan monthly vs yearly price consistency', async ({ page, token }) => {
        await setupPricePage(page, token);
        
        const growthPlan = new GrowthPlan(page);
        await growthPlan.verifyGrowthPlanPrice();
    });

     

});    