const Stream = require("../models/stream");

// 🔹 POST – add new stream
exports.createStream = async (req, res) => {
  try {
    const { streamKey, title, courses } = req.body;

    // ✅ exists check
    const exists = await Stream.findOne({ streamKey });
    if (exists) {
      return res.status(400).json({
        error: "Stream already exists"
      });
    }

    const stream = new Stream({
      streamKey,
      title,
      courses
    });

    await stream.save();

    res.status(201).json({
      message: "Stream created successfully",
      data: stream
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 GET all streams
exports.getAllStreams = async (req, res) => {
  const streams = await Stream.find();
  res.json(streams);
};

// 🔹 GET by key
exports.getStreamByKey = async (req, res) => {
  const stream = await Stream.findOne({ streamKey: req.params.key });

  if (!stream) {
    return res.status(404).json({ error: "Stream not found" });
  }

  res.json(stream);
};