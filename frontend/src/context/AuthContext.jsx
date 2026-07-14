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
  const [token, setTokenState] = useState(() => getToken());
  const [user, setUser] = useState(() => getStoredUser());
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Verifies the stored token against the backend and refreshes the cached
   * user profile. Called once on app load (auto login) and can be called
   * again manually to re-sync the profile.
   */
  const loadUser = useCallback(async () => {
    const storedToken = getToken();

    if (!storedToken) {
      setUser(null);
      setTokenState(null);
      setLoading(false);
      return null;
    }

    try {
      const { data } = await getMeRequest();
      const freshUser = data?.data?.user || null;
      setUser(freshUser);
      setStoredUser(freshUser);
      setTokenState(storedToken);
      return freshUser;
    } catch (err) {
      clearToken();
      clearStoredUser();
      setUser(null);
      setTokenState(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto login on first mount: restore the session from a stored token.
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = useCallback(async ({ email, password }) => {
    setIsSubmitting(true);
    try {
      const { data } = await loginRequest({ email, password });
      const { token: newToken, user: loggedInUser } = data.data;

      setToken(newToken);
      setStoredUser(loggedInUser);
      setTokenState(newToken);
      setUser(loggedInUser);

      toast.success(data.message || 'Welcome back!');
      return loggedInUser;
    } catch (err) {
      const message = err.message || 'Login failed. Please try again.';
      toast.error(message);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const register = useCallback(async ({ name, email, password }) => {
    setIsSubmitting(true);
    try {
      const { data } = await registerRequest({ name, email, password });
      toast.success(data.message || 'Account created successfully! Please log in.');
      return data.data.user;
    } catch (err) {
      const message = err.message || 'Registration failed. Please try again.';
      toast.error(message);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const logout = useCallback(() => {
    clearToken();
    clearStoredUser();
    setTokenState(null);
    setUser(null);
    toast.success('Logged out successfully');
  }, []);

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token && user),
      loading,
      isSubmitting,
      login,
      register,
      logout,
      loadUser,
    }),
    [token, user, loading, isSubmitting, login, register, logout, loadUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};