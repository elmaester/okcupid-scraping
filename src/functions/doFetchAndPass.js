const selectors = require("../selectors");
const autoScroll = require("./autoScroll");
const fetchPersonInfo = require("./fetchPersonInfo");
const savePersonToMongo = require("./savePersonToMongo");

async function doFetchAndPass(page) {
  await page.click(selectors.passButton);
  await autoScroll(page);
  await page.waitForSelector(selectors.questions);
  const person = await fetchPersonInfo(page);
  savePersonToMongo(person);
}

module.exports = doFetchAndPass;
