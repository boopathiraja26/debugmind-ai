const { GoogleGenAI } = require('@google/genai');
const { ApiError } = require('../utils/apiResponse');
const buildPrompt = require("./ai/promptBuilder");


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


const normalizeArray = (value) => {
  if (Array.isArray(value)) {
    return value.filter((item) => typeof item === 'string');
  }

  if (typeof value === 'string' && value.trim()) {
    return [value.trim()];
  }

  return [];
};

const analyzeBug = async ({
  task,
  language,
  bugDescription,
  code,
  toolContext,
}) => {
  const client = getClient();

  const model =
    process.env.GEMINI_MODEL || 'gemini-2.5-flash';

  const prompt = buildPrompt({
  task,
  language,
  bugDescription,
  code,
  toolContext,
});

  let result;

  try {
    result = await client.models.generateContent({
      model,
      contents: prompt,
    });
  } catch (err) {
    console.error("========== GEMINI ERROR ==========");
    console.dir(err, { depth: null });
    console.error("==================================");

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