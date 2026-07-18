const { getTool } = require("./toolRegistry");

/**
 * Executes an MCP tool if required.
 */
const executeTool = async (toolName, input) => {
  const tool = getTool(toolName);

  if (!tool) {
    throw new Error(`Unknown MCP tool: ${toolName}`);
  }

  return await tool.execute(input);
};

module.exports = {
  executeTool,
};