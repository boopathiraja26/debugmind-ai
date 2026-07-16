const { analyze } = require("./llmRouter");
const { planTask } = require("./taskPlanner");
const { executeTool } = require("./tools/toolManager");

/**
 * AI Agent
 *
 * Responsibilities:
 * 1. Decide what task to execute
 * 2. Decide whether external tools are required
 * 3. Gather extra context
 * 4. Call the LLM Router
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

  const plan = planTask(task);

  let toolContext = null;

  /**
   * Future:
   * If repository URL exists,
   * use GitHub Tool.
   */
  if (repositoryUrl) {
    toolContext = await executeTool({
      tool: "github",
      payload: {
        repositoryUrl,
      },
    });
  }

  /**
   * Future:
   * If uploaded project exists,
   * use Filesystem Tool.
   */
  else if (projectFiles) {
    toolContext = await executeTool({
      tool: "filesystem",
      payload: {
        files: projectFiles,
      },
    });
  }

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