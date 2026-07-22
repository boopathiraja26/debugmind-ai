const { AI_TASKS, DEFAULT_AI_TASK } = require("../utils/aiTasks");

const MAX_TITLE_LENGTH = 150;
const MAX_PROMPT_LENGTH = 5000;
const MAX_CODE_LENGTH = 20000;

/* ====================================================== */
/* CREATE ANALYSIS */
/* ====================================================== */

const validateCreateAnalysis = (data = {}) => {
  const errors = [];

  let {
    title,
    task,
    language,
    bugDescription,
    code,
  } = data;

  /* ------------------------------
     Auto defaults for Chat UI
  ------------------------------ */

  title =
    typeof title === "string" && title.trim()
      ? title.trim()
      : "AI Analysis";

  task =
    typeof task === "string" &&
    AI_TASKS.includes(task)
      ? task
      : DEFAULT_AI_TASK;

  language =
    typeof language === "string" &&
    language.trim()
      ? language.trim()
      : "Auto Detect";

  bugDescription =
    typeof bugDescription === "string"
      ? bugDescription.trim()
      : "";

  code =
    typeof code === "string"
      ? code.trim()
      : "";

  /* ------------------------------
     Validation
  ------------------------------ */

  if (title.length > MAX_TITLE_LENGTH) {
    errors.push(
      `Title cannot exceed ${MAX_TITLE_LENGTH} characters`
    );
  }

  if (!AI_TASKS.includes(task)) {
    errors.push("Invalid AI task selected");
  }

  if (bugDescription.length < 3) {
    errors.push(
      "Please enter a prompt or describe your issue."
    );
  }

  if (bugDescription.length > MAX_PROMPT_LENGTH) {
    errors.push(
      `Prompt cannot exceed ${MAX_PROMPT_LENGTH} characters`
    );
  }

  if (code.length > MAX_CODE_LENGTH) {
    errors.push(
      `Code cannot exceed ${MAX_CODE_LENGTH} characters`
    );
  }

  /* ------------------------------
     Require either prompt or code
  ------------------------------ */

  if (!bugDescription && !code) {
    errors.push(
      "Please enter a prompt or paste code."
    );
  }

  if (errors.length > 0) {
    return {
      error: errors,
    };
  }

  return {
    value: {
      title,
      task,
      language,
      bugDescription,
      code,
    },
  };
};

/* ====================================================== */
/* LIST */
/* ====================================================== */

const ALLOWED_STATUS = [
  "pending",
  "completed",
  "failed",
];

const MAX_LIMIT = 50;
const MAX_SEARCH_LENGTH = 200;

const parsePagination = (data = {}) => {
  const errors = [];

  let page = 1;
  let limit = 10;

  if (data.page !== undefined) {
    const p = parseInt(data.page);

    if (Number.isNaN(p) || p < 1) {
      errors.push("Page must be a positive integer");
    } else {
      page = p;
    }
  }

  if (data.limit !== undefined) {
    const l = parseInt(data.limit);

    if (
      Number.isNaN(l) ||
      l < 1 ||
      l > MAX_LIMIT
    ) {
      errors.push(
        `Limit must be between 1 and ${MAX_LIMIT}`
      );
    } else {
      limit = l;
    }
  }

  return {
    errors,
    page,
    limit,
  };
};

const validateListQuery = (data = {}) => {
  const errors = [];

  const {
    errors: paginationErrors,
    page,
    limit,
  } = parsePagination(data);

  errors.push(...paginationErrors);

  if (
    data.status &&
    !ALLOWED_STATUS.includes(data.status)
  ) {
    errors.push("Invalid status");
  }

  if (
    data.language &&
    typeof data.language !== "string"
  ) {
    errors.push("Invalid language");
  }

  if (errors.length) {
    return { error: errors };
  }

  return {
    value: {
      page,
      limit,
      status: data.status,
      language: data.language,
      date: data.date,
    },
  };
};

/* ====================================================== */
/* SEARCH */
/* ====================================================== */

const validateSearchQuery = (data = {}) => {
  const errors = [];

  const {
    errors: paginationErrors,
    page,
    limit,
  } = parsePagination(data);

  errors.push(...paginationErrors);

  if (
    data.q &&
    data.q.length > MAX_SEARCH_LENGTH
  ) {
    errors.push("Search keyword too long");
  }

  if (
    data.status &&
    !ALLOWED_STATUS.includes(data.status)
  ) {
    errors.push("Invalid status");
  }

  if (
    data.language &&
    typeof data.language !== "string"
  ) {
    errors.push("Invalid language");
  }

  if (errors.length) {
    return {
      error: errors,
    };
  }

  return {
    value: {
      q: data.q || "",
      page,
      limit,
      status: data.status,
      language: data.language,
    },
  };
};

module.exports = {
  validateCreateAnalysis,
  validateListQuery,
  validateSearchQuery,
};