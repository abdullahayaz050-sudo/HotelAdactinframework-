import { config } from '../config';

export const APP_BASE_URL = config.url;

class BasePage {

constructor(page) {

this.page = page;

}

async navigate(url) {

await this.page.goto(url);

}

}

export default BasePage;
 