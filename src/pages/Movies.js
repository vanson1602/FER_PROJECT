import React, { useState } from "react";
import FullMovieList from "../components/FullMovieList";

const Movies = () => {
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const genres = [
    { id: "all", name: "Tất cả", icon: "🎬" },
    { id: "horror", name: "Kinh dị", icon: "👻" },
    { id: "action", name: "Hành động", icon: "💥" },
    { id: "comedy", name: "Hài hước", icon: "😂" },
    { id: "romance", name: "Tình cảm", icon: "💕" },
    { id: "drama", name: "Tâm lý", icon: "🎭" },
    { id: "family", name: "Gia đình", icon: "👨‍👩‍👧‍👦" },
  ];

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="pt-10">
        <div className="text-center mb-10">
          {/* Title và Search Bar cùng hàng */}
          <div className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto mb-8 gap-6">
            {/* Title */}
            <div className="flex-1">
              <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent tracking-tight">
                🎬 PHIM ĐIỆN ẢNH
              </h1>
              <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto lg:mx-0 rounded-full mt-2"></div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm phim theo tên..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-full focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white shadow-lg"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
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
            Khám phá bộ sưu tập phim điện ảnh đặc sắc
          </p>

          {/* Genre Filter */}
          <div className="max-w-6xl mx-auto mb-8">
            <div className="flex flex-wrap justify-center gap-3">
              {genres.map((genre) => (
                <button
                  key={genre.id}
                  onClick={() => handleGenreClick(genre.id)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                    selectedGenre === genre.id
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                      : "bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50"
                  }`}
                >
                  <span className="mr-2">{genre.icon}</span>
                  {genre.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <FullMovieList selectedGenre={selectedGenre} searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default Movies;
