const express = require('express');
const { getDashboardStats } = require('../controllers/dashboardController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

// @route   GET /api/dashboard
router.get('/', getDashboardStats);

module.exports = router;