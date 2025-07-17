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
    <div className="min-h-screen bg-[#0F0F0F] text-white">
      <div className="pt-10">
        {/* Header */}
        <div className="text-center mb-10">
          {/* Title + Search */}
          <div className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto mb-10 gap-6 px-4">
            {/* Title */}
            <div className="flex-1 text-left">
              <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent tracking-tight">
                🎬 PHIM ĐIỆN ẢNH
              </h1>
              <div className="w-28 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full mt-3"></div>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-md w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="🔍 Tìm kiếm phim..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full px-6 py-4 text-lg bg-[#1F1F1F] border border-gray-700 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600 placeholder-gray-400"
                />
                <div className="absolute right-5 top-1/2 transform -translate-y-1/2 text-purple-400">
                  <svg
                    className="w-6 h-6"
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
          <p className="text-gray-400 text-xl font-medium mb-8">
            Khám phá kho tàng{" "}
            <span className="text-purple-400 font-semibold">phim điện ảnh</span>{" "}
            đặc sắc và hấp dẫn
          </p>

          {/* Genres */}
          <div className="max-w-6xl mx-auto mb-10 px-4">
            <div className="flex flex-wrap justify-center gap-3">
              {genres.map((genre) => (
                <button
                  key={genre.id}
                  onClick={() => handleGenreClick(genre.id)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${selectedGenre === genre.id
                    ? "bg-gradient-to-r from-purple-500 to-cyan-400 text-white shadow-md"
                    : "bg-[#1F1F1F] text-gray-300 border border-gray-600 hover:border-purple-400 hover:bg-[#2a2a2a]"
                    }`}
                >
                  <span className="mr-2">{genre.icon}</span>
                  {genre.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Movie List */}
        <FullMovieList selectedGenre={selectedGenre} searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default Movies;
