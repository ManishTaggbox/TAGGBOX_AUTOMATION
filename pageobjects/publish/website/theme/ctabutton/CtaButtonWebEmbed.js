import { test, expect } from '@playwright/test';

class CtaButtonWebEmbed {
  constructor(page) {
    this.page = page;
    this.heading = page.locator('.tb_pro__heading');
    this.title = page.locator('.tb_pro__title.tb-cTBfont-None').first();
    this.price = page.locator('.tb_pro__price.tb-cTBfont-regular').first();
    this.button = page.locator('.tb_pro__btn.tb-cTBfont-regular').first();
  }

  async ctaButtonWebEmbed() {
    await test.step('Check .tb_pro__heading styles inside popup', async () => {
      await expect.soft(this.heading).toBeVisible();

      const text = await this.heading.textContent();
      console.log("Title text:", text);
      expect.soft(text.trim()).toBe('Taggbox Product');

      const headingFontSize = await this.heading.evaluate(el => getComputedStyle(el).fontSize);
      console.log("Heading font size:", headingFontSize);
      expect.soft(headingFontSize).toBe('19px');

      const headingFontFamily = await this.heading.evaluate(el => getComputedStyle(el).fontFamily);
      console.log("Heading font family:", headingFontFamily);
      expect.soft(headingFontFamily.toLowerCase()).toContain('rochester');

      const headingColor = await this.heading.evaluate(el => getComputedStyle(el).color);
      console.log("Heading color:", headingColor);
      expect.soft(headingColor).toBe('rgb(238, 102, 102)');
    });

    await test.step("Check styles and text of first .tb_pro__title.tb-cTBfont-None", async () => {
      await expect.soft(this.title).toBeVisible();

      const text = await this.title.textContent();
      console.log("Title text:", text);
      expect.soft(text.trim()).toBe('Adidas Classic Backpack');

      const fontFamily = await this.title.evaluate(el => getComputedStyle(el).fontFamily);
      console.log("Font family:", fontFamily);
      expect.soft(fontFamily.toLowerCase()).toContain('inter, sans-serif');

      const fontSize = await this.title.evaluate(el => getComputedStyle(el).fontSize);
      console.log("Font size:", fontSize);
      expect.soft(fontSize).toBe('19px');

      const color = await this.title.evaluate(el => getComputedStyle(el).color);
      console.log("Font color:", color);
      expect.soft(color).toBe('rgb(221, 136, 102)');
    });

    await test.step("Check styles of first .tb_pro__price.tb-cTBfont-regular", async () => {
      await expect.soft(this.price).toBeVisible();

      const color = await this.price.evaluate(el => getComputedStyle(el).color);
      console.log("Price color:", color);
      expect.soft(color).toBe('rgb(51, 68, 238)');

      const fontFamily = await this.price.evaluate(el => getComputedStyle(el).fontFamily);
      console.log("Price font family:", fontFamily);
      expect.soft(fontFamily.toLowerCase()).toContain('rochester');

      const fontSize = await this.price.evaluate(el => getComputedStyle(el).fontSize);
      console.log("Price font size:", fontSize);
      expect.soft(fontSize).toBe('19px');
    });

    await test.step("Check styles of first .tb_pro__btn.tb-cTBfont-regular", async () => {
      await expect.soft(this.button).toBeVisible();

      const text = await this.button.textContent();
      console.log("Button text:", text);
      expect.soft(text.trim()).toBe('Shop Me');

      const bgColor = await this.button.evaluate(el => getComputedStyle(el).backgroundColor);
      console.log("Button background color:", bgColor);
      expect.soft(bgColor).toBe('rgb(170, 136, 0)');

      const fontColor = await this.button.evaluate(el => getComputedStyle(el).color);
      console.log("Button font color:", fontColor);
      expect.soft(fontColor).toBe('rgb(119, 170, 170)');

      const fontFamily = await this.button.evaluate(el => getComputedStyle(el).fontFamily);
      console.log("Button font family:", fontFamily);
      expect.soft(fontFamily.toLowerCase()).toContain('rochester');

      const fontSize = await this.button.evaluate(el => getComputedStyle(el).fontSize);
      console.log("Button font size:", fontSize);
      expect.soft(fontSize).toBe('19px');
    });
  }
}

export default CtaButtonWebEmbed;
