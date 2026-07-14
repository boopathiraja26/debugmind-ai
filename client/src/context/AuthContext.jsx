import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { registerRequest, loginRequest, getMeRequest } from '../services/authService';
import {
  getToken,
  setToken,
  clearToken,
  getStoredUser,
  setStoredUser,
  clearStoredUser,
} from '../utils/token';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getStoredUser());
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // On first mount, verify any stored token against the backend so a stale
  // or expired token doesn't silently keep a user "logged in" client-side.
  useEffect(() => {
    const bootstrap = async () => {
      const token = getToken();
      if (!token) {
        setIsAuthLoading(false);
        return;
      }

      try {
        const { data } = await getMeRequest();
        const freshUser = data?.data?.user || null;
        setUser(freshUser);
        setStoredUser(freshUser);
      } catch (err) {
        clearToken();
        clearStoredUser();
        setUser(null);
      } finally {
        setIsAuthLoading(false);
      }
    };

    bootstrap();
  }, []);

  const persistSession = useCallback((token, nextUser) => {
    setToken(token);
    setStoredUser(nextUser);
    setUser(nextUser);
  }, []);

  const login = useCallback(
    async ({ email, password }) => {
      setIsSubmitting(true);
      try {
        const { data } = await loginRequest({ email, password });
        const { token, user: loggedInUser } = data.data;
        persistSession(token, loggedInUser);
        toast.success(data.message || 'Welcome back!');
        return loggedInUser;
      } catch (err) {
        const message = err.message || 'Login failed. Please try again.';
        toast.error(message);
        throw err;
      } finally {
        setIsSubmitting(false);
      }
    },
    [persistSession]
  );

  const register = useCallback(
    async ({ name, email, password }) => {
      setIsSubmitting(true);
      try {
        const { data } = await registerRequest({ name, email, password });
        const { token, user: newUser } = data.data;
        // Auto login immediately after a successful registration.
        persistSession(token, newUser);
        toast.success(data.message || 'Account created successfully!');
        return newUser;
      } catch (err) {
        const message = err.message || 'Registration failed. Please try again.';
        toast.error(message);
        throw err;
      } finally {
        setIsSubmitting(false);
      }
    },
    [persistSession]
  );

  const logout = useCallback(() => {
    clearToken();
    clearStoredUser();
    setUser(null);
    toast.success('Logged out successfully');
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isAuthLoading,
      isSubmitting,
      login,
      register,
      logout,
    }),
    [user, isAuthLoading, isSubmitting, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
