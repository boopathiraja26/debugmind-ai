const filesystemTool = require("./tools/filesystemTool");
const githubTool = require("./tools/githubTool");
const searchTool = require("./tools/searchTool");

/**
 * Every MCP Tool is registered here.
 */

const registry = {
  filesystem: filesystemTool,
  github: githubTool,
  search: searchTool,
};

module.exports = registry;