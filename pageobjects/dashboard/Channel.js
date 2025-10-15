const { test, expect } = require('@playwright/test');

import {CHANNEL} from './constant.js'; 

class Channel
{
    constructor(page) 
    {
        // Add Channel With No Gallery
        this.page = page;
        this.addChannelBtn = page.locator('//button[text()="Add Channel"]').last();
        this.errorMsg = page.locator('//div[text()="Please create a Content Gallery before setting up your website."]');

        // Add Channel
        this.publishBtn = page.locator('#web_save_btn');
        this.validationMsg = page.locator('//span[@class="invalid-feedback"]');
        this.channelNameField = page.locator('#g_name');
        this.toastMsg = page.locator('//div[text()="Website created successfully."]');
        this.homeMenu = page.locator('//span[text()="Home"]');
        this.channelTable = page.locator('//tbody//tr').last();        
    }

    async addChannelWithNoGallery() 
    {
        await test.step("Step 1: Assert 'Add Channel' is displayed when no channel is present", async () => 
        {
            await this.addChannelBtn.waitFor({ state: 'visible', timeout: 5000 });
            await this.addChannelBtn.click();
            
            console.log("'Add Channel' button is displayed when no channel is present");
        });

        await test.step("Step 2: Assert the error msg", async () => 
        {
            await this.errorMsg.waitFor({ state: 'visible', timeout: 5000 });
            await expect.soft(this.errorMsg).toHaveText('Please create a Content Gallery before setting up your website.');
            
            console.log("Validated the error msg after creating new channel without gallery");
        }); 
    }

    async addChannel()
    {
        await test.step("Step 1: Click on 'Add Channel' btn", async () => 
        {
            await this.addChannelBtn.waitFor({ state: 'visible', timeout: 5000 });
            await this.addChannelBtn.click();
            
            console.log("Clicked to 'Add Channel' button");
        });

        await test.step("Step 2: Click to 'Save' btn with null fields", async () => 
        {
            await this.publishBtn.waitFor({ state: 'visible', timeout: 5000 });
            await this.publishBtn.click();
            
            console.log("Clicked to 'Save' button with null fields");
        });

        await test.step("Step 3: Assert the validation msg for mandatory channel name", async () => 
        {
            await this.validationMsg.waitFor({ state: 'visible'});

            console.log("Channel name field is marked as mandatory");
        });

        await test.step("Step 4: Enter Channel name", async () => 
        {
            await this.channelNameField.fill(CHANNEL.CHANNELNAME);
            await this.publishBtn.click();

            console.log("Enterted channel name as Taggbox`s Channel");
        });

        await test.step("Step 5: Assert the toast msg", async () => 
        {
            await this.toastMsg.waitFor({ state: 'visible', timeout: 5000 });
            await expect.soft(this.toastMsg).toHaveText('Website created successfully.');
            
            console.log("Validated the toast msg after creating new channel");
        });

         await test.step("Step 6: Click to 'Home' menu", async () => 
        {
            await this.homeMenu.waitFor({ state: 'visible', timeout: 5000 });
            await this.homeMenu.click();
            
            console.log("Clicked to 'Home' menu option");
        });

        await test.step("Step 7: Assert created channel displayed in channel section", async () => 
        {
            await this.channelTable.waitFor({ state: 'visible', timeout: 5000 });
            
            console.log("Created channel is displayed in the 'Top Performing Channels' section");
        });
    }
}

export default Channel;
