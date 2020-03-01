const { Given, When, Then } = require('cucumber');
const assert = require('assert');
const scope = require('../../support/scope');
const testFunctions = require('../../support/functions');
const config = require('../../support/config');
const { tenSeconds, thirtySeconds, oneMinute } = require('../../support/constants');


Given('I am logged in', { timeout: oneMinute }, async () => {
  const page = scope.context.currentPage;
  await testFunctions.login(page);
  await page.waitForSelector(".spinner", { timeout: oneMinute });
  await page.waitForSelector("button.logout-button");
});

Given('I have rejected microphone permissions', { timeout: oneMinute }, async () => {
  const page = scope.context.currentPage;
  page.on('dialog', async dialog => {
    await dialog.dismiss();
  });
});

Given('I have accepted microphone permissions', { timeout: oneMinute }, async () => {
  const page = scope.context.currentPage;
  page.on('dialog', async dialog => {
    await dialog.accept();
  });
});

Given('I am on the home page', async () => {
  if (!scope.browser) scope.browser = await scope.driver.launch(config.browserSettings);

  scope.context.currentPage = await scope.browser.newPage();
  scope.context.currentPage.setViewport(config.windowSize);
  const url = scope.host;
  const homePage = await scope.context.currentPage.goto(url, { waitUntil: 'networkidle2' });

  return homePage;
});

When('I submit a valid room choice by click', { timeout: tenSeconds }, () => {
  const page = scope.context.currentPage;
  return testFunctions.chooseValidRoom(page);
});

When('I submit an invalid room choice by click', { timeout: tenSeconds }, () => {
  const page = scope.context.currentPage;
  return testFunctions.chooseInvalidRoom(page);
});

When('I wait for over 20 seconds', { timeout: thirtySeconds }, async () => {
  const delay = (time) => {
   return new Promise(function(resolve) { 
       setTimeout(resolve, time)
   });
}
  await delay(20001);
});

When('I press the Reset Screen button', async () => {
  const page = scope.context.currentPage;
  await page.waitForSelector("table"); // booking details should appear
  await page.hover("button#resetScreen");
  await page.click("button#resetScreen");
});

Then('I should be shown some booking details', async () => {
  const page = scope.context.currentPage;
  await page.waitForSelector("button"); // Reset button should appear
  const tableHeading = await page.$eval("h2", element => element.innerHTML);
  const tableIsPresent = await page.$eval("table", element => element.outerHTML);

  assert(tableIsPresent);
  assert(tableHeading == "Booking Details");
});

Then('I should be shown an error banner with a helpful prompt', async () => {
  const page = scope.context.currentPage;
  const errorBannerWithPrompt = await page.$eval("h4", element => element.innerHTML);

  assert(errorBannerWithPrompt == "Room not found - Please choose one of the other rooms.");
});

Then('I should be shown an error banner with a helpful prompt for voice', async () => {
  const page = scope.context.currentPage;
  const errorBannerWithPrompt = await page.$eval("h2", element => element.innerHTML);

  assert(errorBannerWithPrompt == "Room Not found - Please try again and say the room number. Alternatively, consult the receptionist for help.");
});

Then('I should be shown the initial room choice panel', async () => {
  const page = scope.context.currentPage;
  const roomChoicePanelHeading = await page.$eval("h4", element => element.innerHTML);
  const validRoomChoiceExists = await page.$eval("#roomOne", element => element.innerHTML);
  const invalidRoomChoiceExists = await page.$eval("#invalidRoom", element => element.innerHTML);

  assert(roomChoicePanelHeading == "Welcome to your holiday - Choose a Room below");
  assert(validRoomChoiceExists);
  assert(invalidRoomChoiceExists);
});
