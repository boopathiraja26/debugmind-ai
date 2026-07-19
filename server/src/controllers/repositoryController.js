const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess } = require("../utils/apiResponse");

const { execute } = require("../mcp/client");
const { analyzeBug } = require("../services/geminiService");

const repositoryChat = asyncHandler(async (req, res) => {
  const {
    repositoryUrl,
    question,
  } = req.body;

  if (!repositoryUrl || !question) {
    return res.status(400).json({
      success: false,
      message: "Repository URL and question are required.",
    });
  }

  const tool = await execute({
    tool: "github",
    action: "analyzeRepository",
    payload: {
      repositoryUrl,
    },
  });

  const answer = await analyzeBug({
    task: "Ask AI",
    language: "Repository",
    bugDescription: question,
    code: "",
    toolContext: tool.data,
  });

  return sendSuccess(
    res,
    200,
    "Repository chat completed.",
    answer
  );
});

module.exports = {
  repositoryChat,
};