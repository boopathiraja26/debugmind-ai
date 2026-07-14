const express = require('express');
const {
  createAnalysis,
  getAllAnalyses,
  searchAnalyses,
  getSingleAnalysis,
  deleteAnalysis,
} = require('../controllers/analysisController');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validateMiddleware');
const {
  validateCreateAnalysis,
  validateListQuery,
  validateSearchQuery,
} = require('../validators/analysisValidator');

const router = express.Router();

router.use(protect);

// @route   POST /api/analysis
router.post('/', validate(validateCreateAnalysis), createAnalysis);

// @route   GET /api/analysis
router.get('/', validate(validateListQuery, 'query'), getAllAnalyses);

// @route   GET /api/analysis/search
router.get('/search', validate(validateSearchQuery, 'query'), searchAnalyses);

// @route   GET /api/analysis/:id
router.get('/:id', getSingleAnalysis);

// @route   DELETE /api/analysis/:id
router.delete('/:id', deleteAnalysis);

module.exports = router;