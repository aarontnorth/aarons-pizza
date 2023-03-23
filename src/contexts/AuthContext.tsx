import React from "react";
import {createContext, useEffect, useState} from "react";
import {authenticateUser, Credentials} from "../api/auth";
import {useSessionStorage} from "usehooks-ts";
import {useMutation} from "@tanstack/react-query";

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (credentials: Credentials) => void;
  token: string | undefined;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  // eslint-disable-next-line
  login: (credentials: Credentials) => {},
  token: ''
});

type tokenResponse = {
  access_token: string;
}

export const AuthProvider = ({ children }: any) => {
  const [token, setToken] = useSessionStorage<string | undefined>('token', undefined)
  const [isAuthenticated, setIsAuthenticated] = useState(token !== undefined);

  const authMutation = useMutation({
    mutationFn: async (credentials: Credentials) => {
      return await authenticateUser(credentials).then(response => { return response.data});
    },
    onSuccess: (data) => {
      const tokenResponse = data as tokenResponse
      setToken(tokenResponse.access_token);
      setIsAuthenticated(true);
    }
  })

  const login = (credentials: Credentials) => {
    authMutation.mutate(credentials)
  }

  // eslint-disable-next-line
  useEffect(() => {
    if(token){setIsAuthenticated(true)}
  })

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
