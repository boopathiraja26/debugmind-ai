const MAX_TITLE_LENGTH = 150;
const MAX_BUG_DESCRIPTION_LENGTH = 5000;
const MAX_CODE_LENGTH = 20000;

const validateCreateAnalysis = (data = {}) => {
  const errors = [];
  const { title, language, bugDescription, code } = data;

  if (!title || typeof title !== 'string' || title.trim().length < 3) {
    errors.push('Title must be at least 3 characters long');
  }
  if (title && title.length > MAX_TITLE_LENGTH) {
    errors.push(`Title cannot exceed ${MAX_TITLE_LENGTH} characters`);
  }

  if (!language || typeof language !== 'string' || language.trim().length === 0) {
    errors.push('Programming language is required');
  }

  if (!bugDescription || typeof bugDescription !== 'string' || bugDescription.trim().length < 10) {
    errors.push('Bug description must be at least 10 characters long');
  }
  if (bugDescription && bugDescription.length > MAX_BUG_DESCRIPTION_LENGTH) {
    errors.push(`Bug description cannot exceed ${MAX_BUG_DESCRIPTION_LENGTH} characters`);
  }

  if (!code || typeof code !== 'string' || code.trim().length === 0) {
    errors.push('Code snippet is required');
  }
  if (code && code.length > MAX_CODE_LENGTH) {
    errors.push(`Code snippet cannot exceed ${MAX_CODE_LENGTH} characters`);
  }

  if (errors.length > 0) {
    return { error: errors };
  }

  return {
    value: {
      title: title.trim(),
      language: language.trim(),
      bugDescription: bugDescription.trim(),
      code: code.trim(),
    },
  };
};

module.exports = { validateCreateAnalysis };

const ALLOWED_STATUS = ['pending', 'completed', 'failed'];
const MAX_LIMIT = 50;
const MAX_SEARCH_LENGTH = 200;

const parsePagination = (data = {}) => {
  const errors = [];
  const rawPage = data.page;
  const rawLimit = data.limit;

  let page = 1;
  if (rawPage !== undefined) {
    const parsedPage = Number.parseInt(rawPage, 10);
    if (!Number.isInteger(parsedPage) || parsedPage < 1 || String(parsedPage) !== String(rawPage).trim()) {
      errors.push('Page must be a positive integer');
    } else {
      page = parsedPage;
    }
  }

  let limit = 10;
  if (rawLimit !== undefined) {
    const parsedLimit = Number.parseInt(rawLimit, 10);
    if (
      !Number.isInteger(parsedLimit) ||
      parsedLimit < 1 ||
      parsedLimit > MAX_LIMIT ||
      String(parsedLimit) !== String(rawLimit).trim()
    ) {
      errors.push(`Limit must be a positive integer not exceeding ${MAX_LIMIT}`);
    } else {
      limit = parsedLimit;
    }
  }

  return { errors, page, limit };
};

/**
 * Validates query params for GET /api/analysis (list with filters + pagination).
 * Supports: page, limit, status, language, date (YYYY-MM-DD)
 */
const validateListQuery = (data = {}) => {
  const errors = [];
  const { status, language, date } = data;

  const { errors: paginationErrors, page, limit } = parsePagination(data);
  errors.push(...paginationErrors);

  if (status !== undefined && !ALLOWED_STATUS.includes(status)) {
    errors.push(`Status must be one of: ${ALLOWED_STATUS.join(', ')}`);
  }

  if (language !== undefined && (typeof language !== 'string' || language.trim().length === 0)) {
    errors.push('Language must be a non-empty string');
  }

  if (date !== undefined) {
    const isValidDate = typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date) && !Number.isNaN(Date.parse(date));
    if (!isValidDate) {
      errors.push('Date must be a valid date in YYYY-MM-DD format');
    }
  }

  if (errors.length > 0) {
    return { error: errors };
  }

  return {
    value: {
      page,
      limit,
      status: status || undefined,
      language: language ? language.trim() : undefined,
      date: date || undefined,
    },
  };
};

/**
 * Validates query params for GET /api/analysis/search.
 * Supports: q (search keyword), page, limit, status, language
 */
const validateSearchQuery = (data = {}) => {
  const errors = [];
  const { q, status, language } = data;

  const { errors: paginationErrors, page, limit } = parsePagination(data);
  errors.push(...paginationErrors);

  if (q !== undefined && (typeof q !== 'string' || q.trim().length === 0)) {
    errors.push('Search keyword (q) must be a non-empty string');
  }
  if (q && q.length > MAX_SEARCH_LENGTH) {
    errors.push(`Search keyword cannot exceed ${MAX_SEARCH_LENGTH} characters`);
  }

  if (status !== undefined && !ALLOWED_STATUS.includes(status)) {
    errors.push(`Status must be one of: ${ALLOWED_STATUS.join(', ')}`);
  }

  if (language !== undefined && (typeof language !== 'string' || language.trim().length === 0)) {
    errors.push('Language must be a non-empty string');
  }

  if (errors.length > 0) {
    return { error: errors };
  }

  return {
    value: {
      q: q ? q.trim() : '',
      page,
      limit,
      status: status || undefined,
      language: language ? language.trim() : undefined,
    },
  };
};

module.exports.validateListQuery = validateListQuery;
module.exports.validateSearchQuery = validateSearchQuery;