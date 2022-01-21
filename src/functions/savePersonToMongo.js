const mongoose = require("mongoose");
const Person = require("../person-mongo");
const playAlert = require("./playAlert");

async function savePersonToMongo(_person) {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/okcupid");
    if (!(await Person.findOne({ id: _person.id }))) {
      await Person.create(_person);
      console.log(
        `Profile with id ${_person.id} and name ${_person.name} created`
      );
    } else {
      console.log(
        `Profile with id ${_person.id} and name ${_person.name} already exists`
      );
    }
  } catch (e) {
    playAlert("./girl-hey-ringtone.mp3");
    console.error(e);
  }
}

module.exports = savePersonToMongo;
