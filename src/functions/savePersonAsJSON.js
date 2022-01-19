const fs = require("fs");

async function savePersonAsJSON(person) {
  const fileName = `${person.id}-${person.name}`;
  const path = `./fetched-profiles/${fileName}.json`;
  fs.writeFile(path, JSON.stringify(person), (err) => {
    if (err) throw err;
    console.log(`${fileName} saved`);
  });
}

module.exports = savePersonAsJSON;
