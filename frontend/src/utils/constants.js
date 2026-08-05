export const TOKEN_STORAGE_KEY = 'debugmind_token';
export const USER_STORAGE_KEY = 'debugmind_user';

const getApiBaseUrl = () => {
  let url = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  url = url.trim();
  if (url && !/^https?:\/\//i.test(url)) {
    url = `https://${url}`;
  }
  return url.replace(/\/+$/, '');
};

export const API_BASE_URL = getApiBaseUrl();

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  ANALYZE: "/analyze",
  HISTORY: "/history",
};
