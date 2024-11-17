import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const storedAuth = localStorage.getItem("isAuthenticated") === "true";

  const [Auth, setAuth] = useState({
    isAuthenticated: storedAuth,
    user: null,
  });

  const login = (jwt_decoded) => {
    setAuth({ isAuthenticated: true, user: jwt_decoded });
    localStorage.setItem("isAuthenticated", "true");
  };

  const logout = () => {
    setAuth({ isAuthenticated: false, user: null });
    localStorage.setItem("isAuthenticated", "false");
  };

  return (
    <AuthContext.Provider value={{ Auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
