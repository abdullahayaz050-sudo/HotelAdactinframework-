import { test } from '@playwright/test';
import { attachStepScreenshot } from '../Utilities/screenshot';
import { APP_BASE_URL } from './BasePage';

class SelectPage {
  constructor(page) {
    this.page = page;

    this.radioButton = page.locator('#radiobutton_0');
    this.continueButton = page.locator('#continue');
  }

  async gotoSelectPage() {
    await test.step('Navigate to Select Hotel Page', async () => {
      await this.page.goto(new URL('SelectHotel.php', APP_BASE_URL).href, { waitUntil: 'domcontentloaded' });
      await this.radioButton.waitFor({ state: 'visible' });
      await attachStepScreenshot(this.page, '01 - Select Hotel page opened');
    });
  }

  async selectHotel() {
    await test.step('Select Hotel Radio Button', async () => {
      await this.radioButton.waitFor({ state: 'visible' });
      await this.radioButton.click();
      await attachStepScreenshot(this.page, '02 - After selecting hotel radio button');
    });

    await test.step('Click Continue Button', async () => {
      await this.continueButton.click();
      await this.page.waitForLoadState('domcontentloaded');
      await attachStepScreenshot(this.page, '03 - After clicking Continue button');
    });
  }

  async continueWithoutSelection() {
    await test.step('Continue without selecting a hotel', async () => {
      await this.continueButton.waitFor({ state: 'visible' });
      await this.continueButton.click();
      await this.page.waitForLoadState('domcontentloaded');
      await attachStepScreenshot(this.page, 'After continuing without selecting a hotel');
    });
  }
}

export default SelectPage;