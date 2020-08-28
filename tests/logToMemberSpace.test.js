const timeout = 15000;


describe("Log to Member Space SBR ", () => {
    let page;


    test('Log to Member Space', async () => {
        await page.goto('http://polr.alwaysdata.net');
        await expect(page.title()).resolves.toMatch('Polr - Campus Annecy');
        // Take a screenshot
        await page.screenshot({path: './tests/img/LogToMemberSpace-1-goodPage.png'});
        // Assert that the drop dom log toggle  will be clicked
        await page.waitForSelector('.dropdown-toggle');
        await page.$eval('.dropdown-toggle', el => el.click());
        await page.screenshot({path: './tests/img/LogToMemberSpace-2-DropDownOpen.png'});

        await page.type('input[name="username"]', 'admin');
        await page.type('input[name="password"]', 'campus');
        await page.screenshot({path: './tests/img/LogToMemberSpace-3-UserAndPassewordAdd.png'});
        await Promise.all([
            page.click('input[name="login"]'),
            page.waitForNavigation({ timeout: 0 })
        ]);
        const text = await page.evaluate(() => document.body.textContent);
        expect(text).toContain('admin ');
        await page.screenshot({path: './tests/img/LogToMemberSpace-4-Connected.png'});
    }, timeout);



    // cette fonction est lancée avant chaque test de cette
    // série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
    }, timeout)

});