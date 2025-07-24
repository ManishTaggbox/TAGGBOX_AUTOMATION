import { test, expect } from '@playwright/test';

class PublicNetworkPost {
    constructor(page) {
        this.page = page;
        this.editRule = page.locator('#edit_0');
        this.deleteRule = page.locator("div[class='d-flex align-items-center rounded-0 '] button[aria-label='delete']");
        this.addAction = page.locator('#rule-action');
         this.public = page.locator("//span[normalize-space()='Public']");
         this.updatePlan = page.locator("//button[normalize-space()='Update rule']")
         this.successMsg = page.locator("//div[contains(text(),'AutoPilot rule successfully updated.')]")

           //VerifyAutoPilot Locator 

        this.closeIcon = page.locator('.fa-regular.fa-xmark.cursor-pointer.fs-3');
        this.private = page.locator(".nav-link[data-rr-ui-event-key='private']");
        this.privateMsg = page.locator("//h2[normalize-space()='No Posts Yet!']")

     
    }

    async publicNetworkPost() {

        await test.step('Edit existing rule', async () => {
            await this.page.waitForTimeout(5000);
            await this.editRule.waitFor({ state: 'visible' });
            await this.editRule.click();
        });

        await test.step('Delete rule (if needed)', async () => {
            await this.deleteRule.waitFor({ state: 'visible' });
            await this.deleteRule.click();
        });

        await test.step('Add Action - Public', async () => {
            await this.addAction.waitFor({ state: 'visible' });
            await this.addAction.click();

            await this.public.waitFor({ state: 'visible' });
            await this.public.click();
        });

        await test.step('Click Update Rule button', async () => {
            await this.updatePlan.waitFor({ state: 'visible' });
            await this.updatePlan.click();
        });

        await test.step('Verify update success message', async () => {
            await this.successMsg.waitFor({ state: 'visible', timeout: 5000 });
            await expect(this.successMsg).toHaveText(
                'AutoPilot rule successfully updated.',
                { timeout: 5000 }
            );
        });
    }

 async verifyPostIsPublic() {
    await test.step('Close preview modal', async () => {
        await this.page.waitForTimeout(4000);
        await this.closeIcon.waitFor({ state: 'visible' });
        await this.closeIcon.click();
    });

    await test.step('Click on private tab', async () => {
        await this.private.waitFor({ state: 'visible' });
        await this.private.click();
    });

    await test.step('Verify private message appears', async () => {
        await this.privateMsg.waitFor({ state: 'visible', timeout: 5000 });
        await expect(this.privateMsg).toHaveText(
            'No Posts Yet!',
            { timeout: 5000 }
        );
    });
}

}

export default PublicNetworkPost;
