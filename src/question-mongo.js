const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  text: String,
  options: [String],
  myAnswer: Number,
  comment: String,
  unacceptableAnswers: [Number],
  hash: Number,
});

const Question = mongoose.model("Question", questionSchema, "questions");

module.exports = Question;
