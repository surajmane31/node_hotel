const mongoose = require("mongoose");

// peson schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  work: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  salary: {
    type: Number,
    default: 50000,
  },
});

const person = mongoose.model('person',personSchema)

module.exports = person;