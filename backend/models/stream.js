const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: String,
  duration: String,
  eligibility: String,
  exams: String,
  scope: String,
  colleges: [String]
});

const streamSchema = new mongoose.Schema({
  streamKey: {
    type: String,
    required: true,
    unique: true   //  duplicate avoid
  },
  title: {
    type: String,
    required: true
  },
  courses: [courseSchema]
});

module.exports = mongoose.model("Stream", streamSchema);