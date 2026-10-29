import { test, expect } from '@playwright/test';
import SearchPage from '../Pages/SearchPage';
import searchData from '../testdata/SearchData.json';
import { attachStepScreenshot } from '../Utilities/screenshot';

test.describe('Adactin Hotel Search Feature', () => {

  test.beforeEach(async ({ page }) => {
    const search = new SearchPage(page);
    await search.gotoSearchPage();
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
 
  

 test('Search Hotel Test Case using with Valid User', async ({ page }) => {
    const search = new SearchPage(page);
    const sdata = searchData.SearchHotel[0];
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
    await expect(page).toHaveURL(new RegExp(sdata.expected.resultsPagePath));
    await attachStepScreenshot(page, 'Valid search assertion');
  });

  test('Search Hotel Test Case using with Invalid User', async ({ page }) => {
    const search = new SearchPage(page);
    const invalidData = searchData.SearchHotel[1];
    await search.searchHotel(
      invalidData.location,
      invalidData.hotel,
      invalidData.roomType,
      invalidData.numberOfRooms,
      invalidData.checkInDate,
      invalidData.checkOutDate,
      invalidData.adultsPerRoom,
      invalidData.childrenPerRoom
    );
    await expect(search.checkInError).toHaveText(invalidData.expected.checkInMessage);
    await attachStepScreenshot(page, 'Invalid check-in date assertion');
    await expect(search.checkOutError).toHaveText(invalidData.expected.checkOutMessage);
    await attachStepScreenshot(page, 'Invalid check-out date assertion');
  });

  for (const validationData of searchData.SearchHotelValidation) {
    test(validationData.name, async ({ page }) => {
      const search = new SearchPage(page);
      const input = validationData.input;
      await search.searchHotel(
        input.location,
        input.hotel,
        input.roomType,
        input.numberOfRooms,
        input.checkInDate,
        input.checkOutDate,
        input.adultsPerRoom,
        input.childrenPerRoom
      );
      await expect(search.validationMessage(validationData.expected.selector))
        .toHaveText(validationData.expected.message);
      await attachStepScreenshot(page, `${validationData.name} assertion`);
    });
  }

});