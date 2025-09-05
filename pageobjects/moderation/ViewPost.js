const { test, expect } = require('@playwright/test');

class ViewPost 
{
    constructor(page) 
    {
        this.page = page;
        this.threeDotsIcon = page.locator('//div[@class="dropdown"]//button');
        this.viewPostOption = page.locator('//a[text()="View post"]');
    }

    async viewPost() 
    {
        await test.step("Step 1: Click on three dot icons for first post", async () => 
        {
            await this.threeDotsIcon.nth(0).waitFor({state: 'visible', timeout: 5000});
            await this.threeDotsIcon.nth(0).click();   

            console.log("✅ Clicked on three dot icon of first pinned post");
        });

        await test.step("Step 2: Click on 'View Posts' option for first post", async () => 
        {
            const [newPage] = await Promise.all
            ([
            this.page.context().waitForEvent('page'),   // waits for a new page (tab) in the browser context
            this.viewPostOption.click()            
            ]);

            // Ensure new tab loaded
            await newPage.waitForLoadState();
            
            const newTabUrl = newPage.url();
            expect.soft(newTabUrl).toMatch(/^https?:\/\//);  // URL starts with http or https

            console.log(`✅ 'View Post' opened successfully in a new tab with URL: ${newTabUrl}`);
        });
    }
}

export default ViewPost;