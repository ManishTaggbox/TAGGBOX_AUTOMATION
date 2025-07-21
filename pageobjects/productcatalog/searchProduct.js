const { test, expect } = require('@playwright/test');

class SearchProduct {
    constructor(page) {
        this.page = page;
        this.searchBox = page.locator('#search_pro');
        this.productSearchResult = page.locator('//span[text()="Apple iPhone 12"]');
        this.searchClear = page.locator('#search_spinner');
        this.skuSearchResult = page.locator('//span[text()="YX3901"]');
    }

    async searchProduct() {
        await test.step("Step 1: Search by product name - Enter 'Apple iPhone 12'", async () => {
            await this.searchBox.fill('Apple iPhone 12');
        });

        await test.step("Step 2: Wait for search results to load", async () => {
            await this.page.waitForTimeout(2000);
        });

        await test.step("Step 3: Verify product search result is visible", async () => {
            await expect.soft(this.productSearchResult).toBeVisible();
        });

        await test.step("Step 4: Verify product name matches in search results", async () => {
            await expect(this.productSearchResult).toHaveText('Apple iPhone 12');
        });

        await test.step("Step 5: Clear previous search", async () => {
            await this.searchClear.click();
        });

        await test.step("Step 6: Search by SKU - Enter 'YX3901'", async () => {
            await this.searchBox.fill('YX3901');
        });

        await test.step("Step 7: Wait for SKU search results to load", async () => {
            await this.page.waitForTimeout(2000);
        });

        await test.step("Step 8: Verify SKU search result is visible", async () => {
            await expect.soft(this.skuSearchResult).toBeVisible();
        });

        await test.step("Step 9: Verify SKU matches in search results", async () => {
            await expect.soft(this.skuSearchResult).toHaveText('YX3901');
        });
    }
}

module.exports = SearchProduct;