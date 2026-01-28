const { test, expect } = require('@playwright/test');

class PrivateNetworkPost 
{
    constructor(page) 
    {
        this.page = page;
        this.enterRuleName = page.locator("input[placeholder='Enter rule name']");
        this.addTrigger = page.locator('#rule-dd');
        this.network = page.locator("//p[normalize-space()='Network']");
        this.selectNetwork = page.getByText('Select Network');
        this.instagram = page.locator("//span[normalize-space()='Instagram']");
        this.closeNetwork = page.getByText('Choose the required network');
        this.addAction = page.locator('#rule-action');
        this.private = page.locator("//span[normalize-space()='Private']");
        this.createRule = page.locator("//button[normalize-space()='Create rule']");
        this.ruleCreatedMsg = page.locator("//div[contains(text(),'AutoPilot rule has been added successfully. Posts will be evaluated accordingly.')]");

        //VerifyAutoPilot Locator 

        this.closeIcon = page.locator('.fa-regular.fa-xmark.cursor-pointer.fs-3');
        this.public = page.locator(".nav-link[data-rr-ui-event-key='public']");
        this.privateMsg = page.locator("//h2[contains(text(),'🔒 Whoa, Everything’s Private!')]")
    }

    async privateNetworkPost() 
    {
        await test.step('Fill rule name', async () => 
        {
            await this.page.waitForTimeout(4000);
            await this.enterRuleName.waitFor({ state: 'visible' });
            await this.enterRuleName.fill('Rule 1');
        });

        await test.step('Add Trigger - Network', async () => 
        {
            await this.addTrigger.waitFor({ state: 'visible' });
            await this.addTrigger.click();

            await this.network.waitFor({ state: 'visible' });
            await this.network.click();

            await this.selectNetwork.waitFor({ state: 'visible' });
            await this.selectNetwork.click();

            await this.instagram.waitFor({ state: 'visible' });
            await this.instagram.click();

            await this.closeNetwork.waitFor({ state: 'visible' });
            await this.closeNetwork.click();

        });

        await test.step('Add Action - Private', async () => 
        {
            await this.addAction.waitFor({ state: 'visible' });
            await this.addAction.click();

            await this.private.waitFor({ state: 'visible' });
            await this.private.click();
        });

        await test.step('Click Create Rule button', async () => 
        {
            await this.createRule.waitFor({ state: 'visible' });
            await this.createRule.click();
        });

        await test.step('Verify success message is visible', async () => 
        {
            await expect(this.ruleCreatedMsg).toHaveText(
                'AutoPilot rule has been added successfully. Posts will be evaluated accordingly.',
                { timeout: 5000 }
            );
        });
    }

    async verifyPostIsPrivate() 
    {
        await test.step('Close preview modal', async () => 
        {
            await this.page.waitForTimeout(4000);
            await this.closeIcon.waitFor({ state: 'visible' });
            await this.closeIcon.click();
        });

        await test.step('Click on Public tab', async () => 
        {
            await this.public.waitFor({ state: 'visible' });
            await this.public.click();
        });

        await test.step('Verify private message appears', async () => 
        {
            await this.privateMsg.waitFor({ state: 'visible', timeout: 5000 });
            await expect(this.privateMsg).toHaveText(
            '🔒 Whoa, Everything’s Private!',
            { timeout: 5000 }
        );
     });
    }
}

module.exports = PrivateNetworkPost;
