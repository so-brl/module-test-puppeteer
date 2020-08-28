const timeout = 15000;

describe("Go to the the member historic page by SBR ", () => {
    let page;

    test('Go to the the member historic page', async () => {
        await page.goto('http://polr.alwaysdata.net');
        await expect(page.title()).resolves.toMatch('Polr - Campus Annecy');
        await page.waitForSelector('.dropdown-toggle');
        await page.$eval('.dropdown-toggle', el => el.click());
        await page.type('input[name="username"]', 'admin');
        await page.type('input[name="password"]', 'campus');
        await Promise.all([
            page.click('input[name="login"]'),
            page.waitForNavigation({ timeout: 0 })
        ]);
        await page.screenshot({path: './tests/img/HistoricMemberSpace-1-Connected.png'});

        // ---------- Connected

         await page.waitForSelector('.dropdown-toggle');
         await page.$eval('.dropdown-toggle', el => el.click());
         await page.screenshot({path: './tests/img/HistoricMemberSpace-2-DropDownOpen.png'});
        await page.evaluate( () => {
            Array
                .from( document.querySelectorAll( '.dropdown-menu li a' ) )
                .filter( el => el.textContent === 'Dashboard' )[0].click();
        });
         await page.screenshot({path: './tests/img/HistoricMemberSpace-4-DashBoardCliked.png'});
        await page.evaluate( () => {
            Array
                .from( document.querySelectorAll( '.admin-nav-item a' ) )
                .filter( el => el.textContent === 'Links' )[0].click();
        });
        await page.screenshot({path: './tests/img/HistoricMemberSpace-4-DashBoardClikedOnLink.png'});

    }, timeout);

    // cette fonction est lancée avant chaque test de cette
    // série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
    }, timeout)

});