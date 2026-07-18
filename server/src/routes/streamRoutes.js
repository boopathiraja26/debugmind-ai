const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  analysisStream,
} = require("../controllers/streamController");

router.get("/", protect, analysisStream);

module.exports = router;