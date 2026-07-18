const analyzeRepository = async ({ repositoryUrl }) => {
  return {
    success: true,
    data: {
      summary: "GitHub tool is currently a placeholder.",
      repositoryUrl,
    },
  };
};

module.exports = {
  analyzeRepository,
};