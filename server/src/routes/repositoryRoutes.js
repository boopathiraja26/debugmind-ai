const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { repositoryChat } = require("../controllers/repositoryController");

router.post("/chat", protect, repositoryChat);

module.exports = router;