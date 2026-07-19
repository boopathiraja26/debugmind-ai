const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess } = require("../utils/apiResponse");
const { analyzeProjectFiles } = require("../mcp/tools/filesystemTool");

const uploadFiles = asyncHandler(async (req, res) => {
  const result = await analyzeProjectFiles({
    files: req.files,
  });

  return sendSuccess(
    res,
    200,
    "Project analyzed successfully.",
    result
  );
});

module.exports = {
  uploadFiles,
};