const mongoose = require("mongoose");
const Person = require("../person-mongo");

async function savePersonToMongo(_person) {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/okcupid");
    if (!await Person.findOne({ id: _person.id })) {
      await Person.create(_person);
      console.log(`Person with id ${_person.id} and name ${_person.name} created`)
    } else {
      console.log(`Person with id ${_person.id} and name ${_person.name} already exists`)
    }
  } catch (e) {
    console.error(e);
  }
}

module.exports = savePersonToMongo;
