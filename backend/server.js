const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const streamRoutes = require("./routes/streamRoutes");
const courseRoutes = require("./routes/courseRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect(mongodb_uri)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Routes
app.use("/api/streams", streamRoutes);
app.use("/api/courses", courseRoutes);

app.get("/test", (req, res) => {
  res.send("working");
});

app.listen(5001, () => {
  console.log("Server running on http://localhost:5001");
});