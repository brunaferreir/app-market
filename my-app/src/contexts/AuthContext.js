import React, { createContext, useState, useEffect } from "react";
import api from "../api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      // opcional: buscar /api/auth/me para popular user
      setUser({}); // placeholder
    } else {
      setUser(null);
    }
  }, [token]);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const res = await api.login(credentials);
      localStorage.setItem("token", res.token);
      setToken(res.token);
      setUser(res.seller || {});
      setLoading(false);
      return res;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
