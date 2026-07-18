const clients = new Map();

/**
 * Register an SSE client
 */
const addClient = (userId, res) => {
  clients.set(userId.toString(), res);
};

/**
 * Remove disconnected client
 */
const removeClient = (userId) => {
  clients.delete(userId.toString());
};

/**
 * Send progress update
 */
const sendProgress = (userId, message) => {
  const client = clients.get(userId.toString());

  if (!client) return;

  client.write(
    `event: progress\ndata: ${JSON.stringify({
      message,
    })}\n\n`
  );
};

/**
 * Send completed event
 */
const sendComplete = (userId, analysis) => {
  const client = clients.get(userId.toString());

  if (!client) return;

  client.write(
    `event: complete\ndata: ${JSON.stringify(
      analysis
    )}\n\n`
  );
};

/**
 * Send error event
 */
const sendError = (userId, message) => {
  const client = clients.get(userId.toString());

  if (!client) return;

  client.write(
    `event: error\ndata: ${JSON.stringify({
      message,
    })}\n\n`
  );
};

module.exports = {
  addClient,
  removeClient,
  sendProgress,
  sendComplete,
  sendError,
};