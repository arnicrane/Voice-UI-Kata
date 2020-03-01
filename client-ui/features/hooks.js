// Dependencies
const { After, Before, BeforeAll, AfterAll } = require('cucumber');
const puppeteer = require('puppeteer');
const scope = require('./support/scope');
const World = require('./world');

BeforeAll(async () => {
    // Runs once before all end-to-end scenarios/features
});

Before(async () => {
    // Runs before every scenario
});

After(async () => {
    // Runs after every scenario
    // Here we check if a scenario has instantiated a browser and a current page
    if (scope.browser && scope.context.currentPage) {
        // if it has, find all the cookies, and delete them
        const cookies = await scope.context.currentPage.cookies();
        if (cookies && cookies.length > 0) {
            await scope.context.currentPage.deleteCookie(...cookies);
        }
        // close the web page down
        // await scope.context.currentPage.close();
        // wipe the context's currentPage value
        // scope.context.currentPage = null;
    }
});

AfterAll(async () => {
    // Runs once after all end-to-end scenarios/features
    // If there is a browser window open, then close it
    if (scope.browser) await scope.browser.close();
    scope.web.shutdown(() => console.log("\nWeb-App is shut down"));
});
