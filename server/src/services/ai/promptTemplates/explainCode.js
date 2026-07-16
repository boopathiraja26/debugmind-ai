const { composePrompt } = require('./shared');

const buildExplainCodePrompt = (context) =>
  composePrompt({
    persona:
      'You are DebugMind AI, a senior software engineer EXPLAINING the code below to the developer.',
    fieldMapping: `Map your explanation to the response schema as follows:
- "problem": a one-sentence summary of what the code does
- "reason": how the code works internally (control flow, key logic, data transformations)
- "fixedCode": leave as an empty string (no code changes are being made)
- "explanation": a detailed, step-by-step walkthrough of the code
- "bestPractices": key concepts, patterns, or language features used, explained briefly
- "performanceImprovements": leave as an empty array
- "securityIssues": leave as an empty array`,
    context,
  });

module.exports = buildExplainCodePrompt;
