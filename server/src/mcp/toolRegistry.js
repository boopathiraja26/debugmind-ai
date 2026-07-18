/**
 * MCP Tool Registry
 * Registers every tool the AI Agent can use.
 */

const fileTool = require("./tools/fileTool");
const githubTool = require("./tools/githubTool");
const docsTool = require("./tools/docsTool");

const tools = {
  file: fileTool,
  github: githubTool,
  docs: docsTool,
};

const getTool = (name) => {
  return tools[name];
};

const listTools = () => {
  return Object.keys(tools);
};

module.exports = {
  getTool,
  listTools,
};