import React, {useContext} from 'react';
import {createContext, useEffect, useState} from 'react';
import {authenticateUser, Credentials} from '../api/auth';
import {useSessionStorage} from 'usehooks-ts';
import {useMutation} from '@tanstack/react-query';
import SnackBarContext from '../contexts/SnackBarContext';

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (credentials: Credentials) => void;
  logout: () => void;
  token: string | undefined;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  // eslint-disable-next-line
  login: (credentials: Credentials) => {},
  token: '',
  logout: () => {},
});

type tokenResponse = {
  access_token: string;
}

export const AuthProvider = ({ children }: any) => {
  const snack = useContext(SnackBarContext);
  const [token, setToken] = useSessionStorage<string | undefined>('token', undefined);
  const [isAuthenticated, setIsAuthenticated] = useState(token !== undefined);

  const authMutation = useMutation({
    mutationFn: async (credentials: Credentials) => {
      return await authenticateUser(credentials).then(response => { return response.data;});
    },
    onSuccess: (data) => {
      const tokenResponse = data as tokenResponse;
      setToken(tokenResponse.access_token);
      setIsAuthenticated(true);
    }
  });

  const login = (credentials: Credentials) => {
    authMutation.mutate(credentials);
  };

  const logout = () => {
    setToken(undefined);
    setIsAuthenticated(false);
    snack.handleSetAlert('You have been logged out!');
  };

  // eslint-disable-next-line
  useEffect(() => {
    if(token){setIsAuthenticated(true);}
  });

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, token, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
