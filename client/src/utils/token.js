import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from './constants';

/**
 * Centralized helpers for reading/writing the JWT and cached user profile.
 * The backend issues a stateless Bearer token (no server-side session/cookie),
 * so the token must live somewhere the client can read on every request.
 * localStorage is used here; it survives refreshes and tab closes, which is
 * required for "auto login". Because it is readable by any script on the
 * page, the app never renders raw HTML from user input and relies on the
 * backend's short-lived token expiry (JWT_EXPIRES_IN) to bound the blast
 * radius of a leaked token.
 */
export const getToken = () => localStorage.getItem(TOKEN_STORAGE_KEY);

export const setToken = (token) => {
  if (token) {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
  }
};

export const clearToken = () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
};

export const getStoredUser = () => {
  const raw = localStorage.getItem(USER_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (err) {
    return null;
  }
};

export const setStoredUser = (user) => {
  if (user) {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  }
};

export const clearStoredUser = () => {
  localStorage.removeItem(USER_STORAGE_KEY);
};
