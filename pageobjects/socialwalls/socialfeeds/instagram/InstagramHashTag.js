import { test, expect } from '@playwright/test';


class InstagramHashTag {
  constructor(page) {
    this.page = page;
   
  }

  async instagramHashTag() {
    await test.step('Step 1: Fill hashtag input with "arnodya"', async () => {


        await this.page.waitForTimeout(20000);
        });
  }
}

export default InstagramHashTag;
