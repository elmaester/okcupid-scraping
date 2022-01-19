async function setLocalStorage(page, localStorage) {
  await page.evaluateOnNewDocument((localStorage) => {
    window.localStorage.clear();
    for (item in localStorage) {
      window.localStorage.setItem(item, localStorage[item]);
    }
  }, localStorage);
}

module.exports = setLocalStorage;
