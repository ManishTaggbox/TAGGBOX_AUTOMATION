const { expect } = require('@playwright/test');

class CarousalPost 
{
    constructor(page) 
    {
        this.page = page;
        this.carousalBtn = page.locator('#carousalStatus');
        this.toastMsg = page.locator('//div[text()="Your Gallery Updated Successfully.!"]');
        this.filterIcon = page.locator('#filter_aside');
        this.taggedCheckbox = page.locator('#tagProduct');
        this.errorMsg = page.locator('//div[text()="To apply this filter, please disable the Carousel feature first."]');
        this.crossIcon = page.locator('.fa-xmark');
    }

    async carousalPost() 
    {
        await this.page.waitForTimeout(10000);

        // Intercept the API call
        const [request, response] = await Promise.all
        ([
            this.page.waitForRequest(req =>
                req.url().includes('/api/v1/dashboard/ShoppableGallery/addUpdate') &&
                req.method() === 'POST'
            ),
            this.page.waitForResponse(res =>
                res.url().includes('/api/v1/dashboard/ShoppableGallery/addUpdate') &&
                res.status() === 200
            ),
            await this.carousalBtn.click()
        ]);

        // Assert Response
        const responseBody = await response.json();
        expect.soft(responseBody.responseCode).toBe(200);
        expect.soft(responseBody.responseStatus).toBe('success');
        expect.soft(responseBody.responseMessage).toBe('Your Gallery Updated Successfully.!');

        await this.toastMsg.waitFor({state: 'visible', timeout: 5000});
        await expect.soft(this.toastMsg).toHaveText('Your Gallery Updated Successfully.!');
        await this.page.waitForTimeout(10000);
        
        // Open filter overlay
        await this.filterIcon.waitFor({state: 'visible', timeout: 5000});
        await this.filterIcon.click();
        await this.page.waitForTimeout(5000);

        // check UGC tagged product 
        await this.taggedCheckbox.waitFor({state: 'visible', timeout: 5000});
        await this.taggedCheckbox.click();

        // Assert the error message after checking the tagged product
        await this.errorMsg.waitFor({state: 'visible', timeout: 10000});
        await expect.soft(this.errorMsg).toHaveText('To apply this filter, please disable the Carousel feature first.'); 
        await this.page.waitForTimeout(10000);

        // close filter overlay by clicking on filter option
        // await this.crossIcon.waitFor({state: 'visible', timeout: 5000});
        // await this.crossIcon.click();
        await this.filterIcon.waitFor({state: 'visible', timeout: 5000});
        await this.filterIcon.click();

        // off crousal post
        await this.carousalBtn.waitFor({state: 'visible', timeout: 5000});
        await this.carousalBtn.click();
    }
}

module.exports = CarousalPost;