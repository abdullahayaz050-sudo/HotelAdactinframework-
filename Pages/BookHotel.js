import { test } from '@playwright/test';
import { attachStepScreenshot } from '../Utilities/screenshot';
import { APP_BASE_URL } from './BasePage';

class BookHotel {
    constructor(page) {
        this.page = page;
        this.firstName = page.locator('#first_name');
        this.lastName = page.locator('#last_name');
        this.billingAddress = page.locator('#address');
        this.creditCardNumber = page.locator('#cc_num');
        this.creditCardType = page.locator('#cc_type');
        this.expiryMonth = page.locator('#cc_exp_month');
        this.expiryYear = page.locator('#cc_exp_year');
        this.cvvNumber = page.locator('#cc_cvv');
        this.bookNowButton = page.locator('#book_now');
        this.orderNumber = page.locator('#order_no');
        this.firstNameError = page.locator('#first_name_span');
        this.lastNameError = page.locator('#last_name_span');
        this.addressError = page.locator('#address_span');
        this.creditCardNumberError = page.locator('#cc_num_span');
        this.creditCardTypeError = page.locator('#cc_type_span');
        this.expiryError = page.locator('#cc_expiry_span');
        this.cvvError = page.locator('#cc_cvv_span');
    }

    async gotoBookHotelPage() {
        await test.step('Navigate to Book Hotel Page', async () => {
            await this.page.goto(new URL('BookHotel.php', APP_BASE_URL).href, { waitUntil: 'domcontentloaded' });
            await this.firstName.waitFor({ state: 'visible' });
            await attachStepScreenshot(this.page, '01 - Book Hotel page opened');
        });
    }

    async bookHotel(firstName, lastName, billingAddress, creditCardNumber, creditCardType, expiryMonth, expiryYear, cvvNumber) {
        await test.step('Enter First Name', async () => {
            await this.firstName.fill(firstName);
            await attachStepScreenshot(this.page, '02 - After entering first name');
        });

        await test.step('Enter Last Name', async () => {
            await this.lastName.fill(lastName);
            await attachStepScreenshot(this.page, '03 - After entering last name');
        });

        await test.step('Enter Billing Address', async () => {
            await this.billingAddress.fill(billingAddress);
            await attachStepScreenshot(this.page, '04 - After entering billing address');
        });

        await test.step('Enter Credit Card Number', async () => {
            await this.creditCardNumber.fill(creditCardNumber);
            await attachStepScreenshot(this.page, '05 - After entering credit card number');
        });

        await test.step('Select Credit Card Type', async () => {
            await this.creditCardType.selectOption(creditCardType);
            await attachStepScreenshot(this.page, '06 - After selecting credit card type');
        });

        await test.step('Select Expiry Month', async () => {
            await this.expiryMonth.selectOption(expiryMonth);
            await attachStepScreenshot(this.page, '07 - After selecting expiry month');
        });

        await test.step('Select Expiry Year', async () => {
            await this.expiryYear.selectOption(expiryYear);
            await attachStepScreenshot(this.page, '08 - After selecting expiry year');
        });

        await test.step('Enter CVV Number', async () => {
            await this.cvvNumber.fill(cvvNumber);
            await attachStepScreenshot(this.page, '09 - After entering CVV number');
        });

        await test.step('Click Book Now Button', async () => {
            await this.bookNowButton.click();
            await this.page.waitForLoadState('domcontentloaded');
            await attachStepScreenshot(this.page, '10 - After clicking Book Now button');
        });
    }
}

export default BookHotel;