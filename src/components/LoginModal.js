import React, { useState } from "react";
import Modal from "react-modal";
import { useAuth } from "../context/AuthContext";

const LoginModal = () => {
  const { showLoginModal, closeLoginModal, login } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call (demo - trong thực tế sẽ gọi API thật)
    setTimeout(() => {
      if (formData.username && formData.password) {
        // Mock successful login
        const userData = {
          id: 1,
          username: formData.username,
          email: `${formData.username}@example.com`,
          avatar: "A",
        };
        login(userData);
        setFormData({ username: "", password: "" });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Modal
      isOpen={showLoginModal}
      onRequestClose={closeLoginModal}
      style={{
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        content: {
          position: "relative",
          border: "none",
          background: "none",
          overflow: "auto",
          borderRadius: "0",
          outline: "none",
          padding: "0",
          margin: "0",
          maxWidth: "400px",
          width: "90%",
        },
      }}
      contentLabel="Đăng nhập"
    >
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 shadow-2xl border border-gray-700">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-white mb-2">Đăng nhập</h2>
          <p className="text-gray-400">Đăng nhập để xem phim đầy đủ</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white text-sm font-bold mb-2">
              Tên đăng nhập
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300"
              placeholder="Nhập tên đăng nhập"
              required
            />
          </div>

          <div>
            <label className="block text-white text-sm font-bold mb-2">
              Mật khẩu
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300"
              placeholder="Nhập mật khẩu"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 accent-green-400" />
              <span className="text-sm text-gray-400">Ghi nhớ đăng nhập</span>
            </label>
            <button
              type="button"
              className="text-sm text-green-400 hover:text-green-300"
            >
              Quên mật khẩu?
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-green-400 to-green-500 text-white font-bold py-3 px-4 rounded-lg hover:from-green-500 hover:to-green-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Đang đăng nhập...
              </div>
            ) : (
              "Đăng nhập"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Chưa có tài khoản?
            <button className="text-green-400 hover:text-green-300 ml-1 font-semibold">
              Đăng ký ngay
            </button>
          </p>
        </div>

        <button
          onClick={closeLoginModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-300"
        >
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </Modal>
  );
};

export default LoginModal;
