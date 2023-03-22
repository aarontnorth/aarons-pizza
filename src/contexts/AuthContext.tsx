import {createContext, useEffect, useState} from "react";
import {AuthInfo, useLogin} from "../api/auth";

const AuthContext = createContext({
  isAuthenticated: false,
  login: (authInfo: AuthInfo) => {},
  token: ''
});

type data = {
  access_token: string;
}

export const AuthProvider = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string>('');
  const getToken = useLogin();
  const login = (authInfo: AuthInfo) => {
    getToken.mutate(authInfo)
    setIsAuthenticated(true);
  }

  useEffect(() => {
    if(getToken.isSuccess){
      const tokenString = getToken.data.data as data
      setToken(tokenString.access_token);
    }
  },[getToken])

  useEffect(() => {
    // console.log(token)
  },[token])

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
