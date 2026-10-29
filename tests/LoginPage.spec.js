import { test, expect } from '@playwright/test';
import LoginPage from '../Pages/LoginPage';
import loginData from '../testdata/LoginData.json';
import { config } from '../config.js';
import { attachStepScreenshot } from '../Utilities/screenshot';
import LogoutPage from '../Pages/LogoutPage';


test.afterEach(async ({ page }) => {
    try {
      const logout = new LogoutPage(page);
      if (await logout.logoutLink.isVisible({ timeout: 2000 })) {
        await logout.gotoLogoutPage();
      }
    } catch (error) {
    }
  });

test('Login succeeds with valid credentials', async ({ page }) => {
  const login = new LoginPage(page);
  await login.gotoLoginPage();
  await login.login();
  await expect(login.expectedMsg.first()).toContainText(loginData.expected.welcomeMessage);
  await attachStepScreenshot(page, 'Valid login assertion');
});

test('Login shows an error when both fields are empty', async ({ page }) => {
  const login = new LoginPage(page);

  await login.gotoLoginPage();
  await login.login('', '');
  await expect(login.message(loginData.expected.emptyUsernameMessage)).toBeVisible();
  await attachStepScreenshot(page, 'Empty credentials validation assertion');
});

test('Login shows an error when username is empty', async ({ page }) => {
  const login = new LoginPage(page);
  await login.gotoLoginPage();
  await login.login('', config.validPassword);
  await expect(login.message(loginData.expected.emptyUsernameMessage)).toBeVisible();
  await attachStepScreenshot(page, 'Empty username validation assertion');
});

test('Login shows an error when password is empty', async ({ page }) => {
  const login = new LoginPage(page);
  await login.gotoLoginPage();
  await login.login(config.validUsername, '');
  await expect(login.message(loginData.expected.emptyPasswordMessage)).toBeVisible();
  await attachStepScreenshot(page, 'Empty password validation assertion');
});

test('Login rejects invalid credentials', async ({ page }) => {
  const login = new LoginPage(page);
  await login.gotoLoginPage();
  await login.login(config.invalidUsername, config.invalidPassword);
  await expect(login.message(loginData.expected.invalidCredentialsMessage)).toBeVisible();
  await attachStepScreenshot(page, 'Invalid login validation assertion');
});
