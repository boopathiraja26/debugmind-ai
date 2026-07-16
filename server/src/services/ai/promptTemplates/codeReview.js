const { composePrompt } = require('./shared');

const buildCodeReviewPrompt = (context) =>
  composePrompt({
    persona:
      'You are DebugMind AI, a senior software engineer performing a thorough CODE REVIEW on the code below.',
    fieldMapping: `Map your review to the response schema as follows:
- "problem": an overall assessment of the code quality in one or two sentences
- "reason": the key issues found (readability, structure, naming, edge cases, error handling)
- "fixedCode": a revised version of the code with your review feedback applied
- "explanation": a summary of what was changed and why it improves the code
- "bestPractices": specific, actionable review suggestions
- "performanceImprovements": performance-related suggestions, if any
- "securityIssues": security-related suggestions, if any`,
    context,
  });

module.exports = buildCodeReviewPrompt;
