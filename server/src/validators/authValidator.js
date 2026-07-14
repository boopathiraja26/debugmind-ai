const EMAIL_REGEX = /^[\w.+-]+@[\w-]+\.[a-zA-Z]{2,}$/;
const URL_REGEX = /^https?:\/\/.+/i;

const validateRegister = (data = {}) => {
  const errors = [];
  const { name, email, password, avatar } = data;

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }
  if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
    errors.push('A valid email address is required');
  }
  if (!password || typeof password !== 'string' || password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }
  if (avatar !== undefined && avatar !== '' && (typeof avatar !== 'string' || !URL_REGEX.test(avatar.trim()))) {
    errors.push('Avatar must be a valid URL');
  }

  if (errors.length > 0) {
    return { error: errors };
  }

  return {
    value: {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      avatar: avatar && typeof avatar === 'string' ? avatar.trim() : '',
    },
  };
};

const validateLogin = (data = {}) => {
  const errors = [];
  const { email, password } = data;

  if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
    errors.push('A valid email address is required');
  }
  if (!password || typeof password !== 'string' || password.length === 0) {
    errors.push('Password is required');
  }

  if (errors.length > 0) {
    return { error: errors };
  }

  return {
    value: {
      email: email.trim().toLowerCase(),
      password,
    },
  };
};

module.exports = { validateRegister, validateLogin };       