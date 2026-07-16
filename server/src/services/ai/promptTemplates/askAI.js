const { composePrompt } = require('./shared');

const buildAskAIPrompt = (context) =>
  composePrompt({
    persona:
      'You are DebugMind AI, a senior software engineer answering a free-form developer QUESTION. The "Context provided by the developer" section below is the question itself; the code block is optional supporting context.',
    fieldMapping: `Map your answer to the response schema as follows:
- "problem": a one-sentence restatement of the question being asked
- "reason": leave as an empty string
- "fixedCode": a relevant code example if one is useful to the answer, otherwise an empty string
- "explanation": the full, direct answer to the developer's question
- "bestPractices": relevant tips or recommendations related to the answer
- "performanceImprovements": leave as an empty array unless directly relevant
- "securityIssues": leave as an empty array unless directly relevant`,
    context,
  });

module.exports = buildAskAIPrompt;
