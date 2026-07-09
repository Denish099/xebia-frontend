import React, { createContext, useContext, useCallback, useMemo, useState } from 'react';
import type { AuthState, User } from '../types/authTypes';
import { storage } from '../utils/storage';

interface AuthContextValue extends AuthState {
  isLoading: boolean;
  setLogin: (user: User, token: string, refreshToken: string) => void;
  setLogout: () => void;
  setLoading: (loading: boolean) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function getInitialState(): AuthState {
  const persisted = storage.getAuth();
  if (persisted && persisted.token) {
    return persisted;
  }
  return {
    user: null,
    token: null,
    refreshToken: null,
    isAuthenticated: false,
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>(getInitialState);
  const [isLoading, setIsLoading] = useState(false);

  const setLogin = useCallback((user: User, token: string, refreshToken: string) => {
    const newState: AuthState = {
      user,
      token,
      refreshToken,
      isAuthenticated: true,
    };
    storage.setAuth(newState);
    setAuthState(newState);
  }, []);

  const setLogout = useCallback(() => {
    storage.clearAuth();
    setAuthState({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
    });
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setIsLoading(loading);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      ...authState,
      isLoading,
      setLogin,
      setLogout,
      setLoading,
    }),
    [authState, isLoading, setLogin, setLogout, setLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
