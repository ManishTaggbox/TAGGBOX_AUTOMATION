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

  async getComputedStyles(element, properties) {
    return await element.evaluate((el, props) => {
      const styles = getComputedStyle(el);
      const result = {};
      props.forEach(prop => {
        result[prop] = styles[prop];
      });
      return result;
    }, properties);
  }

  async validateFontStyles(element, expectedStyles, description) {
    const styleProps = ['fontFamily', 'color'];
    if (expectedStyles.fontSize) styleProps.push('fontSize');
    
    const styles = await this.getComputedStyles(element, styleProps);
    
    console.log(`${description} font-family:`, styles.fontFamily);
    console.log(`${description} color:`, styles.color);
    if (styles.fontSize) console.log(`${description} size:`, styles.fontSize);

    expect.soft(styles.fontFamily.toLowerCase()).toContain(expectedStyles.fontFamily.toLowerCase());
    expect.soft(styles.color).toBe(expectedStyles.color);
    if (expectedStyles.fontSize) {
      expect.soft(styles.fontSize).toBe(expectedStyles.fontSize);
    }
  }

  async validateModalStyles(modalContent, modalPopup) {
    const [modalStyles, popupStyles] = await Promise.all([
      this.getComputedStyles(modalContent, ['fontSize', 'fontFamily', 'color']),
      this.getComputedStyles(modalPopup, ['backgroundColor'])
    ]);

    console.log("Font size:", modalStyles.fontSize);
    console.log("Font family:", modalStyles.fontFamily);
    console.log("Font color:", modalStyles.color);
    console.log("Popup background color:", popupStyles.backgroundColor);

    expect.soft(modalStyles.fontSize).toBe('38px');
    expect.soft(modalStyles.fontFamily.toLowerCase()).toContain('rochester');
    expect.soft(modalStyles.color).toBe('rgb(204, 204, 170)');
    expect.soft(popupStyles.backgroundColor).toBe('rgb(119, 0, 68)');
  }

  async modernCardWebEmbed() {
    await test.step('Generate embed code for Modern Card', async () => {
      const generateCode = new GenerateCode(this.page);
      await generateCode.generateCode();
    });

    await test.step('Check card border-radius', async () => {
      const borderStyles = await this.getComputedStyles(this.firstCard, [
        'borderTopLeftRadius',
        'borderTopRightRadius', 
        'borderBottomRightRadius',
        'borderBottomLeftRadius'
      ]);

      console.log(`Top-Left: ${borderStyles.borderTopLeftRadius}, Top-Right: ${borderStyles.borderTopRightRadius}, Bottom-Right: ${borderStyles.borderBottomRightRadius}, Bottom-Left: ${borderStyles.borderBottomLeftRadius}`);

      Object.values(borderStyles).forEach(radius => {
        expect.soft(radius).toBe('27px');
      });
    });

    await test.step('Check Instagram icon visibility', async () => {
      await expect.soft(this.instagramIcon).toBeVisible();
    });

    await test.step('Check author name styles', async () => {
      await expect.soft(this.authorName).toHaveText('raisr_sanchi');
      
      await this.validateFontStyles(this.authorName, {
        fontFamily: 'rochester',
        color: 'rgb(43, 43, 43)'
      }, 'Author');
    });

    await test.step('Check author handle styles', async () => {
      await expect.soft(this.authorHandle).toHaveText('@raisr_sanchi');
      
      await this.validateFontStyles(this.authorHandle, {
        fontFamily: 'rochester',
        color: 'rgb(43, 43, 43)'
      }, 'Handle font');
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

      await this.validateModalStyles(this.modalContent, this.modalPopup);
      
      await this.closePopup.click();
    });

    await test.step('Compare card count before and after clicking See More', async () => {
      const seeMoreBtn = this.page.locator('.tb_see_more_btn');
      const cardLocator = this.page.locator("//div[@class='tb_mc_post_wrap_in']");
      
      const cardsBefore = await cardLocator.count();
      console.log("Card count before clicking 'See More':", cardsBefore);
      
      await seeMoreBtn.scrollIntoViewIfNeeded();
      await seeMoreBtn.click();
      await this.page.waitForTimeout(3000);
      
      const cardsAfter = await cardLocator.count();
      console.log("Card count after clicking 'See More':", cardsAfter);
      
      expect.soft(cardsBefore).not.toBe(cardsAfter);
    });

    await this.page.waitForTimeout(5000); // Optional pause for visual inspection
  }
}

export default ModernCardWebEmbed;