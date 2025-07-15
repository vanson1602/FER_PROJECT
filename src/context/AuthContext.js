import React, { createContext, useState, useContext } from "react";

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

  // Đăng nhập (demo - trong thực tế sẽ gọi API)
  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    setShowLoginModal(false);
    // Lưu vào localStorage để persist qua session
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("isAuthenticated", "true");
  };

  // Đăng xuất
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
  };

  // Kiểm tra đăng nhập khi load trang
  React.useEffect(() => {
    const savedAuth = localStorage.getItem("isAuthenticated");
    const savedUser = localStorage.getItem("user");

    if (savedAuth === "true" && savedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Hiển thị modal đăng nhập
  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  // Đóng modal đăng nhập
  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    showLoginModal,
    openLoginModal,
    closeLoginModal,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
