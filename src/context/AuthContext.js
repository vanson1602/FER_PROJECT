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
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Đăng nhập
  const login = async (credentials) => {
    setIsLoading(true);
    setLoginError("");

    try {
      // Kiểm tra user trong db.json
      const response = await axios.get('http://localhost:3001/users', {
        params: {
          username: credentials.username
        }
      });

      const users = response.data;
      const user = users.find(u => u.username === credentials.username && u.password === credentials.password);

      if (!user) {
        throw new Error("Tên đăng nhập hoặc mật khẩu không chính xác");
      }

      // Loại bỏ password trước khi lưu vào state
      const { password, ...userData } = user;

      setIsAuthenticated(true);
      setUser(userData);
      setIsAdmin(userData.role === 'admin');
      setShowLoginModal(false);

      // Lưu vào localStorage
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("isAuthenticated", "true");

      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage = error.message || "Đăng nhập thất bại. Vui lòng thử lại.";
      setLoginError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Đăng xuất
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
  };

  // Kiểm tra đăng nhập khi load trang
  React.useEffect(() => {
    const savedAuth = localStorage.getItem("isAuthenticated");
    const savedUser = localStorage.getItem("user");

    if (savedAuth === "true" && savedUser) {
      const userData = JSON.parse(savedUser);
      setIsAuthenticated(true);
      setUser(userData);
      setIsAdmin(userData.role === 'admin');
    }
  }, []);

  // Hiển thị modal đăng nhập
  const openLoginModal = () => {
    setShowLoginModal(true);
    setLoginError("");
  };

  // Đóng modal đăng nhập
  const closeLoginModal = () => {
    setShowLoginModal(false);
    setLoginError("");
  };

  const value = {
    isAuthenticated,
    user,
    isAdmin,
    login,
    logout,
    showLoginModal,
    openLoginModal,
    closeLoginModal,
    loginError,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
