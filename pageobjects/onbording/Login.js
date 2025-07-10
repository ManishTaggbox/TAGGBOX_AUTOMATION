const { expect } = require('@playwright/test');

class Login {
    constructor(page) {
        this.page = page;
        this.emailField = page.locator('input[type="email"]');
        this.passwordField = page.locator('input[type="password"]');
        this.loginButton = page.locator('button.btn.btn-primary.btn-lg');
        this.emailErrorMsg = page.locator('span.invalid-feedback');
        this.passwordErrorMsg = page.locator('div.invalid-feedback');
    }

    async login() {
        await this.validateLoginWithoutInputs();
        await this.validateInvalidEmail();
        await this.validateInvalidPassword();
    }

    async validateLoginWithoutInputs() {
        await this.clickAndValidateErrors('', '', 'Email is required.', 'Password is required.');
    }

    async validateInvalidEmail() {
        await this.clickAndValidateErrors('manish.s@taggbox.com1', '', 'Enter valid email.', null);
    }

    async validateInvalidPassword() {
        await this.clickAndValidateErrors('manish.s@taggbox.com', 'Taggbox@1234', null, 'Password does not match !');
        await this.clickAndValidateErrors('manish.s+123456@taggbox.com', 'Taggbox@123', 'Email Id not found !', null);
    }

    async clickAndValidateErrors(email, password, emailError, passwordError) {
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.loginButton.click();

        if (emailError) {
            await this.assertErrorMessage(this.emailErrorMsg, emailError, 'Email error message mismatch');
        }
        if (passwordError) {
            await this.assertErrorMessage(this.passwordErrorMsg, passwordError, 'Password error message mismatch');
        }

        await this.clearField(this.emailField);
        await this.clearField(this.passwordField);
    }

    async assertErrorMessage(element, expectedMessage, failureMessage) {
        await expect(element).toBeVisible();
        const actualMessage = await element.textContent();
        expect(actualMessage.trim()).toBe(expectedMessage, failureMessage);
    }

    async clearField(field) {
        await field.fill('');
    }
}

module.exports = Login;
