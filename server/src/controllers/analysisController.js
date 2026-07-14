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
 * @desc    Get all analyses for the logged-in user with optional filters and pagination
 * @route   GET /api/analysis
 * @access  Private
 */
const getAllAnalyses = asyncHandler(async (req, res) => {
  const { page, limit, status, language, date } = req.query;
  const skip = (page - 1) * limit;

  const filter = { user: req.user._id };
  if (status) {
    filter.status = status;
  }
  if (language) {
    filter.language = { $regex: `^${language}$`, $options: 'i' };
  }
  if (date) {
    const startOfDay = new Date(`${date}T00:00:00.000Z`);
    const endOfDay = new Date(`${date}T23:59:59.999Z`);
    filter.createdAt = { $gte: startOfDay, $lte: endOfDay };
  }

  const [items, total] = await Promise.all([
    Analysis.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Analysis.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(total / limit) || 0;

  return sendSuccess(res, 200, 'Analyses fetched successfully', { analyses: items }, {
    page,
    limit,
    total,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  });
});

/**
 * @desc    Search the logged-in user's analyses by title, language, or bug description
 * @route   GET /api/analysis/search
 * @access  Private
 */
const searchAnalyses = asyncHandler(async (req, res) => {
  const { q, page, limit, status, language } = req.query;
  const skip = (page - 1) * limit;

  const filter = { user: req.user._id };

  if (status) {
    filter.status = status;
  }
  if (language) {
    filter.language = { $regex: `^${language}$`, $options: 'i' };
  }

  if (q) {
    const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    filter.$or = [
      { title: { $regex: escaped, $options: 'i' } },
      { language: { $regex: escaped, $options: 'i' } },
      { bugDescription: { $regex: escaped, $options: 'i' } },
    ];
  }

  const [items, total] = await Promise.all([
    Analysis.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Analysis.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(total / limit) || 0;

  return sendSuccess(res, 200, 'Search results fetched successfully', { analyses: items }, {
    page,
    limit,
    total,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
    query: q || '',
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
  searchAnalyses,
  getSingleAnalysis,
  deleteAnalysis,
};