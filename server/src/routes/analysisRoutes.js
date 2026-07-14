const express = require('express');
const {
  createAnalysis,
  getAllAnalyses,
  getSingleAnalysis,
  deleteAnalysis,
} = require('../controllers/analysisController');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validateMiddleware');
const { validateCreateAnalysis } = require('../validators/analysisValidator');

const router = express.Router();

router.use(protect);

// @route   POST /api/analysis
router.post('/', validate(validateCreateAnalysis), createAnalysis);

// @route   GET /api/analysis
router.get('/', getAllAnalyses);

// @route   GET /api/analysis/:id
router.get('/:id', getSingleAnalysis);

// @route   DELETE /api/analysis/:id
router.delete('/:id', deleteAnalysis);

module.exports = router;