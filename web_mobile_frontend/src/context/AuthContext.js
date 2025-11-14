import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { apiGet, apiPost } from '../api/client';
import { getAccessToken, getRefreshToken, setTokens, clearTokens } from '../utils/tokenStorage';

// PUBLIC_INTERFACE
export const AuthContext = createContext({
  /** Auth state and helpers for the app. */
  user: null,
  loading: true,
  isAuthenticated: false,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  refreshProfile: async () => {},
});

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  /** Provides authentication and user info state to the app. */
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!getAccessToken();

  const fetchProfile = useCallback(async () => {
    try {
      const me = await apiGet('/users/me');
      setUser(me);
    } catch (e) {
      // non-blocking
    }
  }, []);

  const init = useCallback(async () => {
    setLoading(true);
    try {
      if (getAccessToken() || getRefreshToken()) {
        await fetchProfile();
      }
    } finally {
      setLoading(false);
    }
  }, [fetchProfile]);

  useEffect(() => {
    init();
  }, [init]);

  const login = useCallback(async (email, password) => {
    const data = await apiPost('/auth/login', { email, password });
    const { accessToken, refreshToken, user: profile } = data || {};
    setTokens(accessToken, refreshToken);
    setUser(profile || null);
    return profile;
  }, []);

  const signup = useCallback(async (payload) => {
    const data = await apiPost('/auth/signup', payload);
    const { accessToken, refreshToken, user: profile } = data || {};
    if (accessToken) {
      setTokens(accessToken, refreshToken);
    }
    setUser(profile || null);
    return profile;
  }, []);

  const logout = useCallback(() => {
    clearTokens();
    setUser(null);
  }, []);

  const refreshProfile = useCallback(async () => {
    await fetchProfile();
  }, [fetchProfile]);

  const value = useMemo(() => ({
    user,
    loading,
    isAuthenticated,
    login,
    signup,
    logout,
    refreshProfile,
  }), [user, loading, isAuthenticated, login, signup, logout, refreshProfile]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
