import { test, expect } from '@playwright/test';
import SearchPage from '../Pages/SearchPage';
import SelectPage from '../Pages/SelectPage';
import BookHotel from '../Pages/BookHotel';
import searchData from '../testdata/SearchData.json';
import bookData from '../testdata/Bookhotel.json';
import { attachStepScreenshot } from '../Utilities/screenshot';
import LogoutPage from '../Pages/LogoutPage';

test.afterEach(async ({ page }) => {
  const logout = new LogoutPage(page);
  if (await logout.logoutLink.isVisible({ timeout: 2000 })) {
    await logout.gotoLogoutPage();
  }
});

test('Complete hotel booking flow', async ({ page }) => {
  const searchPage = new SearchPage(page);
  const selectPage = new SelectPage(page);
  const bookHotelPage = new BookHotel(page);
  const search = searchData.SearchHotel[0];
  const booking = bookData.BookHotel[0];

  await test.step('Open search page', async () => {
    await searchPage.gotoSearchPage();
    await attachStepScreenshot(page, 'Authenticated search page assertion');
  });

  await test.step('Search for a hotel', async () => {
    await searchPage.searchHotel(
      search.location,
      search.hotel,
      search.roomType,
      search.numberOfRooms,
      search.checkInDate,
      search.checkOutDate,
      search.adultsPerRoom,
      search.childrenPerRoom
    );
    await expect(page).toHaveURL(new RegExp(search.expected.resultsPagePath));
    await attachStepScreenshot(page, 'Hotel search results assertion');
  });

  await test.step('Select a hotel', async () => {
    await selectPage.selectHotel();
    await expect(page).toHaveURL(new RegExp(search.expected.selectedHotelPagePath));
    await attachStepScreenshot(page, 'Hotel selected assertion');
  });

  await test.step('Book the hotel', async () => {
    await bookHotelPage.bookHotel(
      booking.firstName,
      booking.lastName,
      booking.billingAddress,
      booking.creditCardNumber,
      booking.creditCardType,
      booking.expiryMonth,
      booking.expiryYear,
      booking.cvvNumber
    );

    await page.waitForLoadState('networkidle', { timeout: 20000 });
  });

  await test.step('Verify order confirmation', async () => {
    await expect(page).toHaveURL(new RegExp(booking.expected.confirmationPagePath), { timeout: 15000 });
    await attachStepScreenshot(page, 'Confirmation URL assertion');
    await bookHotelPage.orderNumber.waitFor({ state: 'visible', timeout: 10000 });
    await expect(bookHotelPage.orderNumber).toBeVisible();
    await attachStepScreenshot(page, 'Order number visibility assertion');
    await expect(bookHotelPage.orderNumber).toHaveValue(new RegExp(booking.expected.orderNumberPattern));
    await attachStepScreenshot(page, 'Order number value assertion');
  });
});
