import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = ({ onSearch }) => {
  const [textSearch, setTextSearch] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { isAuthenticated, user, openLoginModal, logout } = useAuth();
  const location = useLocation();

  const handleUserMenuToggle = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <header className="bg-gradient-to-r from-[#111] to-[#1a1a1a] w-full shadow-lg">
      {/* Top bar */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-[#333]">
        <div className="flex items-center space-x-12">
          <span className="text-4xl font-extrabold tracking-wide text-white flex items-center hover:scale-105 transition-transform duration-300">
            Movie<span className="ml-1 text-green-400 animate-pulse">•</span>
            Home
          </span>
          <nav className="flex items-center space-x-10">
            <Link
              to="/"
              className={`flex items-center font-bold pb-1 text-lg transition-all duration-300 transform hover:scale-110 ${
                location.pathname === "/"
                  ? "text-green-400 border-b-2 border-green-400"
                  : "text-white hover:text-green-400"
              }`}
            >
              🏠 Trang chủ
            </Link>
            <Link
              to="/tv"
              className={`flex items-center font-semibold text-lg transition-all duration-300 transform hover:scale-110 hover:translate-y-[-2px] ${
                location.pathname === "/tv"
                  ? "text-green-400 border-b-2 border-green-400 pb-1"
                  : "text-white hover:text-green-400"
              }`}
            >
              📺 Truyền hình
            </Link>
            <Link
              to="/sports"
              className={`flex items-center font-semibold text-lg transition-all duration-300 transform hover:scale-110 hover:translate-y-[-2px] ${
                location.pathname === "/sports"
                  ? "text-green-400 border-b-2 border-green-400 pb-1"
                  : "text-white hover:text-green-400"
              }`}
            >
              ⚽ Thể thao
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-6">
          {!isAuthenticated && (
            <Link
              to="/animation"
              className="bg-gradient-to-r from-orange-400 to-red-500 text-white font-bold px-6 py-2 rounded-full text-base hover:from-orange-500 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              🎨 PHIM HOẠT HÌNH
            </Link>
          )}

          {!isAuthenticated ? (
            <button
              onClick={openLoginModal}
              className="border-2 border-green-400 text-green-400 font-bold px-6 py-2 rounded-full text-base hover:bg-green-400 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Đăng nhập
            </button>
          ) : (
            <div className="flex items-center space-x-4">
              <span className="text-green-400 font-semibold">
                Xin chào, {user?.username}!
              </span>
              <div className="relative">
                <button
                  onClick={handleUserMenuToggle}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 flex items-center justify-center text-white font-bold text-lg shadow-lg hover:scale-110 transition-transform duration-300 cursor-pointer"
                >
                  {user?.username?.charAt(0)?.toUpperCase() || "U"}
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-xl border border-gray-700 z-50">
                    <div className="py-2">
                      <button className="w-full text-left px-4 py-2 text-white hover:bg-gray-800 transition-colors">
                        👤 Thông tin cá nhân
                      </button>
                      <button className="w-full text-left px-4 py-2 text-white hover:bg-gray-800 transition-colors">
                        ⚙️ Cài đặt
                      </button>
                      <button className="w-full text-left px-4 py-2 text-white hover:bg-gray-800 transition-colors">
                        🎬 Phim đã xem
                      </button>
                      <hr className="border-gray-700 my-1" />
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-800 transition-colors"
                      >
                        🚪 Đăng xuất
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <button className="text-white hover:text-green-400 transition-all duration-300 transform hover:scale-110">
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 01-3.46 0" />
            </svg>
          </button>
        </div>
      </div>

      {/* Bottom menu */}
      <div className="flex items-center justify-between px-12 py-4 bg-gradient-to-r from-[#181c20] to-[#222] text-base">
        <div className="flex items-center space-x-10">
          <Link
            to="/series"
            className={`font-semibold text-lg transition-all duration-300 transform hover:scale-110 hover:translate-y-[-2px] ${
              location.pathname === "/series"
                ? "text-green-400 border-b-2 border-green-400 pb-1"
                : "text-white hover:text-green-400"
            }`}
          >
            📺 Phim Bộ
          </Link>
          <Link
            to="/movies"
            className={`font-bold text-lg transition-all duration-300 transform hover:scale-110 hover:translate-y-[-2px] ${
              location.pathname === "/movies"
                ? "text-green-400 border-b-2 border-green-400 pb-1"
                : "text-white hover:text-green-400"
            }`}
          >
            🎬 Phim Điện Ảnh
          </Link>
          <Link
            to="/tvshows"
            className={`font-semibold text-lg transition-all duration-300 transform hover:scale-110 hover:translate-y-[-2px] ${
              location.pathname === "/tvshows"
                ? "text-green-400 border-b-2 border-green-400 pb-1"
                : "text-white hover:text-green-400"
            }`}
          >
            🎭 TV Show
          </Link>
          <Link
            to="/live"
            className={`font-semibold text-lg transition-all duration-300 transform hover:scale-110 hover:translate-y-[-2px] ${
              location.pathname === "/live"
                ? "text-green-400 border-b-2 border-green-400 pb-1"
                : "text-white hover:text-green-400"
            }`}
          >
            🔴 Trực Tiếp
          </Link>
          <Link
            to="/animation"
            className={`font-semibold text-lg transition-all duration-300 transform hover:scale-110 hover:translate-y-[-2px] ${
              location.pathname === "/animation"
                ? "text-green-400 border-b-2 border-green-400 pb-1"
                : "text-white hover:text-green-400"
            }`}
          >
            🎨 Phim Hoạt Hình
          </Link>
        </div>

        {/* Search box */}
        <div className="flex items-center space-x-3">
          <input
            type="text"
            placeholder="Tìm kiếm phim..."
            className="bg-[#333] text-white px-5 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 text-base transition-all duration-300 w-64"
            onChange={(e) => setTextSearch(e.target.value)}
            value={textSearch}
          />
          <button
            className="text-white px-5 py-2 bg-gradient-to-r from-green-400 to-green-500 rounded-full hover:from-green-500 hover:to-green-600 text-base font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
            onClick={() => onSearch(textSearch)}
          >
            Tìm kiếm
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
