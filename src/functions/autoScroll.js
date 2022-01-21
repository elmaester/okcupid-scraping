const playAlert = require("./playAlert");

async function autoScroll(page) {
  try {
    await page.evaluate(async () => {
      await new Promise((resolve, reject) => {
        var totalHeight = 0;
        var distance = 100;
        var timer = setInterval(() => {
          var scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 100);
      });
    });
  } catch (e) {
    console.log(e);
    playAlert("./girl-hey-ringtone.mp3");
  }
}

module.exports = autoScroll;
