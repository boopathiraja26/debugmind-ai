const { analyze } = require("./llmRouter");
const { planTask } = require("./taskPlanner");
const { execute } = require("../../mcp/client");

/**
 * AI Agent
 *
 * Responsibilities:
 * 1. Plan the task
 * 2. Collect external context through MCP
 * 3. Execute planned tasks
 * 4. Return AI result
 */

const runAgent = async ({
  provider,
  task,
  language,
  bugDescription,
  code,
  repositoryUrl,
  projectFiles,
}) => {
  /**
   * Task Planning
   */
  const plan = planTask(task);

  /**
   * MCP Tool Context
   */
  let toolContext = null;

  /**
   * GitHub Repository Analysis
   */
  if (repositoryUrl) {
    const response = await execute({
      tool: "github",
      action: "analyzeRepository",
      payload: {
        repositoryUrl,
      },
    });

    if (response.success) {
      toolContext = response.data;
    }
  }

  /**
   * Local Project Analysis
   */
  else if (projectFiles) {
    const response = await execute({
      tool: "filesystem",
      action: "analyzeProject",
      payload: {
        files: projectFiles,
      },
    });

    if (response.success) {
      toolContext = response.data;
    }
  }

  /**
   * Execute Planned Tasks
   */
  let finalResult = null;

  for (const currentTask of plan) {
    finalResult = await analyze({
      provider:
        provider ||
        process.env.AI_PROVIDER ||
        "gemini",

      task: currentTask,

      language,

      bugDescription,

      code,

      toolContext,
    });
  }

  return finalResult;
};

module.exports = {
  runAgent,
};