const express = require("express");

const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const { protect } = require("../middleware/authMiddleware");
const { uploadFiles } = require("../controllers/uploadController");

router.post(
  "/",
  protect,
  upload.array("files", 100),
  uploadFiles
);

module.exports = router;