const asyncHandler = require("../utils/asyncHandler");
const {
  addClient,
  removeClient,
} = require("../events/analysisStream");

/**
 * @desc Stream AI analysis progress
 * @route GET /api/stream
 * @access Private
 */
const analysisStream = asyncHandler(async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  res.flushHeaders();

  addClient(req.user._id, res);

  res.write(
    `event: connected\ndata: ${JSON.stringify({
      message: "Connected to DebugMind AI Stream",
    })}\n\n`
  );

  req.on("close", () => {
    removeClient(req.user._id);
    res.end();
  });
});

module.exports = {
  analysisStream,
};