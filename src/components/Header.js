import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Modal from "react-modal";
import UserManagement from "./UserManagement";

const Header = ({ onSearch }) => {
  const [textSearch, setTextSearch] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showWatchedModal, setShowWatchedModal] = useState(false);
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);
  const [showUserManagement, setShowUserManagement] = useState(false);
  const [avatar, setAvatar] = useState(() => {
    // Initialize avatar from localStorage
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      return userData.avatar || null;
    }
    return null;
  });
  const [tempAvatar, setTempAvatar] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef(null);
  const { isAuthenticated, user, openLoginModal, logout } = useAuth();
  const location = useLocation();
  const isAdmin = user?.role === "admin";

  // Mock data for watched and favorite movies
  const watchedMovies = [
    {
      id: 1,
      title: "Gái Già Lắm Chiêu",
      image: "https://img.youtube.com/vi/iXjhuUXUlNE/maxresdefault.jpg",
      rating: 8.2,
      watchDate: "2024-03-15",
      duration: "112 phút",
    },
    {
      id: 2,
      title: "Gái Già Lắm Chiêu 2",
      image: "https://img.youtube.com/vi/Vw-gr7Kg2UI/maxresdefault.jpg",
      rating: 8.5,
      watchDate: "2024-03-14",
      duration: "118 phút",
    },
    {
      id: 3,
      title: "Lật Mặt 7",
      image: "https://img.youtube.com/vi/kBY2k3G6LsM/maxresdefault.jpg",
      rating: 7.9,
      watchDate: "2024-03-13",
      duration: "132 phút",
    },
  ];

  const favoriteMovies = [
    {
      id: 1,
      title: "Gái Già Lắm Chiêu",
      image: "https://img.youtube.com/vi/iXjhuUXUlNE/maxresdefault.jpg",
      rating: 8.2,
      addedDate: "2024-03-15",
      genre: "Hài, Gia đình",
    },
    {
      id: 2,
      title: "Lật Mặt 7",
      image: "https://img.youtube.com/vi/kBY2k3G6LsM/maxresdefault.jpg",
      rating: 7.9,
      addedDate: "2024-03-13",
      genre: "Hành động, Tâm lý",
    },
    {
      id: 4,
      title: "Đất Rừng Phương Nam",
      image: "https://img.youtube.com/vi/gqJ162LmqXo/maxresdefault.jpg",
      rating: 8.7,
      addedDate: "2024-03-10",
      genre: "Phiêu lưu, Tâm lý",
    },
  ];

  const handleUserMenuToggle = () => setShowUserMenu(!showUserMenu);
  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  const handleOpenProfile = () => {
    setShowProfileModal(true);
    setShowUserMenu(false);
  };

  const handleCloseProfile = () => {
    setShowProfileModal(false);
  };

  const handleOpenWatched = () => {
    setShowWatchedModal(true);
    setShowUserMenu(false);
  };

  const handleCloseWatched = () => {
    setShowWatchedModal(false);
  };

  const handleOpenFavorites = () => {
    setShowFavoritesModal(true);
    setShowUserMenu(false);
  };

  const handleCloseFavorites = () => {
    setShowFavoritesModal(false);
  };

  const handleAvatarClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setTempAvatar(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Vui lòng chọn file hình ảnh!");
      }
    }
  };

  const handleEditProfile = () => {
    setIsEditing(true);
    setTempAvatar(avatar);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setTempAvatar(avatar);
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      // Giả lập API call để lưu thông tin
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update avatar in state
      setAvatar(tempAvatar);

      // Update avatar in localStorage
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        userData.avatar = tempAvatar;
        localStorage.setItem("user", JSON.stringify(userData));
      }

      setIsEditing(false);

      // Hiển thị thông báo thành công
      alert("Cập nhật thông tin thành công!");
    } catch (error) {
      alert("Có lỗi xảy ra khi cập nhật thông tin!");
    } finally {
      setIsSaving(false);
    }
  };

  // Common modal styles
  const modalStyle = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      zIndex: 1000,
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#1e1e1e",
      border: "1px solid #333",
      borderRadius: "1rem",
      padding: "2rem",
      maxWidth: "800px",
      width: "90%",
      maxHeight: "80vh",
      overflow: "auto",
    },
  };

  // Movie card component for lists
  const MovieCard = ({ movie, type }) => (
    <div className="bg-[#2c2c2c] rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
      <div className="relative h-48">
        <img
          src={movie.image}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
          ⭐ {movie.rating}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg mb-2 line-clamp-1">
          {movie.title}
        </h3>
        <div className="text-sm text-gray-400">
          {type === "watched" ? (
            <>
              <p>
                Xem ngày:{" "}
                {new Date(movie.watchDate).toLocaleDateString("vi-VN")}
              </p>
              <p>Thời lượng: {movie.duration}</p>
            </>
          ) : (
            <>
              <p>
                Thêm vào:{" "}
                {new Date(movie.addedDate).toLocaleDateString("vi-VN")}
              </p>
              <p>Thể loại: {movie.genre}</p>
            </>
          )}
        </div>
        <button className="mt-3 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors">
          Xem lại
        </button>
      </div>
    </div>
  );

  return (
    <header className="bg-gradient-to-b from-[#111] to-[#1a1a1a] shadow-lg w-full sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      {/* TOP: Logo - Menu - Auth */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-[#2c2c2c]">
        {/* Logo */}
        <div className="text-3xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 flex items-center hover:scale-105 transition-transform duration-300">
          Movie<span className="ml-1 text-green-400 animate-ping">•</span>Home
        </div>

        {/* Main Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"

            className={`text-lg font-medium transition-all duration-300 hover:scale-110 relative group ${location.pathname === "/"
                ? "text-green-400"
                : "text-white hover:text-green-400"
              }`}
          >
            🏠 Trang chủ
            <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-green-400 to-blue-500 transform origin-left transition-transform duration-300 ${location.pathname === "/" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              }`}></span>
          </Link>
          <Link
            to="/series"
            className={`text-lg font-medium transition-all duration-300 hover:scale-110 relative group ${location.pathname === "/series"
                ? "text-green-400"
                : "text-white hover:text-green-400"
              }`}
          >
            📺 Phim Bộ
            <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-green-400 to-blue-500 transform origin-left transition-transform duration-300 ${location.pathname === "/series" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              }`}></span>
          </Link>
          <Link
            to="/movies"
            className={`text-lg font-medium transition-all duration-300 hover:scale-110 relative group ${location.pathname === "/movies"
                ? "text-green-400"
                : "text-white hover:text-green-400"
              }`}
          >
            🎬 Phim Điện Ảnh
            <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-green-400 to-blue-500 transform origin-left transition-transform duration-300 ${location.pathname === "/movies" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              }`}></span>
          </Link>
          <Link
            to="/tvshows"
            className={`text-lg font-medium transition-all duration-300 hover:scale-110 relative group ${location.pathname === "/tvshows"
                ? "text-green-400"
                : "text-white hover:text-green-400"
              }`}
          >
            🎭 TV Show
            <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-green-400 to-blue-500 transform origin-left transition-transform duration-300 ${location.pathname === "/tvshows" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              }`}></span>
          </Link>
          <Link
            to="/live"
            className={`text-lg font-medium transition-all duration-300 hover:scale-110 relative group ${location.pathname === "/live"
                ? "text-green-400"
                : "text-white hover:text-green-400"
              }`}
          >
            🔴 Trực Tiếp
            <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-green-400 to-blue-500 transform origin-left transition-transform duration-300 ${location.pathname === "/live" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              }`}></span>
          </Link>
          <Link
            to="/animation"
            className={`text-lg font-medium transition-all duration-300 hover:scale-110 relative group ${location.pathname === "/animation"
                ? "text-green-400"
                : "text-white hover:text-green-400"
              }`}
          >
            🎨 Phim Hoạt Hình
            <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-green-400 to-blue-500 transform origin-left transition-transform duration-300 ${location.pathname === "/animation" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              }`}></span>
          </Link>
        </nav>

        {/* Auth/Login */}
        <div className="flex items-center gap-4">
          {!isAuthenticated ? (
            <>
              <button
                onClick={openLoginModal}
                className="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-medium text-green-400 transition duration-300 ease-out border-2 border-green-400 rounded-full shadow-md group"
              >
                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-green-400 to-blue-500 group-hover:translate-x-0 ease">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </span>
                <span className="absolute flex items-center justify-center w-full h-full text-green-400 transition-all duration-300 transform group-hover:translate-x-full ease">Đăng nhập</span>
                <span className="relative invisible">Đăng nhập</span>
              </button>
            </>
          ) : (
            <div className="relative flex items-center space-x-3">
              <span className="text-green-400 font-medium text-sm hidden sm:inline">
                Xin chào, {user?.username}
              </span>
              <button
                onClick={handleUserMenuToggle}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold text-lg shadow-lg hover:scale-110 transition-all duration-300 flex items-center justify-center ring-2 ring-offset-2 ring-offset-[#111] ring-green-400"
              >
                {user?.username?.charAt(0)?.toUpperCase() || "U"}
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-16 w-64 bg-[#1e1e1e] rounded-lg shadow-2xl border border-green-400/20 z-50 text-white text-sm py-2 transform origin-top transition-all duration-300 backdrop-blur-lg bg-opacity-95">
                  <div className="px-4 py-3 border-b border-[#333] flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      {avatar ? (
                        <img
                          src={avatar}
                          alt="Avatar"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-r from-orange-400 to-orange-500 flex items-center justify-center text-white font-bold">
                          {user?.username?.charAt(0)?.toUpperCase() || "U"}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-green-400">
                        {user?.username}
                      </div>
                      <div className="text-gray-400 text-xs">{user?.email}</div>
                    </div>
                  </div>
                  <button
                    onClick={handleOpenProfile}
                    className="block w-full text-left px-4 py-2 hover:bg-[#2c2c2c] transition-colors"
                  >
                    👤 Thông tin cá nhân
                  </button>
                  <button className="block w-full text-left px-4 py-2 hover:bg-[#2c2c2c] transition-colors">
                    ⚙️ Cài đặt tài khoản
                  </button>
                  <button
                    onClick={handleOpenWatched}
                    className="block w-full text-left px-4 py-2 hover:bg-[#2c2c2c] transition-colors"
                  >
                    🎬 Phim đã xem
                  </button>
                  <button
                    onClick={handleOpenFavorites}
                    className="block w-full text-left px-4 py-2 hover:bg-[#2c2c2c] transition-colors"
                  >
                    ❤️ Phim yêu thích
                  </button>
                  {isAdmin && (
                    <button
                      onClick={() => {
                        setShowUserManagement(true);
                        setShowUserMenu(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-[#2c2c2c] transition-colors"
                    >
                      👥 Quản lý người dùng
                    </button>
                  )}
                  <button className="block w-full text-left px-4 py-2 hover:bg-[#2c2c2c] transition-colors">
                    📝 Đánh giá của tôi
                  </button>
                  <hr className="border-[#444] my-1" />
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-400 hover:bg-[#2c2c2c] transition-colors"
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
      <div className="px-8 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={textSearch}
              onChange={(e) => setTextSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSearch(textSearch)}
              placeholder="Tìm kiếm phim, TV Show..."
              className="w-full px-5 py-3 rounded-full bg-[#2a2a2a] text-white placeholder-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-green-400/50 transition-all duration-300 shadow-inner"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <button
            onClick={() => onSearch(textSearch)}
            className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white px-6 py-3 rounded-full text-base font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-green-400/20"
          >
            Tìm kiếm
          </button>
        </div>
      </div>

      {/* Profile Modal */}
      <Modal
        isOpen={showProfileModal}
        onRequestClose={handleCloseProfile}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            zIndex: 1000,
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#1e1e1e",
            border: "1px solid #333",
            borderRadius: "1rem",
            padding: "2rem",
            maxWidth: "500px",
            width: "90%",
          },
        }}
      >
        <div className="text-white">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Thông tin cá nhân</h2>
            <button
              onClick={handleCloseProfile}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div
                  className={`w-24 h-24 rounded-full overflow-hidden ${isEditing ? "cursor-pointer group" : ""
                    }`}
                  onClick={handleAvatarClick}
                >
                  {(isEditing ? tempAvatar : avatar) ? (
                    <img
                      src={isEditing ? tempAvatar : avatar}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-orange-400 to-orange-500 flex items-center justify-center text-white text-4xl font-bold">
                      {user?.username?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                  )}
                  {isEditing && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8 mx-auto mb-1 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span className="text-white text-sm">Thay đổi ảnh</span>
                      </div>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleAvatarChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-green-400">
                  {user?.username}
                </h3>
                <p className="text-gray-400">{user?.email}</p>
                {isEditing && (
                  <p className="text-sm text-gray-500 mt-1">
                    Nhấp vào ảnh để thay đổi ảnh đại diện
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-[#2c2c2c] p-4 rounded-lg">
                <div className="text-gray-400 mb-1">Ngày tham gia</div>
                <div className="font-semibold">19/05/2024</div>
              </div>
              <div className="bg-[#2c2c2c] p-4 rounded-lg">
                <div className="text-gray-400 mb-1">Trạng thái</div>
                <div className="font-semibold text-green-400">VIP Member</div>
              </div>
              <div className="bg-[#2c2c2c] p-4 rounded-lg">
                <div className="text-gray-400 mb-1">Phim đã xem</div>
                <div className="font-semibold">48 phim</div>
              </div>
              <div className="bg-[#2c2c2c] p-4 rounded-lg">
                <div className="text-gray-400 mb-1">Đánh giá</div>
                <div className="font-semibold">23 đánh giá</div>
              </div>
            </div>

            <div className="bg-[#2c2c2c] p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Thể loại yêu thích</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-900 text-blue-300 rounded-full text-sm">
                  Hành động
                </span>
                <span className="px-3 py-1 bg-purple-900 text-purple-300 rounded-full text-sm">
                  Viễn tưởng
                </span>
                <span className="px-3 py-1 bg-red-900 text-red-300 rounded-full text-sm">
                  Kinh dị
                </span>
                <span className="px-3 py-1 bg-green-900 text-green-300 rounded-full text-sm">
                  Hoạt hình
                </span>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              {!isEditing ? (
                <button
                  onClick={handleEditProfile}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Chỉnh sửa thông tin
                </button>
              ) : (
                <>
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                    disabled={isSaving}
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    disabled={isSaving}
                    className={`px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2 ${isSaving ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                  >
                    {isSaving ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <span>Đang lưu...</span>
                      </>
                    ) : (
                      "Lưu thay đổi"
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </Modal>

      {/* Watched Movies Modal */}
      <Modal
        isOpen={showWatchedModal}
        onRequestClose={handleCloseWatched}
        style={modalStyle}
      >
        <div className="text-white">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Phim đã xem</h2>
              <p className="text-gray-400 text-sm mt-1">
                Danh sách phim bạn đã xem gần đây
              </p>
            </div>
            <button
              onClick={handleCloseWatched}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {watchedMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} type="watched" />
            ))}
          </div>

          {watchedMovies.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <p className="text-xl mb-2">Chưa có phim nào được xem</p>
              <p>Hãy bắt đầu xem phim để tạo danh sách của bạn</p>
            </div>
          )}
        </div>
      </Modal>

      {/* Favorite Movies Modal */}
      <Modal
        isOpen={showFavoritesModal}
        onRequestClose={handleCloseFavorites}
        style={modalStyle}
      >
        <div className="text-white">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Phim yêu thích</h2>
              <p className="text-gray-400 text-sm mt-1">
                Danh sách phim bạn đã đánh dấu yêu thích
              </p>
            </div>
            <button
              onClick={handleCloseFavorites}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {favoriteMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} type="favorite" />
            ))}
          </div>

          {favoriteMovies.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <p className="text-xl mb-2">Chưa có phim yêu thích nào</p>
              <p>Hãy thêm phim vào danh sách yêu thích của bạn</p>
            </div>
          )}
        </div>
      </Modal>

      {/* User Management Modal */}
      <UserManagement
        isOpen={showUserManagement}
        onClose={() => setShowUserManagement(false)}
      />
    </header>
  );
};

export default Header;
