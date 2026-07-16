        const { analyzeGitHubRepository } = require("./githubTool");
const { analyzeProjectFiles } = require("./filesystemTool");

/**
 * Decides whether an external tool is needed.
 */
const executeTool = async ({ tool, payload }) => {
  switch (tool) {
    case "github":
      return analyzeGitHubRepository(payload);

    case "filesystem":
      return analyzeProjectFiles(payload);

    default:
      return null;
  }
};

module.exports = {
  executeTool,
};