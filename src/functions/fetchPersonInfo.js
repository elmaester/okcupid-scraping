const selectors = require("../selectors");
const playAlert = require("./playAlert");

async function fetchPersonInfo(page) {
  try {
    return await page.evaluate((selectors) => {
      const detailsNodeList = document.querySelectorAll(
        selectors.detailsSection
      );
      const details = {};
      Array.from(detailsNodeList).forEach((detail) => {
        details[detail.parentElement.className.split("--")[1]] =
          detail.textContent;
      });
      const photos = Array.from(document.querySelectorAll(selectors.photos))
        .filter((e) => e.closest(".dt-desktop-photos"))
        .map((p) => p.style.backgroundImage.split('"')[1]);
      const name = document.querySelector(selectors.name).textContent.trim();
      const [ageString, locationString] = document
        .querySelector(selectors.ageAndLocation)
        .textContent.trim()
        .split(" • ");
      const age = parseInt(ageString);
      const splitLocationString = locationString.split(", ");
      const city =
        splitLocationString.length > 1
          ? splitLocationString.slice(0, -1).join(", ")
          : splitLocationString[0];
      const country =
        splitLocationString.length > 1
          ? splitLocationString[splitLocationString.length - 1]
          : "Romania";
      const matchPercentDOM = document.querySelector(
        selectors.matchPercent
      ).parentElement;
      const matchPercent = parseInt(matchPercentDOM.textContent.trim());
      const linkSplitArray = matchPercentDOM.href.split("/");
      const id = linkSplitArray[4];
      const link = linkSplitArray.slice(0, 5).join("/");
      const questionsString = document
        .querySelector(selectors.questions)
        .textContent.trim();
      const [agree, disagree, findOut] = questionsString
        .match(/[0-9]+/g)
        .map((i) => parseInt(i));
      const questions = {
        agree,
        disagree,
        findOut,
        answered: agree + disagree + findOut,
        agreePercent: parseInt(
          (agree / (agree + disagree)).toFixed(2).slice(2)
        ),
      };
      const essays = {};
      Array.from(document.querySelectorAll(".dt-essay-section"))
        .map((i) => i.children)
        .forEach(([title, content]) => {
          essays[title.textContent.replace("...", "").replace(".", ";")] =
            content.firstChild.firstChild.textContent;
        });
      return {
        id,
        name,
        photos,
        link,
        details,
        age,
        city,
        country,
        matchPercent,
        questions,
        essays,
        creationTime: Date.now(),
      };
    }, selectors);
  } catch (e) {
    console.log(e);
    playAlert("./girl-hey-ringtone.mp3");
  }
}

module.exports = fetchPersonInfo;
