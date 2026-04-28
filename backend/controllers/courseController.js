const Course = require("../models/course");

// 🔹 POST – add course
exports.createCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();

    res.status(201).json({
      message: "Course added successfully",
      data: course
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 GET – courses by stream
exports.getCoursesByStream = async (req, res) => {
  const courses = await Course.find({ streamKey: req.params.stream });
  res.json(courses);
};