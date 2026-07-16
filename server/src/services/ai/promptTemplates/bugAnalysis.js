const buildBugAnalysisPrompt = ({
  language,
  bugDescription,
  code,
}) => `
You are a Senior Software Engineer and AI Debugging Assistant.

Your job is to analyze the provided source code and identify the exact bug.

Programming Language:
${language}

Bug Description:
${bugDescription}

Source Code:
\`\`\`${language}
${code}
\`\`\`

Return ONLY valid JSON.

{
  "problem":"",
  "reason":"",
  "fixedCode":"",
  "explanation":"",
  "bestPractices":[],
  "performanceImprovements":[],
  "securityIssues":[]
}

Instructions:

- Find the actual bug.
- Explain the root cause.
- Generate corrected code.
- Explain why the fix works.
- Suggest coding best practices.
- Suggest performance improvements.
- Mention any security concerns.
- Do not return Markdown.
- Do not return explanations outside JSON.
`;

module.exports = buildBugAnalysisPrompt;