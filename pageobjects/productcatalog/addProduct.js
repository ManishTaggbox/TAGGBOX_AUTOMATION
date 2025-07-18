const { expect } = require('@playwright/test');


class AddProduct
 {
    constructor(page) 
    {
        this.page = page;
        this.manualUpload = page.locator('//h5[text()="Manual Upload"]');
        this.addSingleProduct = page.locator('//h5[text()="Add Single Product"]');


        // this.addProductBtn = page.locator('#add_pro');
        this.submitBtn = page.locator('#product_save_');
        this.productNameValidation = page.locator('//div[text()="Product name is required."]');
        this.productUrlValidation = page.locator('//div[text()="Please enter valid url."]'); 
        this.productNameInput = page.locator('#pro_name');
        this.priceInput = page.locator('#input_price');
        this.discountInput = page.locator('#input_discount');
        this.urlInput = page.locator('#input_url');
        this.skuInput = page.locator('#input_sku');
        this.pIdInput = page.locator('#input_p_id');
        this.categoryInput = page.locator('#input_p_cat');
        this.tagInput = page.locator('#input_p_tag');
        this.toastMsg = page.locator('//div[text()="Product added successfully"]');
        this.uploadImg = page.locator('#upload_pro_media'); 
        this.browse = page.locator('//input[@type="file"]');
        this.productName = page.locator('//span[text()="Demo Product"]');
        this.price = page.locator('//span[text()="$1000"]');
        this.discountPrice = page.locator('//span[text()="$100"]');
        this.productUrl = page.locator('(//a[@title="Link"])[1]');
        this.productId = page.locator('//input[@value="PID56789"]');
        this.category = page.locator('//span[text()="CategoryA"]');
        this.sku = page.locator('//span[text()="SKU56789"]');
        this.tag = page.locator('//span[text()="TagA"]');
        this.deleteIcon = page.locator('#action-trash-can');
        this.confirmDeleteBtn = page.locator('//button[text()="Yes, delete it!"]');
    }

    async addProduct() 
    {
        // await this.addProductBtn.click();
        await this.manualUpload.click();
        await this.addSingleProduct.click();
        await this.submitBtn.click();
        
        // Validate error messages
        await expect(this.productNameValidation).toBeVisible();
        await expect(this.productNameValidation).toHaveText('Product name is required.'); 
        await expect(this.productUrlValidation).toBeVisible();
        await expect(this.productUrlValidation).toHaveText('Please enter valid url.');

        // Fill in the form with valid data
        await this.productNameInput.fill('Demo Product');
        await this.priceInput.fill('1000');
        await this.discountInput.fill('100');
        await this.urlInput.fill('https://www.google.com/');   
        await this.skuInput.fill('SKU56789');
        await this.pIdInput.fill('PID56789');    
        await this.categoryInput.fill('CategoryA');
        await this.tagInput.fill('TagA, TagB');

        // Upload product img
        await this.uploadImg.click();
        await this.browse.first().setInputFiles('tests/test-data/testImg.png');
        await this.submitBtn.click();
        await expect(this.toastMsg).toBeVisible();
        await expect(this.toastMsg).toHaveText('Product added successfully');

        // Validate the added product
        await expect(this.productName).toHaveText('Demo Product');
        await expect(this.price).toHaveText('$1000');
        await expect(this.discountPrice).toHaveText('$100');
        await expect(this.productUrl).toHaveAttribute('href', 'https://www.google.com/'); 
        await expect(this.productId).toHaveValue('PID56789');
        await expect(this.category).toHaveText('CategoryA');
        await expect(this.sku).toHaveText('SKU56789');
        await expect(this.tag).toHaveText('TagA');
        
        // Delete the product after validation
        await this.deleteIcon.first().click();
        await this.confirmDeleteBtn.click();
    }
}

module.exports = AddProduct;