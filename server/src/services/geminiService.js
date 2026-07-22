const { GoogleGenAI } = require("@google/genai");
const { ApiError } = require("../utils/apiResponse");
const buildPrompt = require("./ai/promptBuilder");

let genAI = null;

const getClient = () => {
  if (!process.env.GEMINI_API_KEY) {
    throw new ApiError(
      500,
      "GEMINI_API_KEY is not configured on the server."
    );
  }

  if (!genAI) {
    console.log("======================================");
    console.log("Initializing Gemini Client");
    console.log(
      "Model:",
      process.env.GEMINI_MODEL || "gemini-2.0-flash"
    );
    console.log(
      "API Key Exists:",
      !!process.env.GEMINI_API_KEY
    );
    console.log("======================================");

    genAI = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
  }

  return genAI;
};

const normalizeArray = (value) => {
  if (Array.isArray(value)) {
    return value.filter((item) => typeof item === "string");
  }

  if (typeof value === "string" && value.trim()) {
    return [value.trim()];
  }

  return [];
};

/**
 * Extract JSON from Gemini response.
 */
const extractJson = (text) => {
  try {
    return JSON.parse(text);
  } catch (_) {}

  const match = text.match(/```json\s*([\s\S]*?)```/i);

  if (match) {
    try {
      return JSON.parse(match[1]);
    } catch (_) {}
  }

  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");

  if (start !== -1 && end !== -1) {
    try {
      return JSON.parse(text.substring(start, end + 1));
    } catch (_) {}
  }

  return null;
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
    process.env.GEMINI_MODEL || "gemini-2.0-flash";

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

    console.log("✅ Gemini Response Received");
  } catch (err) {
    console.log("\n========== GEMINI ERROR ==========");
    console.log("Status:", err?.status);
    console.log("Message:", err?.message);
    console.log("Code:", err?.code);
    console.dir(err, { depth: null });
    console.log("==================================");

    const message = err?.message || "";

    if (
      message.includes("RESOURCE_EXHAUSTED") ||
      message.includes("429")
    ) {
      throw new ApiError(
        429,
        "AI service quota exceeded. Please try again later."
      );
    }

    if (
      message.includes("UNAVAILABLE") ||
      message.includes("503")
    ) {
      throw new ApiError(
        503,
        "AI service is temporarily unavailable."
      );
    }

    if (
      message.includes("INVALID_ARGUMENT") ||
      message.includes("404")
    ) {
      throw new ApiError(
        500,
        "Invalid Gemini model configured."
      );
    }

    throw new ApiError(
      500,
      err?.message || "Failed to analyze code."
    );
  }

  const responseText =
    typeof result?.text === "string"
      ? result.text
      : "";

  if (!responseText) {
    throw new ApiError(
      500,
      "Gemini returned an empty response."
    );
  }

  const parsed = extractJson(responseText);

  if (!parsed) {
    console.log("========== RAW GEMINI RESPONSE ==========");
    console.log(responseText);
    console.log("=========================================");

    throw new ApiError(
      500,
      "AI returned an invalid JSON response."
    );
  }

  return {
    problem:
      typeof parsed.problem === "string"
        ? parsed.problem
        : "",

    reason:
      typeof parsed.reason === "string"
        ? parsed.reason
        : "",

    fixedCode:
      typeof parsed.fixedCode === "string"
        ? parsed.fixedCode
        : "",

    explanation:
      typeof parsed.explanation === "string"
        ? parsed.explanation
        : "",

    bestPractices: normalizeArray(parsed.bestPractices),

    performanceImprovements: normalizeArray(
      parsed.performanceImprovements
    ),

    securityIssues: normalizeArray(
      parsed.securityIssues
    ),
  };
};

module.exports = {
  analyzeBug,
};