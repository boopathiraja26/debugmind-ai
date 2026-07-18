/**
 * Placeholder Search Tool
 *
 * Future:
 * - Tavily
 * - Brave Search
 * - Google Search API
 */

const execute = async ({
  action,
  payload,
}) => {
  switch (action) {
    case "search":
      return {
        message:
          "Search tool placeholder.",
        query: payload.query,
        results: [],
      };

    default:
      throw new Error(
        `Unsupported search action: ${action}`
      );
  }
};

module.exports = {
  execute,
};