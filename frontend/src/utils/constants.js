export const TOKEN_STORAGE_KEY = 'debugmind_token';
export const USER_STORAGE_KEY = 'debugmind_user';

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  ANALYZE: "/analyze",
  HISTORY: "/history",
};
