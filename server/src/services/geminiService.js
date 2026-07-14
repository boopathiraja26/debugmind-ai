const { GoogleGenAI } = require('@google/genai');
const { ApiError } = require('../utils/apiResponse');

let genAI;

const getClient = () => {
  if (!process.env.GEMINI_API_KEY) {
    throw new ApiError(500, 'GEMINI_API_KEY is not configured on the server');
  }

  if (!genAI) {
    genAI = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
  }

  return genAI;
};

const buildPrompt = (language, bugDescription, code) => `
You are DebugMind AI, a senior software engineer and expert code reviewer.

Analyze the following buggy code together with the developer's bug description.

Return ONLY valid JSON.

{
  "problem": "",
  "reason": "",
  "fixedCode": "",
  "explanation": "",
  "bestPractices": [],
  "performanceImprovements": [],
  "securityIssues": []
}

Programming Language:
${language}

Bug Description:
${bugDescription}

Code:
\`\`\`${language}
${code}
\`\`\`

Rules:

- Return JSON only.
- No markdown.
- No explanations outside JSON.
- bestPractices must be an array.
- performanceImprovements must be an array.
- securityIssues must be an array.
`;

const extractJson = (text) => {
  if (!text) return null;

  const cleaned = text
    .replace(/```json/gi, '')
    .replace(/```/g, '')
    .trim();

  const first = cleaned.indexOf('{');
  const last = cleaned.lastIndexOf('}');

  if (first === -1 || last === -1) return null;

  try {
    return JSON.parse(cleaned.slice(first, last + 1));
  } catch {
    return null;
  }
};

const normalizeArray = (value) => {
  if (Array.isArray(value)) {
    return value.filter((item) => typeof item === 'string');
  }

  if (typeof value === 'string' && value.trim()) {
    return [value.trim()];
  }

  return [];
};

const analyzeBug = async ({ language, bugDescription, code }) => {
  const client = getClient();

  const model =
    process.env.GEMINI_MODEL || 'gemini-2.5-flash-lite';

  const prompt = buildPrompt(language, bugDescription, code);

  let result;

  try {
    result = await client.models.generateContent({
      model,
      contents: prompt,
    });
  } catch (err) {
    console.error('Gemini Error:', err);

    const message = err?.message || '';

    if (
      message.includes('RESOURCE_EXHAUSTED') ||
      message.includes('429')
    ) {
      throw new ApiError(
        429,
        'AI service quota exceeded. Please try again later.'
      );
    }

    if (
      message.includes('UNAVAILABLE') ||
      message.includes('503')
    ) {
      throw new ApiError(
        503,
        'AI service is temporarily busy. Please try again in a few minutes.'
      );
    }

    if (
      message.includes('INVALID_ARGUMENT') ||
      message.includes('404')
    ) {
      throw new ApiError(
        500,
        'Invalid Gemini model configured.'
      );
    }

    throw new ApiError(
      500,
      'Failed to analyze the code. Please try again.'
    );
  }

  const responseText =
    typeof result?.text === 'string'
      ? result.text
      : '';

  const parsed = extractJson(responseText);

  if (!parsed) {
    throw new ApiError(
      500,
      'AI returned an invalid response.'
    );
  }

  return {
    problem:
      typeof parsed.problem === 'string'
        ? parsed.problem
        : '',

    reason:
      typeof parsed.reason === 'string'
        ? parsed.reason
        : '',

    fixedCode:
      typeof parsed.fixedCode === 'string'
        ? parsed.fixedCode
        : '',

    explanation:
      typeof parsed.explanation === 'string'
        ? parsed.explanation
        : '',

    bestPractices: normalizeArray(parsed.bestPractices),

    performanceImprovements: normalizeArray(
      parsed.performanceImprovements
    ),

    securityIssues: normalizeArray(parsed.securityIssues),
  };
};

module.exports = {
  analyzeBug,
};