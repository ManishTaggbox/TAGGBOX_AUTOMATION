import { expect, test } from '@playwright/test';
import { parse } from 'node-html-parser'; // Need to install via `npm i node-html-parser`

class GenerateCode {
  constructor(page) {
    this.page = page;
    this.card = page.locator("//div[@class='flex-column f-center px-3 py-0 card-body']");
    this.generateCodebtn = page.locator('#discardSetting');
    this.embedCode = page.locator("//code[@id='embed_code_']");
    this.resultString = '';
    this.url = '';
  }

  async generateCode() {
    await test.step('Click Publish and Website menu', async () => {
      await this.card.waitFor({ state: 'visible', timeout: 20000 });
      await this.card.click();
    });

    await test.step('Click Generate Code button', async () => {
      await this.generateCodebtn.waitFor({ state: 'visible', timeout: 10000 });
      await this.generateCodebtn.click();
      await this.page.waitForTimeout(3000);
    });

   await test.step('Extract widget ID from embed code', async () => {
      const embedHTML = await this.embedCode.textContent();

      const parsed = parse(embedHTML || '');
      const widgetDiv = parsed.querySelector('.taggbox');

      if (widgetDiv) {
        this.widgetId = widgetDiv.getAttribute('data-widget-id');
        console.log('Widget ID:', this.widgetId);
      } else {
        throw new Error('taggbox div not found in embed code');
      }
    });

    await test.step('Navigate to taggbox widget URL', async () => {
      this.url = `https://widget.taggbox.com/${this.widgetId}?website=true`;
      console.log('Navigating to:', this.url);
      await this.page.goto(this.url, { waitUntil: 'load' });
      await this.page.waitForTimeout(3000);
    });
  }
}

export default GenerateCode;
