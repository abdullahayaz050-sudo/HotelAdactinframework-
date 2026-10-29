import { test, expect } from '@playwright/test';
import SearchPage from '../Pages/SearchPage';
import SelectPage from '../Pages/SelectPage';
import BookHotel from '../Pages/BookHotel';
import searchData from '../testdata/SearchData.json';
import bookData from '../testdata/Bookhotel.json';
import { attachStepScreenshot } from '../Utilities/screenshot';

let bookPage;

test.beforeEach(async ({ page }) => {
  const search = new SearchPage(page);
  const select = new SelectPage(page);
  const sdata = searchData.SearchHotel[0];
  bookPage = new BookHotel(page);

  await search.gotoSearchPage();
  await search.searchHotel(
    sdata.location,
    sdata.hotel,
    sdata.roomType,
    sdata.numberOfRooms,
    sdata.checkInDate,
    sdata.checkOutDate,
    sdata.adultsPerRoom,
    sdata.childrenPerRoom
  );
  await select.selectHotel();
});
test.afterEach(async ({ page }) => {
    try {
      const logout = new LogoutPage(page);
      if (await logout.logoutLink.isVisible({ timeout: 2000 })) {
        await logout.gotoLogoutPage();
      }
    } catch (error) {
    }
  });
 
 

test('Book Hotel Test Case using with Valid User', async ({ page }) => {
  const bdata = bookData.BookHotel[0];

  await bookPage.bookHotel(
    bdata.firstName,
    bdata.lastName,
    bdata.billingAddress,
    bdata.creditCardNumber,
    bdata.creditCardType,
    bdata.expiryMonth,
    bdata.expiryYear,
    bdata.cvvNumber
  );
  await expect(page).toHaveURL(new RegExp(bdata.expected.confirmationPagePath));
  await attachStepScreenshot(page, 'Booking confirmation URL assertion');
});

test('Book Hotel Test Case using with Invalid User', async ({ page }) => {
  const invalidBdata = bookData.BookHotel[1];
  await bookPage.bookHotel(
    invalidBdata.firstName,
    invalidBdata.lastName,
    invalidBdata.billingAddress,
    invalidBdata.creditCardNumber,
    invalidBdata.creditCardType,
    invalidBdata.expiryMonth,
    invalidBdata.expiryYear,
    invalidBdata.cvvNumber
  );
  const expected = invalidBdata.expected.validationMessages;
  await expect(bookPage.firstNameError).toHaveText(expected.firstName);
  await attachStepScreenshot(page, 'Missing first name assertion');
  await expect(bookPage.lastNameError).toHaveText(expected.lastName);
  await attachStepScreenshot(page, 'Missing last name assertion');
  await expect(bookPage.addressError).toHaveText(expected.address);
  await attachStepScreenshot(page, 'Missing address assertion');
  await expect(bookPage.creditCardNumberError).toHaveText(expected.creditCardNumber);
  await attachStepScreenshot(page, 'Missing card number assertion');
  await expect(bookPage.creditCardTypeError).toHaveText(expected.creditCardType);
  await attachStepScreenshot(page, 'Missing card type assertion');
  await expect(bookPage.expiryError).toHaveText(expected.expiryMonth);
  await attachStepScreenshot(page, 'Missing expiry month assertion');
  await expect(bookPage.cvvError).toHaveText(expected.cvvNumber);
  await attachStepScreenshot(page, 'Missing CVV assertion');
});

test('Book Hotel Test Case with Invalid Credit Card Number', async ({ page }) => {
  const invalidCardData = bookData.BookHotel[2];
  await bookPage.bookHotel(
    invalidCardData.firstName,
    invalidCardData.lastName,
    invalidCardData.billingAddress,
    invalidCardData.creditCardNumber,
    invalidCardData.creditCardType,
    invalidCardData.expiryMonth,
    invalidCardData.expiryYear,
    invalidCardData.cvvNumber
  );
  await expect(bookPage.creditCardNumberError)
    .toHaveText(invalidCardData.expected.validationMessages.creditCardNumber);
  await attachStepScreenshot(page, 'Invalid card number assertion');
});

test('Book Hotel Test Case with Missing Expiry Month', async ({ page }) => {
  const missingExpiryData = bookData.BookHotel[3];
  await bookPage.bookHotel(
    missingExpiryData.firstName,
    missingExpiryData.lastName,
    missingExpiryData.billingAddress,
    missingExpiryData.creditCardNumber,
    missingExpiryData.creditCardType,
    missingExpiryData.expiryMonth,
    missingExpiryData.expiryYear,
    missingExpiryData.cvvNumber
  );
  await expect(bookPage.expiryError)
    .toHaveText(missingExpiryData.expected.validationMessages.expiryMonth);
  await attachStepScreenshot(page, 'Missing expiry month assertion');
});

test('Book Hotel Test Case with Missing CVV Number', async ({ page }) => {
  const missingCvvData = bookData.BookHotel[4];
  await bookPage.bookHotel(
    missingCvvData.firstName,
    missingCvvData.lastName,
    missingCvvData.billingAddress,
    missingCvvData.creditCardNumber,
    missingCvvData.creditCardType,
    missingCvvData.expiryMonth,
    missingCvvData.expiryYear,
    missingCvvData.cvvNumber
  );
  await expect(bookPage.cvvError)
    .toHaveText(missingCvvData.expected.validationMessages.cvvNumber);
  await attachStepScreenshot(page, 'Missing CVV assertion');
});