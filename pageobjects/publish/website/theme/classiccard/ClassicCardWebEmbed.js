import { test, expect } from '@playwright/test';
import GenerateCode from '../themeutils/GenerateCode';
import CtaButtonWebEmbed from '../ctabutton/CtaButtonWebEmbed';

class ClassicCardWebEmbed {
  constructor(page) {
    this.page = page;

    // Core locators
    this.firstCard = page.locator("//div[@class='tb_g_post_in']").first();
    this.instagramIcon = this.firstCard.locator("//div[@class='tb-instagram-default tb__icon tb_ico_default']");
    this.authorName = this.firstCard.locator(".tb_g_authorname");
    this.authorHandle = this.firstCard.locator(".tb_g_username");
    this.cardContent = this.firstCard.locator('.tb_g_content.tb-cTBfont-regular');
    this.modalContent = page.locator(".tb_post_modal_content.tb-cTBfont-regular");
    this.modalPopup = page.locator(".tb_post_modal_modal_body");
    this.closePopup = page.locator(".tb_post_modal_close_btn");
    this.seeMoreBtn = page.locator('.tb_see_more_btn');
    this.allCards = page.locator("//div[@class='tb_g_post_in']");
  }

  async classicCardWebEmbed() {
    await test.step('Generate embed code for Modern Card', async () => {
      const generateCode = new GenerateCode(this.page);
      await generateCode.generateCode();
    });

    await test.step('Check card border-radius', async () => {
      const radiusProps = ['borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomRightRadius', 'borderBottomLeftRadius'];
      for (const prop of radiusProps) {
        const value = await this.firstCard.evaluate((el, prop) => getComputedStyle(el)[prop], prop);
        console.log(`${prop}: ${value}`);
        expect.soft(value).toBe('27px');
      }
    });

    await test.step('Check Instagram icon visibility', async () => {
      await expect.soft(this.instagramIcon).toBeVisible();
    });

    await test.step('Check author name styles', async () => {
      await expect.soft(this.authorName).toHaveText('raisr_sanchi');

      const fontFamily = await this.authorName.evaluate(el => getComputedStyle(el).fontFamily);
      const color = await this.authorName.evaluate(el => getComputedStyle(el).color);

      console.log("Author font-family:", fontFamily);
      console.log("Author color:", color);

      expect.soft(fontFamily.toLowerCase()).toContain('rochester');
      expect.soft(color).toBe('rgb(85, 238, 238)');
    });

    await test.step('Check author handle styles', async () => {
      await expect.soft(this.authorHandle).toHaveText('@raisr_sanchi');

      const fontFamily = await this.authorHandle.evaluate(el => getComputedStyle(el).fontFamily);
      const color = await this.authorHandle.evaluate(el => getComputedStyle(el).color);

      console.log("Handle font-family:", fontFamily);
      console.log("Handle font color:", color);

      expect.soft(fontFamily.toLowerCase()).toContain('rochester');
      expect.soft(color).toBe('rgb(85, 238, 238)');
    });

    await test.step('Check content styles in card', async () => {
      await expect.soft(this.cardContent).toBeVisible();

      const fontFamily = await this.cardContent.evaluate(el => getComputedStyle(el).fontFamily);
      const fontSize = await this.cardContent.evaluate(el => getComputedStyle(el).fontSize);
      const color = await this.cardContent.evaluate(el => getComputedStyle(el).color);

      console.log("Content Font Family:", fontFamily);
      console.log("Content Font Size:", fontSize);
      console.log("Content Font Color:", color);

      expect.soft(fontFamily.toLowerCase()).toContain('rochester');
      expect.soft(fontSize).toBe('33px');
      expect.soft(color).toBe('rgb(204, 204, 170)');
    });

    await test.step('Click card and validate popup styles', async () => {
      await this.firstCard.click();

      await test.step('CTA Button Style', async () => {
        const ctaButtonWebEmbed = new CtaButtonWebEmbed(this.page);
        await ctaButtonWebEmbed.ctaButtonWebEmbed();
      });

      await expect.soft(this.modalContent).toBeVisible();

      const fontSize = await this.modalContent.evaluate(el => getComputedStyle(el).fontSize);
      const fontFamily = await this.modalContent.evaluate(el => getComputedStyle(el).fontFamily);
      const fontColor = await this.modalContent.evaluate(el => getComputedStyle(el).color);
      const popupBgColor = await this.modalPopup.evaluate(el => getComputedStyle(el).backgroundColor);

      console.log("Font size:", fontSize);
      console.log("Font family:", fontFamily);
      console.log("Font color:", fontColor);
      console.log("Popup background color:", popupBgColor);

      expect.soft(fontSize).toBe('38px');
      expect.soft(fontFamily.toLowerCase()).toContain('rochester');
      expect.soft(fontColor).toBe('rgb(204, 204, 170)');
      expect.soft(popupBgColor).toBe('rgb(119, 0, 68)');

      await this.closePopup.click();
    });

    await test.step('Compare card count before and after clicking See More', async () => {
      const cardsBefore = await this.allCards.count();
      console.log("Card count before clicking 'See More':", cardsBefore);

      await this.seeMoreBtn.scrollIntoViewIfNeeded();
      await this.seeMoreBtn.click();
      await this.page.waitForTimeout(3000);

      const cardsAfter = await this.allCards.count();
      console.log("Card count after clicking 'See More':", cardsAfter);

      expect.soft(cardsBefore).not.toBe(cardsAfter);
    });

    await this.page.waitForTimeout(10000); // Optional pause for visual inspection
  }
}

export default ClassicCardWebEmbed;
