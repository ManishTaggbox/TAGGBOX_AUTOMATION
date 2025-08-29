const { test, expect } = require('@playwright/test');

class Intercom
{
    constructor(page) 
    {
        this.page = page;
  
        // Intercom iframe reference
        this.frame = page.frameLocator('iframe[name="intercom-messenger-frame"]');

        // Frame locators
        this.chatNowBtn = page.locator('//button[text()="Chat Now"]');    
        this.findTimeBtn = this.frame.locator('//button[text()="Find a time"]');
        this.calenderTitle = this.frame.locator('//h1[text()="Product Demo - Customer Success Team"]');
        this.backBtn = this.frame.locator('//button[@aria-label="go back"]');
        this.msgSendBtn = this.frame.locator('//div[text()="Send us a message"]');
        this.textArea = this.frame.locator('//textarea[@placeholder="Message…"]');
        this.closeIcon = this.frame.locator('//div[@data-testid="close-button"]');

        this.chatIcon = page.locator('//div[@data-testid="launcher-minimize-icon"]');
    }

    async intercom() 
    {
        await test.step("Step 1: Verify 'Chat Now' btn is visible and clickable", async () => 
        {
            await this.chatNowBtn.waitFor({ state: 'visible', timeout: 5000 });
            await this.chatNowBtn.click();
            
            console.log("Clicked to 'Chat Now' btn present on dashboard");
        });

        await test.step("Step 2: Assert chat section", async () => 
        {
            await this.findTimeBtn.waitFor({ state: 'visible', timeout: 5000 });
            
            console.log("Intercom section validated");
        }); 

        await test.step("Step 3: Click to 'Find a time'", async () => 
        {
            await this.findTimeBtn.click();
            
            console.log("Clicked to 'Find a time' button");
        }); 

        await test.step("Step 4: Assert calender displayed to book a demo call", async () => 
        {
            await this.backBtn.waitFor({ state: 'visible', timeout: 5000 });
            await this.backBtn.click();            
            
            console.log("Calender is displayed to book a demo call");
        }); 

        await test.step("Step 5: Assert displayed message section", async () => 
        {
            await this.msgSendBtn.waitFor({ state: 'visible', timeout: 5000 });
            await this.msgSendBtn.click();         
            
            await this.textArea.waitFor({ state: 'visible', timeout: 5000 });
            await this.textArea.click();
            
            console.log("Message section is displayed");
        }); 

        await test.step("Step 6: Close the chat section", async () => 
        {
            await this.closeIcon.waitFor({ state: 'visible', timeout: 5000 });
            await this.closeIcon.click();         
            
            console.log("Chat section closed successfuly");
        });
    }    
}

export default Intercom;
