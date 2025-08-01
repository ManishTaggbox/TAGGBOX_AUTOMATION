import { test, expect } from '@playwright/test';
import GenerateCode from '../themeutils/GenerateCode';
import CtaButtonWebEmbed from '../ctabutton/CtaButtonWebEmbed';

class ModernCardWebEmbed {
  constructor(page) {
    this.page = page;

    // Core locators
    this.firstCard = page.locator("//div[@class='tb_mc_post_wrap_in']").first();
    this.instagramIcon = this.firstCard.locator(".tb-instagram-default.tb__icon.tb_ico_default");
    this.authorName = this.firstCard.locator(".tb_mc_authorname");
    this.authorHandle = this.firstCard.locator(".tb_mc_username");
    this.heartIcon = this.firstCard.locator(".tb_social_action_ico__.tb__icon.tb-heart-outline");
    this.modalContent = page.locator(".tb_post_modal_content.tb-cTBfont-regular");
    this.modalPopup = page.locator(".tb_post_modal_modal_body");
    this.closePopup = page.locator(".tb_post_modal_close_btn");

  }

  async modernCardWebEmbed() {
    await test.step('Generate embed code for Modern Card', async () => {
      const generateCode = new GenerateCode(this.page);
      await generateCode.generateCode();
    });

    await test.step('Check card border-radius', async () => {
      const topLeft = await this.firstCard.evaluate(el => getComputedStyle(el).borderTopLeftRadius);
      const topRight = await this.firstCard.evaluate(el => getComputedStyle(el).borderTopRightRadius);
      const bottomRight = await this.firstCard.evaluate(el => getComputedStyle(el).borderBottomRightRadius);
      const bottomLeft = await this.firstCard.evaluate(el => getComputedStyle(el).borderBottomLeftRadius);

      console.log(`Top-Left: ${topLeft}, Top-Right: ${topRight}, Bottom-Right: ${bottomRight}, Bottom-Left: ${bottomLeft}`);

      expect.soft(topLeft).toBe('27px');
      expect.soft(topRight).toBe('27px');
      expect.soft(bottomRight).toBe('27px');
      expect.soft(bottomLeft).toBe('27px');
    });

    await test.step('Check Instagram icon visibility', async () => {
      await expect.soft(this.instagramIcon).toBeVisible();
    });

    await test.step('Check author name styles', async () => {
      await expect.soft(this.authorName).toHaveText('raisr_sanchi');

      const fontFamily = await this.authorName.evaluate(el => getComputedStyle(el).fontFamily);
      console.log("Author font-family:", fontFamily);
      expect.soft(fontFamily.toLowerCase()).toContain('rochester');

      const color = await this.authorName.evaluate(el => getComputedStyle(el).color);
      console.log("Author color:", color);
      expect.soft(color).toBe('rgb(43, 43, 43)');
    });

    await test.step('Check author handle styles', async () => {
      await expect.soft(this.authorHandle).toHaveText('@raisr_sanchi');

      const fontFamily = await this.authorHandle.evaluate(el => getComputedStyle(el).fontFamily);
      console.log("Handle font-family:", fontFamily);
      expect.soft(fontFamily.toLowerCase()).toContain('rochester');

      const fontColor = await this.authorHandle.evaluate(el => getComputedStyle(el).color);
      console.log("Handle font color:", fontColor);
      expect.soft(fontColor).toBe('rgb(43, 43, 43)');
    });

    await test.step('Click heart icon and validate new tab', async () => {
      const [newPage] = await Promise.all([
        this.page.context().waitForEvent('page'),
        this.heartIcon.click()
      ]);

      await newPage.waitForLoadState();
      console.log("New tab opened with URL:", newPage.url());
      expect.soft(newPage.url()).toBe('https://www.instagram.com/reel/C58VV9nofbx/');
      await newPage.close();
    });

    await test.step('Click card and validate popup styles', async () => {
      await this.firstCard.click();
      await test.step('CTA Button Style ', async () => {
        const ctaButtonWebEmbed = new CtaButtonWebEmbed(this.page);
        await ctaButtonWebEmbed.ctaButtonWebEmbed();
      });
      await expect.soft(this.modalContent).toBeVisible();

      const fontSize = await this.modalContent.evaluate(el => getComputedStyle(el).fontSize);
      console.log("Font size:", fontSize);
      expect.soft(fontSize).toBe('38px');

      const fontFamily = await this.modalContent.evaluate(el => getComputedStyle(el).fontFamily);
      console.log("Font family:", fontFamily);
      expect.soft(fontFamily.toLowerCase()).toContain('rochester');

      const fontColor = await this.modalContent.evaluate(el => getComputedStyle(el).color);
      console.log("Font color:", fontColor);
      expect.soft(fontColor).toBe('rgb(204, 204, 170)');

      const popupBgColor = await this.modalPopup.evaluate(el => getComputedStyle(el).backgroundColor);
      console.log("Popup background color:", popupBgColor);
      expect.soft(popupBgColor).toBe('rgb(119, 0, 68)');
      await this.closePopup.click();
    });


    await test.step('Compare card count before and after clicking See More', async () => {
      const cardsBefore = await this.page.locator("//div[@class='tb_mc_post_wrap_in']").count();
      console.log("Card count before clicking 'See More':", cardsBefore);
      const seeMoreBtn = this.page.locator('.tb_see_more_btn');
      await seeMoreBtn.scrollIntoViewIfNeeded();
      await seeMoreBtn.click();
      await this.page.waitForTimeout(3000);
      const cardsAfter = await this.page.locator("//div[@class='tb_mc_post_wrap_in']").count();
      console.log("Card count after clicking 'See More':", cardsAfter);
      expect.soft(cardsBefore).not.toBe(cardsAfter);
    });



    await this.page.waitForTimeout(10000); // Optional pause for visual inspection
  }
}

export default ModernCardWebEmbed;
