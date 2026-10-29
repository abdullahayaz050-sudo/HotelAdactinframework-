import { test, expect } from '@playwright/test';
import BasePage from '../Pages/BasePage';
import { config } from '../config.js';
import { attachStepScreenshot } from '../Utilities/screenshot';

test('BasePage navigates to the requested URL', async ({ page }) => {
  const basePage = new BasePage(page);

  await basePage.navigate(config.url);
  await expect(page).toHaveURL(config.url);
  await attachStepScreenshot(page, 'BasePage navigation assertion');
});
