import React, { useState, useEffect } from "react";
import SeriesList from "../components/SeriesList";

const Series = () => {
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const genres = [
    { id: "all", name: "Tất cả", icon: "📺" },
    { id: "drama", name: "Tâm lý", icon: "🎭" },
    { id: "comedy", name: "Hài hước", icon: "😂" },
    { id: "action", name: "Hành động", icon: "💥" },
    { id: "crime", name: "Tội phạm", icon: "🕵️" },
    { id: "mystery", name: "Bí ẩn", icon: "🔍" },
    { id: "scifi", name: "Khoa học", icon: "🚀" },
    { id: "family", name: "Gia đình", icon: "👨‍👩‍👧‍👦" },
  ];

  // Debounce search term để tránh call API quá nhiều
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
    // Reset search khi chọn genre
    if (genreId !== "all") {
      setSearchTerm("");
      setDebouncedSearchTerm("");
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    // Reset genre filter khi search
    if (e.target.value.trim()) {
      setSelectedGenre("all");
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setDebouncedSearchTerm("");
    setSelectedGenre("all");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="pt-10">
        <div className="text-center mb-10">
          {/* Title và Search Bar cùng hàng */}
          <div className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto mb-8 gap-6">
            {/* Title */}
            <div className="flex-1">
              <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 bg-clip-text text-transparent tracking-tight">
                📺 PHIM BỘ
              </h1>
              <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto lg:mx-0 rounded-full mt-2"></div>
            </div>

            {/* Enhanced Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm phim bộ theo tên..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-full focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all duration-300 bg-white shadow-lg"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                  {searchTerm && (
                    <button
                      onClick={handleClearSearch}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      title="Xóa tìm kiếm"
                    >
                      ✕
                    </button>
                  )}
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-gray-600 text-xl font-medium mb-8">
            {debouncedSearchTerm
              ? `Kết quả tìm kiếm cho "${debouncedSearchTerm}"`
              : "Khám phá những bộ phim truyền hình đang phát sóng"}
          </p>

          {/* Genre Filter - Ẩn khi đang search */}
          {!debouncedSearchTerm && (
            <div className="max-w-6xl mx-auto mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                🎯 Lọc theo thể loại:
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {genres.map((genre) => (
                  <button
                    key={genre.id}
                    onClick={() => handleGenreClick(genre.id)}
                    className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                      selectedGenre === genre.id
                        ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg"
                        : "bg-white text-gray-700 border-2 border-gray-200 hover:border-purple-400 hover:bg-purple-50"
                    }`}
                  >
                    <span className="mr-2">{genre.icon}</span>
                    {genre.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Info */}
          {debouncedSearchTerm && (
            <div className="max-w-4xl mx-auto mb-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <p className="text-purple-800">
                🔍 Đang hiển thị kết quả tìm kiếm cho "
                <strong>{debouncedSearchTerm}</strong>"
              </p>
              <button
                onClick={handleClearSearch}
                className="mt-2 text-purple-600 hover:text-purple-800 underline"
              >
                Xem tất cả phim bộ
              </button>
            </div>
          )}
        </div>

        <SeriesList
          selectedGenre={selectedGenre}
          searchTerm={debouncedSearchTerm}
        />
      </div>
    </div>
  );
};

export default Series;
