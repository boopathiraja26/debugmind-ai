const { analyzeBug } = require("../geminiService");

/**
 * Future Multi-LLM Router
 */
const analyze = async ({
  provider = "gemini",
  task,
  language,
  bugDescription,
  code,
  toolContext,
}) => {
  switch (provider.toLowerCase()) {
    case "gemini":
      return analyzeBug({
        task,
        language,
        bugDescription,
        code,
        toolContext,
      });

    case "openai":
      throw new Error("OpenAI provider not implemented yet.");

    case "claude":
      throw new Error("Claude provider not implemented yet.");

    default:
      throw new Error(`Unsupported AI provider: ${provider}`);
  }
};

module.exports = {
  analyze,
};