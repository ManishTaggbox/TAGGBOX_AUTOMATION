const { expect } = require('@playwright/test');


class SearchProduct
 {
    constructor(page) 
    {
        this.page = page;
        this.searchBox = page.locator('#search_pro');
        this.productSearchResult = page.locator('//span[text()="Apple iPhone 12"]');
        this.searchClear = page.locator('#search_spinner');
        this.skuSearchResult = page.locator('//span[text()="YX3901"]'); 
      
    }

    async searchProduct() 
    {
        // Search by product name
        await this.searchBox.fill('Apple iPhone 12');
        await this.page.waitForTimeout(2000);
        await expect(this.productSearchResult).toBeVisible();
        await expect(this.productSearchResult).toHaveText('Apple iPhone 12');

        // Search by SKU 
        await this.searchClear.click()
        await this.searchBox.fill('YX3901');
        await this.page.waitForTimeout(2000);
        await expect(this.skuSearchResult).toBeVisible();
        await expect(this.skuSearchResult).toHaveText('YX3901');
    
    }
}

module.exports = SearchProduct;