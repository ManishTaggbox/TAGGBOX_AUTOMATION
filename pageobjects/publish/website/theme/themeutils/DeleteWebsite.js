import { test, expect } from '@playwright/test';

class DeleteWebsite {
    constructor(page) {
        this.page = page;
     
        //delete
        this.editClick = page.locator("//i[@class='fa-regular fa-ellipsis-vertical me-0']");
        this.delete = page.locator("//a[normalize-space()='Delete']");
        this.yesDeleteIT = page.locator("//button[normalize-space()='Yes, Delete it']")
        this.websiteDeleteMsg = page.locator("//div[contains(text(),'Website deleted successfully.')]")

 }

   async deleteWebsite() {
        await test.step("Step 1: Click Edit on the Website", async () => {
            await this.page.waitForTimeout(3000);
            await this.editClick.waitFor({ state: 'visible', timeout: 5000 });
            await this.editClick.click();
        });

        await test.step("Step 2: Click Delete button", async () => {
            await this.delete.waitFor({ state: 'visible', timeout: 5000 });
            await this.delete.click();
        });

        await test.step("Step 3: Confirm deletion", async () => {
            await this.yesDeleteIT.waitFor({ state: 'visible', timeout: 5000 });
            await this.yesDeleteIT.click();
        });

        await test.step("Step 4: Validate success message", async () => {
            await this.websiteDeleteMsg.waitFor({ state: 'visible', timeout: 5000 });
            await expect.soft(this.websiteDeleteMsg).toHaveText("Website deleted successfully.");
        });
    }


}
export default DeleteWebsite;
