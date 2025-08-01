const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

class EditPost 
{
    constructor(page) 
    {
        this.page = page;
        this.cards = page.locator('.content_img_ ');  
        this.editIcon = page.locator('//button[text()="Edit Post"]'); 
        this.nameField = page.locator('#author_n_');
        this.handleField = page.locator('#author_h_');
        this.contentField = page.locator('#post_cont_');
        this.validationMsg = page.locator('.invalid-feedback');
        this.saveBtn = page.locator('//button[text()="Save Changes"]');
        this.successMsg = page.locator('.Toastify__toast-body');
        this.autherName = page.locator('//a[contains(text(), "This one is dummy name")]');
        this.autherHandle = page.locator('//span[text()="@"]'); 
        this.postContent = page.locator('.gridpostContent ');
        this.profileEditIcon = page.locator('//button[@aria-label="edit"]');
        this.browse = page.locator('(//input[@type="file"])[1]');
        this.imgEdit = page.locator('(//i[@class="fa-solid fa-pen "])[2]');
        this.uploadBtn = page.locator('//button[@aria-label="Upload 1 file"]');
        this.detailsTab = page.locator('#modal_aside_-tab-details');
        this.autherNameDetail = page.locator('//p[contains(text(), "This one is dummy name")]');
        this.autherHandleDetail = page.locator('//div/small');
        this.contentDetail = page.locator('//p[contains(text(), "This one is dummy content")]');
        this.crossIcon = page.locator('.btn-close');
    }

    getAbsolutePath(relativePath) 
    {
        const fullPath = path.resolve(__dirname, relativePath);
        if (!fs.existsSync(fullPath)) 
        {
            throw new Error(`❌ File not found: ${fullPath}`);
        }
            return fullPath;
    }
    
    async uploadFile(input, filePath)
    {
        const fullPath = this.getAbsolutePath(filePath);
        await input.setInputFiles(fullPath);
    }

    async editPost() 
    {
        await test.step("Step 1: Click on first post", async () => 
        {
            await this.cards.first().click();
        });

        await test.step("Step 2: Click on edit icon", async () => 
        {
            await this.editIcon.click();
        });

        await test.step("Step 3: Clear existing fields", async () => 
        {
            await this.nameField.clear();
            await this.handleField.clear();           
            await this.contentField.clear();
        });

        await test.step("Step 4: Assert validation msg against mandatory fields", async () => 
        {
            await expect.soft(this.validationMsg).toHaveCount(3);

            const messages = await this.validationMsg.allTextContents();
            expect(messages.every(text => text === 'This field is required')).toBe(true);    
        });

        await test.step("Step 5: Enter mandatory details", async () => 
        {
            await this.nameField.fill('This one is dummy name');
            await this.handleField.fill('This one is dummy handle');    
            await this.contentField.fill('This one is dummy content');
        });

        await test.step("Step 6: Click to edit author profile", async () => 
        {
            await this.profileEditIcon.click();
        });

        await test.step("Step 7: Click to upload image from specified path", async () => 
        {
            await this.uploadFile(this.browse, '../../videos/testImg.png');
        });

        await test.step("Step 8: Click to edit post profile", async () => 
        {
            await this.imgEdit.click();
        });

        await test.step("Step 9: Click to upload post image from specified path", async () => 
        {
            await this.uploadFile(this.browse, '../../videos/image.jpg');
        });

        await test.step("Step 10: Click on Upload btn", async () => 
        {
            await this.uploadBtn.click();
            await this.page.waitForTimeout(5000); // Wait for upload to complete
        });

        await test.step("Step 11: Click to save changes", async () => 
        {
            await this.saveBtn.click();
        });

        await test.step("Step 12: Assert toast msg", async () => 
        {
            await this.successMsg.waitFor({ state: 'visible' });
            await expect.soft(this.successMsg).toHaveText('Post updated successfully');
        });

        await test.step("Step 13: Click on 'Details' tab", async () => 
        {
            await this.detailsTab.click();
        });

        await test.step("Step 14: Assert post details in details tab", async () => 
        {
            await expect.soft(this.autherNameDetail).toHaveText('This one is dummy name');
            //await expect.soft(this.autherHandleDetail).toHaveText('This one is dummy handle');   
            await expect.soft(this.contentDetail).toHaveText('This one is dummy content');      
        }); 

        await test.step("Step 15: Close the modal", async () => 
        {
            await this.crossIcon.last().click();
        });

        await test.step("Step 16: Assert post details", async () => 
        {
            await expect.soft(this.autherName).toHaveText('This one is dummy name');
            // await expect.soft(this.autherHandle.first()).toHaveText('This one is dummy handle');   
            await expect.soft(this.postContent.first()).toHaveText('This one is dummy content');      
        });    
    }
}

export default EditPost;
