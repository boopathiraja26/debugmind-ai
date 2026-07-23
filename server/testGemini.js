require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

console.log("Key prefix:", process.env.GEMINI_API_KEY.substring(0, 10));
console.log("Key length:", process.env.GEMINI_API_KEY.length);
console.log("Model:", process.env.GEMINI_MODEL);

async function test() {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  try {
    console.log("Sending request...");

    const result = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL,
      contents: "Explain JavaScript in one sentence.",
    });

    console.log("\nSUCCESS");
    console.log(result.text);
  } catch (err) {
    console.log("\nERROR");
    console.dir(err, { depth: null });
  }
}

test();