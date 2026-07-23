const extractJson = (text = "") => {
  try {
    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);
  } catch {
    try {
      const match = text.match(/\{[\s\S]*\}/);

      if (match) {
        return JSON.parse(match[0]);
      }
    } catch {}

    return null;
  }
};

module.exports = extractJson;