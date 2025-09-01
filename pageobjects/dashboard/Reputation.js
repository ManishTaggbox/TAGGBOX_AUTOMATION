const { test, expect } = require('@playwright/test');

import {GOOGLEREVIEW} from './constant.js';

class Reputation
{
    constructor(page) 
    {
        this.page = page;
        this.reputationTab = page.locator('//a[text()="Reputation"]');
        this.createFeedBtn = page.locator('//button[text()="Create Review Feed!"]');
        this.googleReviewIcon = page.locator('//span[text()="Google Review"]'); 
        this.addressField = page.locator('//input[@placeholder="Type address"]');
        this.dropDownOption = page.locator('//a[@role="option"]').first();
        this.feedBtn = page.locator('#create_feed');
        this.homeMenu = page.locator('//span[text()="Home"]');
        this.ratingView = page.locator('.rating-breakdown');
    }

    async reputationData() 
    {
        await test.step("Step 1: Navigate to 'Reputation' tab", async () => 
        {
            await this.reputationTab.waitFor({ state: 'visible', timeout: 5000 });
            await this.reputationTab.click();
            
            console.log("✅ Clicked to 'Reputation' tab");
        });

        await test.step("Step 2: Click to 'Create Review Feed' btn", async () => 
        {
            await this.createFeedBtn.waitFor({ state: 'visible', timeout: 5000 });
            await this.createFeedBtn.click();
            
            console.log("✅ Clicked to 'Create Review Feed' btn");
        });

        await test.step("Step 3: Click to 'Google Review' icon", async () => 
        {
            await this.googleReviewIcon.waitFor({ state: 'visible', timeout: 5000 });
            await this.googleReviewIcon.click();
            
            console.log("✅ Clicked to 'Google Review' btn");
        });

        await test.step("Step 4: Create 'Google Review' feed", async () => 
        {
            await this.addressField.fill(GOOGLEREVIEW.PLACE);

            await this.dropDownOption.waitFor({ state: 'visible', timeout: 5000 });
            await this.dropDownOption.click();

            await this.page.waitForTimeout(2000);

            await this.feedBtn.waitFor({ state: 'visible', timeout: 5000 });
            await this.feedBtn.click();

            await this.page.waitForTimeout(5000);
            
            console.log("✅ Feed is created with Google Review");    
        });

        await test.step("Step 5: Navigating back to home page", async () => 
        {
            await this.homeMenu.waitFor({ state: 'visible', timeout: 5000 });
            await this.homeMenu.click();

            await this.page.waitForTimeout(10000);
            
            console.log("✅ Redirected to home page");
        });

        await test.step("Step 6: Navigate to 'Reputation' tab", async () => 
        {
            await this.reputationTab.waitFor({ state: 'visible', timeout: 5000 });
            await this.reputationTab.click();
            
            console.log("✅ Clicked to 'Reputation' tab");
        });

        await test.step("Step 7: Assert the data displayed in 'Reputation' ection", async () => 
        {
            await this.ratingView.waitFor({ state: 'visible', timeout: 5000 });
            
            console.log("✅ Data verified for 'Reputation' tab");
        });
    }
}

export default Reputation;
