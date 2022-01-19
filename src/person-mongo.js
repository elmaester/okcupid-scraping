const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  id: String,
  name: String,
  age: Number,
  link: String,
  photos: [String],
  details: {
    basics: String,
    pronouns: String,
    looks: String,
    background: String,
    lifestyle: String,
    family: String,
    wiw: String,
  },
  city: String,
  country: String,
  matchPercent: Number,
  questions: {
    agree: Number,
    disagree: Number,
    findOut: Number,
    answered: Number,
    agreePercent: Number,
  },
  essays: { type: Map, of: String },
});

const Person = mongoose.model("Person", personSchema, "profiles");

module.exports = Person;
