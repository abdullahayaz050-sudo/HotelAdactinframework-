class LogoutPage
{
    constructor(page)
    {
        this.page = page;
        this.logoutLink = page.getByRole('link', { name: 'Logout' });
        this.loginAgainLink = page.getByRole('link', { name: 'Click here to login again' });
    }
 
    async gotoLogoutPage()
    {
         await this.logoutLink.click();
         await this.loginAgainLink.click();
    }
}
 
export default LogoutPage;