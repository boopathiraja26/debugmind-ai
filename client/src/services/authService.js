import api from './api';

/**
 * @param {{ name: string, email: string, password: string }} payload
 */
export const registerRequest = (payload) => api.post('/auth/register', payload);

/**
 * @param {{ email: string, password: string }} payload
 */
export const loginRequest = (payload) => api.post('/auth/login', payload);

export const getMeRequest = () => api.get('/auth/me');
