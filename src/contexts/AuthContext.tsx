import {createContext, useEffect, useState} from "react";
import {authenticateUser, Credentials} from "../api/auth";
import {useSessionStorage} from "usehooks-ts";
import {useMutation} from "@tanstack/react-query";

const AuthContext = createContext({
  isAuthenticated: false,
  login: (credentials: Credentials) => {},
  token: ''
});

type tokenResponse = {
  access_token: string;
}

export const AuthProvider = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useSessionStorage('token', '')

  const authMutation = useMutation({
    mutationFn: async (credentials: Credentials) => {
      return await authenticateUser(credentials).then(response => { return response.data});
    },
    onSuccess: (data) => {
      const tokenResponse = data as tokenResponse
      setToken(tokenResponse.access_token);
    }
  })

  const login = (credentials: Credentials) => {
    authMutation.mutate(credentials)
    setIsAuthenticated(true);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
