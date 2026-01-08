const { test, expect } = require('@playwright/test');

class ShoppableDisable
{
    constructor(page) 
    {
        this.page = page;
        this.appsMoreMenu = page.locator('#apps_more');
               
    }

    async shoppableDisableConditions() 
    {
        await test.step("Step 1: Assert 'Apps & More' is displayed and clicked", async () => 
        {
            await this.appsMoreMenu.waitFor({ state: 'visible', timeout: 5000 });
            await this.appsMoreMenu.click();
            
            console.log("'Apps & More' menu is displayed and clicked");
        });
        
    }
    
}

export default ShoppableDisable;
