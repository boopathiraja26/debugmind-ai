const { GoogleGenAI } = require('@google/genai');
const { ApiError } = require('../utils/apiResponse');

let genAI;

const getClient = () => {
  if (!process.env.GEMINI_API_KEY) {
    throw new ApiError(500, 'GEMINI_API_KEY is not configured on the server');
  }
  if (!genAI) {
    genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return genAI;
};

const buildPrompt = (language, bugDescription, code) => `
You are DebugMind AI, a senior software engineer and expert code reviewer.
Analyze the following buggy code along with the developer's description of the bug.
Respond STRICTLY in valid JSON with no markdown fences and no extra commentary,
using exactly this schema:

{
  "problem": "A clear, concise statement of what is wrong with the code",
  "reason": "A detailed technical explanation of why the bug occurs",
  "fixedCode": "The complete corrected version of the code as a plain string",
  "explanation": "A step-by-step explanation of what was changed and why",
  "bestPractices": ["short", "actionable", "best practice", "recommendations"],
  "performanceImprovements": ["short", "actionable", "performance", "suggestions"],
  "securityIssues": ["short", "actionable", "security", "concerns, if any"]
}

Programming language: ${language}

Bug description provided by the developer:
${bugDescription}

Code:
\`\`\`${language}
${code}
\`\`\`

Rules:
- If there are no meaningful security issues, return an empty array for "securityIssues".
- If there are no meaningful performance improvements, return an empty array for "performanceImprovements".
- Keep each array item concise (one sentence).
- Respond ONLY with the JSON object described above.
`;

const extractJson = (text) => {
  if (!text) return null;
  const cleaned = text.replace(/```json/gi, '').replace(/```/g, '').trim();
  const firstBrace = cleaned.indexOf('{');
  const lastBrace = cleaned.lastIndexOf('}');
  if (firstBrace === -1 || lastBrace === -1) return null;
  const jsonSlice = cleaned.slice(firstBrace, lastBrace + 1);
  try {
    return JSON.parse(jsonSlice);
  } catch (err) {
    return null;
  }
};

const normalizeArray = (value) => {
  if (Array.isArray(value)) return value.filter((item) => typeof item === 'string');
  if (typeof value === 'string' && value.trim().length > 0) return [value.trim()];
  return [];
};

/**
 * Sends language, bug description, and code to Gemini and returns a
 * structured bug analysis object.
 * @param {{ language: string, bugDescription: string, code: string }} params
 * @returns {Promise<object>} structured AI response
 */
const analyzeBug = async ({ language, bugDescription, code }) => {
  const client = getClient();
  const modelName = process.env.GEMINI_MODEL || 'gemini-3.5-flash';

  const prompt = buildPrompt(language, bugDescription, code);

  let result;
  try {
    result = await client.models.generateContent({
      model: modelName,
      contents: prompt,
    });
  } catch (err) {
    throw new ApiError(502, `Gemini API request failed: ${err.message}`);
  }

  const responseText = typeof result?.text === 'string' ? result.text : '';
  const parsed = extractJson(responseText);

  if (!parsed) {
    throw new ApiError(502, 'Gemini returned an unparsable response');
  }

  return {
    problem: typeof parsed.problem === 'string' ? parsed.problem : '',
    reason: typeof parsed.reason === 'string' ? parsed.reason : '',
    fixedCode: typeof parsed.fixedCode === 'string' ? parsed.fixedCode : '',
    explanation: typeof parsed.explanation === 'string' ? parsed.explanation : '',
    bestPractices: normalizeArray(parsed.bestPractices),
    performanceImprovements: normalizeArray(parsed.performanceImprovements),
    securityIssues: normalizeArray(parsed.securityIssues),
  };
};

module.exports = { analyzeBug };