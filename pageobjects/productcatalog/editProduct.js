const { expect } = require('@playwright/test');


class EditProduct
 {
    constructor(page) 
    {
        this.page = page;
        this.editIcon = page.locator('#action-pen');
        this.productNameInput = page.locator('#pro_name');
        this.priceInput = page.locator('#input_price');
        this.discountInput = page.locator('#input_discount');
        this.urlInput = page.locator('#input_url');
        this.skuInput = page.locator('#input_sku');
        this.pIdInput = page.locator('#input_p_id');
        this.categoryInput = page.locator('#input_p_cat');
        this.submit = page.locator('#product_save_');
        this.productNameValidation = page.locator('//div[text()="Product name is required."]'); 
        this.productUrlValidation = page.locator('//div[text()="Please enter valid url."]'); 
        this.tagInput = page.locator('#input_p_tag');
        this.toastMsg = page.locator('//div[text()="Product updated successfully"]');
        this.productName = page.locator('//span[text()="Test Product"]');
        this.price = page.locator('//span[contains(text(), "100")]');
        this.discountPrice = page.locator('(//span[contains(text(), "10")])[2]');
        this.productUrl = page.locator('(//a[@title="Link"])[1]');
        this.productId = page.locator('//input[@value="PID12345"]');
        this.category = page.locator('//span[text()="Category1"]');
        this.sku = page.locator('//span[text()="SKU12345"]');
        this.tag = page.locator('//span[text()="Tag1"]');
    }

    async editProduct() 
    {
       await this.editIcon.first().click();

       // Clear existing values
       await this.productNameInput.clear();
       await this.priceInput.clear();
       await this.discountInput.clear();
       await this.urlInput.clear();
       await this.skuInput.clear();
       await this.pIdInput.clear();
       await this.categoryInput.clear();
       await this.submit.click();
       
       // Validate error messages
       await expect(this.productNameValidation).toBeVisible();
       await expect(this.productNameValidation).toHaveText('Product name is required.'); 
       await expect(this.productUrlValidation).toBeVisible();
       await expect(this.productUrlValidation).toHaveText('Please enter valid url.'); 

       // Fill in the form with valid data
       await this.productNameInput.fill('Test Product');
       await this.priceInput.fill('100');
       await this.discountInput.fill('10');
       await this.urlInput.fill('https://www.google.com/');   
       await this.skuInput.fill('SKU12345');
       await this.pIdInput.fill('PID12345');    
       await this.categoryInput.fill('Category1');
       await this.tagInput.fill('Tag1, Tag2');
       await this.submit.click();
       await expect(this.toastMsg).toBeVisible();
       await expect(this.toastMsg).toHaveText('Product updated successfully');


       // Validate the updated product
       await expect(this.productName).toHaveText('Test Product');
       await expect(this.price).toContainText('100');
       await expect(this.discountPrice).toContainText('10');
       await expect(this.productUrl).toHaveAttribute('href', 'https://www.google.com/'); 
       await expect(this.productId).toHaveValue('PID12345');
       await expect(this.category).toHaveText('Category1');
       await expect(this.sku).toHaveText('SKU12345');
       await expect(this.tag).toHaveText('Tag1');
    }
}

module.exports = EditProduct;