import React, { useState, useEffect } from "react";
import TVShowList from "../components/TVShowList";

const TVShows = () => {
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const genres = [
    { id: "all", name: "Tất cả", icon: "📺" },
    { id: "comedy", name: "Hài hước", icon: "😂" },
    { id: "drama", name: "Tâm lý", icon: "🎭" },
    { id: "action", name: "Hành động", icon: "💥" },
    { id: "romance", name: "Tình cảm", icon: "💕" },
    { id: "crime", name: "Tội phạm", icon: "🕵️" },
    { id: "reality", name: "Thực tế", icon: "🎪" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
    if (genreId !== "all") {
      setSearchTerm("");
      setDebouncedSearchTerm("");
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
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
    <div className="min-h-screen bg-[#0e0e1a] text-white">
      <div className="pt-10">
        <div className="text-center mb-10">
          {/* Header */}
          <div className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto mb-10 gap-6 px-4">
            {/* Title */}
            <div className="flex-1 text-left">
              <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 bg-clip-text text-transparent tracking-tight">
                🎭 TV SHOW
              </h1>
              <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-3"></div>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-md w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="🔍 Tìm kiếm TV show..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full px-6 py-4 text-lg bg-[#1c1c2a] text-white border border-gray-600 rounded-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                  {searchTerm && (
                    <button
                      onClick={handleClearSearch}
                      className="text-gray-400 hover:text-red-400 transition"
                      title="Xóa tìm kiếm"
                    >
                      ✕
                    </button>
                  )}
                  <svg
                    className="w-6 h-6 text-blue-400"
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
          <p className="text-gray-300 text-xl font-medium mb-8">
            {debouncedSearchTerm
              ? `Kết quả tìm kiếm cho "${debouncedSearchTerm}"`
              : "Khám phá những chương trình truyền hình nổi bật và hấp dẫn nhất"}
          </p>

          {/* Genre Filter */}
          {!debouncedSearchTerm && (
            <div className="max-w-6xl mx-auto mb-8 px-4">
              <h3 className="text-lg font-semibold text-gray-300 mb-4">
                🎯 Lọc theo thể loại:
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {genres.map((genre) => (
                  <button
                    key={genre.id}
                    onClick={() => handleGenreClick(genre.id)}
                    className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                      selectedGenre === genre.id
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
                        : "bg-[#1c1c2a] text-gray-300 border border-gray-600 hover:border-blue-500 hover:bg-[#2a2a3a]"
                    }`}
                  >
                    <span className="mr-2">{genre.icon}</span>
                    {genre.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Result Info */}
          {debouncedSearchTerm && (
            <div className="max-w-4xl mx-auto mb-6 p-4 bg-[#1f1f2e] border border-blue-500 rounded-lg text-gray-200">
              <p>
                🔍 Đang hiển thị kết quả tìm kiếm cho{" "}
                <strong className="text-white">"{debouncedSearchTerm}"</strong>
              </p>
              <button
                onClick={handleClearSearch}
                className="mt-2 text-blue-400 hover:text-blue-300 underline"
              >
                Xem tất cả TV shows
              </button>
            </div>
          )}
        </div>

        {/* List */}
        <TVShowList
          selectedGenre={selectedGenre}
          searchTerm={debouncedSearchTerm}
        />
      </div>
    </div>
  );
};

export default TVShows;
