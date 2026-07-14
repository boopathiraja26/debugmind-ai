const EMAIL_REGEX = /^[\w.+-]+@[\w-]+\.[a-zA-Z]{2,}$/;

export const isValidEmail = (email) => typeof email === 'string' && EMAIL_REGEX.test(email.trim());

export const isValidPassword = (password) =>
  typeof password === 'string' && password.length >= 6;

export const isValidName = (name) => typeof name === 'string' && name.trim().length >= 2;

export const validateRegisterForm = ({ name, email, password, confirmPassword }) => {
  const errors = {};

  if (!isValidName(name)) {
    errors.name = 'Name must be at least 2 characters';
  }
  if (!isValidEmail(email)) {
    errors.email = 'Enter a valid email address';
  }
  if (!isValidPassword(password)) {
    errors.password = 'Password must be at least 6 characters';
  }
  if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
};

export const validateLoginForm = ({ email, password }) => {
  const errors = {};

  if (!isValidEmail(email)) {
    errors.email = 'Enter a valid email address';
  }
  if (!password) {
    errors.password = 'Password is required';
  }

  return errors;
};