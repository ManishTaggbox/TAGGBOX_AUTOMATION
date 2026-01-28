const { test, expect } = require('@playwright/test');

import ReviewHub from '../feeds/reviewhub/ReviewHub.js';
import {FLICKRHASHTAG} from './constant.js';

class RecentPosts
{
    constructor(page) 
    {
        this.page = page;

        this.addFeedBtn = page.locator('//button[text()="Add Feed Now"]');
        this.flickrIcon = page.locator('//span[text()="Flickr"]');
        this.hashtagField = page.locator('#Hashtag-text');
        this.createFeedBtn = page.locator('#create_feed'); 
        this.homeMenu = page.locator('//span[text()="Home"]');
        this.postCard = page.locator('.item-post');
        this.aggregatedTab = page.locator('//span[text()="Aggregated"]');
        this.collectedTab = page.locator('//span[text()="Collected"]');
        this.reviewHubIcon = page.locator('//span[text()="Review Hub"]').last();
        this.privateBtn = page.locator('//button[text()="Private"]').first();
        this.toastMsg1 = page.locator('//div[text()="Post is Private now"]');
        this.publicBtn = page.locator('//button[text()="Public"]').first();
        this.toastMsg2 = page.locator('//div[text()="Post is Public now"]');
        this.moderationBtn = page.locator('//span[text()="Go to Moderation"]');
    }

    async recentPosts() 
    {
        await test.step("Step 1: Verify by clicking on 'Add Feed Now' button", async () => 
        {
            await this.addFeedBtn.waitFor({ state: 'visible', timeout: 5000 });
            await this.addFeedBtn.click();
            
            console.log("✅ Clicked to 'Add Feed Now' btn");
        });

        await test.step("Step 2: Create feed with Flickr hashtag", async () => 
        {
            await this.flickrIcon.waitFor({ state: 'visible', timeout: 5000 });
            await this.flickrIcon.click();

            await this.hashtagField.fill(FLICKRHASHTAG.HASHTAG);

            await this.page.waitForTimeout(2000);

            await this.createFeedBtn.waitFor({ state: 'visible', timeout: 5000 });
            await this.createFeedBtn.click();

            await this.page.waitForTimeout(5000);
            
            console.log("✅ Feed is created with Flickr - Hashtag");
        });

        await test.step("Step 3: Navigating back to home page", async () => 
        {
            await this.homeMenu.waitFor({ state: 'visible', timeout: 5000 });
            await this.homeMenu.click();

            await this.page.waitForTimeout(10000);
            
            console.log("✅ Redirected to home page");
        });

        await test.step("Step 4: Assert recent posts are displayed for 'All' tab", async () => 
        {
            const count = await this.postCard.count();
            expect.soft(count).toBeGreaterThan(0);

            console.log(`✅ Total posts found in 'Recent Posts - All' tab: ${count}`);
        });

        await test.step("Step 5: Click to make first post 'Private'", async () => 
        {
            await this.privateBtn.waitFor({ state: 'visible', timeout: 5000 });
            await this.privateBtn.click();
            
            console.log("✅ Marked the first post as private");
        });

        await test.step("Step 6: Assert the toast msg", async () => 
        {
            await this.toastMsg1.waitFor({ state: 'visible', timeout: 5000 });
            await expect.soft(this.toastMsg1).toHaveText("Post is Private now");
            
            console.log("✅ Toast msg displayed properly");
        });

        await test.step("Step 7: Click to make first post 'Public'", async () => 
        {
            await this.publicBtn.waitFor({ state: 'visible', timeout: 5000 });
            await this.publicBtn.click();
            
            console.log("✅ Marked the first post as public");
        });

        await test.step("Step 8: Assert the toast msg", async () => 
        {
            await this.toastMsg2.waitFor({ state: 'visible', timeout: 5000 });
            await expect.soft(this.toastMsg2).toHaveText("Post is Public now");
            
            console.log("✅ Toast msg displayed properly");
        });

        await test.step("Step 9: Click to open first post", async () => 
        {
            await this.postCard.first().waitFor({ state: 'visible', timeout: 5000 });
            await this.postCard.first().click();
            
            console.log("✅ Clicked to open the first post");
        });

        await test.step("Step 10: Click to 'Go to Moderation' btn present in the post", async () => 
        {
            await this.moderationBtn.waitFor({ state: 'visible', timeout: 5000 });
            await this.moderationBtn.click();
            
            console.log("✅ Clicked to 'Go to Moderation' btn");
        });

        await test.step("Step 11: Navigating back to home page", async () => 
        {
            await this.homeMenu.waitFor({ state: 'visible', timeout: 5000 });
            await this.homeMenu.click();

            await this.page.waitForTimeout(10000);
            
            console.log("✅ Redirected to home page");
        });

        await test.step("Step 12: Assert the 'Aggregated' tab is clickable", async () => 
        {
            await this.aggregatedTab.waitFor({ state: 'visible', timeout: 5000 });
            await this.aggregatedTab.click();
            
            console.log("✅ Navigated to 'Aggregated' tab successfully");
        });

        await test.step("Step 13: Assert recent posts are displayed for 'Aggregated' tab", async () => 
        {
            const count = await this.postCard.count();
            expect.soft(count).toBeGreaterThan(0);

            console.log(`✅ Total posts found in 'Recent Posts - Aggregated' tab: ${count}`);
        });

        await test.step("Step 14: Assert the 'Collected' tab is clickable", async () => 
        {
            await this.collectedTab.waitFor({ state: 'visible', timeout: 5000 });
            await this.collectedTab.click();
            
            console.log("✅ Navigated to 'Collected' tab successfully");
        });
    }     
}

export default RecentPosts;
