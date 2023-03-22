import { createContext, useState } from "react";
import {AuthInfo, useLogin} from "../api/auth";

const AuthContext = createContext({
  isAuthenticated: false,
  login: (authInfo: AuthInfo) => {}
});

export const AuthProvider = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState("");
  const getToken = useLogin();
  const login = (authInfo: AuthInfo) => {
    getToken.mutate(authInfo)
    // setToken(getToken.data);
    // setIsAuthenticated(true);
  }
  return (
    <AuthContext.Provider value={{ isAuthenticated, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
