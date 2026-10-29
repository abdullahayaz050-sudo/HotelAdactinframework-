import { test as base } from '@playwright/test';
import BasePage, { APP_BASE_URL } from '../Pages/BasePage.js';
import { attachScreenshotAfterEach } from '../Utilities/screenshot.js';
export const test = base.extend({
pageSetup: [
async ({ page }, use) => {
const basePage = new BasePage(page);
await basePage.navigate(APP_BASE_URL);
await use();
},
{ auto: true },
],
});
test.afterEach(async ({ page }, testInfo) => {
await attachScreenshotAfterEach(page, testInfo);
});
export { expect } from '@playwright/test';