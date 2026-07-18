const execute = async ({ query }) => {
  return {
    success: true,
    message: `Documentation search placeholder for: ${query}`,
  };
};

module.exports = {
  name: "docs",
  description: "Search technical documentation",
  execute,
};