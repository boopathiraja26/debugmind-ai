const { DEFAULT_AI_TASK } = require("../../utils/aiTasks");

const planTask = (task = DEFAULT_AI_TASK) => {
  switch (task) {
    case "Optimize Code":
      return [
        "Code Review",
        "Optimize Code",
      ];

    case "Bug Analysis":
      return ["Bug Analysis"];

    case "Explain Code":
      return ["Explain Code"];

    case "Code Review":
      return ["Code Review"];

    case "Performance Review":
      return ["Performance Review"];

    case "Security Audit":
      return ["Security Audit"];

    case "Generate Documentation":
      return ["Generate Documentation"];

    case "Generate Unit Tests":
      return ["Generate Unit Tests"];

    case "Ask AI":
      return ["Ask AI"];

    default:
      return [DEFAULT_AI_TASK];
  }
};

module.exports = {
  planTask,
};