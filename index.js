const puppeteer = require("puppeteer");
const fs = require("fs");
const url = "https://www.okcupid.com/home";
const selectors = require("./src/selectors");
const autoScroll = require("./src/functions/autoScroll");
const fetchPersonInfo = require("./src/functions/fetchPersonInfo");
const savePersonAsJSON = require("./src/functions/savePersonAsJSON");

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
    await page.waitForSelector(selectors.matchByPercentButton);
    await page.click(selectors.matchByPercentButton);
    await autoScroll(page);
    await page.waitForSelector(selectors.questions);
    const person = await fetchPersonInfo(page);
    savePersonAsJSON(person);
  } catch (e) {
    console.error(e);
  }
};

main();
