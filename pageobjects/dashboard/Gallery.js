const { test, expect } = require('@playwright/test');

import {GALLERY} from './constant.js'; 


class AddGallery
{
    constructor(page) 
    {
        // Add Gallery
        this.page = page;
        this.contentBtn  = page.locator('//button[text()="Collect Content"]');
        this.addGalleryBtn = page.locator('//button[text()="Add Gallery"]');
        this.saveBtn = page.locator('#con_save_btn');
        this.validationMsg = page.locator('//span[@class="invalid-feedback"]');
        this.galleryNameField = page.locator('#g_name');
        this.toastMsg = page.locator('//div[text()="Your Gallery Created Successfully.!"]');
        this.homeMenu = page.locator('//span[text()="Home"]');
        this.galleryTable = page.locator('//tbody//tr'); 

        // Delete Gallery
        this.viewAllBtn = page.locator('//a[@href="/content"]'); 
        this.threeDotsIcon = page.locator("//button[@class='arrow_disabled dropdown-toggle border-0 d-inline-flex py-1 px-3 dropdown-toggle btn btn-secondary']");
        this.deleteOption = page.locator('//a[text()="Delete"]');
        this.deleteConfirmBtn = page.locator('//button[@aria-label="delete_yes"]');
    }

    async addGallery() 
    {
        await test.step("Step 1: Assert 'Content Collect' is displayed when no gallery is present", async () => 
        {
            await this.contentBtn.waitFor({ state: 'visible', timeout: 5000 });
            
            console.log("'Content Gallery' button is displayed when no gallery is present");
        });

        await test.step("Step 2: Click to 'Add Gallery' btn", async () => 
        {
            await this.addGalleryBtn.waitFor({ state: 'visible', timeout: 5000 });
            await this.addGalleryBtn.click();
            
            console.log("Clicked to add gallery");
        });

        await test.step("Step 3: Click on 'Save' with null field", async () => 
        {
            await this.saveBtn.waitFor({ state: 'visible', timeout: 5000 });
            await this.saveBtn.click();
            
            console.log("Clicked to 'Save' btn with null data");
        });

        await test.step("Step 4: Assert the validation msg for mandatory gallery name", async () => 
        {
            await this.validationMsg.waitFor({ state: 'visible'});

            console.log("Gallery name field is marked as mandatory");
        });

        await test.step("Step 5: Enter gallery name", async () => 
        {
            await this.galleryNameField.fill(GALLERY.GALLERYNAME);
            await this.saveBtn.waitFor({ state: 'visible', timeout: 5000 });
            await this.saveBtn.click();
            
            console.log("Entered gallery name as Taggbox`s Gallery");
        });

        await test.step("Step 6: Assert the toast msg", async () => 
        {
            await this.toastMsg.waitFor({ state: 'visible', timeout: 5000 });
            await expect.soft(this.toastMsg).toHaveText('Your Gallery Created Successfully.!');
            
            console.log("Validated the toast msg after creating new gallery");
        });

        await test.step("Step 7: Click to 'Home' menu", async () => 
        {
            await this.homeMenu.waitFor({ state: 'visible', timeout: 5000 });
            await this.homeMenu.click();
            
            console.log("Clicked to 'Home' menu option");

            await this.page.reload();

            console.log("Page reloaded");
        });

        await test.step("Step 8: Assert created gallery displayed in gallery section", async () => 
        {
            await this.galleryTable.waitFor({ state: 'visible', timeout: 5000 });
            
            console.log("Created gallery is displayed in the 'Top Performing Galleries' section");
        });
    }

    async deleteGallery()
    {
        await test.step("Step 1: Click on 'View All' btn", async () => 
        {
            await this.viewAllBtn.waitFor({ state: 'visible', timeout: 5000 });
            await this.viewAllBtn.click();
            
            console.log("Clicked to 'View All' button");
        });

        await test.step("Step 2: Click on three dots icon", async () => 
        {
            await this.threeDotsIcon.waitFor({ state: 'visible', timeout: 5000 });
            await this.threeDotsIcon.click();
            
            console.log("Clicked to three dots icon");
        });

        await test.step("Step 3: Click to delete the gallery", async () => 
        {
            await this.deleteOption.waitFor({ state: 'visible', timeout: 5000 });
            await this.deleteOption.click();
            
            console.log("Clicked to delete the gallery");
        });

        await test.step("Step 4: Click to confirm the delete the gallery action", async () => 
        {
            await this.deleteConfirmBtn.waitFor({ state: 'visible', timeout: 5000 });
            await this.deleteConfirmBtn.click();

            await this.page.waitForTimeout(5000);
            
            console.log("Clicked to confirmed delete");

        });

        await test.step("Step 5: Click to 'Home' menu", async () => 
        {
            await this.homeMenu.waitFor({ state: 'visible', timeout: 5000 });
            await this.homeMenu.click();
            
            console.log("Clicked to 'Home' menu option");

            await this.page.reload();

            console.log("Page reloaded");
        });

        await test.step("Step 6: Assert 'Collect Content' is displayed when no gallery is present", async () => 
        {
            await this.contentBtn.waitFor({ state: 'visible', timeout: 5000 });
            
            console.log("'Collect Content' button is displayed when no gallery is present");
        });
    }
}

export default AddGallery;
