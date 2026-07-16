/**
 * Filesystem Tool
 * Placeholder implementation.
 * Later this will analyze uploaded projects or local folders.
 */

const analyzeProjectFiles = async ({ files }) => {
  return {
    success: true,
    tool: "filesystem",
    totalFiles: files?.length || 0,
    message: "Filesystem analysis is not implemented yet.",
    projectSummary: null,
  };
};

module.exports = {
  analyzeProjectFiles,
};