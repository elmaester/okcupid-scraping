const puppeteer = require("puppeteer");
const fs = require("fs");
const url =
  "https://www.okcupid.com/profile/14110471336158381/questions?cf=questions&filter_id=1";
const autoScroll = require("./autoScroll");
const stringHash = require("string-hash");
const playAlert = require("./playAlert");
const saveQuestionToMongo = require("./saveQuestionToMongo");

const main = async () => {
  try {
    const cookies = JSON.parse(fs.readFileSync("../../creds/cookies.json"));
    const browser = await puppeteer.launch({ headless: false });
    const [page] = await browser.pages();
    await page.setViewport({
      width: 1680,
      height: 1050,
    });
    await page.setCookie(...cookies);
    await page.goto(url);
    await page.waitForSelector(".reactmodal-header-close");
    await page.evaluate(() => {
      const modalCloseButton = document.querySelector(
        ".reactmodal-header-close"
      );
      console.log(modalCloseButton);
      if (modalCloseButton) modalCloseButton.click();
    });
    await autoScroll(page, 300);
    await page.waitForTimeout(6000);
    const questions = await page.evaluate(() =>
      Array.from(document.querySelectorAll(".profile-question-content")).map(
        (q) => {
          const text = q.firstChild.textContent.trim();
          let myAnswer, comment;
          const unacceptableAnswers = [];
          const options = Array.from(q.lastChild.childNodes).map((o, i) => {
            const classes = Array.from(o.classList);
            const classPrefix = "profile-question-self-answers-answer--is";
            if (classes.includes(`${classPrefix}YourAnswer`)) {
              myAnswer = i;
              if (o.firstChild !== o.lastChild) {
                comment = o.lastChild.innerText.slice(1, -1);
              }
            }
            if (classes.includes(`${classPrefix}Unacceptable`)) {
              unacceptableAnswers.push(i);
            }
            return o.firstChild.data;
          });
          return { text, options, myAnswer, comment, unacceptableAnswers };
        }
      )
    );
    questions.forEach(async (q) => {
      q.hash = stringHash(q.text + q.options.join());
      await saveQuestionToMongo(q);
    });
  } catch (e) {
    playAlert("../../girl-hey-ringtone.mp3");
    console.log(e);
  }
};

main();
