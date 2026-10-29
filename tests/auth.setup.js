import {test as setup , expect} from '@playwright/test';
import LoginPage from '../Pages/LoginPage';
import loginData from '../testdata/LoginData.json';
import { attachStepScreenshot } from '../Utilities/screenshot';

setup('Login Test Case using with Valid User', async ({ page }) => {
  const login = new LoginPage(page);
  await login.gotoLoginPage();
  await login.login();
  await expect(login.expectedMsg.first()).toContainText(loginData.expected.welcomeMessage);
  await attachStepScreenshot(page, 'Authentication setup assertion');

  await page.context().storageState({ path: './state.json' });
});