const { composePrompt } = require('./shared');

const buildUnitTestPrompt = (context) =>
  composePrompt({
    persona:
      'You are DebugMind AI, a test engineer GENERATING UNIT TESTS for the code below.',
    fieldMapping: `Map your output to the response schema as follows:
- "problem": leave as an empty string
- "reason": a brief explanation of the testing approach and framework chosen (infer a common framework for the language, e.g. Jest for JavaScript, PyTest for Python)
- "fixedCode": the complete generated unit test suite for the code
- "explanation": what each major test case verifies and why it matters
- "bestPractices": testing best practices applied (e.g. edge cases, mocking, isolation)
- "performanceImprovements": leave as an empty array
- "securityIssues": leave as an empty array`,
    context,
  });

module.exports = buildUnitTestPrompt;
