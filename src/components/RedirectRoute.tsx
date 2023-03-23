import React, {useContext} from 'react';
import {Navigate} from 'react-router-dom';
import authContext from '../contexts/AuthContext';

// @ts-ignore
// eslint-disable-next-line react/prop-types
export const RedirectRoute = ({children}) => {
  const {isAuthenticated} = useContext(authContext);
  return isAuthenticated ? children : <Navigate to="/login" />;
};