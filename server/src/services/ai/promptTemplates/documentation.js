const { composePrompt } = require('./shared');

const buildDocumentationPrompt = (context) =>
  composePrompt({
    persona:
      'You are DebugMind AI, a technical writer GENERATING DOCUMENTATION for the code below.',
    fieldMapping: `Map your output to the response schema as follows:
- "problem": leave as an empty string
- "reason": leave as an empty string
- "fixedCode": the same code with clear docstrings/comments and type annotations (where applicable) added
- "explanation": a prose summary of what the code does, its parameters, return values, and any side effects
- "bestPractices": documentation conventions you followed (e.g. JSDoc, docstring style)
- "performanceImprovements": leave as an empty array
- "securityIssues": leave as an empty array`,
    context,
  });

module.exports = buildDocumentationPrompt;
