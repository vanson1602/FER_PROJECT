import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [error, setError] = useState(null);

  // Login with json-server
  const login = async (credentials) => {
    try {
      setError(null);
      // Get users from json-server
      const response = await axios.get("http://localhost:3001/users");
      const users = response.data;

      // Find matching user
      const user = users.find(
        (u) =>
          u.username === credentials.username &&
          u.password === credentials.password
      );

      if (user) {
        const userWithAvatar = {
          ...user,
          avatar: user.avatar || null,
        };

        setIsAuthenticated(true);
        setUser(userWithAvatar);
        setShowLoginModal(false);
        // Save to localStorage
        localStorage.setItem("user", JSON.stringify(userWithAvatar));
        localStorage.setItem("isAuthenticated", "true");
        return true;
      } else {
        setError("Invalid username or password");
        return false;
      }
    } catch (err) {
      setError("Login failed. Please try again.");
      console.error("Login error:", err);
      return false;
    }
  };

  // Logout
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setError(null);
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
  };

  // Check login on page load
  React.useEffect(() => {
    const savedAuth = localStorage.getItem("isAuthenticated");
    const savedUser = localStorage.getItem("user");

    if (savedAuth === "true" && savedUser) {
      const userData = JSON.parse(savedUser);
      setIsAuthenticated(true);
      setUser({
        ...userData,
        avatar: userData.avatar || null,
      });
    }
  }, []);

  // Show login modal
  const openLoginModal = () => {
    setShowLoginModal(true);
    setError(null);
  };

  // Close login modal
  const closeLoginModal = () => {
    setShowLoginModal(false);
    setError(null);
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    showLoginModal,
    openLoginModal,
    closeLoginModal,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
