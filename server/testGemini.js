require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

async function test() {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  try {
    console.log("Sending request...");

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Explain JavaScript in one sentence.",
    });

    console.log("SUCCESS");
    console.log(result.text);

  } catch (err) {
    console.log("ERROR");
    console.dir(err, { depth: null });
  }
}

test();