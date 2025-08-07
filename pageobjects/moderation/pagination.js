const { test, expect } = require('@playwright/test');

class Pagination 
{
    constructor(page) 
    {
        this.page = page;
        this.rightAngle = page.locator('.fa-solid.fa-angle-right'); 
        this.activePage = page.locator('//li[@class="page-item active"]//span');
        this.leftAngle = page.locator('.fa-solid.fa-angle-left'); 
    }

    async pagination() 
    {
        await test.step("Step 1: Click to go on next page by clicking on right arrow icon", async () => 
        {
            await this.page.waitForTimeout(5000);
            await this.rightAngle.click();
            await this.page.waitForTimeout(2000);
        });

        await test.step("Step 2: Assert the active page icon is highligted", async () => 
        {
            await this.activePage.waitFor({ state: 'visible', timeout: 5000 });

            const color = await this.activePage.evaluate(el => getComputedStyle(el).backgroundColor);
            expect.soft(color).toBe('rgb(26, 35, 47)'); 
        });

        await test.step("Step 3: Click to go on next page by clicking on right arrow icon", async () => 
        {
            await this.page.waitForTimeout(2000);
            await this.rightAngle.click();
            await this.page.waitForTimeout(2000);
        });

        await test.step("Step 4: Assert the active page icon is highligted", async () => 
        {
            await this.activePage.waitFor({ state: 'visible' , timeout: 5000 });

            const color = await this.activePage.evaluate(el => getComputedStyle(el).backgroundColor);
            expect.soft(color).toBe('rgb(26, 35, 47)'); 
        });

        await test.step("Step 5: Click to go on previous page by clicking on left arrow icon", async () => 
        {
            await this.page.waitForTimeout(2000);
            await this.leftAngle.click();
            await this.page.waitForTimeout(2000);
        });

        await test.step("Step 6: Assert the active page icon is highligted", async () => 
        {
            await this.activePage.waitFor({ state: 'visible', timeout: 5000 });

            const color = await this.activePage.evaluate(el => getComputedStyle(el).backgroundColor);
            expect.soft(color).toBe('rgb(26, 35, 47)'); 
        });

        await test.step("Step 7: Click to go on previous page by clicking on left arrow icon", async () => 
        {
            await this.page.waitForTimeout(2000);
            await this.leftAngle.click();
            await this.page.waitForTimeout(2000);
        });

        await test.step("Step 6: Assert the active page icon is highligted", async () => 
        {
            await this.activePage.waitFor({ state: 'visible', timeout: 5000 });

            const color = await this.activePage.evaluate(el => getComputedStyle(el).backgroundColor);
            expect.soft(color).toBe('rgb(26, 35, 47)'); 
        });
    }
}

export default Pagination;
