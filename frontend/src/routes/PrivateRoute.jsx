import React from 'react';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
  const autenticado = localStorage.getItem("authToken");
  return autenticado ? children : <Navigate to="/" />;
};

export default PrivateRoute;