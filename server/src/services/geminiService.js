const { GoogleGenAI } = require("@google/genai");
const { ApiError } = require("../utils/apiResponse");
const buildPrompt = require("./ai/promptBuilder");
const extractJson = require("../utils/extractJson");

let genAI = null;

const getClient = () => {
  const apiKey = (process.env.GEMINI_API_KEY || "").trim();

  console.log("\n========== GEMINI CONFIG ==========");
  console.log("NODE_ENV:", process.env.NODE_ENV);
  console.log(
    "MODEL:",
    process.env.GEMINI_MODEL || "gemini-3.5-flash"
  );
  console.log("KEY EXISTS:", !!apiKey);
  console.log("KEY LENGTH:", apiKey.length);
  console.log("KEY PREFIX:", apiKey.substring(0, 10));
  console.log("===================================\n");

  if (!apiKey) {
    throw new ApiError(500, "Missing GEMINI_API_KEY");
  }

  if (!genAI) {
    genAI = new GoogleGenAI({
      apiKey,
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

const analyzeBug = async ({
  task,
  language,
  bugDescription,
  code,
  toolContext,
}) => {
  const client = getClient();

  const model =
    process.env.GEMINI_MODEL || "gemini-3.5-flash";

  const prompt = buildPrompt({
    task,
    language,
    bugDescription,
    code,
    toolContext,
  });

  try {
    console.log("Sending request...");
    console.log("Using Model:", model);

    const result = await client.models.generateContent({
      model,
      contents: prompt,
    });

    console.log("✅ Gemini Success");

    const responseText =
      typeof result.text === "string"
        ? result.text
        : "";

    if (!responseText) {
      throw new ApiError(
        500,
        "Gemini returned empty response."
      );
    }

    const parsed = extractJson(responseText);

    if (!parsed) {
      throw new ApiError(
        500,
        "Invalid JSON returned by Gemini."
      );
    }

    return {
      problem: parsed.problem || "",
      reason: parsed.reason || "",
      fixedCode: parsed.fixedCode || "",
      explanation: parsed.explanation || "",
      bestPractices: normalizeArray(parsed.bestPractices),
      performanceImprovements: normalizeArray(
        parsed.performanceImprovements
      ),
      securityIssues: normalizeArray(
        parsed.securityIssues
      ),
    };
  } catch (err) {
    console.log("\n========== GEMINI ERROR ==========");
    console.log("STATUS:", err.status);
    console.log("CODE:", err.code);
    console.log("MESSAGE:", err.message);
    console.dir(err, { depth: null });
    console.log("=================================\n");

    const message = err.message || "";

    if (
      message.includes("401") ||
      message.includes("UNAUTHENTICATED") ||
      message.includes("ACCESS_TOKEN_TYPE_UNSUPPORTED")
    ) {
      throw new ApiError(
        401,
        "Gemini authentication failed. Check your API key."
      );
    }

    if (
      message.includes("404") ||
      message.includes("NOT_FOUND")
    ) {
      throw new ApiError(
        404,
        "Gemini model not found."
      );
    }

    if (
      message.includes("429") ||
      message.includes("RESOURCE_EXHAUSTED")
    ) {
      throw new ApiError(
        429,
        "Gemini quota exceeded."
      );
    }

    if (
      message.includes("503") ||
      message.includes("UNAVAILABLE")
    ) {
      throw new ApiError(
        503,
        "Gemini service is temporarily unavailable. Please try again."
      );
    }

    throw new ApiError(
      err.status || 500,
      message || "Failed to analyze code."
    );
  }
};

module.exports = {
  analyzeBug,
};