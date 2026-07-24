import axios from 'axios';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../utils/constants';
import { getToken, clearToken, clearStoredUser } from '../utils/token';

console.log('API_BASE_URL =>', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 20000,
});

// Attach JWT token to every request
api.interceptors.request.use(
  (config) => {
    const token = getToken();

    console.log('JWT token =>', token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message =
      error.response?.data?.message ||
      error.message ||
      'Something went wrong. Please try again.';

    if (status === 401) {
      clearToken();
      clearStoredUser();

      if (!window.location.pathname.startsWith('/login')) {
        toast.error('Your session has expired. Please log in again.');
        window.location.assign('/login');
      }
    }

    return Promise.reject({ ...error, message });
  }
);

export default api;