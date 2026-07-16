/**
 * Sends progress updates to the frontend.
 */

const sendProgress = (res, step, message) => {
  if (!res) return;

  res.write(
    `data: ${JSON.stringify({
      type: "progress",
      step,
      message,
      timestamp: new Date().toISOString(),
    })}\n\n`
  );
};

const sendComplete = (res, data) => {
  if (!res) return;

  res.write(
    `data: ${JSON.stringify({
      type: "complete",
      data,
    })}\n\n`
  );

  res.end();
};

const sendError = (res, message) => {
  if (!res) return;

  res.write(
    `data: ${JSON.stringify({
      type: "error",
      message,
    })}\n\n`
  );

  res.end();
};

module.exports = {
  sendProgress,
  sendComplete,
  sendError,
};