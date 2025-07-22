const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');


class ResetPassword
 {
    constructor(page) 
    {
        this.page = page;
        this.resetBtn = page.locator('//button[text()="Reset Password"]'); 
        this.updatBtn = page.locator('//button[text()="Update Password"]');
        this.validationMsg = page.locator('//div[contains(text(), "Password must be at least")]');
        this.password = page.locator('//input[@name="password"]');
        this.passwordStrength = page.locator('//span[text()="Strong"]');
        this.confirmPassword = page.locator('//input[@name="cpassword"]');
        this.validation = page.locator('//div[text()="Password does not match."]');
        this.successMsg = page.locator('//div[text()="Password Updated Successfully"]');
         
    }

    async passwordReset() 
    {
        await this.resetBtn.click();
        await this.updatBtn.click();
        await expect(this.validationMsg).toBeVisible();
        await this.password.fill('Taggbox@123');
        await expect(this.passwordStrength).toBeVisible();
        await this.confirmPassword.fill('Test@Taggbox');
        await expect(this.validation).toBeVisible();
        await this.confirmPassword.clear();
        await this.confirmPassword.fill('Taggbox@123');
        await this.updatBtn.click();
        await expect(this.successMsg).toBeVisible();    
        await expect(this.successMsg).toHaveText('Password Updated Successfully');
    }
}

module.exports = ResetPassword;