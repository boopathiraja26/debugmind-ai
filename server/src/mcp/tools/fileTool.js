const fs = require("fs/promises");

const execute = async ({ filePath }) => {
  try {
    const content = await fs.readFile(filePath, "utf8");

    return {
      success: true,
      content,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

module.exports = {
  name: "file",
  description: "Read a local source file",
  execute,
};