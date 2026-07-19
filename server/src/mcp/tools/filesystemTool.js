/**
 * Filesystem MCP Tool
 *
 * Analyzes uploaded project files and returns
 * useful project context for the AI Agent.
 */

const path = require("path");

const analyzeProjectFiles = async ({ files = [] }) => {
  try {
    const extensions = {};
    const entryFiles = [];
    const folders = new Set();
    const fileNames = [];

    const IMPORTANT_FILES = [
      "package.json",
      "package-lock.json",
      "server.js",
      "index.js",
      "app.js",
      "main.js",
      "main.jsx",
      "App.js",
      "App.jsx",
      ".env",
      "vite.config.js",
      "vite.config.ts",
      "tsconfig.json",
      "README.md",
    ];

    for (const file of files) {
      // File name
      const name =
        file.originalname ||
        file.name ||
        "";

      fileNames.push(name);

      // Extension
      const ext =
        path.extname(name).replace(".", "") ||
        "unknown";

      extensions[ext] = (extensions[ext] || 0) + 1;

      // Folder
      const folder = path.dirname(name);

      if (
        folder &&
        folder !== "." &&
        folder !== "/"
      ) {
        folders.add(folder);
      }

      // Important files
      const baseName = path.basename(name);

      if (IMPORTANT_FILES.includes(baseName)) {
        entryFiles.push(baseName);
      }
    }

    return {
      success: true,

      data: {
        totalFiles: files.length,

        extensions,

        entryFiles,

        folders: [...folders],

        files: fileNames,

        projectSummary: {
          hasFrontend:
            entryFiles.includes("App.jsx") ||
            entryFiles.includes("main.jsx") ||
            entryFiles.includes("vite.config.js"),

          hasBackend:
            entryFiles.includes("server.js") ||
            entryFiles.includes("app.js") ||
            entryFiles.includes("index.js"),

          hasPackageJson:
            entryFiles.includes("package.json"),

          framework:
            entryFiles.includes("vite.config.js")
              ? "Vite"
              : "Unknown",
        },
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

module.exports = {
  analyzeProjectFiles,
};