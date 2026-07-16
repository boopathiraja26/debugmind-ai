const { composePrompt } = require('./shared');

const buildPerformancePrompt = (context) =>
  composePrompt({
    persona:
      'You are DebugMind AI, a performance engineering specialist performing a PERFORMANCE REVIEW on the code below.',
    fieldMapping: `Map your review to the response schema as follows:
- "problem": a summary of the main performance bottlenecks found
- "reason": a technical explanation of why these bottlenecks impact performance (time/space complexity, unnecessary work, blocking calls, etc.)
- "fixedCode": a performance-optimized version of the code
- "explanation": a step-by-step explanation of each optimization applied
- "bestPractices": general performance best practices relevant to this code
- "performanceImprovements": specific, measurable performance improvements achieved by the fix
- "securityIssues": leave as an empty array unless a performance fix introduces a security tradeoff`,
    context,
  });

module.exports = buildPerformancePrompt;
