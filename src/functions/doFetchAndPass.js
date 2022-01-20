const selectors = require("../selectors");
const autoScroll = require("./autoScroll");
const fetchPersonInfo = require("./fetchPersonInfo");
const savePersonToMongo = require("./savePersonToMongo");

async function doFetchAndPass(page) {
  await page.click(selectors.passButton);
  await autoScroll(page);
  await page.waitForSelector(selectors.questions);
  await page.waitForTimeout(parseInt(Math.random() * 1500) + 1000);
  const person = await fetchPersonInfo(page);
  savePersonToMongo(person);
}

module.exports = doFetchAndPass;
