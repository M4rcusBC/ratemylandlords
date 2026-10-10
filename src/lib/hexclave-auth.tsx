import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  hexclaveSignIn,
  hexclaveSignUp,
  hexclaveGetMe,
  hexclaveSignOut,
} from './api';

export interface HexclaveUser {
  id: string;
  email: string;
  displayName: string;
}

interface HexclaveAuthContextType {
  user: HexclaveUser | null;
  token: string | null;
  isLoading: boolean;
  signIn: (email: string, password?: string) => Promise<void>;
  signUp: (email: string, password?: string, displayName?: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const HexclaveAuthContext = createContext<HexclaveAuthContextType | undefined>(
  undefined
);

const USER_STORAGE_KEY = 'hexclave_user_session';
const TOKEN_STORAGE_KEY = 'hexclave_access_token';

export function HexclaveAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<HexclaveUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize session on mount by checking token and verifying with backend
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const savedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
        const savedUser = localStorage.getItem(USER_STORAGE_KEY);

        if (savedToken) {
          setToken(savedToken);
          if (savedUser) {
            setUser(JSON.parse(savedUser));
          }

          // Verify with backend API
          try {
            const res = await hexclaveGetMe(savedToken);
            if (res.user) {
              setUser(res.user);
              localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(res.user));
            }
          } catch {
            // Token expired or invalid
            localStorage.removeItem(TOKEN_STORAGE_KEY);
            localStorage.removeItem(USER_STORAGE_KEY);
            setUser(null);
            setToken(null);
          }
        }
      } catch (err) {
        console.warn('Auth initialization error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const signIn = async (email: string, password?: string) => {
    setIsLoading(true);
    try {
      const res = await hexclaveSignIn(email, password);
      setUser(res.user);
      setToken(res.token);
      localStorage.setItem(TOKEN_STORAGE_KEY, res.token);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(res.user));
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (
    email: string,
    password?: string,
    displayName?: string
  ) => {
    setIsLoading(true);
    try {
      const res = await hexclaveSignUp(email, password, displayName);
      setUser(res.user);
      setToken(res.token);
      localStorage.setItem(TOKEN_STORAGE_KEY, res.token);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(res.user));
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      if (token) {
        await hexclaveSignOut(token);
      }
    } catch (e) {
      console.warn('Sign out API error:', e);
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  };

  return (
    <HexclaveAuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </HexclaveAuthContext.Provider>
  );
}

export function useHexclaveAuth() {
  const context = useContext(HexclaveAuthContext);
  if (!context) {
    throw new Error(
      'useHexclaveAuth must be used within a HexclaveAuthProvider'
    );
  }
  return context;
}
