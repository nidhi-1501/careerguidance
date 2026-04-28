const express = require("express");
const router = express.Router();
const streamController = require("../controllers/streamController");

router.post("/", streamController.createStream);   //  POST
router.get("/", streamController.getAllStreams);
router.get("/:key", streamController.getStreamByKey);

module.exports = router;