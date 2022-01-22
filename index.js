const puppeteer = require("puppeteer");
const fs = require("fs");
const url = "https://www.okcupid.com/home";
const selectors = require("./src/selectors");
const autoScroll = require("./src/functions/autoScroll");
const fetchPersonInfo = require("./src/functions/fetchPersonInfo");
const savePersonToMongo = require("./src/functions/savePersonToMongo");
const doFetchAndPass = require("./src/functions/doFetchAndPass");
const playAlert = require("./src/functions/playAlert");

const main = async () => {
  try {
    const cookies = JSON.parse(fs.readFileSync("creds/cookies.json"));
    const browser = await puppeteer.launch({ headless: false });
    const [page] = await browser.pages();
    await page.setViewport({
      width: 1680,
      height: 1050,
    });
    await page.setCookie(...cookies);
    await page.goto(url);
    await page.waitForSelector(selectors.onlineNowButton);
    await page.evaluate(() => {
      const modalCloseButton = document.querySelector(".reader-text");
      if (modalCloseButton) modalCloseButton.click();
    });
    await page.waitForSelector(selectors.onlineNowButton);
    await page.click(selectors.onlineNowButton);
    await autoScroll(page);
    await page.waitForSelector(selectors.questions);
    const person = await fetchPersonInfo(page);
    savePersonToMongo(person);
    // for (let i = 0; i < 5; i++) {
    while (true) {
      await doFetchAndPass(page);
    }
    // await browser.close();
  } catch (e) {
    playAlert("./girl-hey-ringtone.mp3");
    console.log(e);
  }
};

main();
