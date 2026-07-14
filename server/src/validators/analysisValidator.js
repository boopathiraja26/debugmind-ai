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