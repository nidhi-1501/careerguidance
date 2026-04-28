const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  streamKey: {
    type: String,
    required: true   // science / commerce / arts
  },
  courseName: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  entranceExams: {
    type: [String],
    required: true
  },
  eligibility: {
    type: String,
    required: true
  },
  bestColleges: {
    type: [String]
  }
}, { timestamps: true });

module.exports = mongoose.model("Course", courseSchema);
