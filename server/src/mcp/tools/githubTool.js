const { Octokit } = require("@octokit/rest");

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

/**
 * Analyze a GitHub repository.
 */
const analyzeGitHubRepository = async ({ repositoryUrl }) => {
  try {
    if (!repositoryUrl) {
      return {
        success: false,
        error: "Repository URL is required.",
      };
    }

    const cleanUrl = repositoryUrl
      .replace(".git", "")
      .replace(/\/$/, "");

    const parts = cleanUrl.split("/");

    const owner = parts[3];
    const repo = parts[4];

    if (!owner || !repo) {
      return {
        success: false,
        error: "Invalid GitHub repository URL.",
      };
    }

    // Repository details
    const repository = await octokit.repos.get({
      owner,
      repo,
    });

    // Languages
    const languages = await octokit.repos.listLanguages({
      owner,
      repo,
    });

    // Root files/folders
    const contents = await octokit.repos.getContent({
      owner,
      repo,
      path: "",
    });

    const files = [];
    const folders = [];

    if (Array.isArray(contents.data)) {
      contents.data.forEach((item) => {
        if (item.type === "file") {
          files.push(item.name);
        }

        if (item.type === "dir") {
          folders.push(item.name);
        }
      });
    }

    return {
      success: true,

      tool: "github",

      data: {
        repository: {
          name: repository.data.name,
          fullName: repository.data.full_name,
          description: repository.data.description,
          stars: repository.data.stargazers_count,
          forks: repository.data.forks_count,
          watchers: repository.data.watchers_count,
          openIssues: repository.data.open_issues_count,
          defaultBranch: repository.data.default_branch,
          language: repository.data.language,
        },

        languages: languages.data,

        files,

        folders,
      },
    };
  } catch (err) {
    console.error("GitHub Tool Error:", err.message);

    return {
      success: false,
      error: err.message,
    };
  }
};

module.exports = {
  analyzeGitHubRepository,
};