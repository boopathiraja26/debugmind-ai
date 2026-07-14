const Analysis = require('../models/Analysis');
const asyncHandler = require('../utils/asyncHandler');
const { ApiError, sendSuccess } = require('../utils/apiResponse');
const { analyzeBug } = require('../services/geminiService');

/**
 * @desc    Create a new bug analysis using Gemini AI
 * @route   POST /api/analysis
 * @access  Private
 */
const createAnalysis = asyncHandler(async (req, res) => {
  const { title, language, bugDescription, code } = req.body;

  const analysis = await Analysis.create({
    user: req.user._id,
    title,
    language,
    bugDescription,
    code,
    status: 'pending',
  });

  try {
    const aiResponse = await analyzeBug({ language, bugDescription, code });

    analysis.aiResponse = aiResponse;
    analysis.status = 'completed';
    await analysis.save();
  } catch (err) {
    analysis.status = 'failed';
    await analysis.save();
    throw err;
  }

  return sendSuccess(res, 201, 'Bug analysis created successfully', { analysis });
});

/**
 * @desc    Get all analyses for the logged-in user (paginated)
 * @route   GET /api/analysis
 * @access  Private
 */
const getAllAnalyses = asyncHandler(async (req, res) => {
  const page = Number.parseInt(req.query.page, 10) > 0 ? Number.parseInt(req.query.page, 10) : 1;
  const limit =
    Number.parseInt(req.query.limit, 10) > 0 && Number.parseInt(req.query.limit, 10) <= 50
      ? Number.parseInt(req.query.limit, 10)
      : 10;
  const skip = (page - 1) * limit;

  const filter = { user: req.user._id };
  if (req.query.status) {
    filter.status = req.query.status;
  }

  const [items, total] = await Promise.all([
    Analysis.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Analysis.countDocuments(filter),
  ]);

  return sendSuccess(res, 200, 'Analyses fetched successfully', { analyses: items }, {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  });
});

/**
 * @desc    Get a single analysis by ID
 * @route   GET /api/analysis/:id
 * @access  Private
 */
const getSingleAnalysis = asyncHandler(async (req, res) => {
  const analysis = await Analysis.findOne({ _id: req.params.id, user: req.user._id });

  if (!analysis) {
    throw new ApiError(404, 'Analysis not found');
  }

  return sendSuccess(res, 200, 'Analysis fetched successfully', { analysis });
});

/**
 * @desc    Delete an analysis by ID
 * @route   DELETE /api/analysis/:id
 * @access  Private
 */
const deleteAnalysis = asyncHandler(async (req, res) => {
  const analysis = await Analysis.findOneAndDelete({ _id: req.params.id, user: req.user._id });

  if (!analysis) {
    throw new ApiError(404, 'Analysis not found');
  }

  return sendSuccess(res, 200, 'Analysis deleted successfully', { id: req.params.id });
});

module.exports = {
  createAnalysis,
  getAllAnalyses,
  getSingleAnalysis,
  deleteAnalysis,
};