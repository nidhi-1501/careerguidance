const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const streamRoutes = require("./routes/streamRoutes");
const courseRoutes = require("./routes/courseRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Routes
app.use("/api/streams", streamRoutes);
app.use("/api/courses", courseRoutes);

app.get("/test", (req, res) => {
  res.send("working");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})