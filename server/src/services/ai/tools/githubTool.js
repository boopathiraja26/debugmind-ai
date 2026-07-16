/**
 * GitHub Tool
 * Placeholder implementation.
 * Later this will fetch repository information using the GitHub API.
 */

const analyzeGitHubRepository = async ({ repositoryUrl }) => {
  return {
    success: true,
    tool: "github",
    repositoryUrl,
    message: "GitHub repository analysis is not implemented yet.",
    files: [],
    summary: null,
  };
};

module.exports = {
  analyzeGitHubRepository,
};