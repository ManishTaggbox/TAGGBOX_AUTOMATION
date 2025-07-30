import { test, expect } from '@playwright/test';
import GenerateCode from '../themeutils/GenerateCode';

class ModernCardWebEmbed {
    constructor(page) {
        this.page = page;
      
    }

    

  async modernCardWebEmbed() {
    await test.step('Generate embed code for Modern Card', async () => {
      const generateCode = new GenerateCode(this.page);
      await generateCode.generateCode();
       await this.page.waitForTimeout(30000);
    });

    // You can continue with further steps here, e.g., validate content, etc.
  }

}

export default ModernCardWebEmbed;
