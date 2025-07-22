const { test, expect } = require('@playwright/test');



class EditDetails
 {
    constructor(page) 
    {
        this.page = page;
        this.editBtn = page.locator('//button[text()="Edit Profile"]'); 
        this.fullName = page.locator('//input[@name="fname"]');
        this.orgInput = page.locator('//input[@name="organization"]');
        this.contact = page.locator('//input[@type="tel"]');
        this.emailInput = page.locator('//input[@name="email"]');
        this.saveBtn = page.locator('//button[text()="Save Changes"]');
        this.validationMsg = page.locator('//div[text()="Please enter valid name."]');
        this.industryInput = page.locator('//div[text()="E-Commerce"]');
        this.designationInput = page.locator('//div[text()="Social Media Manager"]');
        this.successMsg = page.locator('//div[text()="Profile Updated ."]');
        this.arrowIcon = page.locator('.css-8mmkcg');
        this.editIcon = page.locator('//button[@class="btn-active-primary my-1 btn btn-icon btn-sm"]');
        this.browse = page.locator('(//input[@type="file"])[1]');

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

    async editDetails() 
    {
        await this.editBtn.click();
        await this.fullName.clear();
        await this.orgInput.clear();
        //await this.contact.clear();
        await expect(this.emailInput).toBeDisabled();
        await this.saveBtn.click();
        await expect(this.validationMsg).toBeVisible();
        await expect(this.validationMsg).toHaveText('Please enter valid name.');
        await this.fullName.fill('Shristy');
        await this.arrowIcon.first().click();
        await this.industryInput.click();
        await this.orgInput.fill('Taggbox');
        await this.arrowIcon.last().click();
        await this.designationInput.click();
        await this.contact.fill('9876543210');

        //upload profile picture
        await this.editIcon.first().click();
        await this.uploadFile(this.browse, '../../videos/testImg.png');
        await this.page.waitForTimeout(5000);

        await this.saveBtn.click();
        await expect(this.successMsg).toBeVisible();
        await expect(this.successMsg).toHaveText('Profile Updated .');     
    }
}

module.exports = EditDetails;