# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: BookHotel.spec.js >> Book Hotel Test Case using with Invalid User
- Location: tests\BookHotel.spec.js:60:5

# Error details

```
TimeoutError: locator.waitFor: Timeout 15000ms exceeded.
Call log:
  - waiting for locator('#radiobutton_0') to be visible

```

# Page snapshot

```yaml
- generic [active] [ref=f8e1]:
  - table [ref=f8e2]:
    - rowgroup [ref=f8e3]:
      - row [ref=f8e4]:
        - cell [ref=f8e5]:
          - img "Adactin Group" [ref=f8e6]
        - cell [ref=f8e7]:
          - 'img "Adactin Group: Hotel Reservation System" [ref=f8e8]'
      - row [ref=f8e9]:
        - cell [ref=f8e10]
  - table [ref=f8e11]:
    - rowgroup [ref=f8e12]:
      - row [ref=f8e13]:
        - cell [ref=f8e14]:
          - paragraph [ref=f8e15]: Welcome to Adactin Group of Hotels
          - table [ref=f8e16]:
            - rowgroup [ref=f8e17]:
              - row [ref=f8e18]:
                - cell [ref=f8e19]:
                  - img "Hotel Image 3" [ref=f8e20]
                - cell [ref=f8e21]:
                  - img "Hotel Image 1" [ref=f8e22]
              - row [ref=f8e23]:
                - cell [ref=f8e24]:
                  - img "Hotel Image 2" [ref=f8e25]
              - row [ref=f8e26]:
                - cell [ref=f8e27]:
                  - img "Hotel Image 4" [ref=f8e28]
          - paragraph [ref=f8e29]
          - paragraph [ref=f8e30]
          - paragraph [ref=f8e31]
          - paragraph [ref=f8e32]
        - cell [ref=f8e33]:
          - table [ref=f8e35]:
            - rowgroup [ref=f8e36]:
              - row [ref=f8e37]:
                - cell "Existing User Login - Build 2" [ref=f8e38]
              - row [ref=f8e39]:
                - cell "Username" [ref=f8e40]
                - cell [ref=f8e41]:
                  - textbox [ref=f8e42]
              - row [ref=f8e43]:
                - cell "Password" [ref=f8e44]
                - cell [ref=f8e45]:
                  - textbox [ref=f8e46]
              - row [ref=f8e47]:
                - cell [ref=f8e48]
                - cell [ref=f8e49]:
                  - link "Forgot Password?" [ref=f8e51] [cursor=pointer]:
                    - /url: ForgotPassword.php
              - row [ref=f8e52]:
                - cell [ref=f8e53]
                - cell [ref=f8e54]
              - row [ref=f8e55]:
                - cell [ref=f8e56]
                - cell [ref=f8e57]:
                  - button "Login" [ref=f8e58]
              - row [ref=f8e59]:
                - cell [ref=f8e60]:
                  - link "New User Register Here" [ref=f8e61] [cursor=pointer]:
                    - /url: Register.php
          - table [ref=f8e62]:
            - rowgroup [ref=f8e63]:
              - row [ref=f8e64]:
                - cell "Important Note:" [ref=f8e65]
              - row [ref=f8e66]:
                - cell [ref=f8e67]:
                  - text: "Hotel Application has 2 builds:"
                  - list [ref=f8e68]:
                    - listitem [ref=f8e69]:
                      - strong [ref=f8e70]: Build 1
                      - text: � Has been developed with known defects. Thus, functional test cases and automation scripts will fail on this build.
                      - link [ref=f8e71] [cursor=pointer]:
                        - /url: ../
                        - strong [ref=f8e72]: Go to Build 1
                    - listitem [ref=f8e73]:
                      - strong [ref=f8e74]: Build 2
                      - text: � Known defects have been fixed. Thus, functional test cases and automation test scripts should pass when executed on this build.
              - row [ref=f8e75]:
                - cell [ref=f8e76]:
                  - text: "For any queries/issues please email:"
                  - link "info@adactin.com" [ref=f8e77] [cursor=pointer]:
                    - /url: mailto:info@adactin.com
  - table [ref=f8e78]:
    - rowgroup [ref=f8e79]:
      - row [ref=f8e80]:
        - cell [ref=f8e81]
      - row [ref=f8e82]:
        - cell [ref=f8e83]:
          - text: © 2026 -
          - link "Adactin.com" [ref=f8e84] [cursor=pointer]:
            - /url: http://www.adactin.com
          - text: . All Rights Reserved. Adactin Group Pty. Ltd.
```

# Test source

```ts
  1  | import { test } from '@playwright/test';
  2  | import { attachStepScreenshot } from '../Utilities/screenshot';
  3  | import { APP_BASE_URL } from './BasePage';
  4  | 
  5  | class SelectPage {
  6  |   constructor(page) {
  7  |     this.page = page;
  8  | 
  9  |     this.radioButton = page.locator('#radiobutton_0');
  10 |     this.continueButton = page.locator('#continue');
  11 |   }
  12 | 
  13 |   async gotoSelectPage() {
  14 |     await test.step('Navigate to Select Hotel Page', async () => {
  15 |       await this.page.goto(new URL('SelectHotel.php', APP_BASE_URL).href, { waitUntil: 'domcontentloaded' });
  16 |       await this.radioButton.waitFor({ state: 'visible' });
  17 |       await attachStepScreenshot(this.page, '01 - Select Hotel page opened');
  18 |     });
  19 |   }
  20 | 
  21 |   async selectHotel() {
  22 |     await test.step('Select Hotel Radio Button', async () => {
> 23 |       await this.radioButton.waitFor({ state: 'visible' });
     |                              ^ TimeoutError: locator.waitFor: Timeout 15000ms exceeded.
  24 |       await this.radioButton.click();
  25 |       await attachStepScreenshot(this.page, '02 - After selecting hotel radio button');
  26 |     });
  27 | 
  28 |     await test.step('Click Continue Button', async () => {
  29 |       await this.continueButton.click();
  30 |       await this.page.waitForLoadState('domcontentloaded');
  31 |       await attachStepScreenshot(this.page, '03 - After clicking Continue button');
  32 |     });
  33 |   }
  34 | 
  35 |   async continueWithoutSelection() {
  36 |     await test.step('Continue without selecting a hotel', async () => {
  37 |       await this.continueButton.waitFor({ state: 'visible' });
  38 |       await this.continueButton.click();
  39 |       await this.page.waitForLoadState('domcontentloaded');
  40 |       await attachStepScreenshot(this.page, 'After continuing without selecting a hotel');
  41 |     });
  42 |   }
  43 | }
  44 | 
  45 | export default SelectPage;
```