import { AuthContext } from ".";
import api from "../service/axios";
import { useEffect, useState } from "react";

// Create Context

// Provider Component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Check login state on first render
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get("/auth/me"); // API that returns user info if logged in
        if (response.status === 200) {
          setIsAuthenticated(true);
          setUser(response.data); // Store user data
        }
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    checkAuth();
  }, []);

  // Logout function
  const logout = async () => {
    try {
      const response = await api.post("/auth/logout");
      if (response.status === 200) {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
