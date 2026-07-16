const { DEFAULT_AI_TASK } = require("../../utils/aiTasks");

const buildBugAnalysisPrompt = require("./promptTemplates/bugAnalysis");
const buildExplainCodePrompt = require("./promptTemplates/explainCode");
const buildCodeReviewPrompt = require("./promptTemplates/codeReview");
const buildPerformancePrompt = require("./promptTemplates/performance");
const buildSecurityPrompt = require("./promptTemplates/security");
const buildDocumentationPrompt = require("./promptTemplates/documentation");
const buildUnitTestPrompt = require("./promptTemplates/unitTest");
const buildOptimizerPrompt = require("./promptTemplates/optimizer");
const buildAskAIPrompt = require("./promptTemplates/askAI");

/**
 * Maps every AI task to its prompt template.
 * Adding a new AI task only requires:
 * 1. Create a new prompt template.
 * 2. Register it here.
 */

const TASK_TEMPLATE_MAP = {
  "Bug Analysis": buildBugAnalysisPrompt,
  "Explain Code": buildExplainCodePrompt,
  "Code Review": buildCodeReviewPrompt,
  "Performance Review": buildPerformancePrompt,
  "Security Audit": buildSecurityPrompt,
  "Generate Documentation": buildDocumentationPrompt,
  "Generate Unit Tests": buildUnitTestPrompt,
  "Optimize Code": buildOptimizerPrompt,
  "Ask AI": buildAskAIPrompt,
};

/**
 * Builds the final Gemini prompt.
 *
 * @param {Object} options
 * @param {string} options.task
 * @param {string} options.language
 * @param {string} options.bugDescription
 * @param {string} options.code
 *
 * @returns {string}
 */

const buildPrompt = ({
  task = DEFAULT_AI_TASK,
  language,
  bugDescription,
  code,
}) => {
  const template =
    TASK_TEMPLATE_MAP[task] ||
    TASK_TEMPLATE_MAP[DEFAULT_AI_TASK];

  return template({
    language,
    bugDescription,
    code,
  });
};

module.exports = buildPrompt;