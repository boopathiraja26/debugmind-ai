const Analysis = require("../models/Analysis");
const asyncHandler = require("../utils/asyncHandler");
const { ApiError, sendSuccess } = require("../utils/apiResponse");
const { runAgent } = require("../services/ai/agent");
const { DEFAULT_AI_TASK } = require("../utils/aiTasks");

/**
 * @desc Create AI Analysis
 * @route POST /api/analysis
 * @access Private
 */

const {
  sendProgress,
  sendComplete,
  sendError,
} = require("../events/analysisStream");
const createAnalysis = asyncHandler(async (req, res) => {
  const {
    title,
    task = DEFAULT_AI_TASK,
    language,
    bugDescription,
    code,
  } = req.body;

  console.log("============== REQUEST BODY ==============");
console.log(req.body);
console.log("==========================================");

  let aiResponse;
  

  try {
    sendProgress(req.user._id, "🔍 Understanding your request...");

    await new Promise((resolve) => setTimeout(resolve, 500));

    sendProgress(req.user._id, "🧠 Building AI prompt...");

    await new Promise((resolve) => setTimeout(resolve, 500));

    sendProgress(req.user._id, "🤖 Contacting AI model...");

    aiResponse = await runAgent({
      task,
      language,
      bugDescription,
      code,
    });

    sendProgress(req.user._id, "⚡ Processing AI response...");

    await new Promise((resolve) => setTimeout(resolve, 300));
  } catch (error) {
    sendError(
      req.user._id,
      error.message || "Analysis failed."
    );

    throw new ApiError(
      error.statusCode || 500,
      error.message || "Failed to analyze code."
    );
  }

  const analysis = await Analysis.create({
    user: req.user._id,
    title,
    task,
    language,
    bugDescription,
    code,
    aiResponse,
    status: "completed",
  });

  sendComplete(req.user._id, analysis);

  return sendSuccess(
    res,
    201,
    "Analysis completed successfully",
    {
      analysis,
    }
  );
});

/**
 * @desc Get all analyses
 * @route GET /api/analysis
 * @access Private
 */
const getAllAnalyses = asyncHandler(async (req, res) => {
  const analyses = await Analysis.find({
    user: req.user._id,
  }).sort({
    createdAt: -1,
  });

  return sendSuccess(res, 200, "Analyses fetched successfully", {
    analyses,
  });
});

/**
 * @desc Search analyses
 * @route GET /api/analysis/search
 * @access Private
 */
const searchAnalyses = asyncHandler(async (req, res) => {
  const { q = "" } = req.query;

  const analyses = await Analysis.find({
    user: req.user._id,
    $or: [
      {
        title: {
          $regex: q,
          $options: "i",
        },
      },
      {
        bugDescription: {
          $regex: q,
          $options: "i",
        },
      },
      {
        language: {
          $regex: q,
          $options: "i",
        },
      },
      {
        task: {
          $regex: q,
          $options: "i",
        },
      },
    ],
  }).sort({
    createdAt: -1,
  });

  return sendSuccess(res, 200, "Search completed successfully", {
    analyses,
  });
});

/**
 * @desc Get single analysis
 * @route GET /api/analysis/:id
 * @access Private
 */
const getSingleAnalysis = asyncHandler(async (req, res) => {
  const analysis = await Analysis.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!analysis) {
    throw new ApiError(404, "Analysis not found");
  }

  return sendSuccess(res, 200, "Analysis fetched successfully", {
    analysis,
  });
});

/**
 * @desc Delete analysis
 * @route DELETE /api/analysis/:id
 * @access Private
 */
const deleteAnalysis = asyncHandler(async (req, res) => {
  const analysis = await Analysis.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!analysis) {
    throw new ApiError(404, "Analysis not found");
  }

  await analysis.deleteOne();

  return sendSuccess(res, 200, "Analysis deleted successfully");
});

module.exports = {
  createAnalysis,
  getAllAnalyses,
  searchAnalyses,
  getSingleAnalysis,
  deleteAnalysis,
};