/**
 * Shared building blocks reused by every task-specific prompt template.
 * Keeping the response schema and context formatting here means each
 * template only has to describe its own task-specific instructions.
 */

const RESPONSE_SCHEMA = `Respond STRICTLY in valid JSON with no markdown fences and no extra commentary, using exactly this schema:

{
  "problem": "string",
  "reason": "string",
  "fixedCode": "string",
  "explanation": "string",
  "bestPractices": ["string"],
  "performanceImprovements": ["string"],
  "securityIssues": ["string"]
}

Rules:
- Return an empty string "" for any field that does not apply to this task.
- Return an empty array [] for any list field that does not apply to this task.
- Keep each array item concise (one sentence).
- Respond ONLY with the JSON object described above.`;

const buildContextBlock = ({ language, bugDescription, code }) => `
Programming language: ${language}

Context provided by the developer:
${bugDescription}

Code:
\`\`\`${language}
${code || '(no code provided)'}
\`\`\`
`;

/**
 * Assembles a full prompt from a task persona/instructions block plus the
 * shared context and response schema, so every template stays a one-liner.
 */
const composePrompt = ({ persona, fieldMapping, context }) => `
${persona}
${fieldMapping}
${buildContextBlock(context)}
${RESPONSE_SCHEMA}
`;

module.exports = { RESPONSE_SCHEMA, buildContextBlock, composePrompt };
