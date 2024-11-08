import { AUTH_KEYS } from 'helpers/constants';
import { useLocalStorage } from 'hooks/use-local-storage';
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { User, UserDetails } from 'types/auth';
import client from '../api/client';

interface AuthContextType {
  user: UserDetails | null;
  addUser: (user: UserDetails | null) => void;
  login: (user: User | null) => void;
  logout: () => void;
}

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  addUser: () => {
    return;
  },
  login: () => {
    return;
  },
  logout: () => {
    return;
  },
});

const localStorageUser = localStorage.getItem(AUTH_KEYS.USER);

function AuthProvider(props: AuthProviderProps) {
  const [user, setUser] = useState<UserDetails | null>(() => (localStorageUser ? JSON.parse(localStorageUser) : null));
  const { setItem, removeItem } = useLocalStorage();

  const addUser = useCallback(
    (user: UserDetails | null) => {
      setItem(AUTH_KEYS.USER, JSON.stringify(user));
      setUser(user);
    },
    [setItem]
  );

  const addToken = useCallback(
    (token?: string | null) => {
      setItem(AUTH_KEYS.TOKEN, token || '');
    },
    [setItem]
  );

  const addRefreshToken = useCallback(
    (r_token?: string | null) => {
      setItem(AUTH_KEYS.REFRESH_TOKEN, r_token || '');
    },
    [setItem]
  );

  const removeUser = useCallback(async () => {
    const { message }: { message: string } = await client.post('auth/logout');
    if (message === 'Logout successfully') {
      setUser(null);
      removeItem(AUTH_KEYS.USER);
      removeItem(AUTH_KEYS.TOKEN);
      removeItem(AUTH_KEYS.REFRESH_TOKEN);
    }
  }, [removeItem]);

  const login = useCallback(
    (user: User | null) => {
      addUser(user?.user || null);
      addToken(user?.access_token);
      addRefreshToken(user?.refresh_token);
    },
    [addRefreshToken, addToken, addUser]
  );

  const logout = useCallback(async () => {
    await removeUser();
  }, [removeUser]);

  const providerValues = useMemo(() => ({ user, login, logout, addUser }), [addUser, login, logout, user]);
  return <AuthContext.Provider value={providerValues} {...props} />;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

export { AuthProvider, useAuth };
