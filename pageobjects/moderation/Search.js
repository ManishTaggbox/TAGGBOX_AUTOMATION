const { test, expect } = require('@playwright/test');

class Search 
{
    constructor(page) 
    {
        this.page = page;
        this.searchIcon = page.locator('//button[@aria-label="search"]');  
        this.searchInput = page.locator('#assets_search_input');
        this.dropdownItem = page.locator('.dropdown-item');
        this.filterBadge = page.locator('//div[contains(@class, "d-flex flex-wrap align-items-center")]//span');
        this.resetBtn = page.locator('//button[text()="Reset"]');
        this.filterIcon = page.locator('#filter_aside');
        this.searchBox = page.locator('//input[@placeholder="Search"]');
        this.searchCross = page.locator('//button[@aria-label="search"]');
        this.crossIcon = page.locator('.fa-xmark');
    }

    async searchOperation() 
    {
        await test.step("Step 1: Click on search icon", async () => 
        {
            await this.searchIcon.first().click();
        });

        await test.step("Step 2: Enter the search input", async () => 
        {
            await this.searchInput.fill('TagA');
            await this.dropdownItem.click();
            await this.page.waitForTimeout(5000);
        });

        await test.step("Step 3: Assert the search result", async () => 
        {
            await this.filterBadge.waitFor({ state: 'visible' });
        });

        await test.step("Step 4: Click to reset the serch result", async () => 
        {
            await this.searchCross.first().click();
            await this.resetBtn.click();
        });

        await test.step("Step 5: Click to open filter overlay", async () => 
        {
            await this.filterIcon.click();
        });

        await test.step("Step 6: Enter the search input", async () => 
        {
            await this.searchBox.fill('TagA');
            await this.dropdownItem.click();
        });

        await test.step("Step 7: Click to open filter overlay", async () => 
        {
            await this.crossIcon.nth(1).click();
            await this.page.waitForTimeout(5000);
        });

         await test.step("Step 8: Assert the search result", async () => 
        {
            await this.filterBadge.waitFor({ state: 'visible' });
        });

        await test.step("Step 9: Click to reset the serch result", async () => 
        {
            await this.resetBtn.click();
        });
    }
}

export default Search;
