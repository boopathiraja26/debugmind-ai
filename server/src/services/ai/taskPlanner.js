const { DEFAULT_AI_TASK } = require("../../utils/aiTasks");

/**
 * AI Task Planner
 *
 * Converts one user request into one or more AI tasks.
 * This allows the AI Agent to execute tasks sequentially.
 */

const TASK_PLANS = {
  "Bug Analysis": [
    "Bug Analysis",
  ],

  "Explain Code": [
    "Explain Code",
  ],

  "Code Review": [
    "Code Review",
  ],

  "Performance Review": [
    "Performance Review",
  ],

  "Security Audit": [
    "Security Audit",
  ],

  "Generate Documentation": [
    "Generate Documentation",
  ],

  "Generate Unit Tests": [
    "Generate Unit Tests",
  ],

  "Optimize Code": [
    "Code Review",
    "Performance Review",
    "Optimize Code",
  ],

  "Ask AI": [
    "Ask AI",
  ],

  /**
   * Future MCP Feature
   */
  "Repository Analysis": [
    "Repository Analysis",
    "Code Review",
    "Security Audit",
    "Performance Review",
  ],

  /**
   * Future MCP Feature
   */
  "Explain Local File": [
    "Explain Local File",
  ],
};

const planTask = (task = DEFAULT_AI_TASK) => {
  return TASK_PLANS[task] || [DEFAULT_AI_TASK];
};

module.exports = {
  planTask,
};