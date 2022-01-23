const selectors = require("../selectors");
const playAlert = require("./playAlert");
const autoScroll = require("./autoScroll");
const fetchPersonInfo = require("./fetchPersonInfo");
const savePersonToMongo = require("./savePersonToMongo");

async function doFetchAndPass(page) {
  try {
    await page.click(selectors.passButton);
    await autoScroll(page, 100);
    await page.waitForSelector(`${selectors.questions} span`);
    await page.waitForTimeout(parseInt(Math.random() * 1500) + 1500);
    const person = await fetchPersonInfo(page);
    savePersonToMongo(person);
  } catch (e) {
    console.log(e);
    playAlert("./girl-hey-ringtone.mp3");
  }
}

module.exports = doFetchAndPass;
