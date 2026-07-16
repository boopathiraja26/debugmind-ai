const { composePrompt } = require('./shared');

const buildSecurityPrompt = (context) =>
  composePrompt({
    persona:
      'You are DebugMind AI, an application security engineer performing a SECURITY AUDIT on the code below.',
    fieldMapping: `Map your audit to the response schema as follows:
- "problem": a summary of the most critical security risk found
- "reason": a technical explanation of the vulnerability class and how it could be exploited
- "fixedCode": a hardened version of the code with the vulnerabilities remediated
- "explanation": a step-by-step explanation of each security fix applied
- "bestPractices": general secure-coding best practices relevant to this code
- "performanceImprovements": leave as an empty array unless a security fix has a notable performance tradeoff
- "securityIssues": every distinct vulnerability found, each as a concise one-sentence finding`,
    context,
  });

module.exports = buildSecurityPrompt;
