const path = require("path");

/**
 * Analyze uploaded project files.
 */
const analyzeProjectFiles = async ({ files }) => {
  try {
    if (!files || !Array.isArray(files)) {
      return {
        success: false,
        error: "No project files provided.",
      };
    }

    const summary = {
      totalFiles: files.length,
      languages: {},
      folders: new Set(),
      fileNames: [],
    };

    files.forEach((file) => {
      const extension = path.extname(file.originalname).toLowerCase();

      summary.languages[extension] =
        (summary.languages[extension] || 0) + 1;

      summary.fileNames.push(file.originalname);

      if (file.originalname.includes("/")) {
        summary.folders.add(
          file.originalname.split("/")[0]
        );
      }
    });

    return {
      success: true,

      tool: "filesystem",

      data: {
        totalFiles: summary.totalFiles,

        folders: [...summary.folders],

        languages: summary.languages,

        files: summary.fileNames,
      },
    };
  } catch (err) {
    console.error("Filesystem Tool:", err);

    return {
      success: false,
      error: err.message,
    };
  }
};

module.exports = {
  analyzeProjectFiles,
};