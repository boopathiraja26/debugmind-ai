const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess } = require("../utils/apiResponse");

const uploadFiles = asyncHandler(async (req, res) => {
  return sendSuccess(
    res,
    200,
    "Files uploaded successfully.",
    {
      files: req.files,
    }
  );
});

module.exports = {
  uploadFiles,
};