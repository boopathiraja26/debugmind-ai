const registry = require("./registry");
const {
  createResponse,
} = require("./protocol");

/**
 * MCP Client
 *
 * The AI Agent never talks to tools directly.
 */

const execute = async ({
  tool,
  action,
  payload,
}) => {
  const handler = registry[tool];

  if (!handler) {
    return createResponse({
      success: false,
      error: `Unknown MCP Tool: ${tool}`,
    });
  }

  try {
    const data = await handler.execute({
      action,
      payload,
    });

    return createResponse({
      success: true,
      data,
    });
  } catch (err) {
    return createResponse({
      success: false,
      error: err.message,
    });
  }
};

module.exports = {
  execute,
};