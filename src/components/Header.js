import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = ({ onSearch }) => {
  const [textSearch, setTextSearch] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { isAuthenticated, user, openLoginModal, logout } = useAuth();
  const location = useLocation();

  const handleUserMenuToggle = () => setShowUserMenu(!showUserMenu);
  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <header className="bg-[#111] shadow-lg w-full">
      {/* TOP: Logo - Menu - Auth */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-[#2c2c2c]">
        {/* Logo */}
        <div className="text-3xl font-extrabold tracking-wide text-white flex items-center hover:scale-105 transition-transform duration-300">
          Movie<span className="ml-1 text-green-400 animate-pulse">•</span>Home
        </div>

        {/* Main Menu */}
        <nav className="flex items-center space-x-8">
          <Link
            to="/"
            className={`text-lg font-medium transition-all hover:scale-110 ${
              location.pathname === "/"
                ? "text-green-400 border-b-2 border-green-400 pb-1"
                : "text-white hover:text-green-400"
            }`}
          >
            🏠 Trang chủ
          </Link>
          <Link
            to="/series"
            className={`text-lg font-medium transition-all hover:scale-110 ${
              location.pathname === "/series"
                ? "text-green-400 border-b-2 border-green-400 pb-1"
                : "text-white hover:text-green-400"
            }`}
          >
            📺 Phim Bộ
          </Link>
          <Link
            to="/movies"
            className={`text-lg font-medium transition-all hover:scale-110 ${
              location.pathname === "/movies"
                ? "text-green-400 border-b-2 border-green-400 pb-1"
                : "text-white hover:text-green-400"
            }`}
          >
            🎬 Phim Điện Ảnh
          </Link>
          <Link
            to="/tvshows"
            className={`text-lg font-medium transition-all hover:scale-110 ${
              location.pathname === "/tvshows"
                ? "text-green-400 border-b-2 border-green-400 pb-1"
                : "text-white hover:text-green-400"
            }`}
          >
            🎭 TV Show
          </Link>
          <Link
            to="/live"
            className={`text-lg font-medium transition-all hover:scale-110 ${
              location.pathname === "/live"
                ? "text-green-400 border-b-2 border-green-400 pb-1"
                : "text-white hover:text-green-400"
            }`}
          >
            🔴 Trực Tiếp
          </Link>
          <Link
            to="/animation"
            className={`text-lg font-medium transition-all hover:scale-110 ${
              location.pathname === "/animation"
                ? "text-green-400 border-b-2 border-green-400 pb-1"
                : "text-white hover:text-green-400"
            }`}
          >
            🎨 Phim Hoạt Hình
          </Link>
        </nav>

        {/* Auth/Login */}
        <div className="flex items-center gap-4">
          {!isAuthenticated ? (
            <>
              <button
                onClick={openLoginModal}
                className="border border-green-400 text-green-400 font-semibold px-4 py-2 rounded-full text-sm hover:bg-green-400 hover:text-white transition-transform hover:scale-105 shadow-md"
              >
                Đăng nhập
              </button>
            </>
          ) : (
            <div className="relative flex items-center space-x-3">
              <span className="text-green-400 font-medium text-sm hidden sm:inline">
                Xin chào, {user?.username}
              </span>
              <button
                onClick={handleUserMenuToggle}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 text-white font-bold text-lg shadow-md hover:scale-110 transition"
              >
                {user?.username?.charAt(0)?.toUpperCase() || "U"}
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-12 w-48 bg-[#1e1e1e] rounded-lg shadow-xl border border-[#333] z-50 text-white text-sm">
                  <button className="block w-full text-left px-4 py-2 hover:bg-[#2c2c2c]">
                    👤 Thông tin cá nhân
                  </button>
                  <button className="block w-full text-left px-4 py-2 hover:bg-[#2c2c2c]">
                    ⚙️ Cài đặt
                  </button>
                  <button className="block w-full text-left px-4 py-2 hover:bg-[#2c2c2c]">
                    🎬 Phim đã xem
                  </button>
                  <hr className="border-[#444]" />
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-400 hover:bg-[#2c2c2c]"
                  >
                    🚪 Đăng xuất
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="bg-[#121212] px-8 py-4 border-t border-[#2c2c2c]">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <input
            type="text"
            value={textSearch}
            onChange={(e) => setTextSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch(textSearch)}
            placeholder="Tìm kiếm phim, TV Show..."
            className="flex-1 px-5 py-2 rounded-full bg-[#2a2a2a] text-white placeholder-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            onClick={() => onSearch(textSearch)}
            className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full text-base font-semibold shadow-md transition hover:scale-105"
          >
            Tìm kiếm
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
