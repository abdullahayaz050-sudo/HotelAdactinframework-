import { test, expect } from '@playwright/test';
import SearchPage from '../Pages/SearchPage';
import SelectPage from '../Pages/SelectPage';
import searchData from '../testdata/SearchData.json';
import { attachStepScreenshot } from '../Utilities/screenshot';

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
 
test('select Hotel Test Case using with Valid User', async ({ page }) => {
  const search = new SearchPage(page);
  const select = new SelectPage(page);
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

  await select.selectHotel();
  await expect(page).toHaveURL(new RegExp(sdata.expected.selectedHotelPagePath));
  await attachStepScreenshot(page, 'Selected hotel URL assertion');
});

test('select Hotel Test Case using with Invalid User (No Selection)', async ({ page }) => {
  const search = new SearchPage(page);
  const select = new SelectPage(page);
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
  await select.continueWithoutSelection();
  await expect(page).toHaveURL(new RegExp(sdata.expected.resultsPagePath));
  await attachStepScreenshot(page, 'No hotel selected URL assertion');
});