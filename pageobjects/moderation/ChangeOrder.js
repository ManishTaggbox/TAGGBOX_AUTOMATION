const { test, expect } = require('@playwright/test');

class ChangeOrder 
{
    constructor(page) 
    {
        this.page = page;
        this.pinIcon = page.locator('//i[contains(@class,"fa-thumbtack")]');
        this.threeDotsIcon = page.locator('//div[@class="dropdown"]//button');
        this.changeOrderOption = page.locator('//a[text()="Change Order"]');
        this.source = page.locator('(//div[@class="p-2 card-body"])[2]');
        this.target = page.locator('(//div[@class="p-2 card-body"])[1]');
        this.doneBtn = page.locator('//button[text()="Done"]');
        this.toastMsg = page.locator('//div[text()="Post Pin Order change Sucessfully"]');
        this.closeBtn = page.locator('//button[@class="btn-close"]');      
    }

    async changeOrder() 
    {
        await test.step("Step 1: Click on PinToTop icon for three posts", async () => 
        {
            for(let i=0; i<=1; i++)
            {
                await this.pinIcon.nth(i).waitFor({state: 'visible', timeout: 5000});
                await this.pinIcon.nth(i).click();  
                console.log(`Post ${i+1} pinned`);
                await this.page.waitForTimeout(2000);    
            }
        });

        await test.step("Step 2: Click on three dot icons for first post", async () => 
        {
            await this.threeDotsIcon.nth(0).waitFor({state: 'visible', timeout: 5000});
            await this.threeDotsIcon.nth(0).click();   

            console.log("Clicked on three dot icon of first pinned post");
        });

        await test.step("Step 3: Click to option 'Change Order'", async () => 
        {
            await this.changeOrderOption.waitFor({state: 'visible', timeout: 5000});
            await this.changeOrderOption.click();   
            
            await this.page.waitForTimeout(5000);

            console.log("Clicked on 'Change Order' option");
        });

        await test.step("Step 4: Drag & Drop the element", async () => 
        {
            const source = this.source;
            const target = this.target;

            const sourceBox = await source.boundingBox();
            const targetBox = await target.boundingBox();

            if (sourceBox && targetBox) 
            {
            // Move mouse to source element center
            await this.page.mouse.move(sourceBox.x + sourceBox.width / 2, sourceBox.y + sourceBox.height / 2);
            await this.page.mouse.down(); // click & hold

            // Move to target element center
            await this.page.mouse.move(targetBox.x + targetBox.width / 2, targetBox.y + targetBox.height / 2, { steps: 10 });
            await this.page.mouse.up(); // release
            }

            console.log("Element dragged manually with mouse simulation!");

            await this.page.waitForTimeout(5000);
        });

        await test.step("Step 5: Click to 'Done' button to set the order", async () => 
        {
            await this.doneBtn.waitFor({state: 'visible', timeout: 5000});
            await this.doneBtn.click();   

            console.log("Clicked on 'Done' button");
        });

        await test.step("Step 6: Assert the displayed toast message", async () => 
        {
            await this.toastMsg.waitFor({state: 'visible', timeout: 5000});
            await expect.soft(this.toastMsg).toHaveText('Post Pin Order change Sucessfully');
            await this.page.waitForTimeout(5000);    
        });

        await test.step("Step 7: Click to 'Close' button to close the popup", async () => 
        {
            await this.closeBtn.waitFor({state: 'visible', timeout: 5000});
            await this.closeBtn.click();   

            console.log("Clicked to close the popup");
        });

        await test.step("Step 8: Click to unpin pinned posts", async () => 
        {
            for(let i=0; i<=1; i++)
            {
                await this.pinIcon.nth(i).waitFor({state: 'visible', timeout: 5000});
                await this.pinIcon.nth(i).click();  
                console.log(`Post ${i+1} pinned`);
                await this.page.waitForTimeout(2000);    
            }
        });
    }
}

export default ChangeOrder;