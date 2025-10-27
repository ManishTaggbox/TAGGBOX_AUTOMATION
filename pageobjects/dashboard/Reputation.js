const { test, expect } = require('@playwright/test');

import { GOOGLEREVIEW } from './constant.js';

class Reputation 
{
    constructor(page) 
    {
        // Dashboard Page Locators
        this.page = page;
        this.reputationTab = page.locator('//a[text()="Reputation"]');
        this.createFeedBtn = page.locator('//button[text()="Create Review Feed!"]');
        this.googleReviewIcon = page.locator('//span[text()="Google Review"]');
        this.addressField = page.locator('//input[@placeholder="Type address"]');
        this.dropDownOption = page.locator('//a[@role="option"]').first();
        this.feedBtn = page.locator('#create_feed');
        this.homeMenu = page.locator('#home_menu');
        this.ratingView = page.locator('.rating-breakdown');

        // Delete feed locators
        this.editBtn = page.locator('//button[text()="Edit"]');
        this.manageFeedsMenu = page.locator('#manage_feed');
        this.deleteFeedBtn = page.locator('//button[@data-id="delete"]');
        this.deleteConfirmBtn = page.locator('//button[@aria-label="delete_yes"]');
        this.successMsg = page.locator('//div[text()="Feeds Deleted Succesfully."]');
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

            await this.page.waitForTimeout(10000);

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

            // Step 2: Scroll the element into view
            await this.reputationTab.scrollIntoViewIfNeeded();  

            await this.reputationTab.click();

            console.log("✅ Clicked to 'Reputation' tab");
        });

        await test.step("Step 7: Assert the data displayed in 'Reputation' ection", async () => 
        {
            await this.ratingView.waitFor({ state: 'visible', timeout: 5000 });

            console.log("✅ Data verified for 'Reputation' tab");
        });
    }

    // Delete created feed here
    async deleteFeed() 
    {
        await test.step("Step 1: Navigate to 'Home' page", async () => 
        {
            await this.homeMenu.waitFor({ state: 'visible', timeout: 5000 });
            await this.homeMenu.click();

            console.log("✅ Clicked to 'Home' menu");
        });

        await test.step("Step 2: Click to 'Edit' btn", async () =>
        {
            await this.editBtn.waitFor({ state: 'visible', timeout: 5000 });
            await this.editBtn.click();

            console.log("✅ Clicked to 'Edit' btn");
        });

        await test.step("Step 3: Click to 'Manage feeds' menu", async () => 
        {
            await this.manageFeedsMenu.waitFor({ state: 'visible', timeout: 5000 });
            await this.manageFeedsMenu.click();
            await this.page.waitForTimeout(5000);

            console.log("✅ Clicked to 'Manage Feed' menu");
        });

        await test.step("Step 4: Click to 'delete' icon for created feed", async () => 
        {
            let count = 1;

            while (true) 
            {
                const deleteButtons = this.page.locator("//button[@aria-label='delete']");
                const isVisible = await deleteButtons.first().isVisible();

                if (!isVisible) break;

                console.log(`🗑️ Deleting feed #${count}`);

                // Click the first visible delete button
                await deleteButtons.first().click();
                await this.deleteConfirmBtn.click();

                // Optional short wait for DOM to update
                await this.page.waitForTimeout(3000);

                count++;
            }

            if (count === 1) 
            {
                console.log("ℹ️ No feeds found to delete.");
            } else 
            {
                console.log(`✅ All feeds deleted (${count - 1} in total).`);
            }
        });
    }
}

export default Reputation;
