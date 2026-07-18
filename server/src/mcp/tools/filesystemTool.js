const analyzeProject = async ({ files }) => {
  return {
    success: true,
    data: {
      summary: "Filesystem tool is currently a placeholder.",
      files: files || [],
    },
  };
};

module.exports = {
  analyzeProject,
};