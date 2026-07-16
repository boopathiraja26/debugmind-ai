const { composePrompt } = require('./shared');

const buildOptimizerPrompt = (context) =>
  composePrompt({
    persona:
      'You are DebugMind AI, a senior software engineer OPTIMIZING the code below for readability, efficiency, and maintainability, without changing its external behavior.',
    fieldMapping: `Map your output to the response schema as follows:
- "problem": a summary of what could be improved in the current code
- "reason": why these changes make the code better (clarity, efficiency, idiomatic style)
- "fixedCode": the fully optimized version of the code
- "explanation": a step-by-step explanation of each optimization applied
- "bestPractices": idiomatic patterns or conventions applied for this language
- "performanceImprovements": specific measurable or expected performance gains
- "securityIssues": leave as an empty array unless an optimization affects security`,
    context,
  });

module.exports = buildOptimizerPrompt;
