import { test } from '@playwright/test';


export async function attachStepScreenshot(page, name) {
  await test.info().attach(name, {
    body: await page.screenshot(),
    contentType: 'image/png',
  });
}

export async function captureApiScreenshot(_page, response, testInfo) {
  await testInfo.attach('API response', {
    body: await response.text(),
    contentType: 'text/plain',
  });
}
export default async function attachScreenshotAfterEach(page, testInfo) {
  if (testInfo.status !== testInfo.expectedStatus) {
    await testInfo.attach('screenshot', {
      body: await page.screenshot(),
      contentType: 'image/png',
    });
  }
}