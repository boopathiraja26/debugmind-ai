const asyncHandler = require("../utils/asyncHandler");
const {
  addClient,
  removeClient,
} = require("../events/analysisStream");

/**
 * GET /api/analysis/stream
 * Private
 */
const analysisStream = asyncHandler(async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  res.flushHeaders();

  addClient(req.user._id, res);

  res.write(
    `event: connected\ndata: ${JSON.stringify({
      message: "SSE Connected",
    })}\n\n`
  );

  req.on("close", () => {
    removeClient(req.user._id);
  });
});

module.exports = {
  analysisStream,
};