import { test, expect } from '@playwright/test';

class CreateWebsite {
    constructor(page) {
        this.page = page;
    }

    get addChannel() { return this.page.locator("//button[@aria-label='Add Channel']"); }
    get publishbtn() { return this.page.locator('#web_save_btn'); }
    get emptyChannelNameErrorMsg() { return this.page.locator('.invalid-feedback'); }
    get enterChannelName() { return this.page.locator('#g_name'); }
    get successMsg() { return this.page.locator("//div[contains(text(),'Website created successfully.')]"); }

    async createWebsite(channelName) {
        await test.step("Step 1.1: Click 'Add Channel' button", async () => {
            await this.addChannel.waitFor({ state: 'visible', timeout: 20000 });
            await this.addChannel.click();
        });

        await test.step("Step 1.4: Try to publish without entering channel name", async () => {
            await this.publishbtn.waitFor({ state: 'visible', timeout: 10000 });
            await this.publishbtn.click();

            await this.emptyChannelNameErrorMsg.waitFor({ state: 'visible', timeout: 10000 });
            await expect.soft(this.emptyChannelNameErrorMsg).toHaveText('Please enter a name');
        });

        await test.step("Step 1.5: Enter dynamic channel name and publish", async () => {
            await this.enterChannelName.waitFor({ state: 'visible', timeout: 10000 });
            await this.enterChannelName.fill(channelName); // use the dynamic value

            await this.publishbtn.waitFor({ state: 'visible', timeout: 10000 });
            await this.publishbtn.click();
        });

        await test.step("Step 1.6: Wait for success message and validate", async () => {
            await this.successMsg.waitFor({ state: 'visible', timeout: 20000 });
            await expect.soft(this.successMsg).toHaveText('Website created successfully.');
        });
    }
}

export default CreateWebsite;
