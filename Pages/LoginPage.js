import { test } from '@playwright/test';
import { attachStepScreenshot } from '../Utilities/screenshot';
import { config } from '../config';

class LoginPage {
  constructor(page) {
    this.page = page;

    this.username = page.locator('//input[@id="username"]');
    this.password = page.locator('//input[@id="password"]');
    this.loginButton = page.locator('//input[@id="login"]');
    this.expectedMsg = page.locator('//td[@class="welcome_menu"]');
  }

  message(text) {
    return this.page.getByText(text, { exact: true });
  }

  async gotoLoginPage() {
    await test.step('Navigate to Login Page', async () => {
      await this.page.goto(config.url);
      await attachStepScreenshot(this.page, '01 - Login page opened'); 
    });
  }

  async login(username = config.validUsername, password = config.validPassword) {
    await test.step('Enter Username', async () => {
      await this.username.fill(username);
      await attachStepScreenshot(this.page, '02 - After entering username'); 
    });

    await test.step('Enter Password', async () => {
      await this.password.fill(password);
      await attachStepScreenshot(this.page, '03 - After entering password'); 
    });

    await test.step('Click Login Button', async () => {
      await this.loginButton.click();
      await this.page.waitForLoadState('domcontentloaded');
      await attachStepScreenshot(this.page, '04 - After clicking Login'); 
    });
  }
}

export default LoginPage;