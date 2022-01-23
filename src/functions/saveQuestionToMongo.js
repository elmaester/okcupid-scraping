const mongoose = require("mongoose");
const Question = require("../question-mongo");
const playAlert = require("./playAlert");

async function saveQuestionToMongo(_question) {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/okcupid");
    if (!(await Question.findOne({ hash: _question.hash }))) {
      await Question.create(_question);
      console.log(`Question with hash ${_question.hash} created`);
    } else {
      console.log(`Question with hash ${_question.hash} already exists`);
    }
  } catch (e) {
    playAlert("./girl-hey-ringtone.mp3");
    console.error(e);
  }
}

module.exports = saveQuestionToMongo;
