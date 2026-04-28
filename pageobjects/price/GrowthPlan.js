import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

class GrowthPlan
{
    constructor(page) 
    {
        this.page = page;
        this.editBtn = page.locator('.fa-regular.fa-pen-to-square');
        this.growthPlanPrice = page.locator('.price').nth(1);
        this.selectPlanBtn = page.locator('//button[text()="Select Plan"]').nth(1);
        this.twoCheckoutBtn = page.locator('//span[normalize-space()="For Amex and Paypal Users"]');
    
        //this.checkoutPrice = page.locator('.formatted-price').nth(0);
        this.checkoutPrice = page.locator('.formatted-price');
    }
    
    async verifyGrowthPlanPrice() {

        let monthlyGrowthPlanPrice;

        await test.step('Step 1: Wait for edit button to be visible and enabled', async () => {
            await this.editBtn.waitFor({ state: 'visible', timeout: 10000 });
            await expect(this.editBtn).toBeEnabled();
        });
 
        await test.step('Step 2: Click the edit button', async () => {
            await this.editBtn.click();
        });
 
        await test.step('Step 3: Capture Growth Plan monthly price', async () => {
            monthlyGrowthPlanPrice = await this.growthPlanPrice.innerText();
            console.log('Monthly Growth Plan Price (USD):', monthlyGrowthPlanPrice);
        });

        await test.step('Step 4: Click to Select Growth Plan', async () => {
            await this.selectPlanBtn.waitFor({ state: 'visible', timeout: 5000 });
            await this.selectPlanBtn.click();
        });

        await test.step('Step 5: Choose payment method as 2Checkout', async () => {
            await this.twoCheckoutBtn.waitFor({ state: 'visible', timeout: 5000 });
            await this.twoCheckoutBtn.click();
        });

        await test.step('Step 6: Verify yearly pricing information on 2Checkout page', async () => {
            const yearlyCheckoutPriceText = await this.checkoutPrice.innerText();
            
            // Extract numeric value
            const yearlyCheckoutPrice = parseFloat(yearlyCheckoutPriceText.replace(/[^0-9.]/g, ''));
            console.log('Yearly Price on 2Checkout Page (USD):', yearlyCheckoutPrice);
            
            // Expected yearly calculation
            const expectedYearlyPrice = monthlyGrowthPlanPrice * 12;

            // Assertion
            expect(yearlyCheckoutPrice).toBe(expectedYearlyPrice);
        });

        await test.step('Step 7: Navigate back to the pricing page', async () => {
            await this.page.goBack({ waitUntil: 'load' });
        });

        // Choose payment method as Strip : Currently, Stripe url is breaking on staging env
        
    }
}

export default GrowthPlan;
